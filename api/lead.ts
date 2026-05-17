import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";
import { createRow } from "./_lib/contentStore";

const bodySchema = z.object({
  name: z.string().min(1, "Укажите имя"),
  phone: z.string().optional().default(""),
  email: z.string().optional().default(""),
  service: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

function coerceBody(raw: unknown): unknown {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return raw;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const parsed = bodySchema.safeParse(coerceBody(req.body));
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }

    const { name, phone, email, service, message } = parsed.data;
    const row = await createRow("leads", {
        name,
        phone,
        email,
        service,
        message,
        status: "new",
        source: "site",
      });

    const to = process.env.LEADS_TO_EMAIL;
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && to) {
      const resend = new Resend(resendKey);
      const from = process.env.RESEND_FROM || "Drone site <onboarding@resend.dev>";
      const text = [
        `Новая заявка #${row.id ?? ""}`,
        `Имя: ${name}`,
        `Телефон: ${phone || "—"}`,
        `Email: ${email || "—"}`,
        `Услуга: ${service || "—"}`,
        "",
        message || "(без текста)",
      ].join("\n");

      const { error: mailError } = await resend.emails.send({
        from,
        to: [to],
        subject: `Заявка с сайта: ${name}`,
        text,
      });
      if (mailError) {
        console.error(mailError);
      }
    }

    return res.status(200).json({ ok: true, id: row.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Внутренняя ошибка" });
  }
}
