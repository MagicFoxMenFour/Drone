import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteAdminRow, getAdminRow, patchAdminRow } from "../../lib/adminApi";
import type { CaseRow } from "../../lib/api/types";

type ResultPair = { v: string; l: string };

const GRADIENTS = [
  { label: "Тёмный (синий)", value: "from-slate-900 via-blue-950 to-slate-900" },
  { label: "Фиолетовый", value: "from-slate-900 via-purple-950 to-slate-900" },
  { label: "Зелёный", value: "from-slate-900 via-emerald-950 to-slate-900" },
  { label: "Красный", value: "from-slate-900 via-red-950 to-slate-900" },
  { label: "Оранжевый", value: "from-slate-900 via-orange-950 to-slate-900" },
  { label: "Тёмный", value: "from-slate-900 via-slate-800 to-slate-900" },
];

const ACCENT_COLORS = [
  { label: "Синий", value: "blue" },
  { label: "Зелёный", value: "green" },
  { label: "Красный", value: "red" },
  { label: "Фиолетовый", value: "purple" },
  { label: "Оранжевый", value: "orange" },
  { label: "Бирюзовый", value: "teal" },
  { label: "Розовый", value: "pink" },
];

function parseResults(v: unknown): ResultPair[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => {
    if (!x || typeof x !== "object") return { v: "", l: "" };
    const o = x as { v?: unknown; l?: unknown };
    return { v: String(o.v ?? ""), l: String(o.l ?? "") };
  });
}

export function AdminCaseEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [row, setRow] = useState<CaseRow | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [results, setResults] = useState<ResultPair[]>([]);
  const [tagsText, setTagsText] = useState("");

  useEffect(() => {
    if (!id) return;
    void getAdminRow("cases", id)
      .then((r) => {
        setRow(r);
        setResults(parseResults(r.results));
        setTagsText((r.tags ?? []).join(", "));
      })
      .catch((e) => {
        setErr(e instanceof Error ? e.message : "Ошибка загрузки");
      });
  }, [id]);

  function addResult() {
    setResults([...results, { v: "", l: "" }]);
  }

  function removeResult(i: number) {
    setResults(results.filter((_, idx) => idx !== i));
  }

  function updateResult(i: number, field: "v" | "l", val: string) {
    setResults(results.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)));
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!id || !row) return;
    setErr(null);
    try {
      const tags = tagsText.split(",").map((s) => s.trim()).filter(Boolean);
      await patchAdminRow("cases", id, {
        slug: row.slug,
        category: row.category,
        title: row.title,
        client: row.client,
        location: row.location,
        year: row.year,
        short_desc: row.short_desc,
        challenge: row.challenge,
        solution: row.solution,
        results: results.filter((r) => r.v || r.l) as unknown as Record<string, unknown>[],
        tags,
        gradient: row.gradient,
        accent_color: row.accent_color,
        published: row.published,
      });
      navigate("/admin/cases");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка сохранения");
    }
  }

  async function onDelete() {
    if (!id || !confirm("Удалить кейс?")) return;
    setErr(null);
    try {
      await deleteAdminRow("cases", id);
      navigate("/admin/cases");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка удаления");
    }
  }

  if (!row) return <p className="text-slate-500 font-medium">{err ?? "Загрузка…"}</p>;

  return (
    <div>
      <Link to="/admin/cases" className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6 inline-block">
        ← Кейсы
      </Link>
      <h1 className="text-3xl font-bold text-slate-950 tracking-tight mt-4 mb-6">Редактировать кейс</h1>
      {err && <div className="mb-6 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">{err}</div>}

      <form onSubmit={onSave} className="space-y-6 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Адрес (slug)</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-sm text-slate-900"
              value={row.slug}
              onChange={(e) => setRow({ ...row, slug: e.target.value })}
            />
            <p className="text-xs text-slate-400 mt-1">Уникальная часть URL</p>
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Категория</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.category}
              onChange={(e) => setRow({ ...row, category: e.target.value })}
              placeholder="Аэросъёмка / Мониторинг / etc"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Название проекта</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-lg font-bold text-slate-900"
            value={row.title}
            onChange={(e) => setRow({ ...row, title: e.target.value })}
          />
        </label>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Клиент</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.client}
              onChange={(e) => setRow({ ...row, client: e.target.value })}
              placeholder="Название компании"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Локация</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.location}
              onChange={(e) => setRow({ ...row, location: e.target.value })}
              placeholder="Город, регион"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Год</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.year}
              onChange={(e) => setRow({ ...row, year: e.target.value })}
              placeholder="2025"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Краткое описание</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[80px] text-slate-900"
            value={row.short_desc}
            onChange={(e) => setRow({ ...row, short_desc: e.target.value })}
            placeholder="Коротко о проекте — будет видно в списке кейсов"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Задача / Проблема</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[100px] text-slate-900"
            value={row.challenge}
            onChange={(e) => setRow({ ...row, challenge: e.target.value })}
            placeholder="С каким запросом пришёл клиент"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Наше решение</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[100px] text-slate-900"
            value={row.solution}
            onChange={(e) => setRow({ ...row, solution: e.target.value })}
            placeholder="Как мы решили задачу"
          />
        </label>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Результаты (цифры и факты)</span>
            <button type="button" onClick={addResult} className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-500">
              + Добавить
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1 mb-2">Например: «2500 га» — «площадь обследована»</p>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  className="flex-1 border border-slate-200 px-3 py-2 text-slate-900"
                  value={r.v}
                  onChange={(e) => updateResult(i, "v", e.target.value)}
                  placeholder="Значение (например: 2500 га)"
                />
                <input
                  className="flex-1 border border-slate-200 px-3 py-2 text-slate-900"
                  value={r.l}
                  onChange={(e) => updateResult(i, "l", e.target.value)}
                  placeholder="Описание (например: площадь обследована)"
                />
                <button type="button" onClick={() => removeResult(i)} className="text-xs font-bold text-red-600 hover:underline">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Теги (через запятую)</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="нефтегаз, сельское хозяйство, мониторинг"
          />
        </div>

        {/* Style */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Градиент фона</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {GRADIENTS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  title={g.label}
                  onClick={() => setRow({ ...row, gradient: g.value })}
                  className={`px-3 py-1.5 rounded text-xs font-bold text-white bg-gradient-to-r ${g.value} ${
                    row.gradient === g.value ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Цвет акцента</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  title={c.label}
                  onClick={() => setRow({ ...row, accent_color: c.value })}
                  className={`px-3 py-1.5 rounded text-xs font-bold border ${
                    row.accent_color === c.value
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={row.published}
            onChange={(e) => setRow({ ...row, published: e.target.checked })}
            className="accent-blue-600"
          />
          <span className="text-sm font-bold text-slate-700">Опубликовано на сайте</span>
        </label>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="px-8 py-3 bg-slate-950 text-white rounded-full font-bold hover:bg-blue-600">
            Сохранить
          </button>
          <button type="button" onClick={onDelete} className="px-8 py-3 border border-red-200 text-red-700 rounded-full font-bold hover:bg-red-50">
            Удалить кейс
          </button>
        </div>
      </form>
    </div>
  );
}