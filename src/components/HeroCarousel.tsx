import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  src: string;
  alt: string;
  caption: string;
  // Intrinsic pixel size, used to size the frame to each image's own
  // aspect ratio (no letterbox bars) and animate smoothly between slides.
  width: number;
  height: number;
}

// Festival posters expire after the event so the hero quietly falls back
// to the temple photo alone. Update src/caption/expires for the next festival.
const FESTIVAL_SLIDES: (Slide & { expires: string })[] = [
  {
    src: '/janmashtami-2026-invite-en.jpg',
    alt: 'Sri Krishna Janmashtami 2026 invitation',
    caption: 'Sri Krishna Janmashtami 2026 — Invitation',
    width: 1600,
    height: 854,
    expires: '2026-09-06',
  },
  {
    src: '/janmashtami-2026-invite-ta.jpg',
    alt: 'ஸ்ரீ கிருஷ்ண ஜென்மாஷ்டமி 2026 அழைப்பிதழ்',
    caption: 'ஸ்ரீ கிருஷ்ண ஜென்மாஷ்டமி 2026 — அழைப்பிதழ்',
    width: 1600,
    height: 854,
    expires: '2026-09-06',
  },
  {
    src: '/janmashtami-2026-seva-en.jpg',
    alt: 'Festival seva and donation breakdown',
    caption: 'Festival Seva — Donation breakdown',
    width: 1600,
    height: 854,
    expires: '2026-09-06',
  },
  {
    src: '/janmashtami-2026-seva-ta.jpg',
    alt: 'திருவிழா சேவை மற்றும் நன்கொடை விவரம்',
    caption: 'திருவிழா சேவை — நன்கொடை விவரம்',
    width: 1600,
    height: 854,
    expires: '2026-09-06',
  },
  {
    src: '/janmashtami-2026-schedule.jpg',
    alt: 'Festival programme schedule',
    caption: 'Festival Programme Schedule',
    width: 1600,
    height: 854,
    expires: '2026-09-06',
  },
];

const TEMPLE_SLIDE: Slide = {
  src: '/temple-entrance.jpg',
  alt: 'Hare Krishna Temple Avadi',
  caption: 'Hare Krishna Temple, Avadi',
  width: 1280,
  height: 854,
};

const AUTO_ADVANCE_MS = 5000;

const HeroCarousel = () => {
  const today = new Date().toISOString().slice(0, 10);
  const activeFestivalSlides = FESTIVAL_SLIDES.filter((s) => s.expires >= today);
  const slides: Slide[] = [TEMPLE_SLIDE, ...activeFestivalSlides];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused || lightboxOpen || slides.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => go(index + 1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [index, paused, lightboxOpen, slides.length, go]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'ArrowRight') go(index + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, index, go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(index + (delta < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const current = slides[index];

  return (
    <div className="relative max-w-5xl mx-auto">
      {activeFestivalSlides.length > 0 && (
        <span className="eyebrow block text-center mb-3">
          Upcoming Festival · Sri Krishna Janmashtami 2026
        </span>
      )}

      <div
        className="relative rounded-md overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="relative w-full transition-[padding-top] duration-500 ease-in-out"
          style={{ paddingTop: `${(current.height / current.width) * 100}%` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                onClick={() => setLightboxOpen(true)}
                className="w-full h-full object-cover cursor-zoom-in"
              />
            </div>
          ))}

          {slides.length > 1 && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-4 pt-8 pb-3 flex items-end justify-between gap-3 pointer-events-none">
              <span className="text-paper text-sm font-medium">{current.caption}</span>
              <span className="text-paper/80 text-xs whitespace-nowrap hidden sm:inline">
                Tap to view full screen
              </span>
            </div>
          )}
        </div>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-line bg-paper/90 text-ink hover:border-saffron hover:text-saffron flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-line bg-paper/90 text-ink hover:border-saffron hover:text-saffron flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-saffron' : 'w-2 bg-line hover:bg-stone'
              }`}
            />
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-ink/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 text-paper hover:text-saffron transition-colors"
          >
            <X size={30} />
          </button>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={(e) => {
              e.stopPropagation();
              go(index - 1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-paper hover:text-saffron transition-colors"
          >
            <ChevronLeft size={40} />
          </button>

          <img
            src={current.src}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] object-contain rounded-md"
          />

          <button
            type="button"
            aria-label="Next slide"
            onClick={(e) => {
              e.stopPropagation();
              go(index + 1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-paper hover:text-saffron transition-colors"
          >
            <ChevronRight size={40} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-paper/90 text-sm">
            {current.caption} · {index + 1} / {slides.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
