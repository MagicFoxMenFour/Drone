import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getDashboardMeta } from "../../lib/adminApi";

export function AdminDashboard() {
  const [newLeads, setNewLeads] = useState(0);

  useEffect(() => {
    void getDashboardMeta()
      .then((x) => setNewLeads(x.newLeads))
      .catch(() => setNewLeads(0));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-950 tracking-tight mb-2">Панель</h1>
      <p className="text-slate-500 font-medium mb-10">Управление контентом сайта и заявками.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/leads"
          className="border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-sm transition-all"
        >
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Заявки</p>
          <p className="text-4xl font-bold text-slate-950">{newLeads}</p>
          <p className="text-sm text-slate-500 font-medium mt-1">новых</p>
        </Link>
        <Link
          to="/admin/services"
          className="border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-sm transition-all"
        >
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Услуги</p>
          <p className="text-lg font-bold text-slate-950">Редактировать</p>
        </Link>
        <Link
          to="/admin/blog"
          className="border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-sm transition-all"
        >
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Блог</p>
          <p className="text-lg font-bold text-slate-950">Статьи</p>
        </Link>
      </div>
    </div>
  );
}
