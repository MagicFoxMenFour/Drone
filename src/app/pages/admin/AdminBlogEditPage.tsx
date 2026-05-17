import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteAdminRow, getAdminRow, patchAdminRow } from "../../lib/adminApi";
import type { BlogPostRow } from "../../lib/api/types";

export function AdminBlogEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [row, setRow] = useState<BlogPostRow | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [contentJson, setContentJson] = useState("[]");
  const [tagsText, setTagsText] = useState("");

  useEffect(() => {
    if (!id) return;
    void getAdminRow("blog_posts", id)
      .then((r) => {
        setRow(r);
        setContentJson(JSON.stringify(r.content ?? [], null, 2));
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
      const content = JSON.parse(contentJson);
      const tags = tagsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      await patchAdminRow("blog_posts", id, {
          slug: row.slug,
          category: row.category,
          date: row.date,
          read_time: row.read_time,
          title: row.title,
          excerpt: row.excerpt,
          tags,
          accent: row.accent,
          content,
          published: row.published,
        });
      navigate("/admin/blog");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка JSON content");
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
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Slug</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-sm"
              value={row.slug}
              onChange={(e) => setRow({ ...row, slug: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Категория</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2"
              value={row.category}
              onChange={(e) => setRow({ ...row, category: e.target.value })}
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
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Дата (строка)</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2"
              value={row.date}
              onChange={(e) => setRow({ ...row, date: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Время чтения</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2"
              value={row.read_time}
              onChange={(e) => setRow({ ...row, read_time: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accent (класс)</span>
            <input
              className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs"
              value={row.accent}
              onChange={(e) => setRow({ ...row, accent: e.target.value })}
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Лид / excerpt</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 min-h-[80px]"
            value={row.excerpt}
            onChange={(e) => setRow({ ...row, excerpt: e.target.value })}
          />
        </label>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Теги (через запятую)</span>
          <input
            className="mt-2 w-full border border-slate-200 px-3 py-2"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
          />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">content (JSON массив секций)</span>
          <textarea
            className="mt-2 w-full border border-slate-200 px-3 py-2 font-mono text-xs min-h-[260px]"
            value={contentJson}
            onChange={(e) => setContentJson(e.target.value)}
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
