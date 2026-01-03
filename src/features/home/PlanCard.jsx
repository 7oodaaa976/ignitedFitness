export default function PlanCard({ title, day, img, variant = "big", onClick }) {
    const big = variant === "big";

    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "w-full text-left overflow-hidden rounded-3xl border border-zinc-700/50",
                "card-soft transition hover:opacity-[0.98] active:scale-[0.99]",
                big ? "h-44" : "h-32",
            ].join(" ")}
        >
            <div className="relative h-full">
                {img ? (
                    <img
                        src={img}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                ) : (
                   <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-zinc-900/40 to-black/70" />

                )}

                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="relative h-full p-5 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-200 text-xs tracking-wide">{day}</p>
                            <h3 className="text-white text-lg font-semibold mt-1 line-clamp-2">
                                {title}
                            </h3>
                        </div>

                        <span className="px-3 py-1 rounded-full text-[11px] bg-cyan-400/15 text-cyan-200 border border-cyan-400/30">
                            Continue
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-gray-300 text-xs">{big ? "Today’s Focus" : "Nutrition"}</p>

                        <span className="px-4 py-2 rounded-xl text-[12px] font-semibold bg-cyan-400 text-black">
                            {big ? "Start" : "Open"}
                        </span>
                    </div>

                </div>
            </div>
        </button>
    );
}
