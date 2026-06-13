import { Route, Routes } from "react-router-dom";
import "./App.css";
import Menu from "./componentes/Menu";
import Rodape from "./componentes/Rodape";
import CadastroUsuario from "./paginas/CadastroUsuario";
import CadastrarAutor from "./paginas/painel/autores/CadastroAutor";
import Entrar from "./paginas/Entrar";
import CadastrarLivro from "./paginas/painel/livros/CadastroLivro";
import Biblioteca from "./paginas/Biblioteca";
import Inicio from "./paginas/Inicio";
import RotaProtegida from "./rotas/RotaProtegida";
import Autores from "./paginas/Autores";
import Perfil from "./paginas/Perfil";
import EditarPerfil from "./paginas/EditarPerfil";
import Painel from "./paginas/painel/Painel";
import ListarLivros from "./paginas/painel/livros/ListarLivros";
import ListarAutores from "./paginas/painel/autores/ListarAutores";
import ListarUsuarios from "./paginas/painel/usuarios/ListarUsuarios";
import ListarCategorias from "./paginas/painel/categorias/ListarCategorias";
import CadastrarCategoria from "./paginas/painel/categorias/CadastroCategoria";
import EditarAutor from "./paginas/painel/autores/EditarAutor";
import Categorias from "./paginas/Categorias";
import EditarLivro from "./paginas/painel/livros/EditarLivro";
import EditarCategoria from "./paginas/painel/categorias/EditarCategoria";
import ListarEditoras from "./paginas/painel/editoras/ListarEditoras";
import CadastroEditoras from "./paginas/painel/editoras/CadastroEditoras";
import EditarEditoras from "./paginas/painel/editoras/EditarEditoras";
import ListarColecao from "./paginas/painel/colecao/ListarColecao";
import CadastroColecao from "./paginas/painel/colecao/CadastroColecao";
import EditarColecao from "./paginas/painel/colecao/EditarColecao";

function App() {

  return (
    <div>
      <Menu />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
          <Route path="/entrar" element={<Entrar />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
          <Route path="/editarPerfil" element={<RotaProtegida><EditarPerfil /></RotaProtegida>} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/livros/autor/:id" element={<Biblioteca />} />
          <Route path="/categorias" element={<Categorias />} />

          <Route path="/painel" element={<RotaProtegida><Painel /></RotaProtegida>} />

          <Route path="/painel/usuarios" element={<RotaProtegida><ListarUsuarios /></RotaProtegida>} />

          <Route path="/painel/livros" element={<RotaProtegida><ListarLivros /></RotaProtegida>} />
          <Route path="/painel/cadastroLivro" element={<RotaProtegida><CadastrarLivro /></RotaProtegida>} />
          <Route path="/painel/editarLivro/:id" element={<RotaProtegida><EditarLivro /></RotaProtegida>} />

          <Route path="/painel/autores" element={<RotaProtegida><ListarAutores /></RotaProtegida>} />
          <Route path="/painel/cadastroAutor" element={<RotaProtegida><CadastrarAutor /></RotaProtegida>} />
          <Route path="/painel/editarAutor/:id" element={<RotaProtegida><EditarAutor /></RotaProtegida>} />


          <Route path="/painel/categorias" element={<RotaProtegida><ListarCategorias /></RotaProtegida>} />
          <Route path="/painel/cadastroCategoria" element={<RotaProtegida><CadastrarCategoria /></RotaProtegida>} />
          <Route path="/painel/editarCategoria/:id" element={<RotaProtegida><EditarCategoria /></RotaProtegida>} />

          <Route path="/painel/editoras" element={<RotaProtegida><ListarEditoras /></RotaProtegida>} />
          <Route path="/painel/cadastroEditora" element={<RotaProtegida><CadastroEditoras /></RotaProtegida>} />
          <Route path="/painel/editarEditora/:id" element={<RotaProtegida><EditarEditoras /></RotaProtegida>} />

          <Route path="/painel/colecao" element={<RotaProtegida><ListarColecao /></RotaProtegida>} />
          <Route path="/painel/cadastroColecao" element={<RotaProtegida><CadastroColecao /></RotaProtegida>} />
          <Route path="/painel/editarColecao/:id" element={<RotaProtegida><EditarColecao /></RotaProtegida>} />

        </Routes>
      </main>

      <Rodape />
    </div>
  );
}

export default App;