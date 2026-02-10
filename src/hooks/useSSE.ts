import { useEffect, useState, useRef, useCallback } from "react";
import { API_BASE_URL, ENDPOINTS } from "../config/api";
import type { LivePriceData } from "../types";

const RECONNECT_DELAY = 3000;

export function useSSE() {
  const [data, setData] = useState<LivePriceData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const esRef = useRef<EventSource | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    esRef.current?.close();
    esRef.current = null;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    cleanup();
    try {
      const es = new EventSource(`${API_BASE_URL}${ENDPOINTS.PRICES_STREAM}`);
      esRef.current = es;

      es.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      // The server sends events named "prices:update"
      es.addEventListener("prices:update", (event: MessageEvent) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.live) {
            setData(parsed.live);
            setLastUpdated(parsed.live?.lastUpdated || parsed.lastUpdated);
          }
        } catch {
          // ignore parse errors
        }
      });

      es.onerror = () => {
        setIsConnected(false);
        setError("MCX Feed Disconnected");
        es.close();
        esRef.current = null;
        if (!timerRef.current) {
          timerRef.current = setTimeout(() => {
            timerRef.current = null;
            connect();
          }, RECONNECT_DELAY);
        }
      };
    } catch {
      setError("MCX Server Offline");
      setIsConnected(false);
    }
  }, [cleanup]);

  useEffect(() => {
    connect();
    return cleanup;
  }, [connect, cleanup]);

  // Pause when tab is hidden, resume on visible
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") connect();
      else cleanup();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [connect, cleanup]);

  return { data, lastUpdated, isConnected, error, reconnect: connect };
}
