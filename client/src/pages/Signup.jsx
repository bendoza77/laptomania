import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const Signup = () => {
  const { signup } = useAuth();
  const { t } = useLanguage();
  const copy = t("signup");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formObj = {
      fullname: e.target.userName.value,
      email: e.target.userEmail.value,
      password: e.target.userPassword.value,
      phoneNumber: e.target.userNumber.value,
    };
    signup(formObj);
    e.target.reset();
  };

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center animate-fade-up">
      <div className="w-full max-w-2xl rounded-[3rem] border border-white/10 bg-white/5/40 p-12 text-white shadow-[0_25px_90px_rgba(15,23,42,0.7)] animate-blur-in">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-indigo-300">{copy.tag}</p>
          <h2 className="text-4xl font-bold">{copy.title}</h2>
          <p className="text-sm text-slate-400">{copy.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            { name: "userName", label: copy.fields.name.label, type: "text", placeholder: copy.fields.name.placeholder },
            { name: "userEmail", label: copy.fields.email.label, type: "email", placeholder: copy.fields.email.placeholder },
            { name: "userPassword", label: copy.fields.password.label, type: "password", placeholder: copy.fields.password.placeholder },
            { name: "userNumber", label: copy.fields.phone.label, type: "text", placeholder: copy.fields.phone.placeholder },
          ].map((field, index) => (
            <label key={field.name} className="block text-sm text-slate-300 animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
              <span className="mb-2 inline-block text-xs uppercase tracking-[0.4em] text-slate-500">{field.label}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              />
            </label>
          ))}
          <div className="md:col-span-2 animate-slide-in" style={{ animationDelay: "220ms" }}>
            <button className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:brightness-110">
              {copy.submit}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
