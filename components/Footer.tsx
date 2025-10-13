"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-muted/30 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl sm:text-3xl font-bold text-primary hover:scale-105 transition-transform"
              aria-label="Go to home"
            >
              <Image
                src="/LogoD+.png"
                alt="D+ Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </button>
            <p className="text-muted-foreground">Conectando comunidades deportivas en todo el mundo.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#caracteristicas" className="text-muted-foreground hover:text-primary transition-colors">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#preguntas" className="text-muted-foreground hover:text-primary transition-colors">
                    Preguntas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Carreras
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="mailto:soporte@dplus.com" className="text-muted-foreground hover:text-primary transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 D+. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
  );
}