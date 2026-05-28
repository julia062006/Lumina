function Rodape() {
    return (
        <footer className="border-t border-black/[0.08] bg-[rgba(248,249,250,0.3)]">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
                <div className="flex flex-col md:flex-row justify-center gap-16">

                    <div className="max-w-sm">
                        <h3 className="text-xl tracking-[0.2em] font-medium mb-4 text-[#5D5E98]">
                            LUMINA
                        </h3>
                        <p className="text-sm text-[#6c757d] max-w-md leading-6">
                            Ilumine sua leitura com nossa coleção digital premium. Descubra histórias que transformam.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4 text-base leading-6">Links Rápidos</h4>
                        <ul className="flex flex-col gap-2 list-none p-0 m-0">
                            <li><a href="/" className="text-sm text-[#6c757d] no-underline transition-colors duration-200 hover:text-[#7573A8]">Início</a></li>
                            <li><a href="/biblioteca" className="text-sm text-[#6c757d] no-underline transition-colors duration-200 hover:text-[#7573A8]">Biblioteca</a></li>
                            <li><a href="/categorias" className="text-sm text-[#6c757d] no-underline transition-colors duration-200 hover:text-[#7573A8]">Categorias</a></li>
                            <li><a href="/autores" className="text-sm text-[#6c757d] no-underline transition-colors duration-200 hover:text-[#7573A8]">Autores</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="pb-8 border-t border-black/[0.08]">
                <p className="text-sm text-center text-[#6c757d] m-0 pt-4">
                    © 2026 LUMINA. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Rodape;