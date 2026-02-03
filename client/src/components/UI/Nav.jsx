import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/Cart.content";
import { useLanguage } from "../../context/LanguageContext";

const Nav = () => {
  const { user, logout } = useAuth();
  const { cart, deleteCart, handleMinus, handlePlus, handleClearCart, side, setSide } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navCopy = t("nav");
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {side && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-md transition opacity-100"
          onClick={() => setSide(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform border-l border-white/10 bg-slate-900/95 text-white shadow-2xl transition-transform duration-500 ease-out ${
          side ? "translate-x-0" : "translate-x-full"
        } animate-slide-in`}
        style={{ animationDelay: "120ms" }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="animate-fade-up">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{navCopy.bagLabel}</p>
            <h2 className="text-2xl font-semibold">{navCopy.bagTitle}</h2>
          </div>
          <button
            onClick={() => setSide(false)}
            className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold tracking-wide text-white transition hover:bg-white/20"
          >
            {navCopy.close}
          </button>
        </div>

        <div className="flex h-full flex-col justify-between">
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
            {cart.length === 0 && (
              <div className="flex h-60 flex-col items-center justify-center gap-3 text-center text-slate-400 animate-fade-up">
                <span className="text-4xl">🛒</span>
                <p>{navCopy.emptyCart}</p>
              </div>
            )}

            {cart.map((item, index) => (
              <div
                key={item._id}
                className="flex gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 animate-blur-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <img
                  src={item.images[0].url}
                  alt={item.model}
                  className="h-20 w-28 rounded-xl object-cover"
                />
                <div className="flex flex-1 flex-col gap-2">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-indigo-300">{item.brand}</p>
                    <p className="text-lg font-semibold">{item.model}</p>
                  </div>
                  <p className="text-sm text-slate-400">
                    {item.processor} · {item.ram}GB RAM · {item.storage}GB SSD
                  </p>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                      <button
                        onClick={() => handleMinus(item)}
                        disabled={item.quantity <= 1}
                        className="text-lg disabled:opacity-30"
                      >
                        −
                      </button>
                      <span className="text-base font-semibold">{item.quantity}</span>
                      <button onClick={() => handlePlus(item)} className="text-lg">
                        +
                      </button>
                    </div>
                    <p className="text-lg font-bold text-lime-300">${item.price * item.quantity}</p>
                  </div>
                  <button
                    onClick={() => deleteCart(item._id)}
                    className="text-left text-sm text-rose-400 transition hover:text-rose-300"
                  >
                    {navCopy.remove}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-white/5 bg-slate-900/80 px-6 py-5 animate-slide-in" style={{ animationDelay: "220ms" }}>
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{navCopy.total}</p>
                <p className="text-2xl font-semibold">${totalPrice}</p>
              </div>
              <button
                onClick={handleClearCart}
                className="mt-4 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 py-3 font-semibold tracking-wide text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-105"
              >
                {navCopy.clearCart}
              </button>
            </div>
          )}
        </div>
      </div>

      <header className="relative z-20 px-4 pt-6 lg:px-12 animate-fade-up">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5/60 px-6 py-4 backdrop-blur-xl">
          <Link to="/" className="text-2xl font-black tracking-tight text-white animate-slide-in">
            {navCopy.brand}
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium uppercase tracking-[0.3em] text-slate-300">
            {[
              { path: "/", label: navCopy.navLinks.home },
              { path: "/products", label: navCopy.navLinks.products },
            ].map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition duration-300 ${
                    isActive ? "bg-white/15 text-white" : "hover:text-white/90"
                  } animate-fade-up`
                }
                style={{ animationDelay: `${(index + 1) * 80}ms` }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-white/20 text-xs uppercase">
              {["en", "ka"].map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-3 py-1 font-semibold tracking-[0.35em] transition ${
                    language === lng ? "bg-white text-slate-900" : "text-white hover:bg-white/10"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>

            {user ? (
              <div className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: "180ms" }}>
                <button
                  onClick={() => setSide(true)}
                  className="relative rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-white/20"
                >
                  {navCopy.cart}
                  {cart.length > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black animate-scale-in">
                      {cart.length}
                    </span>
                  )}
                </button>
                <NavLink to="/profile" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/20">
                  {user.fullname?.split(" ")[0] || navCopy.profile}
                </NavLink>
                <button
                  onClick={logout}
                  className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
                >
                  {navCopy.logout}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "180ms" }}>
                <NavLink to="/login" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] transition ${isActive ? "bg-white text-slate-900" : "text-white hover:bg-white/10"}`}>
                  {navCopy.login}
                </NavLink>
                <NavLink to="/signup" className={({ isActive }) => `rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white transition ${isActive ? "bg-indigo-500" : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:brightness-110"}`}>
                  {navCopy.signup}
                </NavLink>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-500 animate-slide-in" style={{ animationDelay: "260ms" }}>
          <span>{navCopy.currentlyViewing}</span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-white">
            {location.pathname === "/" ? navCopy.collection : location.pathname.replace("/", "")}
          </span>
        </div>
      </header>
    </>
  );
};

export default Nav;
