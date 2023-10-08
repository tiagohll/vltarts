import { Link } from "react-router-dom";

type Props = {
  name: string;
  description: string;
  url: string;
  type?: number;
};

export default function ProductCard({ name, description, url, type }: Props) {
  return (
    <Link to={`/products?details=${url}`} className="w-full bg-gray-200 p-2">
      <div className="flex gap-3">
        <div
          className={`p-1 px-2 rounded select-none bg-gradient-to-br ${
            type === 1
              ? "from-[#7e35df] to-pink-600"
              : "from-[#24F46E] to-lime-600"
          } rounded font-bold`}
        >
          {String(name).charAt(0).toUpperCase()}
        </div>
        <span className="font-bold text-xl break-words max-w-1/6">{name}</span>
      </div>
      <p className="text-gra-700 truncate">{description}</p>
      <button className="bg-green-600 hover:bg-green-700 active:bg-green-500 p-2 text-white rounded font-semibold duration-200">
        Detalhes
      </button>
    </Link>
  );
}
