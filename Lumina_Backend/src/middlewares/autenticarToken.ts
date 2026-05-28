import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, TokenPayload } from "../types/AuthRequest";

export function AutenticarToken(req: AuthRequest, res: Response, next: NextFunction) {

    if (process.env.NODE_ENV === "test") {
        req.usuario = { id: 1 } as TokenPayload;
        return next();
    }

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                mensagem: "Token não fornecido"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.SECRET as string
        ) as TokenPayload;

        req.usuario = decoded;

        next();

    } catch (erro) {
        return res.status(403).json({
            mensagem: "Token inválido"
        });
    }
}