"use client"
import { SubmitButton } from "../submit-button"
import { signUp } from "../HandleLogin"
import { useState } from "react";
export default function userSignUp() {
    const [fields, setFields] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        repeatpassword: ""
    });
    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        });
    }
    const areFieldsNotEmpty = fields.name !== "" && fields.lastName !== "" && fields.email !== "" && fields.password !== "" && fields.repeatpassword !== "" && fields.password === fields.repeatpassword;
    return (
        <div>
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <label htmlFor="name" className="text-md">Nombres</label>
                <input type="text" name="name" placeholder="nombres" value={fields.name} onChange={handleFieldChange} />
                <label htmlFor="lastName" className="text-md">Apellidos</label>
                <input type="text" name="lastName" placeholder="Apellidos" value={fields.lastName} onChange={handleFieldChange} />
                <label htmlFor="email" className="text-md">Correo</label>
                <input type="email" name="email" placeholder="nombreusuario@email.com" value={fields.email} onChange={handleFieldChange} />
                <label htmlFor="password" className="text-md">Contraseña</label>
                <input type="password" name="password" placeholder="••••••••" value={fields.password} onChange={handleFieldChange} />
                <label htmlFor="repeatpassword">Repetir contraseña</label>
                <input type="password" name="repeatpassword" placeholder="••••••••" value={fields.repeatpassword} onChange={handleFieldChange} />
                <SubmitButton
                    formAction={signUp}
                    className=""
                    pendingText="Signing Up..."
                    disabled={!areFieldsNotEmpty}
                >
                    Registrarse
                </SubmitButton>
            </form>
        </div>
    )
}