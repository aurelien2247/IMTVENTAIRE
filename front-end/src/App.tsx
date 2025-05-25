import { Route, Routes } from 'react-router-dom'
import Inventaire from './pages/inventaire/Inventaire'
import Ajouter from './pages/ajouter/Ajouter'
import Scanner from './pages/scanner/Scanner'
import NavBar from './components/custom/NavBar'
import Layout from './components/custom/Layout'
import Batiment from './pages/inventaire/EtageList'
import PieceList from './pages/inventaire/PieceList'
import ArticleList from './pages/inventaire/ArticleList'
import ModifierArticle from './pages/inventaire/ModifierArticle'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/inventaire">
            <Route index element={<Inventaire />} />
            <Route path=":batimentId" element={<Batiment />} />
            <Route path=":batimentId/:etageId" element={<PieceList />} />
            <Route path=":batimentId/:etageId/:pieceId" element={<ArticleList />} />
            <Route path=":batimentId/:etageId/:pieceId/:articleId" element={<ModifierArticle />} />
          </Route>
          <Route path="/" element={<Scanner />} />
          <Route path="/ajouter" element={<Ajouter />} />
        </Routes>
      </Layout>
      <NavBar />
    </>
  )
}

export default App
