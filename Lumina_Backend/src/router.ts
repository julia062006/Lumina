import { Router } from "express";
import UsuarioController from "./controllers/usuarioController";
import CategoriaController from "./controllers/categoriaController";
import AutorController from "./controllers/autorController";
import { AutenticarToken } from "./middlewares/autenticarToken";
import upload from "./config/upload";
import LivroController from "./controllers/livroController";
import { validarAtualizacaoUsuario, validarUsuario } from "./middlewares/validarUsuario";
import { validarErros } from "./middlewares/validarErros";

const router = Router();

router.get("/usuarios", AutenticarToken, UsuarioController.findAll);
router.post("/usuarios", validarUsuario, validarErros, UsuarioController.create);
router.get("/usuarios/:id", UsuarioController.getById);
router.delete("/usuarios/:id", AutenticarToken, UsuarioController.remove);
router.put("/usuarios/:id", AutenticarToken, validarAtualizacaoUsuario, UsuarioController.update);
router.post("/entrar", UsuarioController.login);
router.get("/perfil", AutenticarToken, UsuarioController.perfil);

router.get("/categorias", CategoriaController.findAll);
router.post("/categorias", AutenticarToken, CategoriaController.create);
router.get("/categorias/destaque", CategoriaController.findDestaque);
router.get("/categorias/:id", CategoriaController.getById);
router.delete("/categorias/:id", AutenticarToken, CategoriaController.remove);
router.put("/categorias/:id", AutenticarToken, CategoriaController.update);


router.get("/autores", AutorController.findAll);
router.post("/autores", upload.single("foto"), AutenticarToken, AutorController.create);
router.get("/autores/:id", AutorController.getById);
router.delete("/autores/:id", AutenticarToken, AutorController.remove);
router.put("/autores/:id", upload.single("foto"), AutenticarToken, AutorController.update);

router.get("/livros", LivroController.findAll);
router.post("/livros", upload.fields([{ name: "capa_imagem", maxCount: 1 }, { name: "arquivo_pdf", maxCount: 1 }]), AutenticarToken, LivroController.create);
router.get("/livros/destaque", LivroController.getDestaques); 
router.get("/livros/:id", LivroController.getById);           
router.delete("/livros/:id", AutenticarToken, LivroController.remove);
router.put("/livros/:id", upload.fields([{ name: "capa_imagem", maxCount: 1 }, { name: "arquivo_pdf", maxCount: 1 }]), AutenticarToken, LivroController.update);
router.get("/livros/:id/pdf", AutenticarToken, LivroController.abrirPdf);

router.get("/autores/:id/livros", AutorController.findByAutor);

export default router;