import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteAdminRow, getAdminRow, patchAdminRow } from "../../lib/adminApi";
import type { BlogPostRow } from "../../lib/api/types";

const COLORS = [
  { label: "Синий", value: "bg-blue-600" },
  { label: "Зелёный", value: "bg-green-600" },
  { label: "Красный", value: "bg-red-600" },
  { label: "Фиолетовый", value: "bg-purple-600" },
  { label: "Оранжевый", value: "bg-orange-600" },
  { label: "Розовый", value: "bg-pink-600" },
  { label: "Бирюзовый", value: "bg-teal-600" },
  { label: "Индиго", value: "bg-indigo-600" },
  { label: "Серый", value: "bg-slate-600" },
  { label: "Жёлтый", value: "bg-yellow-600" },
];

const BLOCK_TYPES = [
  { value: "p", label: "Абзац" },
  { value: "h2", label: "Заголовок H2" },
  { value: "h3", label: "Заголовок H3" },
  { value: "img", label: "Изображение" },
  { value: "ul", label: "Список (маркированный)" },
  { value: "ol", label: "Список (нумерованный)" },
] as const;

type ContentBlock = { type: string; text?: string; src?: string; alt?: string; items?: string[] };

function parseContent(v: unknown): ContentBlock[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => {
    if (!x || typeof x !== "object") return { type: "p", text: "" };
    const b = x as ContentBlock;
    return { type: b.type || "p", text: b.text || "", src: b.src || "", alt: b.alt || "", items: Array.isArray(b.items) ? b.items : [] };
  });
}

