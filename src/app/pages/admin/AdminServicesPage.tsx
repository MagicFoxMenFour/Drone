import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { createAdminRow, listAdminRows } from "../../lib/adminApi";
import type { ServiceRow } from "../../lib/api/types";

export function AdminServicesPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<ServiceRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      setRows(await listAdminRows("services"));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function createNew() {
    setErr(null);
    const slug = `service-${Math.random().toString(36).slice(2, 8)}`;
    try {
      const data = await createAdminRow("services", {
        slug,
        title: "Новая услуга",
        short_desc: "",
        full_desc: "",
        icon: "📦",
        color: "cyan",
        use_cases: [],
        process: [],
        results: [],
        industries: [],
        price: "",
        published: false,
      });
      navigate(`/admin/services/${data.id}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка создания");
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Услуги</h1>
          <p className="text-slate-500 font-medium mt-1">Редактирование карточек услуг на сайте.</p>
        </div>
        <button
          type="button"
          onClick={createNew}
          className="px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-500"
        >
          Добавить
        </button>
      </div>

      {err && (
        <div className="mb-6 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">{err}</div>
      )}

      <div className="border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-4 py-3 font-bold text-slate-500">Название</th>
              <th className="text-left px-4 py-3 font-bold text-slate-500">Slug</th>
              <th className="text-left px-4 py-3 font-bold text-slate-500">Опубликовано</th>
              <th className="text-right px-4 py-3 font-bold text-slate-500"> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-bold text-slate-950">{r.title}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">{r.slug}</td>
                <td className="px-4 py-3">{r.published ? "да" : "нет"}</td>
                <td className="px-4 py-3 text-right">
                  <Link className="font-bold text-blue-600 hover:underline" to={`/admin/services/${r.id}`}>
                    Изменить
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
