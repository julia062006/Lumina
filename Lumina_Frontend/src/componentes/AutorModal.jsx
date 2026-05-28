import { useEffect } from "react";
import { BotaoSecundario } from "./Botao";

const API = "http://localhost:3000";

export default function AutorModal({ autor, onFechar }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onFechar();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onFechar]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onFechar}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 flex gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`${API}/uploads/${autor.foto}`}
          alt={autor.nome}
          className="w-44 h-64 object-cover rounded-xl shrink-0"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">{autor.nome}</h2>
          <p className="text-sm text-gray-600 leading-relaxed flex-1 overflow-y-auto max-h-48 mt-2">
            {autor.biografia}
          </p>
          <div className="flex justify-center">
          <BotaoSecundario
            onClick={onFechar}
            className="mt-4 px-4 py-1.5 text-sm rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex justify-center items-center w-fit">
                Fechar
          </BotaoSecundario>
          </div>
        </div>
      </div>
    </div>
  );
}