import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteAdminRow, getAdminRow, patchAdminRow } from "../../lib/adminApi";
import type { CaseRow } from "../../lib/api/types";

function parseJson(text: string): unknown {
  return JSON.parse(text);
}

export function AdminCaseEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [row, setRow] = useState<CaseRow | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [resultsJson, setResultsJson] = useState("[]");
  const [tagsText, setTagsText] = useState("");

  useEffect(() => {
    if (!id) return;
    void getAdminRow("cases", id)
      .then((r) => {
        setRow(r);
        setResultsJson(JSON.stringify(r.results ?? [], null, 2));
        setTagsText((r.tags ?? []).join(", "));
      })
      .catch((e) => {
        setErr(e instanceof Error ? e.message : "Ошибка загрузки");
      });
  }, [id]);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!id || !row) return;
    setErr(null);
    try {
      const results = parseJson(resultsJson);
      const tags = tagsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
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
          results,
          tags,
          gradient: row.gradient,
          accent_color: row.accent_color,
          published: row.published,
        });
      navigate("/admin/cases");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка JSON");
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
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Slug</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-sm text-slate-900"
              value={row.slug}
              onChange={(e) => setRow({ ...row, slug: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Категория</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.category}
              onChange={(e) => setRow({ ...row, category: e.target.value })}
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Заголовок</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
            value={row.title}
            onChange={(e) => setRow({ ...row, title: e.target.value })}
          />
        </label>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Клиент</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.client}
              onChange={(e) => setRow({ ...row, client: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Локация</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.location}
              onChange={(e) => setRow({ ...row, location: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Год</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.year}
              onChange={(e) => setRow({ ...row, year: e.target.value })}
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Кратко</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[80px]"
            value={row.short_desc}
            onChange={(e) => setRow({ ...row, short_desc: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Задача</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[100px] text-slate-900"
            value={row.challenge}
            onChange={(e) => setRow({ ...row, challenge: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Решение</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[100px] text-slate-900"
            value={row.solution}
            onChange={(e) => setRow({ ...row, solution: e.target.value })}
          />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gradient (Tailwind)</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs"
              value={row.gradient}
              onChange={(e) => setRow({ ...row, gradient: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">accent_color</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.accent_color}
              onChange={(e) => setRow({ ...row, accent_color: e.target.value })}
            />
          </label>
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Теги (через запятую)</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
          />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">results JSON</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs min-h-[120px] text-slate-900"
            value={resultsJson}
            onChange={(e) => setResultsJson(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={row.published}
            onChange={(e) => setRow({ ...row, published: e.target.checked })}
            className="accent-blue-600"
          />
          <span className="text-sm font-bold text-slate-700">Опубликовано</span>
        </label>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="px-8 py-3 bg-slate-950 text-white rounded-full font-bold hover:bg-blue-600">
            Сохранить
          </button>
          <button type="button" onClick={onDelete} className="px-8 py-3 border border-red-200 text-red-700 rounded-full font-bold hover:bg-red-50">
            Удалить
          </button>
        </div>
      </form>
    </div>
  );
}
