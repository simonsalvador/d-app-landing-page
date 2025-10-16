// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Limpiar espacios en el email (opcional pero recomendado)
    const email = formData.get('email')?.toString().trim() || '';
    formData.set('email', email);

    // Configurar FormSubmit
    formData.append('_captcha', 'false');
    formData.append('_autoresponse', 'false');

    const response = await fetch('https://formsubmit.co/soportedondemas@gmail.com', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      return NextResponse.redirect(new URL('/gracias', request.url));
    } else {
      const errorText = await response.text();
      console.error("FormSubmit error:", errorText);
      return NextResponse.json({ error: 'No se pudo enviar el formulario' }, { status: 500 });
    }
  } catch (error) {
    console.error("Error en /api/contact:", error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}