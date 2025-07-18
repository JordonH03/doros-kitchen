import {
    isRouteErrorResponse,
    Links,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router"
import type { Route } from "./+types/root"
import { TimerProvider } from "@/util/timer/TimerContext"
import '@/styles/main.scss'

export default function App() {
    return (
        <TimerProvider>
            <Outlet />
        </TimerProvider>
    )
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Links />
                <title>Vite + React + TS</title>
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!"
    let details = "An unexpected error occurred."
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error"
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <main id="error-page">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    )
}

export function links() {
    return [
        {
            rel: "icon",
            type: "image/svg+xml",
            href: "/vite.svg",
        },
        {
            rel: "manifest",
            href: "/app.webmanifest",
        },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous",
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&family=Cherry+Swash:wght@400;700&display=swap"
        },
    ]
}
