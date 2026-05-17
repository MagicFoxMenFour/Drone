/** POST заявки: на Vercel — `/api/lead`. Для полного URL задайте `VITE_LEAD_API_URL` (например `http://127.0.0.1:3000/api/lead`). */
export function getLeadSubmitUrl(): string {
  const u = import.meta.env.VITE_LEAD_API_URL as string | undefined;
  if (u && u.trim()) return u.trim();
  return "/api/lead";
}

export type LeadPayload = {
  name: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
};

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(getLeadSubmitUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.ok) return { ok: true };
  let error = "Ошибка отправки";
  try {
    const j = (await res.json()) as { error?: unknown };
    if (j.error && typeof j.error === "string") error = j.error;
  } catch {
    /* ignore */
  }
  return { ok: false, error };
}
