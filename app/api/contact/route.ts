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

    const { error } = await supabase
      .from('organizer_leads')
      .insert({ name, email, phone, event_type: eventType });

    if (error) throw error;
// ✅ Solo devuelve éxito, sin redirección
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}