import { useEffect, useState } from "react";
import { deleteAdminRow, listAdminRows, patchAdminRow } from "../../lib/adminApi";
import type { LeadRow } from "../../lib/api/types";

const statuses = [
  { key: 'new', label: 'Новая' },
  { key: 'in_progress', label: 'В работе' },
  { key: 'done', label: 'Завершена' },
] as const;

export function AdminLeadsPage() {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      setRows(await listAdminRows("leads"));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function setStatus(id: string, status: string) {
    setErr(null);
    try {
      await patchAdminRow("leads", id, { status });
      void load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка обновления");
    }
  }

  async function remove(id: string) {
    if (!confirm("Удалить заявку?")) return;
    setErr(null);
    try {
      await deleteAdminRow("leads", id);
      void load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка удаления");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-950 tracking-tight mb-2">Заявки</h1>
      <p className="text-slate-500 font-medium mb-8">Сообщения с формы контактов.</p>
      {err && <div className="mb-6 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">{err}</div>}

      <div className="border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-4 py-3 font-bold text-slate-500">Дата</th>
              <th className="text-left px-4 py-3 font-bold text-slate-500">Имя</th>
              <th className="text-left px-4 py-3 font-bold text-slate-500">Контакты</th>
              <th className="text-left px-4 py-3 font-bold text-slate-500">Услуга</th>
              <th className="text-left px-4 py-3 font-bold text-slate-500">Сообщение</th>
              <th className="text-left px-4 py-3 font-bold text-slate-500">Статус</th>
              <th className="text-right px-4 py-3 font-bold text-slate-500"> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 align-top">
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString("ru-RU")}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-950">{r.name}</td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700">{r.phone || "—"}</div>
                    <div className="text-slate-500 text-xs break-all">{r.email || ""}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700 max-w-[200px] break-words">{r.service || "—"}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-[260px] break-words whitespace-pre-line">
                    {r.message || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => setStatus(r.id, e.target.value)}
                      className="border border-slate-200 px-2 py-1 text-xs font-bold text-slate-900"
                    >
                      {statuses.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => remove(r.id)} className="text-xs font-bold text-red-600 hover:underline">
                      Удалить
                    </button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && <p className="mt-6 text-slate-500 font-medium">Пока нет заявок.</p>}
    </div>
  );
}
