import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import ErrorMessages from "./ErrorMessages"
import Spinner from "./Spinner"

const FormClients = ({client, loading}) => {
  const navigate = useNavigate()
  // Validación
  const newClientSchema = Yup.object().shape(
    {
      firstname: Yup.string()
                    .min(3, 'Nombre muy corto')
                    .required('Este campo es obligatorio'),
      email: Yup.string()
                .email('Email no válido')
                .required('Este campo es obligatorio'),
      phone: Yup.number('Número no válido')
                .positive('Número no válido')
                .integer('Número no válido')
                .typeError('Número no válido'),
      enterprise: Yup.string()
                     .required('Este campo es obligatorio'),
      notes: Yup.string()
    }
    /* TODO: No permitir que se agregen letras en el campo phone */
  )
  const handleSubmit = async values => {
    try {
      let response
      if (client.id) {
        // Editar un cliente
        const url = `${import.meta.env.VITE_API_URL}/${client.id}`
        response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
      } else {
        // Agregar nuevo cliente
        const url = `${import.meta.env.VITE_API_URL}`    
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
      }
      await response.json();
      navigate('/clientes');
    } catch (error) {
      console.log(error);
    }
  }
  /* if (loading) return <Spinner />  Alternativa a el operador ternario */
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
            {client?.firstname ? 'Editar Cliente' : 'Agregar Cliente'}
        </h1>
        <Formik
          // Valores iniciales
          initialValues={
            {
              firstname: client?.firstname ?? "",
              email: client?.email ?? "",
              phone: client?.phone ?? "",
              enterprise: client?.enterprise ?? "",
              notes: client?.notes ?? "",
            }
          }
          /* 
            enableReinitialize toma valores por defecto de alguna API, DB, GraphQL, etc 
            y lo muestra en el formulario. 
          */
          enableReinitialize={true}
          onSubmit={ 
            async (values, {resetForm}) => {
              await handleSubmit(values);
              resetForm();
            }
          }
          validationSchema={newClientSchema}
        >
          {/* Código JS */}
          {
            ( {errors, touched} ) => {
              // {errors, touched} es destructuring del objeto de formik
              return (
                <Form
                  className="mt-5"
                >
                  <div>
                    <label
                      className="text-gray-800"
                      htmlFor="firstname"
                    >
                      Nombre:
                    </label>
                    <Field 
                      id="firstname"
                      name="firstname"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      /* placeholder="Nombre del Cliente" */
                    />
                    { errors.firstname && touched.firstname ? ( <ErrorMessages>{errors.firstname}</ErrorMessages> ) : null }
                  </div>
                  <div>
                    <label
                      className="text-gray-800"
                      htmlFor="email"
                    >
                      Correo electrónico:
                    </label>
                    <Field 
                      id="email"
                      name="email"
                      type="email"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      /* placeholder="Nombre del Cliente" */
                    />
                    { errors.email && touched.email ? ( <ErrorMessages>{errors.email}</ErrorMessages> ) : null }
                  </div>
                  <div>
                    <label
                      className="text-gray-800"
                      htmlFor="phone"
                    >
                      Teléfono:
                    </label>
                    <Field 
                      id="phone"
                      name="phone"
                      type="tel"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      /* placeholder="Nombre del Cliente" */
                    />
                    { errors.phone && touched.phone ? ( <ErrorMessages>{errors.phone}</ErrorMessages> ) : null }
                  </div>
                  <div>
                    <label
                      className="text-gray-800"
                      htmlFor="enterprise"
                    >
                      Empresa:
                    </label>
                    <Field 
                      id="enterprise"
                      name="enterprise"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      /* placeholder="Nombre del Cliente" */
                    />
                    { errors.enterprise && touched.enterprise ? ( <ErrorMessages>{errors.enterprise}</ErrorMessages> ) : null }
                  </div>
                  <div>
                    <label
                      className="text-gray-800"
                      htmlFor="notes"
                    >
                      Notas:
                    </label>
                    <Field 
                      id="notes"
                      name="notes"
                      type="text"
                      as="textarea"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      /* placeholder="Nombre del Cliente" */
                    />
                    { errors.notes && touched.notes ? ( <ErrorMessages>{errors.notes}</ErrorMessages> ) : null }
                  </div>
                  <input 
                    type="submit" 
                    value={client?.firstname ? 'Editar Cliente' : 'Agregar Cliente'}
                    className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                  />
                </Form>
              )
            }
          } 
        </Formik>
    </div>
  )
}

FormClients.defaultProps = {
  client: {},
  loading: false,
}

export default FormClients