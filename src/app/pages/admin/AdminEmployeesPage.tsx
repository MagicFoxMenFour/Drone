import { useEffect, useState } from "react";
import { createAdminRow, deleteAdminRow, listAdminRows, patchAdminRow } from "../../lib/adminApi";
import type { EmployeeRow } from "../../lib/api/types";
import { defaultEmployeesSeed } from "../../data/aboutDefaults";

const COLORS = [
  { label: "Серый", value: "bg-slate-600" },
  { label: "Синий", value: "bg-blue-600" },
  { label: "Зелёный", value: "bg-green-600" },
  { label: "Красный", value: "bg-red-600" },
  { label: "Фиолетовый", value: "bg-purple-600" },
  { label: "Оранжевый", value: "bg-orange-600" },
  { label: "Розовый", value: "bg-pink-600" },
  { label: "Бирюзовый", value: "bg-teal-600" },
  { label: "Индиго", value: "bg-indigo-600" },
  { label: "Жёлтый", value: "bg-yellow-600" },
];

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
      const existing = await listAdminRows("employees");
      const existingNames = new Set(existing.map((r) => r.name));
      const toCreate = defaultEmployeesSeed.filter((e) => !existingNames.has(e.name));
      await Promise.all(
        toCreate.map((e) =>
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
        active: false,
        sort: rows.length,
      });
      void load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка создания");
    }
  }

  function updateField(id: string, patch: Partial<EmployeeRow>) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  async function saveRow(row: EmployeeRow) {
    setErr(null);
    try {
      await patchAdminRow("employees", row.id, {
        name: row.name,
        role: row.role,
        bio: row.bio,
        image: row.image,
        initials: row.initials,
        color: row.color,
        active: row.active,
        sort: row.sort,
      });
      void load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка сохранения");
    }
  }

  async function uploadAvatar(id: string, file: File) {
    setErr(null);
    try {
      const form = new FormData();
      form.append("avatar", file);
      const res = await fetch(`/api/admin/employees/${id}/avatar`, {
        method: "POST",
        body: form,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Ошибка загрузки");
      void load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка загрузки фото");
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Сотрудники</h1>
          <p className="text-slate-500 font-medium mt-1">Команда на странице «О нас».</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={seedTeam}
            className="px-4 py-2 border border-slate-200 bg-white text-slate-700 text-sm font-bold rounded-full hover:border-blue-300"
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
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">ФИО</span>
                <input
                  className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
                  value={r.name}
                  onChange={(e) => updateField(r.id, { name: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Инициалы</span>
                <input
                  className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
                  value={r.initials}
                  onChange={(e) => updateField(r.id, { initials: e.target.value })}
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Должность</span>
              <input
                className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
                value={r.role}
                onChange={(e) => updateField(r.id, { role: e.target.value })}
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Биография</span>
              <textarea
                className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[100px] text-slate-900"
                value={r.bio}
                onChange={(e) => updateField(r.id, { bio: e.target.value })}
              />
            </label>

            {/* Photo upload */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Фотография</span>
              <div className="mt-2 flex items-center gap-4">
                {r.image ? (
                  <img src={r.image} alt="" className="w-16 h-16 rounded-full object-cover border border-slate-200" />
                ) : (
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${r.color}`}>
                    {r.initials || "?"}
                  </div>
                )}
                <label className="cursor-pointer px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">
                  {r.image ? "Заменить фото" : "Загрузить фото"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) await uploadAvatar(r.id, f);
                    }}
                  />
                </label>
                {r.image && (
                  <button
                    type="button"
                    onClick={() => updateField(r.id, { image: "" })}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    Удалить
                  </button>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 items-end">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Цвет кружка</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      title={c.label}
                      onClick={() => updateField(r.id, { color: c.value })}
                      className={`w-7 h-7 rounded-full ${c.value} ${
                        r.color === c.value ? "ring-2 ring-offset-2 ring-blue-500" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
              <label className="block">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Порядок</span>
                <input
                  type="number"
                  className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
                  value={r.sort}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (!Number.isNaN(n)) updateField(r.id, { sort: n });
                  }}
                />
              </label>
              <label className="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  checked={r.active}
                  onChange={(e) => updateField(r.id, { active: e.target.checked })}
                  className="accent-blue-600"
                />
                <span className="text-sm font-bold text-slate-700">Активен на сайте</span>
              </label>
            </div>
            <button
              type="button"
              onClick={() => saveRow(r)}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-blue-600"
            >
              Сохранить изменения
            </button>
            <button type="button" onClick={() => remove(r.id)} className="text-sm font-bold text-red-600 hover:underline">
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
