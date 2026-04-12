import { useEffect, useRef } from "react";

export function About() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | null = null;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;
      if ((mapRef.current as HTMLDivElement & { _leaflet_id?: number })._leaflet_id) return;

      map = L.map(mapRef.current, {
        center: [43.5, 43.8],
        zoom: 6,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);
    });

    return () => {
      map?.remove();
    };
  }, []);

  return (
    <section id="about" className="py-40 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-7xl lg:text-8xl font-medium tracking-tighter text-slate-950 leading-[0.9] mb-12">Видим <br />больше</h2>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">
              Мы работаем на Северном Кавказе с 2021 года — от Ставрополья до Дагестана. Дроны там, где человек не может или не должен быть.
            </p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-12 border-l border-slate-100 pl-8 lg:pl-20">
            {[ {l:"Опыт", v:"5+ лет"}, {l:"Проектов", v:"200+"}, {l:"Точность", v:"1 см"}, {l:"Флот", v:"15 ед."} ].map((s, i) => (
              <div key={i}>
                <div className="text-5xl font-bold text-blue-600 tracking-tighter">{s.v}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* North Caucasus map */}
        <div className="mt-32 rounded-sm overflow-hidden h-[500px] relative bg-slate-950">
          {/* Leaflet map container */}
          <div
            ref={mapRef}
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'invert(1) hue-rotate(200deg) saturate(0.6) brightness(0.5)' }}
          />
          {/* Dark vignette edges */}
          <div className="absolute inset-0 pointer-events-none" style={{
            boxShadow: 'inset 0 0 80px 40px rgba(2,6,23,0.9)'
          }} />
          {/* Blue gradient overlay from left */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 via-transparent to-transparent pointer-events-none" />
          {/* Stats overlay text */}
          <div className="absolute bottom-10 left-10 font-mono text-xs text-blue-300/70 space-y-1 pointer-events-none">
            <div>РЕГИОН: СКФО / ЮФО</div>
            <div>ТОЧНОСТЬ: 1 СМ/ПКС</div>
            <div>ПОКРЫТИЕ: 99.7%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
