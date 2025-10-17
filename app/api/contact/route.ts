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

    // 2. Enviar email con Brevo
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { email: 'soportedondemas@gmail.com', name: 'D+ Leads' },
        to: [{ email: 'soportedondemas@gmail.com' }],
        subject: `Nuevo organizador: ${name}`,
        htmlContent: `
          <h2>📩 Nuevo lead en D+</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || 'No indicado'}</p>
          <p><strong>Tipo de evento:</strong> ${eventType}</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errorText = await emailRes.text();
      console.error('❌ Error Brevo:', errorText);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error interno';
    console.error('💥 Error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}