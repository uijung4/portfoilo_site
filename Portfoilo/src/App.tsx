import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainRoom from './pages/MainRoom'
import ProjectsRoom from './pages/ProjectsRoom'
import BooksRoom from './pages/BooksRoom'
import ContactRoom from './pages/ContactRoom'
import DalmutiPage from './pages/ProjectsRoom/DalmutiPage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainRoom />} />
          <Route path="/projects" element={<ProjectsRoom />} />
          <Route path="/projects/dalmuti" element={<DalmutiPage />} />
          <Route path="/books" element={<BooksRoom />} />
          <Route path="/contact" element={<ContactRoom />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
