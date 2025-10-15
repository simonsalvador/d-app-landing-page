// components/OrganizerContactForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OrganizerContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("🚀 Enviando con fetch...");
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    // Limpiar espacios en el email
    const email = formData.get("email")?.toString().trim() || "";
    formData.set("email", email);
    
    // En Vercel, permitimos el captcha (es inevitable sin dominio verificado)
    formData.set("_captcha", "true");
    formData.set("_autoresponse", "false");

    try {
      const response = await fetch("https://formsubmit.co/soportedondemas@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = "/gracias";
      } else {
        setError(result.message || "Hubo un error al enviar el formulario. Intentá nuevamente.");
      }
    } catch (err) {
      setError("Error de conexión. Verificá tu internet e intentá de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-foreground mb-2">
        ¿Organizás eventos deportivos?
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        Contanos sobre tu evento y te contactamos para ayudarte a publicarlo en D+.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ej: Martín López"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
            Teléfono (opcional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ej: +54 9 11 1234-5678"
          />
          <p className="text-xs text-muted-foreground mt-1">
            *Tu número solo será usado para contactarte sobre tu evento. No lo compartimos ni usamos para spam.
          </p>
        </div>

        <div>
          <label htmlFor="event-type" className="block text-sm font-medium text-foreground mb-1">
            ¿Qué tipo de evento organizás?
          </label>
          <input
            type="text"
            id="event-type"
            name="eventType"
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ej: Torneo de fútbol femenino, maratón solidaria..."
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground font-medium py-2.5 px-4 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {isSubmitting ? "Enviando..." : "Enviar solicitud"}
        </Button>
      </form>
    </div>
  );
}