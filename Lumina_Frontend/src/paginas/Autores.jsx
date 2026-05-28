import { useEffect, useState } from "react";
import AutorCartao from "../componentes/AutorCartao";
import AutorModal from "../componentes/AutorModal";
import AutorModalLivro from "../componentes/AutorModalLivro";

function Autores() {
  const [autores, setAutores] = useState([]);
  const [autorModal, setAutorModal] = useState(null);
  const [autorLivros, setAutorLivros] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/autores")
      .then((res) => res.json())
      .then((data) => setAutores(data))
      .catch((err) => console.error("Erro ao buscar autores:", err));
  }, []);

  return (
    <main className="bg-green-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-medium mb-2 text-center tracking-widest text-[#425B98]">AUTORES</h1>
      <p className="text-muted-foreground mb-10 text-center">Explore todos os autores disponíveis</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {autores.map((autor) => (
          <AutorCartao
            key={autor.id_autor}
            autor={autor}
            onVerMais={setAutorModal}
            onVerLivros={setAutorLivros}
          />
        ))}
      </div>

      {autorModal && (
        <AutorModal
          autor={autorModal}
          onFechar={() => setAutorModal(null)}
        />
      )}

      {autorLivros && (
        <AutorModalLivro
         autor={autorLivros} 
         onFechar={() => setAutorLivros(null)} 
        />
      )}
    </div>
    </main>
  );
}

export default Autores;