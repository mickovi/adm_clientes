import { useNavigate } from "react-router-dom";

const Client = ({ client, handleDelete }) => {
    const navigate = useNavigate()
    const { firstname, email, phone, enterprise, id } = client
    return ( 
        <tr className="border-b hover:bg-gray-100">
            <td className="p-3">{firstname}</td>
            <td className="p-3">
                <p><span className="font-bold uppercase text-gray-800">Email: </span>{email}</p>
                <p><span className="font-bold uppercase text-gray-800">Teléfono: </span>{phone}</p>
            </td>
            <td className="p-3">{enterprise}</td>
            <td className="p-3">
                <button 
                    type="button" 
                    className="bg-yellow-500 
                               hover:bg-yellow-700 
                               block 
                               w-full 
                               text-white 
                               p-2 
                               uppercase 
                               font-bold 
                               text-xs"
                    onClick={() => navigate(`/clientes/${id}`)}
                >
                    Ver
                </button>
                <button 
                    type="button" 
                    className="bg-blue-600 
                               hover:bg-yellow-700 
                               block 
                               w-full 
                               text-white 
                               p-2 
                               uppercase 
                               font-bold 
                               text-xs
                               mt-2"
                    onClick={() => navigate(`/clientes/editar/${id}`)}
                >
                    Editar
                </button>
                <button 
                    type="button" 
                    className="bg-red-600 
                               hover:bg-yellow-700 
                               block 
                               w-full 
                               text-white 
                               p-2 
                               uppercase 
                               font-bold 
                               text-xs
                               mt-2"
                    onClick={() => handleDelete(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Client;