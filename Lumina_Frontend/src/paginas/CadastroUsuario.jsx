import { useForm } from "react-hook-form";
import { criarUsuario } from "../services/api";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import Input from "../componentes/Input";
import Formulario from "../componentes/Formulario";
import { useNavigate } from "react-router-dom";
import InputSenha from "../componentes/InputSenha";
import Swal from "sweetalert2";
import { cpf } from "cpf-cnpj-validator";


function CadastroUsuario() {
    const { register, handleSubmit, watch, setError, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const senha = watch("senha");

    async function cadastrar(dados) {
        try {
            const resposta = await criarUsuario(dados);

            if (!resposta.ok) {

                if (resposta.data.erros) {
                    resposta.data.erros.forEach((erro) => {
                        setError(erro.path, {
                            type: "server",
                            message: erro.msg
                        });
                    });
                } else if (resposta.data.mensagem) {
                    Swal.fire({
                        icon: "error",
                        title: resposta.data.mensagem
                    });
                }

                return;
            }

            Swal.fire({
                icon: "success",
                title: "Cadastro realizado com sucesso!"
            });

            reset();
            navigate("/entrar");

        } catch (erro) {
            console.log("Erro ao conectar com o servidor");
        }
    }

    function mascaraCPF(valor) {
        valor = valor.replace(/\D/g, "");
        valor = valor.slice(0, 11);

        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        return valor;
    }

    return (
        <div className="bg-pink-50">
            <Formulario titulo="Faça seu Cadastro" onSubmit={handleSubmit(cadastrar)}>

                <Input
                    label="Nome"
                    name="nome"
                    placeholder="Digite seu nome"
                    register={(name) =>
                        register(name, {
                            required: "O nome é obrigatório",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" }
                        })
                    }
                    error={errors.nome}
                />

                <Input
                    label="Email"
                    name="email"
                    placeholder="Digite seu email"
                    register={(name) =>
                        register(name, {
                            required: "O email é obrigatório",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email inválido"
                            }
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
                            required: "A senha é obrigatória",
                            minLength: { value: 6, message: "Mínimo 6 caracteres" },
                            pattern: {
                                value: /[A-Z]/,
                                message: "Deve ter pelo menos 1 letra maiúscula"
                            },
                            validate: {
                                temEspecial: (value) =>
                                    /[^A-Za-z0-9]/.test(value) || "Deve ter pelo menos 1 caractere especial"
                            }
                        })
                    }
                    error={errors.senha}
                />

                <InputSenha
                    label="Confirmar Senha"
                    name="confirmarSenha"
                    type="password"
                    placeholder="Confirme sua senha"
                    register={(name) =>
                        register(name, {
                            required: "Confirme sua senha",
                            validate: (value) =>
                                value === senha || "As senhas não são iguais!"
                        })
                    }
                    error={errors.confirmarSenha}
                />

                <Input
                    label="CPF"
                    name="cpf"
                    placeholder="Digite seu CPF"
                    register={(name) =>
                        register(name, {
                            required: "O CPF é obrigatório",
                            validate: (value) => {
                                const cpfLimpo = value.replace(/\D/g, "");
                                return cpf.isValid(cpfLimpo) || "CPF inválido";
                            }
                        })
                    }
                    onChange={(e) => {
                        e.target.value = mascaraCPF(e.target.value);
                    }}
                    error={errors.cpf}
                />
                
                <div className="flex gap-4 mt-4 items-center">
                    <BotaoPrimario type="submit">
                        Cadastrar
                    </BotaoPrimario>

                    <BotaoSecundario onClick={() => navigate("/entrar")}>
                        Já tenho uma conta
                    </BotaoSecundario>

                </div>

            </Formulario>
        </div>
    )

}

export default CadastroUsuario;