import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="text-center">
        <div className="text-[20vw] font-bold text-slate-100 leading-none tracking-tighter select-none">404</div>
        <div className="-mt-8 relative z-10">
          <h1 className="text-4xl font-bold text-slate-950 tracking-tight mb-4">Страница не найдена</h1>
          <p className="text-slate-500 font-medium text-lg mb-10">
            Возможно, она была перемещена или такого адреса никогда не существовало.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-10 py-4 bg-slate-950 text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
            >
              На главную
            </Link>
            <Link
              to="/contacts"
              className="px-10 py-4 border border-slate-200 text-slate-950 rounded-full font-bold hover:bg-slate-50 transition-colors"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
