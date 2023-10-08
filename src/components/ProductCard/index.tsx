import { Link } from "react-router-dom";

type Props = {
  name: string;
  description: string;
  url: string;
  type?: number;
};

export default function ProductCard({ name, description, url, type }: Props) {
  return (
    <Link
      to={`/products?details=${url}`}
      className="w-1/6 bg-gray-200 p-2 flex gap-2"
    >
      <div
        className={`p-3 select-none px-8 bg-gradient-to-br ${
          type === 1
            ? "from-[#7e35df] to-pink-600"
            : "from-[#24F46E] to-lime-600"
        } rounded font-bold text-6xl`}
      >
        {String(name).charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col w-4/6">
        <span className="font-bold text-xl">{name}</span>
        <p className="text-gra-700 truncate">{description}</p>
        <button className="bg-green-600 hover:bg-green-700 active:bg-green-500 p-2 text-white rounded font-semibold duration-200">
          Detalhes
        </button>
      </div>
    </Link>
  );
}
