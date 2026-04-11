export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 3L4 7v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V7l-8-4z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tighter uppercase">Drone Solutions</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed">
              Профессиональные БПЛА-сервисы для бизнеса на Северном Кавказе. Ставрополь, СКФО.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Продукт</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#services" className="hover:text-blue-600 transition-colors">Услуги</a></li>
              <li><a href="#cases" className="hover:text-blue-600 transition-colors">Кейсы</a></li>
              <li><a href="#pricing" className="hover:text-blue-600 transition-colors">Цены</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Компания</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#about" className="hover:text-blue-600 transition-colors">О нас</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Поддержка</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-blue-600 transition-colors">Контакты</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Drone Solutions. Все права защищены. Ставрополь, Россия.
          </p>
          <div className="flex gap-8 text-sm font-bold text-slate-400">
            <span>Политика конфиденциальности</span>
            <span>Реквизиты</span>
          </div>
        </div>
      </div>
    </footer>
  );
}