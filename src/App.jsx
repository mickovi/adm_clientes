import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import NewClient from "./pages/NewClient"
import EditClient from "./pages/EditClient"
import ViewClient from "./pages/ViewClient"

function App() {
  // console.log(import.meta.env)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />}>
          {/* index = El componente a cargarse cuando se visite la ruta "/clientes" */}
          <Route index element={<Home />} />
          <Route path="nuevo" element={<NewClient />} />
          <Route path="editar/:id" element={<EditClient />} />
          <Route path=":id" element={<ViewClient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
