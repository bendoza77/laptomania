import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const Login = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const copy = t("login");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formObj = {
      email: e.target.userEmail.value,
      password: e.target.userPassword.value,
    };

    login(formObj);
  };

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center animate-fade-up">
      <div className="w-full max-w-lg rounded-[2.6rem] border border-white/10 bg-slate-900/60 p-10 text-white shadow-[0_25px_90px_rgba(15,23,42,0.7)] animate-blur-in">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-indigo-300">{copy.tag}</p>
          <h2 className="text-3xl font-bold">{copy.title}</h2>
          <p className="text-sm text-slate-400">{copy.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <label className="block text-sm text-slate-300 animate-fade-up" style={{ animationDelay: "60ms" }}>
            <span className="mb-2 inline-block text-xs uppercase tracking-[0.4em] text-slate-500">{copy.email}</span>
            <input
              type="email"
              name="userEmail"
              placeholder={copy.emailPlaceholder}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
            />
          </label>

          <label className="block text-sm text-slate-300 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <span className="mb-2 inline-block text-xs uppercase tracking-[0.4em] text-slate-500">{copy.password}</span>
            <input
              type="password"
              name="userPassword"
              placeholder={copy.passwordPlaceholder}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:brightness-110 animate-slide-in"
            style={{ animationDelay: "180ms" }}
          >
            {copy.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
