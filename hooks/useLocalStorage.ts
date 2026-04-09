"use client";

import { useState, useSyncExternalStore } from "react";

/**
 * Hook customizado para abstrair o uso de LocalStorage no React/Next.js
 * Lida com o problema de Hydration no SSR ao forçar a resolução no lado do Client.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar nosso valor
  // Passo uma função de inicialização pro useState para ler o localstorage no primeiro render
  // Mas no Next.js isso pode causar mismatch. Então o pattern seguro inicializa com initialValue
  // e atualiza após a montagem.
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Retorna uma versão com a assinatura setter do useState
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que o valor seja uma função ou o próprio valor para API igual ao useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      // Salva para o local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, isMounted] as const;
}
