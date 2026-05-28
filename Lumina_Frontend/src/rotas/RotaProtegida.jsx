import { Navigate } from "react-router-dom";
import { useUsuario } from "../contexto/UsuarioContexto";
import Swal from "sweetalert2";

export default function RotaProtegida({ children }) {
    const { token, saindoDaConta} = useUsuario();

    if (!token) {
        if (!saindoDaConta) {
            Swal.fire({
                icon: "warning",
                title: "Você precisa estar logado",
                text: "Faça login para continuar",
            });
        }

        return <Navigate to="/entrar" replace />;
    }

    return children;
}