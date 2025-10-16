// app/gracias/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-primary mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          ¡Gracias por contactarnos!
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg mb-6">
          Hemos recibido tu solicitud. En breve, un miembro de nuestro equipo se pondrá en contacto contigo para ayudarte a publicar tu evento en D+.
        </p>

        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground flex items-start gap-2">
            <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
            Si nos dejaste tu número de WhatsApp, ¡te escribiremos por ahí!
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            ¿No recibiste respuesta en 24 horas? Escríbenos directamente a:
          </p>
          <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-primary" />
            <a
              href="mailto:soportedondemas@gmail.com"
              className="text-primary hover:underline font-medium"
            >
              soportedondemas@gmail.com
            </a>
          </p>
        </div>

        <Button
          variant="outline"
          className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-2.5 px-6"
          asChild
        >
          <Link href="/" aria-label="Volver al inicio">
            ← Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  );
}