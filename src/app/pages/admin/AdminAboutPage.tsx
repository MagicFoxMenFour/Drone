import { FormEvent, useEffect, useState } from "react";
import { createAdminRow, listAdminRows, patchAdminRow } from "../../lib/adminApi";
import type { AboutPageRow } from "../../lib/api/types";
import { defaultAboutPageInsert } from "../../data/aboutDefaults";

export function AdminAboutPage() {
  const [row, setRow] = useState<AboutPageRow | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [principlesJson, setPrinciplesJson] = useState("[]");
  const [partnersJson, setPartnersJson] = useState("[]");
  const [licensesJson, setLicensesJson] = useState("[]");

  async function load() {
    setErr(null);
    try {
      const rows = await listAdminRows("about_page");
      const r = rows[0] ?? null;
      if (r) {
      setRow(r);
      setPrinciplesJson(JSON.stringify(r.principles ?? [], null, 2));
      setPartnersJson(JSON.stringify(r.partners ?? [], null, 2));
      setLicensesJson(JSON.stringify(r.licenses ?? [], null, 2));
      } else {
        setRow(null);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function createDefault() {
    setErr(null);
    try {
      const r = await createAdminRow("about_page", defaultAboutPageInsert);
      setRow(r);
      setPrinciplesJson(JSON.stringify(r.principles ?? [], null, 2));
      setPartnersJson(JSON.stringify(r.partners ?? [], null, 2));
      setLicensesJson(JSON.stringify(r.licenses ?? [], null, 2));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка создания");
    }
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const principles = JSON.parse(principlesJson);
      const partners = JSON.parse(partnersJson);
      const licenses = JSON.parse(licensesJson);
      if (!row?.id) {
        setErr("Сначала создайте запись «О нас».");
        return;
      }
      await patchAdminRow("about_page", row.id, {
          hero_title: row.hero_title,
          hero_text: row.hero_text,
          mission_title: row.mission_title,
          mission_text: row.mission_text,
          principles,
          partners,
          licenses,
        });
      void load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка JSON");
    }
  }

  if (!row) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-slate-950 tracking-tight mb-4">О нас</h1>
        <p className="text-slate-500 font-medium mb-6">Запись страницы «О нас» ещё не создана в базе.</p>
        {err && <div className="mb-6 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">{err}</div>}
        <button
          type="button"
          onClick={createDefault}
          className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500"
        >
          Создать из шаблона
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-950 tracking-tight mb-6">О нас</h1>
      {err && <div className="mb-6 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">{err}</div>}

      <form onSubmit={onSave} className="space-y-6 max-w-3xl">
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hero — заголовок (первая колонка)</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2"
            value={row.hero_title}
            onChange={(e) => setRow({ ...row, hero_title: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hero — текст (два абзаца через пустую строку)</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[120px]"
            value={row.hero_text}
            onChange={(e) => setRow({ ...row, hero_text: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Миссия — заголовок</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2"
            value={row.mission_title}
            onChange={(e) => setRow({ ...row, mission_title: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Миссия — текст</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[120px]"
            value={row.mission_text}
            onChange={(e) => setRow({ ...row, mission_text: e.target.value })}
          />
        </label>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">principles JSON [{`{t,d}`}…]</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs min-h-[200px]"
            value={principlesJson}
            onChange={(e) => setPrinciplesJson(e.target.value)}
          />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">partners JSON [{`{name,desc}`}…]</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs min-h-[140px]"
            value={partnersJson}
            onChange={(e) => setPartnersJson(e.target.value)}
          />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">licenses JSON (массив строк)</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs min-h-[160px]"
            value={licensesJson}
            onChange={(e) => setLicensesJson(e.target.value)}
          />
        </div>
        <button type="submit" className="px-8 py-3 bg-slate-950 text-white rounded-full font-bold hover:bg-blue-600">
          Сохранить
        </button>
      </form>
    </div>
  );
}
