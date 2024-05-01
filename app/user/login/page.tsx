"use client"
import { SubmitButton } from "../submit-button"
import { LogSignUp, SignIn } from "../HandleLogin"
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

    const handleLogFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogFields({
            ...logFields,
            [e.target.name]: e.target.value,
        });
    }

    const [message, setMessage] = useState(searchParams?.message || "");

    useEffect(() => {

        const timer = setTimeout(() => {
            setMessage("");
        }, 2500); // 2500 milisegundos = 2,5 segundos

        return () => clearTimeout(timer);
    }, [searchParams.message]);
    // maneja la cantidad de tiempo que el mensaje de error se muestra en pantalla si el login no es validado

    const areFieldsNotEmpty = logFields.email !== "" && logFields.password !== ""; //verifica que los inputs no esten vacios

    return (
        <div>
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">

                <label htmlFor="email" className="text-md">Correo</label>
                <input type="email" name="email" placeholder="useremail@email.com" className="" value={logFields.email} onChange={handleLogFieldChange} />
                <label htmlFor="password" className="text-md">Contraseña</label>
                <input type="password" className="" name="password" placeholder="••••••••" value={logFields.password} onChange={handleLogFieldChange} />
                <SubmitButton
                    formAction={SignIn}
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
                {message !== "" ? (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {message}
                    </p>
                ) : null}
            </form>


        </div>
    )
}