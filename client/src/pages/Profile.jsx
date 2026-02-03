import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLaptop } from "../context/LaptopContext";
import Catalog from "../components/utils/Catalog";
import { useLanguage } from "../context/LanguageContext";

const Profile = () => {
  const [open, useOpen] = useState(false);
  const { user } = useAuth();
  const { createLaptop } = useLaptop();
  const { t } = useLanguage();
  const copy = t("profile");

  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand", e.target.brand.value);
    formData.append("model", e.target.model.value);
    formData.append("processor", e.target.processor.value);
    formData.append("ram", e.target.ram.value);
    formData.append("storage", e.target.storage.value);
    formData.append("graphicsCard", e.target.graphicsCard.value);
    formData.append("screenSize", e.target.screenSize.value);
    formData.append("price", e.target.price.value);
    for (let i = 0; i < e.target.images.files.length; i++) {
      formData.append("images", e.target.images.files[i]);
    }
    createLaptop(formData);
    useOpen(false);
  };

  return (
    <section className="space-y-10 animate-fade-up">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1fr]">
        <div className="space-y-6 rounded-[2.5rem] border border-white/10 bg-white/5/40 p-8 text-white animate-blur-in">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.6em] text-indigo-300">{copy.tag}</p>
            <h1 className="text-3xl font-bold">{copy.title}</h1>
          </div>
          <div className="space-y-4 text-sm text-slate-300">
            {Object.entries(copy.labels).map(([key, label], index) => (
              <div
                key={key}
                className="rounded-2xl border border-white/10 bg-white/5/10 p-4 animate-fade-up"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{label}</p>
                <p className="text-lg font-semibold text-white">{user?.[key]}</p>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5/10 p-4 animate-fade-up" style={{ animationDelay: "280ms" }}>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{copy.verification}</p>
                <span className={`text-sm font-semibold ${user?.isVerified ? "text-lime-300" : "text-rose-300"}`}>
                  {user?.isVerified ? copy.verified : copy.notVerified}
                </span>
              </div>
              {user?.role === "admin" && (
                <button
                  onClick={() => useOpen(true)}
                  className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em]"
                >
                  {copy.createLaptop}
                </button>
              )}
            </div>
          </div>
        </div>

        {["admin", "moderator"].includes(user?.role) ? (
          <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-6 animate-fade-up" style={{ animationDelay: "160ms" }}>
            <Catalog />
          </div>
        ) : (
          <div className="rounded-[2.5rem] border border-dashed border-white/10 bg-white/5 p-8 text-center text-slate-400 animate-fade-up" style={{ animationDelay: "160ms" }}>
            <p className="text-sm uppercase tracking-[0.4em]">{copy.noAdmin}</p>
            <p className="mt-3 text-xl text-white">{copy.upgradeMessage}</p>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-blur-in">
          <form onSubmit={handleCreate} encType="multipart/form-data" className="w-full max-w-2xl space-y-5 rounded-[2.5rem] border border-white/10 bg-slate-900/95 p-8 text-white animate-fade-up">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-slate-500">{copy.modal.tag}</p>
              <h3 className="text-2xl font-semibold">{copy.modal.title}</h3>
            </div>
            {Object.entries(copy.modal.fields).map(([name, label], index) => (
              <label key={name} className="block text-sm text-slate-300 animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                <span className="mb-2 inline-block text-xs uppercase tracking-[0.4em] text-slate-500">{label}</span>
                <input
                  type={name === "price" ? "number" : "text"}
                  name={name}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
                />
              </label>
            ))}
            <label className="block text-sm text-slate-300 animate-fade-up" style={{ animationDelay: "420ms" }}>
              <span className="mb-2 inline-block text-xs uppercase tracking-[0.4em] text-slate-500">{copy.modal.images}</span>
              <input
                className="w-full rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm"
                type="file"
                name="images"
                multiple
                required
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <button className="rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white">
                {copy.modal.create}
              </button>
              <button
                onClick={() => useOpen(false)}
                className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white"
              >
                {copy.modal.cancel}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Profile;
