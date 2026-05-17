import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteAdminRow, getAdminRow, patchAdminRow } from "../../lib/adminApi";
import type { ServiceRow } from "../../lib/api/types";

function safeJson(text: string): unknown {
  return JSON.parse(text);
}

export function AdminServiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [row, setRow] = useState<ServiceRow | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [useCasesJson, setUseCasesJson] = useState("[]");
  const [processJson, setProcessJson] = useState("[]");
  const [resultsJson, setResultsJson] = useState("[]");
  const [industriesText, setIndustriesText] = useState("");

  useEffect(() => {
    if (!id) return;
    void getAdminRow("services", id)
      .then((r) => {
          setRow(r);
          setUseCasesJson(JSON.stringify(r.use_cases ?? [], null, 2));
          setProcessJson(JSON.stringify(r.process ?? [], null, 2));
          setResultsJson(JSON.stringify(r.results ?? [], null, 2));
          setIndustriesText((r.industries ?? []).join(", "));
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
      const use_cases = safeJson(useCasesJson);
      const process = safeJson(processJson);
      const results = safeJson(resultsJson);
      const industries = industriesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      await patchAdminRow("services", id, {
          slug: row.slug,
          title: row.title,
          short_desc: row.short_desc,
          full_desc: row.full_desc,
          icon: row.icon,
          color: row.color,
          use_cases,
          process,
          results,
          industries,
          price: row.price,
          published: row.published,
        });
      navigate("/admin/services");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка JSON");
    }
  }

  async function onDelete() {
    if (!id || !confirm("Удалить услугу?")) return;
    setErr(null);
    try {
      await deleteAdminRow("services", id);
      navigate("/admin/services");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка удаления");
    }
  }

  if (!row) {
    return <p className="text-slate-500 font-medium">{err ?? "Загрузка…"}</p>;
  }

  return (
    <div>
      <Link to="/admin/services" className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6 inline-block">
        ← Услуги
      </Link>
      <h1 className="text-3xl font-bold text-slate-950 tracking-tight mt-4 mb-6">Редактировать услугу</h1>
      {err && <div className="mb-6 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">{err}</div>}

      <form onSubmit={onSave} className="space-y-6 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Slug</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-sm"
              value={row.slug}
              onChange={(e) => setRow({ ...row, slug: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Цвет (cyan/orange)</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2"
              value={row.color}
              onChange={(e) => setRow({ ...row, color: e.target.value })}
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Заголовок</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2"
            value={row.title}
            onChange={(e) => setRow({ ...row, title: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Кратко</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[80px]"
            value={row.short_desc}
            onChange={(e) => setRow({ ...row, short_desc: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Полное описание</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[160px]"
            value={row.full_desc}
            onChange={(e) => setRow({ ...row, full_desc: e.target.value })}
          />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Иконка (emoji)</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2"
              value={row.icon}
              onChange={(e) => setRow({ ...row, icon: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Цена (строка)</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2"
              value={row.price}
              onChange={(e) => setRow({ ...row, price: e.target.value })}
            />
          </label>
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

        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Отрасли (через запятую)</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2"
            value={industriesText}
            onChange={(e) => setIndustriesText(e.target.value)}
          />
        </div>

        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">use_cases (JSON массив строк)</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs min-h-[120px]"
            value={useCasesJson}
            onChange={(e) => setUseCasesJson(e.target.value)}
          />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">process (JSON)</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs min-h-[140px]"
            value={processJson}
            onChange={(e) => setProcessJson(e.target.value)}
          />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">results (JSON {"{v,l}"}[])</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs min-h-[100px]"
            value={resultsJson}
            onChange={(e) => setResultsJson(e.target.value)}
          />
        </div>

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
