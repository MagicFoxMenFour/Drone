import { FormEvent, useEffect, useState } from "react";
import { createAdminRow, listAdminRows, patchAdminRow } from "../../lib/adminApi";
import type { AboutPageRow } from "../../lib/api/types";
import { defaultAboutPageInsert } from "../../data/aboutDefaults";

export function AdminAboutPage() {
  const [row, setRow] = useState<AboutPageRow | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [principlesText, setPrinciplesText] = useState("");
  const [partnersText, setPartnersText] = useState("");
  const [licensesText, setLicensesText] = useState("");

  async function load() {
    setErr(null);
    try {
      const rows = await listAdminRows("about_page");
      const r = rows[0] ?? null;
      if (r) {
        setRow(r);
        setPrinciplesText(
          (r.principles as Array<{ t: string; d: string }> | null)
            ?.map((p) => `${p.t}: ${p.d}`)
            .join("\n") ?? ""
        );
        setPartnersText(
          (r.partners as Array<{ name: string; desc: string }> | null)
            ?.map((p) => `${p.name}: ${p.desc}`)
            .join("\n") ?? ""
        );
        setLicensesText(
          (r.licenses as string[] | null)?.join("\n") ?? ""
        );
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
      setPrinciplesText("");
      setPartnersText("");
      setLicensesText("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка создания");
    }
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const principles = principlesText
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const idx = line.indexOf(": ");
          return idx > 0
            ? { t: line.slice(0, idx), d: line.slice(idx + 2) }
            : { t: line, d: "" };
        });
      const partners = partnersText
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const idx = line.indexOf(": ");
          return idx > 0
            ? { name: line.slice(0, idx), desc: line.slice(idx + 2) }
            : { name: line, desc: "" };
        });
      const licenses = licensesText
        .split("\n")
        .filter(Boolean);
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
      setErr(e instanceof Error ? e.message : "Ошибка сохранения");
    }
  }

  if (!row) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">О нас</h1>
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
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-6">О нас</h1>
      {err && <div className="mb-6 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">{err}</div>}

      <form onSubmit={onSave} className="space-y-6 max-w-3xl">
        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Заголовок (первая колонка)</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
            value={row.hero_title}
            onChange={(e) => setRow({ ...row, hero_title: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Текст (два абзаца через пустую строку)</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[120px] text-slate-900"
            value={row.hero_text}
            onChange={(e) => setRow({ ...row, hero_text: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Миссия — заголовок</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
            value={row.mission_title}
            onChange={(e) => setRow({ ...row, mission_title: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Миссия — текст</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[120px] text-slate-900"
            value={row.mission_text}
            onChange={(e) => setRow({ ...row, mission_text: e.target.value })}
          />
        </label>
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Принципы</span>
          <p className="text-xs text-slate-400 mt-1 mb-2">Каждая строка: <span className="font-mono">Название: Описание</span></p>
          <textarea
            className="w-full border border-slate-200 px-3 py-2 min-h-[120px] text-slate-900"
            value={principlesText}
            onChange={(e) => setPrinciplesText(e.target.value)}
            placeholder="Профессионализм: Мы используем только лучшее оборудование"
          />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Партнёры</span>
          <p className="text-xs text-slate-400 mt-1 mb-2">Каждая строка: <span className="font-mono">Название: Описание</span></p>
          <textarea
            className="w-full border border-slate-200 px-3 py-2 min-h-[120px] text-slate-900"
            value={partnersText}
            onChange={(e) => setPartnersText(e.target.value)}
            placeholder="DJI: Официальный партнёр по поставкам"
          />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Лицензии</span>
          <p className="text-xs text-slate-400 mt-1 mb-2">Каждая строка — одна лицензия или сертификат</p>
          <textarea
            className="w-full border border-slate-200 px-3 py-2 min-h-[100px] text-slate-900"
            value={licensesText}
            onChange={(e) => setLicensesText(e.target.value)}
            placeholder="Сертификат Росавиации №123&#10;Лицензия на аэросъёмку №456"
          />
        </div>
        <button type="submit" className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600">
          Сохранить
        </button>
      </form>
    </div>
  );
}
