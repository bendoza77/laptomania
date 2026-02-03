import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLaptop } from "../context/LaptopContext";
import { useCart } from "../context/Cart.content";
import { useLanguage } from "../context/LanguageContext";

const Laptop = ({ el: pro }) => {
  const { user } = useAuth();
  const { laptopDelete, pacthLaptop } = useLaptop();
  const { addCart } = useCart();
  const { t } = useLanguage();
  const copy = t("laptop");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      brand: e.target.brand.value,
      model: e.target.model.value,
      processor: e.target.processor.value,
      ram: e.target.ram.value,
      storage: e.target.storage.value,
      graphicCard: e.target.graphicCard.value,
      screenSize: e.target.screenSize.value,
      price: e.target.price.value,
    };
    pacthLaptop(pro._id, formData);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 rounded-[2.3rem] border border-white/10 bg-slate-900/50 p-6 text-white animate-fade-up">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          {pro.images?.slice(0, 2).map((image, index) => (
            <img
              key={index}
              className="h-32 w-full rounded-2xl object-cover animate-scale-in"
              style={{ animationDelay: `${index * 80}ms` }}
              src={image.url}
              alt={`${pro.brand} ${pro.model}`}
            />
          ))}
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5/10 p-4 animate-slide-in">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-400">{copy.signature}</p>
          <h2 className="mt-2 text-2xl font-semibold">
            {pro.brand} {pro.model}
          </h2>
          <p className="text-sm text-slate-400">{pro.processor}</p>
          <p className="mt-4 text-3xl font-bold text-lime-300">${pro.price}</p>
        </div>
      </div>

      <div className="grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
        <p className="animate-fade-up" style={{ animationDelay: "40ms" }}>
          <span className="text-slate-500">{copy.specs.ram}:</span> {pro.ram}GB
        </p>
        <p className="animate-fade-up" style={{ animationDelay: "80ms" }}>
          <span className="text-slate-500">{copy.specs.storage}:</span> {pro.storage}GB SSD
        </p>
        <p className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          <span className="text-slate-500">{copy.specs.gpu}:</span> {pro.graphicCard}
        </p>
        <p className="animate-fade-up" style={{ animationDelay: "160ms" }}>
          <span className="text-slate-500">{copy.specs.display}:</span> {pro.screenSize}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 animate-slide-in">
        {["admin", "moderator"].includes(user?.role) && (
          <>
            <button
              onClick={() => laptopDelete(pro._id)}
              className="rounded-2xl border border-rose-500/60 px-5 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-rose-300 transition hover:bg-rose-500/10"
            >
              {copy.delete}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-2xl border border-amber-400/60 px-5 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-amber-200 transition hover:bg-amber-400/10"
            >
              {copy.update}
            </button>
          </>
        )}
        <button
          onClick={() => addCart(pro)}
          className="rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:brightness-110"
        >
          {copy.addToCart}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4 rounded-3xl border border-white/10 bg-slate-900/90 p-8 animate-blur-in">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-slate-500">{copy.modalTitle}</p>
              <h3 className="text-2xl font-semibold text-white">
                {pro.brand} {pro.model}
              </h3>
            </div>
            {[
              { name: "brand", label: copy.fields.brand },
              { name: "model", label: copy.fields.model },
              { name: "processor", label: copy.fields.processor },
              { name: "ram", label: copy.fields.ram },
              { name: "storage", label: copy.fields.storage },
              { name: "graphicCard", label: copy.fields.graphicCard },
              { name: "screenSize", label: copy.fields.screenSize },
              { name: "price", label: copy.fields.price, type: "number" },
            ].map((field, index) => (
              <label key={field.name} className="block text-sm text-slate-400 animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
                <span className="mb-1 inline-block uppercase tracking-[0.4em]">{field.label}</span>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  defaultValue={pro[field.name]}
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </label>
            ))}
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="submit" className="rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white">
                {copy.save}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white"
              >
                {copy.cancel}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Laptop;
