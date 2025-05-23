import { Route, Routes } from 'react-router-dom'
import Inventaire from './pages/Inventaire'
import Ajouter from './pages/Ajouter'
import Scanner from './pages/Scanner'
import NavBar from './components/custom/NavBar'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <div className="h-[calc(100vh-56px)] overflow-y-auto">
        <Routes>
          <Route path="/inventaire" element={<Inventaire />} />
          <Route path="/" element={<Scanner />} />
          <Route path="/ajouter" element={<Ajouter />} />
        </Routes>
        <NavBar />
        <Toaster />
      </div>

    </>
  )
}

export default App
