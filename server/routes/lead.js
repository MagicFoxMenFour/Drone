import { Router } from 'express';
import { runAsync } from '../db/init.js';
import { randomUUID } from 'crypto';

export const leadRoutes = Router();

leadRoutes.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  try {
    const { name, phone = '', email = '', service = '', message = '' } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const id = randomUUID();
    const now = new Date().toISOString();

    const lead = {
      id,
      name,
      email,
      phone,
      service,
      message,
      status: 'new',
      source: 'site',
      created_at: now,
      updated_at: now
    };

    await runAsync(
      `INSERT INTO leads (id, name, email, phone, service, message, status, source, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [lead.id, lead.name, lead.email, lead.phone, lead.service, lead.message, lead.status, lead.source, lead.created_at, lead.updated_at]
    );

    // Send email if configured
    if (process.env.RESEND_API_KEY && process.env.LEADS_TO_EMAIL) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const emailText = [
          `Новая заявка #${id}`,
          `Имя: ${name}`,
          `Телефон: ${phone || '—'}`,
          `Email: ${email || '—'}`,
          `Услуга: ${service || '—'}`,
          '',
          message || '(без текста)'
        ].join('\n');

        await resend.emails.send({
          from: process.env.RESEND_FROM || 'Drone <onboarding@resend.dev>',
          to: [process.env.LEADS_TO_EMAIL],
          subject: `Заявка с сайта: ${name}`,
          text: emailText
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    }

    res.json({ ok: true, id });
  } catch (error) {
    console.error('Lead creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
