import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, ChevronRight, X } from 'lucide-react';
import festivalsRaw from '../content/festivals.md?raw';

type Festival = { name: string; image: string; position?: string };

const festivals: Festival[] = [
    { name: "Gaura Purnima", image: "/festival-gaura-purnima.jpg", position: "center 30%" },
    { name: "Rama Navami", image: "/festival-rama-navami.jpg", position: "center 22%" },
    { name: "Narasimha Chaturdashi", image: "/festival-narasimha.jpg", position: "center 18%" },
    { name: "Balarama Purnima", image: "/festival-balarama.jpg", position: "center" },
    { name: "Sri Krishna Janmashtami", image: "/festival-janmashtami.jpg", position: "center 25%" },
    { name: "Srila Prabhupada Vyasa Puja", image: "/festival-prabhupada.jpg", position: "center 12%" },
    { name: "Radhastami", image: "/festival-radhastami.jpg", position: "center 22%" },
    { name: "Kartik Masam", image: "/festival-kartik.jpg", position: "center 28%" },
    { name: "Govardhan Puja", image: "/festival-govardhan.jpg", position: "center 48%" },
    { name: "Vaikuntha Ekadashi", image: "/festival-vaikuntha.jpg", position: "center 55%" },
    { name: "Kannan Pongal", image: "/festival-kannan-pongal.jpg", position: "center 28%" },
    { name: "Nityananda Trayodashi", image: "/festival-nityananda.jpg", position: "center 38%" },
];

// Normalise a festival name so small differences (Sri/Srila prefixes, punctuation,
// spacing) still match between the page labels and the content headings.
const normalize = (s: string) =>
    s.toLowerCase().replace(/^(sri|srila|sree|shri)\s+/, '').replace(/[^a-z0-9]+/g, ' ').trim();

// Parse content/festivals.md into { normalizedName: paragraphs[] }.
const parseFestivals = (raw: string): Record<string, string[]> => {
    const cleaned = raw.replace(/<!--[\s\S]*?-->/g, '');
    const map: Record<string, string[]> = {};
    cleaned.split(/^##\s+/m).slice(1).forEach(section => {
        const newline = section.indexOf('\n');
        const name = section.slice(0, newline).trim();
        const body = section.slice(newline + 1).trim();
        const paragraphs = body
            .split(/\n\s*\n/)
            .map(p => p.replace(/\s*\n\s*/g, ' ').trim())
            .filter(Boolean);
        if (name) map[normalize(name)] = paragraphs;
    });
    return map;
};

const FESTIVAL_CONTENT = parseFestivals(festivalsRaw);

const FestivalCalendar = () => {
    const [selected, setSelected] = useState<Festival | null>(null);

    // Close on Escape and lock body scroll while the popup is open.
    useEffect(() => {
        if (!selected) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelected(null);
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [selected]);

    const selectedContent = selected ? FESTIVAL_CONTENT[normalize(selected.name)] : undefined;

    return (
        <section id="festival-calendar" className="py-20 bg-paper">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="font-display font-medium text-4xl lg:text-5xl text-ink mb-6">
                            Festival Calendar
                        </h2>
                        <p className="text-xl text-stone max-w-3xl mx-auto leading-relaxed">
                            Celebrate the divine appearances and pastimes of the Lord throughout the year.
                            Select a festival to read about its significance and how we observe it.
                        </p>
                    </div>

                    {/* Festival grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {festivals.map(festival => (
                            <button
                                key={festival.name}
                                type="button"
                                onClick={() => setSelected(festival)}
                                className="group text-left w-full flex items-center gap-4 bg-paper-2 p-5 rounded-md border border-line hover:border-saffron/60 transition-colors duration-200"
                            >
                                <div className="bg-saffron/10 p-3 rounded-md text-saffron shrink-0">
                                    <CalendarIcon size={22} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-display font-medium text-lg text-ink">
                                        {festival.name}
                                    </h3>
                                    <p className="caption mt-1 normal-case tracking-normal">Annual Celebration</p>
                                </div>
                                <ChevronRight
                                    size={20}
                                    className="text-stone group-hover:text-saffron transition-colors shrink-0"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Festival popup */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60"
                    onClick={() => setSelected(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selected.name}
                >
                    <div
                        className="relative bg-paper border border-line rounded-md overflow-hidden flex flex-col w-[80vw] max-w-5xl h-[85vh]"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Top half: festival image */}
                        <div className="relative h-1/2 shrink-0 bg-paper-2">
                            <img
                                src={selected.image}
                                alt={selected.name}
                                className="w-full h-full object-cover"
                                style={{ objectPosition: selected.position ?? 'center' }}
                            />
                            <button
                                type="button"
                                onClick={() => setSelected(null)}
                                aria-label="Close"
                                className="absolute top-4 right-4 bg-paper/90 text-ink hover:bg-paper rounded-full p-2 transition-colors"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* Bottom half: scrollable content */}
                        <div className="h-1/2 overflow-y-auto px-8 py-7">
                            <h3 className="font-display font-medium text-2xl lg:text-3xl text-ink mb-5">
                                {selected.name}
                            </h3>
                            {selectedContent && selectedContent.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedContent.map((para, i) => (
                                        <p key={i} className="text-stone leading-relaxed">{para}</p>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-stone leading-relaxed">
                                    Details for this festival are coming soon. Please check back later.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FestivalCalendar;
