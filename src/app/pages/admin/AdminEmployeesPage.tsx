import { useEffect, useState } from "react";
import { createAdminRow, deleteAdminRow, listAdminRows, patchAdminRow } from "../../lib/adminApi";
import type { EmployeeRow } from "../../lib/api/types";
import { defaultEmployeesSeed } from "../../data/aboutDefaults";

export function AdminEmployeesPage() {
  const [rows, setRows] = useState<EmployeeRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      const data = await listAdminRows("employees");
      setRows([...data].sort((a, b) => a.sort - b.sort));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function seedTeam() {
    setErr(null);
    try {
      await Promise.all(
        defaultEmployeesSeed.map((e) =>
          createAdminRow("employees", {
            ...e,
            active: true,
          })
        )
      );
      void load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка создания");
    }
  }

  async function addEmpty() {
    setErr(null);
    try {
      await createAdminRow("employees", {
        name: "Новый сотрудник",
        role: "",
        bio: "",
        initials: "?",
        color: "bg-slate-600",
        active: true,
        sort: rows.length,
      });
      void load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка создания");
    }
  }

  async function updateField(id: string, patch: Partial<EmployeeRow>) {
    setErr(null);
    try {
      await patchAdminRow("employees", id, patch);
      void load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка сохранения");
    }
  }

  async function remove(id: string) {
    if (!confirm("Удалить сотрудника?")) return;
    setErr(null);
    try {
      await deleteAdminRow("employees", id);
      void load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка удаления");
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Сотрудники</h1>
          <p className="text-slate-500 font-medium mt-1">Команда на странице «О нас».</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={seedTeam}
            className="px-4 py-2 border border-slate-200 bg-white text-sm font-bold rounded-full hover:border-blue-300"
          >
            Заполнить из шаблона
          </button>
          <button type="button" onClick={addEmpty} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-500">
            Добавить
          </button>
        </div>
      </div>
      {err && <div className="mb-6 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">{err}</div>}

      <div className="space-y-6">
        {rows.map((r) => (
          <div key={r.id} className="border border-slate-200 bg-white p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ФИО</span>
                <input
                  className="mt-2 w-full border border-slate-200 px-3 py-2"
                  defaultValue={r.name}
                  onBlur={(e) => e.target.value !== r.name && updateField(r.id, { name: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Инициалы</span>
                <input
                  className="mt-2 w-full border border-slate-200 px-3 py-2"
                  defaultValue={r.initials}
                  onBlur={(e) => e.target.value !== r.initials && updateField(r.id, { initials: e.target.value })}
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Роль</span>
              <input
                className="mt-2 w-full border border-slate-200 px-3 py-2"
                defaultValue={r.role}
                onBlur={(e) => e.target.value !== r.role && updateField(r.id, { role: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Био</span>
              <textarea
                className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[100px]"
                defaultValue={r.bio}
                onBlur={(e) => e.target.value !== r.bio && updateField(r.id, { bio: e.target.value })}
              />
            </label>
            <div className="grid sm:grid-cols-3 gap-4 items-end">
              <label className="block">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Цвет (класс)</span>
                <input
                  className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs"
                  defaultValue={r.color}
                  onBlur={(e) => e.target.value !== r.color && updateField(r.id, { color: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Порядок</span>
                <input
                  type="number"
                  className="mt-2 w-full border border-slate-200 px-3 py-2"
                  defaultValue={r.sort}
                  onBlur={(e) => {
                    const n = Number(e.target.value);
                    if (!Number.isNaN(n) && n !== r.sort) updateField(r.id, { sort: n });
                  }}
                />
              </label>
              <label className="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  defaultChecked={r.active}
                  onChange={(e) => updateField(r.id, { active: e.target.checked })}
                  className="accent-blue-600"
                />
                <span className="text-sm font-bold text-slate-700">Активен на сайте</span>
              </label>
            </div>
            <button type="button" onClick={() => remove(r.id)} className="text-sm font-bold text-red-600 hover:underline">
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
