'use client';

import { useRouter } from 'next/navigation';

const THEMES = ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials', 'Meme'] as const;

export default function ThemeNav() {
  const router = useRouter();

  function selectTheme(theme: string) {
    router.push(`/?theme=${encodeURIComponent(theme)}`);
  }

  return (
    <div className="overflow-x-auto scrollbar-none">
      <div className="flex items-center bg-slate-800 rounded-full p-0.5 text-xs font-bold border border-slate-700 w-max">
        {THEMES.map(theme => (
          <button
            key={theme}
            onClick={() => selectTheme(theme)}
            className="px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap text-slate-400 hover:text-slate-200 hover:bg-slate-700"
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
}
