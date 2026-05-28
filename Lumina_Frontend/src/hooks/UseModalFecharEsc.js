import { useEffect } from "react";

export function UseModalFecharEsc(onFechar) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onFechar();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onFechar]);
}