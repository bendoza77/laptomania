import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLaptop } from "../context/LaptopContext";
import { useCart } from "../context/Cart.content";
import Laptop from "../components/Laptop";

const STORY_DURATION = 4000; // ms per image

const LaptopDetail = () => {
  const { id } = useParams();
  const { laptops, getLaptops } = useLaptop();
  const { addCart } = useCart();

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 for current story
  const [paused, setPaused] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const rafRef = useRef(0);
  const lastTsRef = useRef(0);

  useEffect(() => {
    if (!laptops || laptops.length === 0) getLaptops();
  }, []);

  const laptop = useMemo(() => laptops.find((l) => l._id === id), [laptops, id]);
  const images = laptop?.images ?? [];

  const related = useMemo(() => {
    if (!laptop) return [];
    return laptops
      .filter((l) => l._id !== laptop._id && (l.brand === laptop.brand || l.processor === laptop.processor))
      .slice(0, 6);
  }, [laptop, laptops]);

  // Story progress animation
  useEffect(() => {
    if (!images.length) return;

    const loop = (ts) => {
      if (paused) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      if (!lastTsRef.current) lastTsRef.current = ts;
      const delta = ts - lastTsRef.current;
      lastTsRef.current = ts;
      setProgress((p) => {
        const next = p + delta / STORY_DURATION;
        if (next >= 1) {
          // advance to next image
          setCurrent((c) => {
            const nextIndex = (c + 1) % images.length;
            return nextIndex;
          });
          return 0;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [images.length, paused]);

  useEffect(() => {
    // reset progress on index change
    setProgress(0);
  }, [current]);

  const handlePrev = () => {
    if (!images.length) return;
    setCurrent((c) => (c - 1 + images.length) % images.length);
    setProgress(0);
  };

  const handleNext = () => {
    if (!images.length) return;
    setCurrent((c) => (c + 1) % images.length);
    setProgress(0);
  };

  const onMove = (e) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  if (!laptop) {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/10 p-8 text-center">
          <p className="text-white">Loading laptop details...</p>
          <p className="text-slate-400 text-sm">If this persists, go back to products and select a laptop.</p>
          <Link to="/products" className="inline-block mt-4 rounded-2xl border border-white/20 px-5 py-2">Back to Products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-12 animate-fade-up">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Story-style image zoomer */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          <div
            className="relative h-[28rem] w-full select-none"
            onMouseEnter={() => {
              setPaused(true);
              setZoomed(true);
            }}
            onMouseLeave={() => {
              setPaused(false);
              setZoomed(false);
            }}
            onMouseMove={onMove}
          >
            {/* Progress bars at top */}
            <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 p-3">
              {images.length > 0 ? (
                images.map((_, i) => (
                  <div key={i} className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-white/80 transition-[width] duration-150"
                      style={{ width: `${i < current ? 100 : i === current ? Math.min(progress * 100, 100) : 0}%` }}
                    />
                  </div>
                ))
              ) : (
                <div className="h-1 w-full rounded-full bg-white/10" />
              )}
            </div>

            {/* Click/tap zones */}
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="absolute left-0 top-0 z-20 h-full w-1/3 cursor-pointer bg-gradient-to-r from-black/0 to-black/0 hover:to-black/10"
            />
            <button
              onClick={handleNext}
              aria-label="Next"
              className="absolute right-0 top-0 z-20 h-full w-1/3 cursor-pointer bg-gradient-to-l from-black/0 to-black/0 hover:to-black/10"
            />

            {/* Current image */}
            <div className="absolute inset-0">
              {images.length ? (
                images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={`${laptop.brand} ${laptop.model}`}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${i === current ? "opacity-100" : "opacity-0"}`}
                    style={{ transform: `scale(${zoomed ? 1.8 : 1})`, transformOrigin: origin }}
                    draggable={false}
                  />
                ))
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-400">No images</div>
              )}
            </div>

            {/* Index indicator bottom-left */}
            {images.length > 0 && (
              <div className="absolute bottom-3 left-3 z-20 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs text-white backdrop-blur">
                {current + 1} / {images.length}
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Laptop</p>
          <h1 className="text-3xl font-bold text-white">{laptop.brand} {laptop.model}</h1>
          <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
            <li><span className="text-slate-500">Processor:</span> {laptop.processor}</li>
            <li><span className="text-slate-500">RAM:</span> {laptop.ram}GB</li>
            <li><span className="text-slate-500">Storage:</span> {laptop.storage}GB SSD</li>
            <li><span className="text-slate-500">GPU:</span> {laptop.graphicCard}</li>
            <li><span className="text-slate-500">Display:</span> {laptop.screenSize}</li>
          </ul>
          <p className="text-3xl font-bold text-lime-300">${laptop.price}</p>
          <div className="flex gap-3">
            <button
              onClick={() => addCart(laptop)}
              className="rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:brightness-110"
            >
              Buy
            </button>
            <Link to="/products" className="rounded-2xl border border-white/20 px-5 py-2">Back</Link>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Similar laptops</h2>
        {related.length === 0 ? (
          <p className="text-slate-400">No similar laptops found.</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {related.map((el) => (
              <div key={el._id} className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-1">
                <Laptop el={el} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LaptopDetail;
