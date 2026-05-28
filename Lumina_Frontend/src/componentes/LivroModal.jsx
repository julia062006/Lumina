import { BotaoPrimario } from "./Botao";
import { BotaoSecundario } from "./Botao";
import { UseModalFecharEsc } from "../hooks/UseModalFecharEsc";
const API = "http://localhost:3000";

export default function LivroModal({ livro, onFechar }) {
  UseModalFecharEsc(onFechar);

  const abrirPdf = () =>
    window.open(`${API}/uploads/${livro.urlPdf}`, "_blank");

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onFechar}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 flex gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={livro.image}
          alt={`Capa de ${livro.title}`}
          className="w-44 h-64 object-cover rounded-xl shrink-0"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">{livro.title}</h2>
          <p className="text-sm text-gray-500 mb-3">{livro.author}</p>
          <p className="text-sm text-gray-600 leading-relaxed flex-1 overflow-y-auto max-h-40">
            {livro.description}
          </p>
          <div className="flex gap-2 mt-4 justify-center">
            <BotaoPrimario className="px-6 flex justify-center items-center" onClick={abrirPdf}>
              Leia agora
            </BotaoPrimario>
            <BotaoSecundario className="px-6 flex justify-center items-center" onClick={onFechar}>
              Fechar
            </BotaoSecundario>
          </div>
        </div>
      </div>
    </div>
  );
}