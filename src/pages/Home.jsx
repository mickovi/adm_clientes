import { useState, useEffect } from 'react'
import Client from '../components/Client'

function Home() {
  const [clients, setClients] = useState([])
  useEffect(() => {
    const getAPIclient = async () => {
      try {
        const url = 'http://localhost:4000/clientes'
        const response = await fetch(url) // Default method = GET
        const result = await response.json()
        setClients(result)
      } catch (error) {
        console.log(error)
      }
    }
    getAPIclient()
  }, [])
  const handleDelete = async id => {
    const confirmDelete = confirm('¿Seguro que deseas eliminar este cliente?')
    if (confirmDelete) {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const response = await fetch(url, {
          method: 'DELETE'
        })
        await response.json()
        const arrayClients = clients.filter(client => client.id !== id)
        setClients(arrayClients)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <h1 className="font-black text-2xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clients.map( client => (
              <Client 
                key={client.id}
                client={client}
                handleDelete={handleDelete}
              />
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Home