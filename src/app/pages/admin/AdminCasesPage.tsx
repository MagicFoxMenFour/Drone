import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { createAdminRow, listAdminRows } from "../../lib/adminApi";
import type { CaseRow } from "../../lib/api/types";

export function AdminCasesPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<CaseRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      setRows(await listAdminRows("cases"));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function createNew() {
    setErr(null);
    const slug = `case-${Math.random().toString(36).slice(2, 8)}`;
    try {
      const data = await createAdminRow("cases", {
        slug,
        category: "Категория",
        title: "Новый кейс",
        short_desc: "",
        challenge: "",
        solution: "",
        results: [],
        tags: [],
        gradient: "from-slate-900 via-blue-950 to-slate-900",
        accent_color: "blue",
        published: false,
      });
      navigate(`/admin/cases/${data.id}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка создания");
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Кейсы</h1>
          <p className="text-slate-500 font-medium mt-1">Проекты на сайте.</p>
        </div>
        <button
          type="button"
          onClick={createNew}
          className="px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-500"
        >
          Добавить
        </button>
      </div>
      {err && <div className="mb-6 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">{err}</div>}
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
                <td className="px-4 py-3 text-slate-700 font-medium">{r.published ? "да" : "нет"}</td>
                <td className="px-4 py-3 text-right">
                  <Link className="font-bold text-blue-600 hover:underline" to={`/admin/cases/${r.id}`}>
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
