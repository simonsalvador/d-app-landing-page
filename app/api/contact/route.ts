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

    // 2. Enviar email con Resend (usando fetch)
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'soportedondemas@gmail.com',
        subject: `Nuevo organizador: ${name}`,
        html: `<p><strong>Nombre:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Teléfono:</strong> ${phone || 'No indicado'}<br><strong>Evento:</strong> ${eventType}</p>`,
      }),
    });

    const result = await emailRes.json();
    if (!emailRes.ok) {
      console.error('❌ Error de Resend:', result);
    } else {
      console.log('✅ Email enviado:', result.id);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('💥 Error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}