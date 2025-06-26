import { Route, Routes } from 'react-router-dom'
import ListeBatiments from './pages/inventaire/ListeBatiments'
import Ajouter from './pages/ajouter/Ajouter'
import Scanner from './pages/scanner/Scanner'
import NavBar from './components/custom/NavBar'
import Layout from './components/custom/Layout'
import ListeEtages from './pages/inventaire/ListeEtages'
import ListePieces from './pages/inventaire/ListePieces'
import ListeArticles from './pages/inventaire/ListeArticles'
import ModifierArticle from './pages/inventaire/ModifierArticle'
import Archives from './pages/inventaire/Archives'

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/inventaire">
            <Route index element={<ListeBatiments />} />
            <Route path=":batimentId" element={<ListeEtages />} />
            <Route path=":batimentId/:etageId" element={<ListePieces />} />
            <Route path=":batimentId/:etageId/:pieceId" element={<ListeArticles />} />
            <Route path=":articleId/modifier" element={<ModifierArticle />} />
            <Route path="archives" element={<Archives />} />
          </Route>
          <Route path="/" element={<Scanner />} />
          <Route path="/ajouter" element={<Ajouter />} />
        </Routes>
      </Layout>
      <NavBar />
    </>
  )
}
