import { useCallback, useEffect, useRef, useState } from 'react';

const SILENCE_TIMEOUT_MS = 6000;

export interface UseSpeechToTextOptions {
  onTranscript: (text: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
}

export interface UseSpeechToTextResult {
  isListening: boolean;
  isSupported: boolean;
  interimTranscript: string;
  start: () => void;
  stop: () => void;
  toggle: () => void;
}

const isSupported =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition !== undefined || window.webkitSpeechRecognition !== undefined);

export function useSpeechToText({ onTranscript, onError }: UseSpeechToTextOptions): UseSpeechToTextResult {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');

  // Store callbacks in refs to avoid stale closures
  const onTranscriptRef = useRef(onTranscript);
  const onErrorRef = useRef(onError);
  useEffect(() => { onTranscriptRef.current = onTranscript; }, [onTranscript]);
  useEffect(() => { onErrorRef.current = onError; }, [onError]);

  const recognitionRef = useRef<InstanceType<typeof SpeechRecognition> | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isListeningRef = useRef(false);

  const clearHeartbeat = () => {
    if (heartbeatRef.current !== null) {
      clearTimeout(heartbeatRef.current);
      heartbeatRef.current = null;
    }
  };

  const resetHeartbeat = useCallback(() => {
    clearHeartbeat();
    heartbeatRef.current = setTimeout(() => {
      // No speech data received for SILENCE_TIMEOUT_MS — force abort
      if (isListeningRef.current && recognitionRef.current) {
        recognitionRef.current.abort();
      }
    }, SILENCE_TIMEOUT_MS);
  }, []);

  const handleStop = useCallback(() => {
    clearHeartbeat();
    setIsListening(false);
    isListeningRef.current = false;
    setInterimTranscript('');
  }, []);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    handleStop();
  }, [handleStop]);

  const start = useCallback(() => {
    if (!isSupported || isListeningRef.current) return;

    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      isListeningRef.current = true;
      resetHeartbeat();
    };

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      resetHeartbeat();
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        if (result.isFinal) {
          const finalText = result[0].transcript.trim();
          if (finalText) {
            onTranscriptRef.current(finalText, true);
          }
        } else {
          interim += result[0].transcript;
        }
      }
      setInterimTranscript(interim);
    };

    recognition.onspeechend = () => {
      resetHeartbeat();
    };

    recognition.onend = () => {
      handleStop();
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      const code = e.error;
      if (code !== 'aborted' && code !== 'no-speech') {
        onErrorRef.current?.(code);
      }
      handleStop();
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      handleStop();
    }
  }, [resetHeartbeat, handleStop]);

  const toggle = useCallback(() => {
    if (isListeningRef.current) {
      stop();
    } else {
      start();
    }
  }, [start, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearHeartbeat();
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  return { isListening, isSupported, interimTranscript, start, stop, toggle };
}
