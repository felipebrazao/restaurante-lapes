import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    name: string
}

export function Input ({label,name, ...rest}: InputProps) {
    return(
        <div className="mb-4">
            <label htmlFor={name} className="block mb-2 font-semibold text-gray-800">
                {label}
            </label>
            <input
            id={name}
            name={name}
            className="w-full border rounded px-3 py-2 focus:outline-none"
            {...rest}
            />
        </div>   
    );
}