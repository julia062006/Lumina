import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "./Input";

function InputSenha({ label, name, placeholder, register, error }) {
    const [mostrar, setMostrar] = useState(false);

    return (
        <div className="relative">
            <Input
                label={label}
                name={name}
                type={mostrar ? "text" : "password"}
                placeholder={placeholder}
                register={register}
                error={error}
            />
            <button
                type="button"
                onClick={() => setMostrar(!mostrar)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
                {mostrar ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
        </div>
    );
}

export default InputSenha;