import logo from "../imagens/LogoCelularLivro.png";
import { User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { BotaoSecundario } from "./Botao";
import { useUsuario } from "../contexto/UsuarioContexto";

const linkClass =
    "no-underline font-['Inter',sans-serif] text-[#3f3e3e] transition-all duration-200 hover:text-[#7573A8] hover:opacity-70";

export default function Menu() {
    const { token } = useUsuario();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/[0.08] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2 h-16">
                <h1 className="font-['Inter',sans-serif] text-[#5D5E98] text-2xl font-medium tracking-[0.2em] p-10">
                    <Link to="/inicio">
                        LUMINA
                    </Link>
                </h1>
            </div>

            <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
                <a href="/inicio" className={linkClass}>Inicío</a>
                <a href="/biblioteca" className={linkClass}>Biblioteca</a>
                <a href="/categorias" className={linkClass}>Categorias</a>
                <a href="/autores" className={linkClass}>Autores</a>

            </nav>
            <div className="flex items-center gap-4 pr-10">
                {token ? (
                    <>
                        <Link to="/perfil">
                            <User />
                        </Link>
                    </>
                ) : (
                    <Link to="/entrar">
                        <BotaoSecundario>Entrar</BotaoSecundario>
                    </Link>
                )}
            </div>
        </header>
    );
}