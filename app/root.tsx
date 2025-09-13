import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Suspense, useEffect, useRef, useState } from "react";

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
  {
    rel: "apple-touch-icon",
    href: "/test-pwa-react/pwa-192x192.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "512x512",
    href: "/test-pwa-react/pwa-512x512.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const iosPromptRef = useRef<HTMLDivElement | null>(null);

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

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isInStandalone =
      "standalone" in window.navigator && (window.navigator as any).standalone;

    if (isIOS && !isInStandalone) {
      setShowIOSPrompt(true);
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

    const handleClickOutside = (e: MouseEvent) => {
      if (
        iosPromptRef.current &&
        !iosPromptRef.current.contains(e.target as Node)
      ) {
        setShowIOSPrompt(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      document.addEventListener("click", handleClickOutside);
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="MyApp" />
        <meta name="theme-color" content="#0d6efd" />

        <Meta />
        <Links />
      </head>
      <body>
        {children}

        {/* Кнопка для Android */}
        <button
          id="install-btn"
          style={{ display: "none" }}
          className="
            fixed top-6 left-1/2 -translate-x-1/2
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold py-3 px-6
            rounded-xl shadow-lg
            transition duration-300 z-50
          "
        >
          Установить приложение PWA
        </button>

        {/* Подсказка для iOS */}
        {showIOSPrompt && (
          <div
            ref={iosPromptRef}
            className="
              fixed top-6 left-1/2 -translate-x-1/2
              bg-white text-gray-800
              border border-gray-300
              shadow-lg rounded-xl
              p-4 max-w-xs text-center
              z-50
            "
          >
            <p className="text-sm font-medium">Чтобы установить приложение:</p>
            <ol className="text-sm mt-2 text-left list-decimal list-inside">
              <li>
                Нажмите <span className="font-semibold">Share</span> (иконка ↑).
              </li>
              <li>
                Выберите{" "}
                <span className="font-semibold">Add to Home Screen</span>.
              </li>
            </ol>
          </div>
        )}

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
