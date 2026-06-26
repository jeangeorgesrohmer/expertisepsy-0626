import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

export default function UpdateNotification() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // Poll for updates every 60 seconds when the app is open
      if (r) {
        setInterval(() => r.update(), 60 * 1000);
      }
    },
  });

  if (!needRefresh) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md"
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 text-white shadow-2xl border border-slate-700">
        <div className="flex-shrink-0 p-1.5 bg-blue-500/20 rounded-lg">
          <RefreshCw size={18} className="text-blue-400" />
        </div>
        <p className="flex-1 text-sm leading-snug">
          <span className="font-semibold">Mise à jour disponible.</span>
          <span className="text-slate-300"> Rechargez pour obtenir la dernière version.</span>
        </p>
        <button
          onClick={() => updateServiceWorker(true)}
          className="flex-shrink-0 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Mettre à jour
        </button>
        <button
          onClick={() => setNeedRefresh(false)}
          aria-label="Ignorer"
          className="flex-shrink-0 p-1 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
