import ReactPaginate from "react-paginate";

function Paginacao({ totalPaginas, paginaAtual, onMudarPagina }) {
    if (totalPaginas <= 1) return null;

    return (
        <ReactPaginate
            pageCount={totalPaginas}
            onPageChange={({ selected }) => onMudarPagina(selected)}
            forcePage={paginaAtual}
            previousLabel="← Anterior"
            nextLabel="Próximo →"
            breakLabel="..."
            containerClassName="flex items-center justify-center gap-1 mt-6"
            pageClassName="rounded border text-sm"
            pageLinkClassName="px-3 py-1 block hover:bg-gray-100"
            activeClassName="bg-blue-600 text-white border-blue-600"
            activeLinkClassName="hover:bg-blue-600"
            previousClassName="rounded border text-sm"
            previousLinkClassName="px-3 py-1 block hover:bg-gray-100"
            nextClassName="rounded border text-sm"
            nextLinkClassName="px-3 py-1 block hover:bg-gray-100"
            disabledClassName="opacity-40 cursor-not-allowed"
            breakClassName="px-2 py-1 text-sm"
        />
    );
}

export default Paginacao;