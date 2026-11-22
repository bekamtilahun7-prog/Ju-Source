import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const location = useLocation();
  const isHeadRoute =
    location.pathname.startsWith("/head") ||
    location.pathname.startsWith("/department-head");
  const homeRoute = isHeadRoute ? "/head" : "/student";

  return (
    <main className="flex min-h-[calc(100vh-82px)] flex-col items-center justify-center text-center text-sm">
      <p className="font-medium text-lg text-[var(--navy-blue)]">404 Error</p>

      <h2 className="text-4xl font-semibold text-[var(--heading)] md:text-6xl">
        Page Not Found
      </h2>

      <p className="mt-4 text-base text-[var(--muted-text)]">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      <div className="mt-6 flex items-center justify-center gap-4">
        <Link
          to={homeRoute}
          className="bg-[var(--navy-blue)] hover:brightness-110 px-7 py-2.5 text-white rounded active:scale-95 transition-all shadow-[0_12px_28px_rgba(59,130,246,0.25)]"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
