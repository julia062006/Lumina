import { BotaoPrimario, BotaoSecundario } from "./Botao";

const API = "http://localhost:3000";

export default function AutorCartao({ autor, onVerMais, onVerLivros }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={`${API}/uploads/${autor.foto}`}
          alt={autor.nome}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-medium mb-4 line-clamp-2">{autor.nome}</h3>
        <div className="flex gap-2">
          <BotaoPrimario onClick={() => onVerLivros(autor)} className="flex-1 flex justify-center items-center">
            Ver Livros
          </BotaoPrimario>
          <BotaoSecundario onClick={() => onVerMais(autor)} className="flex-1 flex justify-center items-center">
            Ver mais
          </BotaoSecundario>
        </div>
      </div>
    </div>
  );
}