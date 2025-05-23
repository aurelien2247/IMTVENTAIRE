import { Route, Routes } from 'react-router-dom'
import Inventaire from './pages/Inventaire'
import Ajouter from './pages/Ajouter'
import Scanner from './pages/Scanner'
import NavBar from './components/custom/NavBar'
import Layout from './components/custom/Layout'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/inventaire" element={<Inventaire />} />
          <Route path="/" element={<Scanner />} />
          <Route path="/ajouter" element={<Ajouter />} />
        </Routes>
      </Layout>
      <NavBar />
      <Toaster />
    </>
  )
}

export default App
