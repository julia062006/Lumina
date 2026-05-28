import { Request, Response } from "express";
import Autor from "../models/Autor";
import { validationResult } from "express-validator";
import Livro from "../models/Livro";

class AutorController {
    static async findAll(req: Request, res: Response) {
        try {
            const autor = await Autor.findAll();
            return res.send(autor);

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const autor = await Autor.findByPk(Number(id))
            if (!autor) {
                return res.status(404).json({ mensagem: "Autor não encontrado" });
            }

            return res.status(200).json(autor);

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async findByAutor(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const livros = await Livro.findAll({
                where: { id_autor: Number(id) },
                include: [
                    { association: "autor" },
                    { association: "categoria" }
                ]
            });
            return res.json(livros);
        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async create(req: Request, res: Response) {

        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }
        try {
            const { nome, biografia } = req.body;
            const foto = req.file ? req.file.filename : null;

            if (!nome || !biografia) {
                return res.status(400).json({
                    mensagem: "Nome e biografia são obrigatórios"
                });
            }

            const autor = await Autor.create({
                nome,
                biografia,
                foto
            })
            return res.status(201).json(autor);
        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    static async update(req: Request, res: Response) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }
        try {
            const { id } = req.params;
            const { nome, biografia } = req.body;
            const autor = await Autor.findByPk(Number(id));

            if (!autor) {
                return res.status(404).json({ mensagem: "Autor não encontrado" });
            }

            const foto = req.file ? req.file.filename : autor.foto;

            await autor.update({ nome, biografia, foto });
            return res.status(200).json({ mensagem: "Autor atualizado com sucesso" });

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }


    static async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const autor = await Autor.findByPk(Number(id));

            if (!autor) {
                return res.status(404).json({ mensagem: "Autor não encontrado" });
            }

            await autor.destroy();
            return res.status(200).json({ mensagem: "Autor removido com sucesso" });

        } catch (erro) {
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }

    }

}

export default AutorController;