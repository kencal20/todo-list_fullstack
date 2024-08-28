import { componentProps } from "./objects.models";

type Props = componentProps["inputProps"];

export default function InputComponent({label, placeholder, name, value, onChange, type, className, children }: Props) {
    if (type === "select") {
        return (
            <div>
                <label>{label}</label>
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`p-2 border rounded ${className}`}
                >
                    {children}
                </select>
            </div>
        );
    }

    return (
        <div>
            <label>{label}</label>
            <input
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                className={`p-2 border rounded ${className}`}
            />
        </div>
    );
}
