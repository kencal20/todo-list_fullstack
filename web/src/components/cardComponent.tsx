import { componentProps } from "./objects.models";

type Props = componentProps['cardProps']

export default function CardComponent({ title, children, backgroundColor = "bg-white", textColor = "text-gray-800",  }: Props) {
    return (
        <div
            className={`${backgroundColor} p-4 rounded-lg shadow-md cursor-pointer hover:opacity-90`}
        >
            <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
            <p className={`text-2xl font-semibold ${textColor}`}>{children}</p>
        </div>
    );
}
