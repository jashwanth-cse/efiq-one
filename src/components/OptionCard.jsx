import Image from "next/image";

/**
 * OptionCard — responsive icon card
 *
 * Props:
 *   icon      {string}  — Material Symbols name (fallback when no imageSrc)
 *   imageSrc  {string}  — Image path (takes priority over icon)
 *   title     {string}  — Label below the card
 *   titleSize {string}  — CSS font-size for the label
 *   variant   {string}  — "spin" | "arrow" | "image"
 *   href      {string}  — Link target
 */
export default function OptionCard({
  icon,
  imageSrc,
  title,
  titleSize = "12px",
  variant = "default",
  href = "#",
}) {
  return (
    <a
      data-magnetic
      href={href}
      className="group cursor-pointer flex flex-col items-center"
      aria-label={title}
    >
      {/* Icon box — fluid size */}
      <div className="w-32 h-32 sm:w-36 sm:h-36 bg-primary rounded-[2rem] flex items-center justify-center shadow-xl shadow-indigo-500/20 transform group-hover:scale-105 active:scale-95 transition-transform duration-300 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={144}
            height={144}
            className="w-full h-full object-cover rounded-[2rem]"
            priority
            sizes="(max-width: 640px) 128px, 144px"
          />
        ) : variant === "spin" ? (
          <div className="relative flex items-center justify-center">
            <svg
              className="w-24 h-24 animate-spin-slow opacity-30 absolute"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="white"
                strokeDasharray="2, 6"
                strokeWidth="1"
              />
            </svg>
            <span className="material-symbols-outlined text-white text-5xl sm:text-6xl font-extralight relative z-10">
              {icon}
            </span>
          </div>
        ) : (
          <div className="p-5 sm:p-6 border-4 border-white/30 rounded-2xl relative overflow-hidden">
            <span className="material-symbols-outlined text-white text-5xl sm:text-6xl">
              {icon}
            </span>
            <div className="absolute top-3 right-3 bg-white rounded-sm p-0.5">
              <span className="material-symbols-outlined text-primary text-xs font-bold">
                north_east
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Label */}
      <p
        className="mt-3 sm:mt-4 font-bold uppercase tracking-wide text-gray-900"
        style={{ fontSize: titleSize }}
      >
        {title}
      </p>
    </a>
  );
}
