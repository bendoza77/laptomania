import { useEffect } from "react";
import { useLaptop } from "../context/LaptopContext";
import Laptop from "../components/Laptop";
import { useLanguage } from "../context/LanguageContext";

const Products = () => {
  const { getLaptops, laptops } = useLaptop();
  const { t } = useLanguage();
  const copy = t("products");

  useEffect(() => {
    getLaptops();
  }, []);

  return (
    <section className="space-y-12 animate-fade-up">
      <div className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.6em] text-indigo-300">{copy.tag}</p>
        <h1 className="text-4xl font-bold text-white">{copy.title}</h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-400">{copy.description}</p>
      </div>

      {laptops.length === 0 ? (
        <div className="flex h-96 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 text-center animate-blur-in">
          <div>
            <p className="text-2xl font-semibold text-white">{copy.emptyTitle}</p>
            <p className="text-sm text-slate-500">{copy.emptySubtitle}</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {laptops.map((el, index) => (
            <div key={el._id} className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-1 animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
              <Laptop el={el} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
