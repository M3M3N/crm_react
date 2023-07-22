import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/Clientes";

export async function action({request}) {
    console.log("Submit del formulario");
    const formDat = await request.formData();
    const datos = Object.fromEntries(formDat);

    const email = formDat.get('email')
    
    //Validacion del form
    const errores = []
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios')
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
        errores.push('El email es invalido')
    }
    //REtornar datos si hay errores
    if(Object.keys(errores).length){
        return errores
    }

    await agregarCliente(datos)

    return redirect('/') //<-- Para actions y loaders.
}

function NuevoCliente() {

    //Para retornar lo que tenemos en los actions
    const errores = useActionData()
    const navigate = useNavigate();

    console.log(errores);

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
            <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate(-1)}
                >Volver</button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

                {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error>)}

                <Form
                    method="post"
                    noValidate
                >
                    <Formulario />

                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-300 p-3 uppercase font-bold text-white text-lg"
                        value="Registrar Cliente"
                    />
                </Form>
            </div>

        </>
    )
}

export default NuevoCliente