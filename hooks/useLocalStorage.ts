"use client";

import { useState, useEffect } from "react";

/**
 * Hook customizado para abstrair o uso de LocalStorage no React/Next.js
 * Lida com o problema de Hydration no SSR ao forçar a resolução no lado do Client.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar nosso valor
  // Passo uma função de inicialização pro useState para ler o localstorage no primeiro render
  // Mas no Next.js isso pode causar mismatch. Então o pattern seguro inicializa com initialValue
  // e atualiza após a montagem.
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      // Pega do local storage key usando nome customizado
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

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
