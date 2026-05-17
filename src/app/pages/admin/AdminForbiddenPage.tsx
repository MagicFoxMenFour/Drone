import { Link } from "react-router";

export function AdminForbiddenPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">403</p>
        <h1 className="text-3xl font-bold text-white mb-4">Доступ запрещён</h1>
        <p className="text-slate-400 font-medium mb-8">
          У вашей учётной записи нет прав администратора. Обратитесь к владельцу проекта.
        </p>
        <Link to="/" className="inline-block px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-blue-200 transition-colors">
          На сайт
        </Link>
      </div>
    </div>
  );
}
