import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Suspense, useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "manifest",
    href: "/test-pwa-react/manifest.json",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Регистрация service worker
    if ("serviceWorker" in navigator) {
      if (!navigator.serviceWorker.controller) {
        navigator.serviceWorker
          .register("/test-pwa-react/service-worker.js")
          .then(() => console.log("SW registered"))
          .catch(console.error);
      }
    }
    // beforeinstallprompt
    let deferredPrompt: any;
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;

      const btn = document.getElementById("install-btn");
      if (btn) {
        btn.style.display = "block";
        btn.addEventListener("click", async () => {
          btn.style.display = "none";
          // @ts-ignore
          deferredPrompt.prompt();
          // @ts-ignore
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User response: ${outcome}`);
          deferredPrompt = null;
        });
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <button
          id="install-btn"
          style={{ display: "none" }}
          className="
    fixed
    bottom-6
    left-1/2
    transform -translate-x-1/2
    bg-blue-600
    hover:bg-blue-700
    text-white
    font-semibold
    py-3
    px-6
    rounded-xl
    shadow-lg
    transition
    duration-300
    z-50
  "
        >
          Установить приложение PWA
        </button>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
