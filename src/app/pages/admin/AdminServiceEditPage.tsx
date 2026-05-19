import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteAdminRow, getAdminRow, patchAdminRow } from "../../lib/adminApi";
import type { ServiceRow } from "../../lib/api/types";

const SERVICE_COLORS = [
  { label: "Бирюзовый", value: "cyan" },
  { label: "Оранжевый", value: "orange" },
  { label: "Синий", value: "blue" },
  { label: "Зелёный", value: "green" },
  { label: "Красный", value: "red" },
  { label: "Фиолетовый", value: "purple" },
  { label: "Розовый", value: "pink" },
  { label: "Тёмный", value: "dark" },
];

type ResultPair = { v: string; l: string };
type ProcessStep = { step: string; title: string; desc: string };

export function AdminServiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [row, setRow] = useState<ServiceRow | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [useCases, setUseCases] = useState<string[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [results, setResults] = useState<ResultPair[]>([]);
  const [industriesText, setIndustriesText] = useState("");

  useEffect(() => {
    if (!id) return;
    void getAdminRow("services", id)
      .then((r) => {
        setRow(r);
        setUseCases(Array.isArray(r.use_cases) ? r.use_cases.map(String) : []);
        setProcessSteps(Array.isArray(r.process) ? (r.process as ProcessStep[]) : []);
        setResults(Array.isArray(r.results) ? (r.results as ResultPair[]) : []);
        setIndustriesText(Array.isArray(r.industries) ? r.industries.join(", ") : "");
      })
      .catch((e) => {
        setErr(e instanceof Error ? e.message : "Ошибка загрузки");
      });
  }, [id]);

  // use_cases helpers
  function addUseCase() { setUseCases([...useCases, ""]); }
  function removeUseCase(i: number) { setUseCases(useCases.filter((_, idx) => idx !== i)); }
  function updateUseCase(i: number, val: string) { setUseCases(useCases.map((s, idx) => idx === i ? val : s)); }

  // process helpers
  function addProcessStep() { setProcessSteps([...processSteps, { step: "", title: "", desc: "" }]); }
  function removeProcessStep(i: number) { setProcessSteps(processSteps.filter((_, idx) => idx !== i)); }
  function updateProcessStep(i: number, field: keyof ProcessStep, val: string) {
    setProcessSteps(processSteps.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  }

  // results helpers
  function addResult() { setResults([...results, { v: "", l: "" }]); }
  function removeResult(i: number) { setResults(results.filter((_, idx) => idx !== i)); }
  function updateResult(i: number, field: "v" | "l", val: string) {
    setResults(results.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!id || !row) return;
    setErr(null);
    try {
      const industries = industriesText.split(",").map((s) => s.trim()).filter(Boolean);
      await patchAdminRow("services", id, {
        slug: row.slug,
        title: row.title,
        short_desc: row.short_desc,
        full_desc: row.full_desc,
        icon: row.icon,
        color: row.color,
        use_cases: useCases.filter(Boolean) as unknown as Record<string, unknown>[],
        process: processSteps.filter((s) => s.title || s.desc) as unknown as Record<string, unknown>[],
        results: results.filter((r) => r.v || r.l) as unknown as Record<string, unknown>[],
        industries,
        price: row.price,
        published: row.published,
      });
      navigate("/admin/services");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка сохранения");
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
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Адрес (slug)</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-sm text-slate-900"
              value={row.slug}
              onChange={(e) => setRow({ ...row, slug: e.target.value })}
            />
            <p className="text-xs text-slate-400 mt-1">Уникальная часть URL</p>
          </label>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Цвет карточки</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {SERVICE_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  title={c.label}
                  onClick={() => setRow({ ...row, color: c.value })}
                  className={`px-3 py-1.5 rounded text-xs font-bold border ${
                    row.color === c.value
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

        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Название услуги</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-lg font-bold text-slate-900"
            value={row.title}
            onChange={(e) => setRow({ ...row, title: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Краткое описание</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[80px] text-slate-900"
            value={row.short_desc}
            onChange={(e) => setRow({ ...row, short_desc: e.target.value })}
            placeholder="Коротко об услуге — будет видно в списке"
          />
        </label>

        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Полное описание</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[160px] text-slate-900"
            value={row.full_desc}
            onChange={(e) => setRow({ ...row, full_desc: e.target.value })}
            placeholder="Подробное описание услуги (несколько абзацев)"
          />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Иконка (emoji)</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.icon}
              onChange={(e) => setRow({ ...row, icon: e.target.value })}
              placeholder="📦"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Цена (строка)</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.price}
              onChange={(e) => setRow({ ...row, price: e.target.value })}
              placeholder="от 50 000 ₽"
            />
          </label>
        </div>

        {/* Use cases */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Примеры использования</span>
            <button type="button" onClick={addUseCase} className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-500">
              + Добавить
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1 mb-2">По одному варианту на строку</p>
          <div className="space-y-2">
            {useCases.map((uc, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  className="flex-1 border border-slate-200 px-3 py-2 text-slate-900"
                  value={uc}
                  onChange={(e) => updateUseCase(i, e.target.value)}
                  placeholder="Например: Инвентаризация складов"
                />
                <button type="button" onClick={() => removeUseCase(i)} className="text-xs font-bold text-red-600 hover:underline">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Process steps */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Этапы работы</span>
            <button type="button" onClick={addProcessStep} className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-500">
              + Добавить этап
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1 mb-2">Каждый этап: номер, заголовок, описание</p>
          <div className="space-y-3">
            {processSteps.map((step, i) => (
              <div key={i} className="border border-slate-200 bg-slate-50 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Этап {i + 1}</span>
                  <button type="button" onClick={() => removeProcessStep(i)} className="text-xs font-bold text-red-600 hover:underline">Удалить</button>
                </div>
                <div className="grid sm:grid-cols-3 gap-2">
                  <input
                    className="border border-slate-200 px-2 py-1 text-sm text-slate-900"
                    value={step.step}
                    onChange={(e) => updateProcessStep(i, "step", e.target.value)}
                    placeholder="Номер (01)"
                  />
                  <input
                    className="border border-slate-200 px-2 py-1 text-sm text-slate-900"
                    value={step.title}
                    onChange={(e) => updateProcessStep(i, "title", e.target.value)}
                    placeholder="Название этапа"
                  />
                </div>
                <textarea
                  className="w-full border border-slate-200 px-2 py-1 text-sm min-h-[50px] text-slate-900"
                  value={step.desc}
                  onChange={(e) => updateProcessStep(i, "desc", e.target.value)}
                  placeholder="Описание этапа"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Результаты (цифры и факты)</span>
            <button type="button" onClick={addResult} className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-500">
              + Добавить
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1 mb-2">Например: «100+» — «выполненных проектов»</p>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  className="flex-1 border border-slate-200 px-3 py-2 text-slate-900"
                  value={r.v}
                  onChange={(e) => updateResult(i, "v", e.target.value)}
                  placeholder="Значение (например: 100+)"
                />
                <input
                  className="flex-1 border border-slate-200 px-3 py-2 text-slate-900"
                  value={r.l}
                  onChange={(e) => updateResult(i, "l", e.target.value)}
                  placeholder="Описание (например: выполненных проектов)"
                />
                <button type="button" onClick={() => removeResult(i)} className="text-xs font-bold text-red-600 hover:underline">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Отрасли применения (через запятую)</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
            value={industriesText}
            onChange={(e) => setIndustriesText(e.target.value)}
            placeholder="нефтегаз, сельское хозяйство, строительство"
          />
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
            Удалить услугу
          </button>
        </div>
      </form>
    </div>
  );
}