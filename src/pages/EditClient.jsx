import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import FormClients from '../components/FormClients'
import Spinner from "../components/Spinner";

function EditClient() {
  const { id } = useParams()
  const [ client, setClient ] = useState({})
  const [ loading, setLoading ] = useState(true)
  useEffect(() => {
    const getClientID = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
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
    <>
      <h1 className="font-black text-2xl text-blue-900">Editar Cliente</h1>
      {
        loading ? <Spinner /> :
                  client?.firstname ? (
                    <FormClients 
                      client={client}
                      loading={loading}
                    />
                  )
                : <p>Cliente no encontrado</p>
      }
    </>
  )
}

export default EditClient