import { Router } from "express";
import UsuarioController from "./controllers/usuarioController";
import CategoriaController from "./controllers/categoriaController";
import AutorController from "./controllers/autorController";
import { AutenticarToken } from "./middlewares/autenticarToken";
import upload from "./config/upload";
import LivroController from "./controllers/livroController";
import { validarAtualizacaoUsuario, validarUsuario } from "./middlewares/validarUsuario";
import { validarErros } from "./middlewares/validarErros";
import EditoraController from "./controllers/editoraController";
import ColecaoController from "./controllers/colecaoController";
import { AutorizarAdmin } from "./middlewares/autorizarAdmin";

const router = Router();

router.post("/usuarios", upload.single("foto_perfil"), validarUsuario, validarErros, UsuarioController.create);
router.post("/entrar", UsuarioController.login);

router.use(AutenticarToken);

router.get("/usuarios", AutorizarAdmin, UsuarioController.findAll);
router.get("/usuarios/:id", UsuarioController.getById);
router.delete("/usuarios/:id", AutorizarAdmin, UsuarioController.remove);
router.put("/usuarios/:id", upload.single("foto_perfil"), validarAtualizacaoUsuario, UsuarioController.update);
router.get("/perfil", UsuarioController.perfil);


router.get("/categorias", CategoriaController.findAll);
router.post("/categorias", AutenticarToken, CategoriaController.create);
router.get("/categorias/destaque", CategoriaController.findDestaque);
router.get("/categorias/:id", CategoriaController.getById);
router.delete("/categorias/:id", AutorizarAdmin, CategoriaController.remove);
router.put("/categorias/:id", AutorizarAdmin, CategoriaController.update);


router.get("/autores", AutorController.findAll);
router.post("/autores", upload.single("foto"), AutorizarAdmin, AutorController.create);
router.get("/autores/:id", AutorController.getById);
router.delete("/autores/:id", AutorizarAdmin, AutorController.remove);
router.put("/autores/:id", upload.single("foto"), AutorizarAdmin, AutorController.update);
router.get("/autores/:id/livros", AutorController.findByAutor);


router.get("/livros", LivroController.findAll);
router.post("/livros", upload.fields([{ name: "capa_imagem", maxCount: 1 }, { name: "arquivo_pdf", maxCount: 1 }]), AutorizarAdmin, LivroController.create);
router.get("/livros/destaque", LivroController.getDestaques);
router.get("/livros/:id", LivroController.getById);
router.delete("/livros/:id", AutorizarAdmin, LivroController.remove);
router.put("/livros/:id", upload.fields([{ name: "capa_imagem", maxCount: 1 }, { name: "arquivo_pdf", maxCount: 1 }]), AutorizarAdmin, LivroController.update);
router.get("/livros/:id/pdf", LivroController.abrirPdf);


router.get("/editoras", EditoraController.findAll);
router.get("/editoras/:id", EditoraController.getById);
router.post("/editoras", AutorizarAdmin, EditoraController.create);
router.put("/editoras/:id", AutorizarAdmin, EditoraController.update);
router.delete("/editoras/:id", AutorizarAdmin, EditoraController.remove);


router.get("/colecoes", ColecaoController.findAll);
router.get("/colecoes/:id", ColecaoController.getById);
router.post("/colecoes", AutorizarAdmin, ColecaoController.create);
router.put("/colecoes/:id", AutorizarAdmin, ColecaoController.update);
router.delete("/colecoes/:id", AutorizarAdmin, ColecaoController.remove);

export default router;