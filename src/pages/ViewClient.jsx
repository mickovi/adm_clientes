import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner";

const ViewClient = () => {
  const { id } = useParams()
  const [ client, setClient ] = useState({})
  const [ loading, setLoading ] = useState(true)
  useEffect(() => {
    const getClientID = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const response = await fetch(url)
        const responseJson = await response.json()
        setClient(responseJson)
      } catch (error) {
        console.log(error);
      }
      setLoading(!loading)
    }
    getClientID()
  }, [])
  return (
    loading ? <Spinner /> : Object.keys(client).length === 0 ? <p>Cliente no encontrado</p> : (
      <div>
        <h1 className="font-black text-2xl text-blue-900">Cliente: {client.firstname}</h1>
        {/* <p className="mt-3">Información del cliente</p> */}
        {/* <p className="text-xl text-gray-600">
          <span className="text-gray-700 font-bold">Cliente: </span>{client.firstname}
        </p> */}
        <p className="text-xl text-gray-600">
          <span className="text-gray-700 font-bold">Email: </span>{client.email}
        </p>
        {client.phone && (
          <p className="text-xl text-gray-600">
          <span className="text-gray-700 font-bold">Teléfono: </span>{client.phone}
        </p>
        )}
        <p className="text-xl text-gray-600">
          <span className="text-gray-700 font-bold">Empresa: </span>{client.enterprise}
        </p>
        {/* Solo se muestra si el cliente ha escrito una nota */}
        {client.notes && (
          <p className="text-xl text-gray-600">
          <span className="text-gray-700 font-bold">Notas: </span>{client.notes}
        </p>
        )}
      </div>
    )
  )
}

export default ViewClient