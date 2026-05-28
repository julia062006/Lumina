import { cpf } from "cpf-cnpj-validator";
import { mascaraCPF } from "./formatadores";

export const MENSAGENS = {
    NOME_OBRIGATORIO: "O nome é obrigatório",
    NOME_MIN: "Mínimo 3 caracteres",
    CPF_OBRIGATORIO: "O CPF é obrigatório",
    CPF_INVALIDO: "CPF inválido",
    SENHA_MIN: "Mínimo 6 caracteres",
    SENHA_MAIUSCULA: "Deve ter pelo menos 1 letra maiúscula",
    SENHA_ESPECIAL: "Deve ter pelo menos 1 caractere especial",
    SENHAS_DIFERENTES: "As senhas não são iguais!",
    ATUALIZADO_SUCESSO: "Usuário atualizado com sucesso!",
    CADASTRO_SUCESSO: (entidade) => `${entidade} cadastrado com sucesso!`,
    ERRO_SERVIDOR: "Erro ao conectar com o servidor",
};

export const validacoesNome = {
    required: MENSAGENS.NOME_OBRIGATORIO,
    minLength: { value: 3, message: MENSAGENS.NOME_MIN },
};

export const validacoesTexto = (mensagem) => ({
    required: mensagem,
});

export const validacoesNumero = (mensagem) => ({
     required: mensagem,
    onChange: (e) => {
        let valor = e.target.value.replace(/\D/g, "");
        
        const numero = (parseInt(valor || "0") / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        e.target.value = numero;
    },
    validate: (value) => {
        const numero = parseFloat(value.replace(/[R$\s.]/g, "").replace(",", "."));
        if (isNaN(numero) || numero <= 0) return "O valor deve ser maior que zero";
        return true;
    }
});

export const validacoesSelect = (mensagem) => ({
    required: mensagem,
    validate: (value) => value !== "" || mensagem,
});

export function validacoesSenha(opcional = false) {
    return {
        minLength: { value: 6, message: MENSAGENS.SENHA_MIN },
        pattern: { value: /[A-Z]/, message: MENSAGENS.SENHA_MAIUSCULA },
        validate: {
            temEspecial: (value) =>
                (opcional && !value) ||
                /[^A-Za-z0-9]/.test(value) ||
                MENSAGENS.SENHA_ESPECIAL,
        },
    };
}

export function validacoesConfirmarSenha(getSenha) {
    return {
        validate: (value) =>
            !getSenha() || value === getSenha() || MENSAGENS.SENHAS_DIFERENTES,
    };
}

export const validacoesCPF = {
    required: MENSAGENS.CPF_OBRIGATORIO,
    onChange: (e) => {
        e.target.value = mascaraCPF(e.target.value);
    },
    validate: (value) => {
        const cpfLimpo = value.replace(/\D/g, "");
        return cpf.isValid(cpfLimpo) || MENSAGENS.CPF_INVALIDO;
    },
};