export function AdminBlogEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [row, setRow] = useState<BlogPostRow | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [tagsText, setTagsText] = useState("");

  useEffect(() => {
    if (!id) return;
    void getAdminRow("blog_posts", id)
      .then((r) => {
        setRow(r);
        setBlocks(parseContent(r.content));
        setTagsText((r.tags ?? []).join(", "));
      })
      .catch((e) => {
        setErr(e instanceof Error ? e.message : "Ошибка загрузки");
      });
  }, [id]);

  function addBlock() {
    setBlocks([...blocks, { type: "p", text: "" }]);
  }

  function removeBlock(i: number) {
    setBlocks(blocks.filter((_, idx) => idx !== i));
  }

  function updateBlock(i: number, patch: Partial<ContentBlock>) {
    setBlocks(blocks.map((b, idx) => (idx === i ? { ...b, ...patch } : b)));
  }

  function updateBlockItems(i: number, items: string[]) {
    updateBlock(i, { items });
  }

  function addItemToBlock(i: number) {
    const b = blocks[i];
    updateBlockItems(i, [...(b.items || []), ""]);
  }

  function removeItemFromBlock(blockIdx: number, itemIdx: number) {
    const b = blocks[blockIdx];
    updateBlockItems(blockIdx, (b.items || []).filter((_, idx) => idx !== itemIdx));
  }

  function updateItem(blockIdx: number, itemIdx: number, val: string) {
    const b = blocks[blockIdx];
    const items = [...(b.items || [])];
    items[itemIdx] = val;
    updateBlockItems(blockIdx, items);
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!id || !row) return;
    setErr(null);
    try {
      const tags = tagsText.split(",").map((s) => s.trim()).filter(Boolean);
      await patchAdminRow("blog_posts", id, {
        slug: row.slug,
        category: row.category,
        date: row.date,
        read_time: row.read_time,
        title: row.title,
        excerpt: row.excerpt,
        tags,
        accent: row.accent,
        content: blocks as unknown as Record<string, unknown>[],
        published: row.published,
      });
      navigate("/admin/blog");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка сохранения");
    }
  }

  async function onDelete() {
    if (!id || !confirm("Удалить статью?")) return;
    setErr(null);
    try {
      await deleteAdminRow("blog_posts", id);
      navigate("/admin/blog");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка удаления");
    }
  }

  if (!row) return <p className="text-slate-500 font-medium">{err ?? "Загрузка…"}</p>;

  return (
    <div>
      <Link to="/admin/blog" className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6 inline-block">
        ← Блог
      </Link>
      <h1 className="text-3xl font-bold text-slate-950 tracking-tight mt-4 mb-6">Редактировать статью</h1>
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
            <p className="text-xs text-slate-400 mt-1">Уникальная часть URL, например "novyy-proekt"</p>
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Раздел / Категория</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.category}
              onChange={(e) => setRow({ ...row, category: e.target.value })}
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Заголовок статьи</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-lg font-bold text-slate-900"
            value={row.title}
            onChange={(e) => setRow({ ...row, title: e.target.value })}
          />
        </label>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Дата</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.date}
              onChange={(e) => setRow({ ...row, date: e.target.value })}
              placeholder="21 марта 2026"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Время чтения</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
              value={row.read_time}
              onChange={(e) => setRow({ ...row, read_time: e.target.value })}
              placeholder="5 мин"
            />
          </label>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Цвет акцента</span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  title={c.label}
                  onClick={() => setRow({ ...row, accent: c.value })}
                  className={`w-7 h-7 rounded-full ${c.value} ${
                    row.accent === c.value ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <label className="block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Краткое описание (лид)</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[80px] text-slate-900"
            value={row.excerpt}
            onChange={(e) => setRow({ ...row, excerpt: e.target.value })}
            placeholder="Короткий текст, который будет виден в списке статей"
          />
        </label>
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Теги (через запятую)</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-slate-900"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="дроны, аэросъёмка, технологии"
          />
        </div>

        {/* Content blocks editor */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Содержание статьи</span>
            <button type="button" onClick={addBlock} className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-500">
              + Добавить блок
            </button>
          </div>
          <div className="mt-3 space-y-4">
            {blocks.map((block, i) => (
              <div key={i} className="border border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <select
                    className="border border-slate-200 px-2 py-1 text-sm text-slate-900 bg-white"
                    value={block.type}
                    onChange={(e) => updateBlock(i, { type: e.target.value, text: block.text, src: block.src || "", alt: block.alt || "", items: block.items || [] })}
                  >
                    {BLOCK_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <button type="button" onClick={() => removeBlock(i)} className="text-xs font-bold text-red-600 hover:underline">Удалить</button>
                </div>
                {(block.type === "p" || block.type === "h2" || block.type === "h3") && (
                  <textarea
                    className="w-full border border-slate-200 px-3 py-2 min-h-[60px] text-slate-900"
                    value={block.text || ""}
                    onChange={(e) => updateBlock(i, { text: e.target.value })}
                    placeholder={block.type === "p" ? "Текст абзаца…" : "Текст заголовка…"}
                  />
                )}
                {block.type === "img" && (
                  <div className="grid sm:grid-cols-2 gap-2">
                    <input
                      className="border border-slate-200 px-3 py-2 text-slate-900"
                      value={block.src || ""}
                      onChange={(e) => updateBlock(i, { src: e.target.value })}
                      placeholder="URL изображения"
                    />
                    <input
                      className="border border-slate-200 px-3 py-2 text-slate-900"
                      value={block.alt || ""}
                      onChange={(e) => updateBlock(i, { alt: e.target.value })}
                      placeholder="Описание изображения"
                    />
                  </div>
                )}
                {(block.type === "ul" || block.type === "ol") && (
                  <div className="space-y-1">
                    {(block.items || []).map((item, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">{block.type === "ul" ? "•" : `${j + 1}.`}</span>
                        <input
                          className="flex-1 border border-slate-200 px-2 py-1 text-sm text-slate-900"
                          value={item}
                          onChange={(e) => updateItem(i, j, e.target.value)}
                          placeholder="Элемент списка"
                        />
                        <button type="button" onClick={() => removeItemFromBlock(i, j)} className="text-xs text-red-600 hover:underline">×</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addItemToBlock(i)} className="text-xs text-blue-600 hover:underline">
                      + Добавить пункт
                    </button>
                  </div>
                )}
              </div>
            ))}
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
            Удалить статью
          </button>
        </div>
      </form>
    </div>
  );
}