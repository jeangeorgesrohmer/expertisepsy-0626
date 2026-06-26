import { useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechToText } from '../../hooks/useSpeechToText';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  minHeight?: string;
}

export default function VoiceTextarea({ value, onChange, placeholder, rows = 3, className, minHeight }: Props) {
  // Keep a ref to the latest value to avoid stale closure in onTranscript
  const valueRef = useRef(value);
  valueRef.current = value;

  const { isListening, isSupported, interimTranscript, toggle } = useSpeechToText({
    onTranscript: (text) => {
      const prev = valueRef.current;
      const separator = prev.trim() ? ' ' : '';
      onChange(prev + separator + text);
    },
  });

  const baseClass =
    'w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-y leading-relaxed pr-10';

  return (
    <div className="relative">
      <textarea
        rows={rows}
        className={className ?? baseClass}
        style={minHeight ? { minHeight } : undefined}
        placeholder={placeholder}
        value={isListening && interimTranscript ? value + (value.trim() ? ' ' : '') + interimTranscript : value}
        onChange={(e) => {
          // Strip interim suffix if present before propagating manual edits
          onChange(e.target.value);
        }}
      />
      {isSupported && (
        <button
          type="button"
          onClick={toggle}
          title={isListening ? 'Arrêter la dictée' : 'Dicter'}
          className={`absolute bottom-2 right-2 p-1.5 rounded-md transition-all ${
            isListening
              ? 'bg-red-100 text-red-500 animate-pulse hover:bg-red-200'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
          }`}
        >
          {isListening ? <MicOff size={14} /> : <Mic size={14} />}
        </button>
      )}
    </div>
  );
}
