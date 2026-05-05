import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';

const Header = ({ provider, activeView, notificationsCount }) => {
  return (
    <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-8 py-5 shadow-sm shadow-slate-200/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{activeView === 'dashboard' ? 'Overview' : activeView.replace('-', ' ')}</p>
          <h1 className="mt-2 text-2xl font-black text-slate-900">{provider.title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{provider.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders, tasks, reports"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <button className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <Bell className="h-4 w-4 text-slate-500" />
            Notifications
            <span className="rounded-full bg-teal-600 px-2 py-0.5 text-xs font-semibold text-white">{notificationsCount}</span>
          </button>

          <button className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
            <Sparkles className="h-4 w-4" />
            Quick tips
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
