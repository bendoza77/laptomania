import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const { t } = useLanguage();
  const homeCopy = t("home");

  return (
    <section className="space-y-20">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] animate-fade-up">
        <div className="space-y-10">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-indigo-300 animate-fade-up">
            {homeCopy.hero.tag}
          </p>
          <div className="space-y-6">
            <h1
              className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              {homeCopy.hero.title}
            </h1>
            <p className="text-lg text-slate-300 animate-fade-up" style={{ animationDelay: "120ms" }}>
              {homeCopy.hero.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 animate-slide-in">
            <button className="rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:brightness-110">
              {homeCopy.hero.buttons.primary}
            </button>
            <button className="rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-white/5">
              {homeCopy.hero.buttons.secondary}
            </button>
          </div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.45em] text-slate-400">
            {homeCopy.hero.badges.map((badge, index) => (
              <span
                key={badge}
                className="rounded-full border border-white/10 px-3 py-1 text-white/80 animate-fade-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="relative animate-scale-in">
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-indigo-400/50 via-transparent to-transparent blur-[90px]" />
          <div className="relative rounded-[3rem] border border-white/5 bg-slate-900/60 p-4 shadow-[0_35px_120px_rgba(15,23,42,0.85)] animate-blur-in">
            <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-slate-800 via-slate-900 to-black p-10">
              <div className="space-y-8">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.5em] text-slate-400">
                  <p>Prototype 08</p>
                  <p>Studio tuned</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Nebula X1</h3>
                  <p className="text-sm text-slate-400">3.2K OLED · 14" chassis · 4070 Ada · 64GB LPDDR5X</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-xs uppercase tracking-[0.5em] text-slate-400">
                  {homeCopy.highlightStats.map((stat, index) => (
                    <div
                      key={`${stat.label}-${stat.value}`}
                      className="space-y-2 rounded-2xl border border-white/5 bg-white/5/10 px-4 py-3 animate-fade-up"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p>{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5/20 px-6 py-4 animate-fade-up" style={{ animationDelay: "220ms" }}>
                  <p className="text-xs uppercase tracking-[0.45em] text-indigo-200">Finely tuned thermals</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Every batch is stress tested for 12 hours under Blender + Unreal workloads before shipping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 animate-fade-up">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.6em] text-indigo-300">{homeCopy.featureSection.tag}</p>
            <h2 className="text-3xl font-bold text-white">{homeCopy.featureSection.title}</h2>
          </div>
          <button className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.5em] text-white/80 transition hover:bg-white/10">
            {homeCopy.featureSection.cta}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {homeCopy.featureCards.map((card, index) => (
            <article
              key={card.title}
              className="group flex h-full flex-col rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 text-white shadow-[0_25px_80px_rgba(15,23,42,0.65)] transition hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.5em] text-slate-400">
                <span>{card.badge}</span>
                <span>{homeCopy.cardStatus}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{card.title}</h3>
              <p className="mt-4 flex-1 text-slate-300">{card.description}</p>
              <button className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-indigo-300">
                {homeCopy.cardCta}
                <span className="text-lg">→</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-10 rounded-[3rem] border border-white/10 bg-slate-900/50 p-10 lg:grid-cols-2 animate-fade-up">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-indigo-300">{homeCopy.studio.tag}</p>
          <h2 className="text-3xl font-bold text-white">{homeCopy.studio.title}</h2>
          <p className="text-slate-300">{homeCopy.studio.text}</p>
          <div className="flex gap-4 text-sm text-slate-300">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.5em] text-slate-500">{homeCopy.studio.experimentLabel}</p>
              <p className="text-lg font-semibold text-white">{homeCopy.studio.experimentValue}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.5em] text-slate-500">{homeCopy.studio.surfaceLabel}</p>
              <p className="text-lg font-semibold text-white">{homeCopy.studio.surfaceValue}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {homeCopy.studio.qaItems.map((item, idx) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5/10 px-6 py-4 text-sm uppercase tracking-[0.5em] text-slate-400 animate-fade-up"
              style={{ animationDelay: `${idx * 90}ms` }}
            >
              <div>{item.name}</div>
              <div className="flex items-center gap-2 text-white">
                <span className="text-2xl font-bold">{item.score}</span>
                <span className="text-xs text-slate-500">QA SCORE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
