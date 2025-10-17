import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TerminosCondiciones() {
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

        <h1 className="text-3xl font-bold mb-8">Términos y Condiciones</h1>
        <div className="prose prose-lg text-foreground space-y-6">
          <p><strong>Última actualización:</strong> 18 de octubre de 2025</p>
          
          <h2>1. Uso de la landing</h2>
          <p>D+ es una plataforma deportiva que conecta organizadores y participantes. Esta landing tiene fines informativos y de contacto. Al utilizarla, aceptás estos términos.</p>

          <h2>2. Precisión de la información</h2>
          <p>Hacemos esfuerzos razonables para mantener la información actualizada y precisa, pero no garantizamos su exactitud absoluta ni su idoneidad para un propósito específico.</p>

          <h2>3. Limitación de responsabilidad</h2>
          <p>D+ no será responsable por:</p>
          <ul>
            <li>Daños directos, indirectos o consecuentes derivados del uso de esta landing.</li>
            <li>Errores u omisiones en la información proporcionada.</li>
            <li>Problemas técnicos fuera de nuestro control.</li>
          </ul>

          <h2>4. Propiedad intelectual</h2>
          <p>Todo el contenido de esta landing (logos, textos, imágenes) es propiedad de D+ y está protegido por las leyes de propiedad intelectual de Argentina.</p>

          <h2>5. Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigencia al publicarse en esta página.</p>

          <h2>6. Contacto</h2>
          <p>Para consultas sobre estos términos, escribinos a <a href="mailto:soportedondemas@gmail.com" className="text-primary hover:underline">soportedondemas@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}