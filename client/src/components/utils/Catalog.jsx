import { useEffect } from "react";
import { useLaptop } from "../../context/LaptopContext";
import Laptop from "../Laptop";
import { useLanguage } from "../../context/LanguageContext";

const Catalog = () => {
  const { getLaptops, laptops } = useLaptop();
  const { t } = useLanguage();
  const copy = t("catalog");

  useEffect(() => {
    getLaptops();
  }, []);

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.6em] text-indigo-300">{copy.tag}</p>
        <h2 className="text-3xl font-bold text-white">{copy.title}</h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {laptops.map((el, index) => (
          <div key={el._id} className="animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
            <Laptop el={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
