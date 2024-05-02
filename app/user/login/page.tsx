"use client"
import { SubmitButton } from "../submit-button"
import { LogSignUp, SignIn} from "../HandleLogin"
import { useEffect, useState } from "react";
export default function userLogin({
    searchParams,
}: {
    searchParams: { message: string };
}): JSX.Element {
    const [logFields, setLogFields] = useState({
        email: "",
        password: "",
    });
    
    const [message, setMessage] = useState<string>(searchParams?.message || "");

    const handleLogFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogFields({
            ...logFields,
            [e.target.name]: e.target.value,
        });
    }
 

    const areFieldsNotEmpty = logFields.email !== "" && logFields.password !== ""; //verifica que los inputs no esten vacios

    const HandleSignIn = async (formData: FormData) => {
        await SignIn(formData);
        if (!searchParams?.message) {
            setMessage("");
        } else {
            setMessage(searchParams?.message);
        }
    }
    
    useEffect(() => {
         if(message !== ""){
            const timer = setTimeout(() => {
                setMessage(""); // Limpia el mensaje después de unos instantes
            }, 2000); // Tiempo que aparece el mensaje en mmilisegundos
            return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
        }
    }, [message]);
    

    return (
        <div>
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">

                <label htmlFor="email" className="text-md">Correo</label>
                <input type="email" name="email" placeholder="useremail@email.com" className="" value={logFields.email} onChange={handleLogFieldChange} />
                <label htmlFor="password" className="text-md">Contraseña</label>
                <input type="password" className="" name="password" placeholder="••••••••" value={logFields.password} onChange={handleLogFieldChange} />
                <SubmitButton
                    formAction={HandleSignIn}
                    className=""
                    pendingText="Signing In..."
                    disabled={!areFieldsNotEmpty} //desabilita el boton si los campos estan vacios
                >
                    Iniciar Sesion
                </SubmitButton>
                <SubmitButton
                    formAction={LogSignUp}
                    className=""
                    pendingText="sign up..."
                >
                    Registrarse
                </SubmitButton>
                {message !== "" && (
                    
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {message}
                    </p>
                )}
            </form>


        </div>
    )
}