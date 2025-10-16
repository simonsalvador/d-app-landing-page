// app/api/contact/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, eventType } = await request.json();

    if (!name || !email || !eventType) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // 1. Guardar en Supabase
    const { error: dbError } = await supabase
      .from('organizer_leads')
      .insert({ name, email, phone, event_type: eventType });

    if (dbError) throw dbError;

    // 2. Enviar email con Resend (usando sandbox)
    const emailHtml = `
      <h2>📩 Nuevo lead de organizador en D+</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone || 'No indicado'}</p>
      <p><strong>Tipo de evento:</strong> ${eventType}</p>
      <hr>
      <p><em>Este mensaje fue generado automáticamente desde tu landing D+.</em></p>
    `;

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'D+ <onboarding@resend.dev>', // ✅ Sandbox verificado por Resend
        to: 'soportedondemas@gmail.com',
        subject: `Nuevo organizador: ${name} quiere publicar un evento`,
        html: emailHtml,
      }),
    });

    if (!emailRes.ok) {
      const errorText = await emailRes.text();
      console.error('Error al enviar email:', errorText);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error interno';
    console.error('Error en /api/contact:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}