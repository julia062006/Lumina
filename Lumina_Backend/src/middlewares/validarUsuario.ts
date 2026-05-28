import { body } from "express-validator";
import { cpf } from "cpf-cnpj-validator";

export const validarUsuario = [
    body("nome")
        .notEmpty().withMessage("O nome é obrigatório"),

    body("email")
        .isEmail().withMessage("Insira um email válido"),

    body("senha")
        .isLength({ min: 6 }).withMessage("Senha deve ter no mínimo 6 caracteres")
        .matches(/[A-Z]/).withMessage("Senha deve ter pelo menos 1 letra maiúscula")
        .matches(/[^A-Za-z0-9]/).withMessage("Senha deve ter pelo menos 1 caractere especial"),

    body("confirmarSenha")
        .custom((value, { req }) => {
            if (value !== req.body.senha) {
                throw new Error("As senhas não são iguais");
            }
            return true;
        }),

    body("cpf")
        .notEmpty().withMessage("O CPF é obrigatório")
        .custom((value) => {
            const cpfLimpo = value.replace(/\D/g, "");

            if (!cpf.isValid(cpfLimpo)) {
                throw new Error("CPF inválido");
            }

            return true;
        })
];

export const validarAtualizacaoUsuario = [
    body("nome")
        .optional()
        .notEmpty().withMessage("O nome não pode estar vazio"),

    body("senha")
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 6 }).withMessage("Senha deve ter no mínimo 6 caracteres")
        .matches(/[A-Z]/).withMessage("Senha deve ter pelo menos 1 letra maiúscula")
        .matches(/[^A-Za-z0-9]/).withMessage("Senha deve ter pelo menos 1 caractere especial"),

    body("cpf")
        .optional()
        .notEmpty().withMessage("O CPF não pode estar vazio")
        .custom((value) => {
            const cpfLimpo = value.replace(/\D/g, "");
            if (!cpf.isValid(cpfLimpo)) throw new Error("CPF inválido");
            return true;
        })
];