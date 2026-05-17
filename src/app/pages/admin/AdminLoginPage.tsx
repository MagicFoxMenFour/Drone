import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { adminLogin } from "../../lib/adminApi";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await adminLogin(login, password);
      navigate("/admin", { replace: true });
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Ошибка входа");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-10">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
          Admin Panel
        </p>
        <h1 className="text-3xl font-bold text-slate-950 tracking-tight mb-8">
          Вход
        </h1>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Логин
            </label>
            <input
              type="text"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full border border-slate-200 px-4 py-3 text-slate-950 font-medium focus:outline-none focus:border-blue-600"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Пароль
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 px-4 py-3 text-slate-950 font-medium focus:outline-none focus:border-blue-600"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Вхожу…" : "Войти"}
          </button>
        </form>

        <div className="mt-8 text-sm text-slate-500">
          <Link to="/" className="font-bold text-blue-600 hover:underline">
            ← На сайт
          </Link>
        </div>
      </div>
    </div>
  );
}

