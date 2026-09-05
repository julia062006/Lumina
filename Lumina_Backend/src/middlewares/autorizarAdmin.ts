import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";

export function AutorizarAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.usuario) {
        return res.status(401).json({ mensagem: "Não autenticado" });
    }

    if (req.usuario.role !== "admin") {
        return res.status(403).json({ mensagem: "Acesso restrito a administradores" });
    }

    return next();
}