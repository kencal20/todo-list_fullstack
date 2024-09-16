import { componentProps } from "./objects.models";

type Props = componentProps['cardProps']

export default function CardComponent({ title, children, backgroundColor = "bg-white", textColor = "text-gray-800", onClick }: Props) {
    return (
        <div
            className={`${backgroundColor} p-4 rounded-lg shadow-md cursor-pointer hover:opacity-90`}
            onClick={onClick}
        >
            <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
            <p className={`text-2xl font-bold ${textColor}`}>{children}</p>
        </div>
    );
}
