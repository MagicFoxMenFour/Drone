import { Link, Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { adminLogout, getAdminMe } from "../../lib/adminApi";

type Me = { login: string; isAdmin: boolean };

export function AdminLayout() {
  const navigate = useNavigate();
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const user = await getAdminMe().catch(() => null);
      if (mounted) setMe(user);
      if (mounted) setLoading(false);
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && !me) navigate("/admin/login", { replace: true });
  }, [loading, me, navigate]);

  useEffect(() => {
    if (!loading && me && !me.isAdmin) navigate("/admin/forbidden", { replace: true });
  }, [loading, me, navigate]);

  async function onLogout() {
    await adminLogout();
    navigate("/admin/login", { replace: true });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-8 py-10">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Citrix</div>
          <div className="mt-6 text-slate-700 font-medium">Загрузка…</div>
        </div>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <p className="text-slate-500 font-medium text-sm">Перенаправление на вход…</p>
      </div>
    );
  }

  if (!me.isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <p className="text-slate-500 font-medium text-sm">Перенаправление…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-8 py-4 flex items-center justify-between gap-6">
          <Link to="/admin" className="font-bold text-slate-950 tracking-tight">Citrix</Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-bold">
            <Link className="text-slate-600 hover:text-slate-950" to="/admin/services">
              Услуги
            </Link>
            <Link className="text-slate-600 hover:text-slate-950" to="/admin/cases">
              Кейсы
            </Link>
            <Link className="text-slate-600 hover:text-slate-950" to="/admin/blog">
              Блог
            </Link>
            <Link className="text-slate-600 hover:text-slate-950" to="/admin/about">
              О нас
            </Link>
            <Link className="text-slate-600 hover:text-slate-950" to="/admin/employees">
              Сотрудники
            </Link>
            <Link className="text-slate-600 hover:text-slate-950" to="/admin/leads">
              Заявки
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              {me?.login}
            </span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-slate-950 text-white rounded-full text-xs font-bold hover:bg-blue-600 transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
}
