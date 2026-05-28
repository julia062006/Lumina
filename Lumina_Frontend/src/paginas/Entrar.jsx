import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import Input from "../componentes/Input";
import Formulario from "../componentes/Formulario";
import { loginUsuario } from "../services/api";
import InputSenha from "../componentes/InputSenha";
import { useUsuario } from "../contexto/UsuarioContexto";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Entrar() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const { entrar: entrarContexto } = useUsuario();

    useEffect(() => {
        if (location.state?.precisaLogin) {
            Swal.fire({
                icon: "warning",
                title: "Você precisa estar logado"
            });

            navigate("/entrar", { replace: true });
        }
    }, [location.state, navigate]);

    async function entrar(dados) {
        try {

            const resposta = await loginUsuario(dados);

            if (!resposta.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: resposta.data.mensagem
                });
                return;
            }

            entrarContexto(resposta.data.usuario, resposta.data.token);

            Swal.fire({
                icon: "success",
                title: "Login realizado com sucesso!"
            });

            navigate("/");

        } catch (erro) {
            console.log("Erro ao conectar com o servidor");

            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao conectar com o servidor"
            });
        }
    }

    return (
        <div className=" bg-pink-50">
            <Formulario titulo="Entrar" onSubmit={handleSubmit(entrar)}>

                <Input
                    label="Email"
                    name="email"
                    placeholder="Digite seu email"
                    register={(name) =>
                        register(name, {
                            required: "O email é obrigatório"
                        })
                    }
                    error={errors.email}
                />

                <InputSenha
                    label="Senha"
                    name="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    register={(name) =>
                        register(name, {
                            required: "A senha é obrigatória"
                        })
                    }
                    error={errors.senha}
                />

                <div className="flex gap-4 mt-4">

                    <BotaoPrimario type="submit">
                        Entrar
                    </BotaoPrimario>

                    <BotaoSecundario onClick={() => navigate("/cadastroUsuario")}>
                        Criar conta
                    </BotaoSecundario>

                </div>

            </Formulario>
        </div>
    );
}

export default Entrar