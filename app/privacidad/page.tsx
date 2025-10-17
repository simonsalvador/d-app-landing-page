import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-8"
          asChild
        >
          <Link href="/" aria-label="Volver al inicio">
            ← Volver al inicio
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
        <div className="prose prose-lg text-foreground space-y-6">
          <p><strong>Última actualización:</strong> 18 de octubre de 2025</p>
          
          <h2>1. Información que recopilamos</h2>
          <p>Cuando completás el formulario de contacto en nuestra landing, recopilamos los siguientes datos personales:</p>
          <ul>
            <li>Nombre completo</li>
            <li>Email</li>
            <li>Teléfono (opcional)</li>
            <li>Tipo de evento que organizás</li>
          </ul>

          <h2>2. Para qué usamos tus datos</h2>
          <p>Utilizamos esta información exclusivamente para:</p>
          <ul>
            <li>Contactarte y ayudarte a publicar tu evento en D+.</li>
            <li>Mejorar nuestros servicios y entender las necesidades de los organizadores.</li>
          </ul>
          <p><strong>No vendemos, alquilamos ni compartimos tus datos con terceros.</strong></p>

          <h2>3. Almacenamiento y seguridad</h2>
          <p>Tus datos se almacenan en servidores seguros de Supabase (ubicados en EE.UU.) con medidas técnicas y organizativas para proteger tu información contra accesos no autorizados.</p>

          <h2>4. Cookies y analítica</h2>
          <p>Nuestra landing utiliza Google Analytics 4 (GA4) para entender cómo los usuarios interactúan con el sitio. <strong>Solo se activa tras tu consentimiento explícito</strong> mediante nuestro banner de cookies.</p>

          <h2>5. Tus derechos</h2>
          <p>En cualquier momento podés:</p>
          <ul>
            <li>Solicitar acceso a tus datos personales.</li>
            <li>Corregir o actualizar tu información.</li>
            <li>Solicitar la eliminación de tus datos.</li>
          </ul>
          <p>Para ejercer estos derechos, escribinos a <a href="mailto:soportedondemas@gmail.com" className="text-primary hover:underline">soportedondemas@gmail.com</a>.</p>

          <h2>6. Jurisdicción</h2>
          <p>Esta política se rige por las leyes de la República Argentina. Cualquier disputa relacionada se resolverá en los tribunales de la Ciudad Autónoma de Buenos Aires.</p>

          <h2>7. Cambios en esta política</h2>
          <p>Podemos actualizar esta política ocasionalmente. La versión vigente siempre estará disponible en esta página.</p>
        </div>
      </div>
    </div>
  );
}