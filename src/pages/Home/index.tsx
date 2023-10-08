import {
  AlertCircle,
  CheckCircle2,
  CircleDollarSign,
  Popcorn,
  Star,
  X,
  XCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { ProductSkeleton } from "./products.skeleton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BannerSlide from "./bannerSlide";
/* import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"; */

interface ItemProduct {
  [key: string]: boolean | string;
}

interface Products {
  id: number;
  name: string;
  price: number;
  items: ItemProduct[];
  path: string;
}

export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);
  const navigate = useNavigate();
  const search = new URLSearchParams(useLocation().search);
  const form = search.get("form");
  const [animate, setAnimate] = useState("animate-modal-show");

  useEffect(() => {
    document.title = "VLT Art's";

    const db = getDatabase();
    const dbRef = ref(db, "items/products/");
    const fetchProducts = () => {
      onValue(dbRef, (snapshot) => {
        setProducts(snapshot.val());
      });
    };

    fetchProducts();
  }, []);

  const productArray = Object.values(products);

  const closeSucessCheckout = () => {
    setAnimate("animate-modal-hide");
    setTimeout(() => {
      navigate("/");
    }, 501);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <BannerSlide />
        <section className="flex flex-col items-center text-center mt-5 gap-4">
          <h1 className="text-2xl font-bold"></h1>
          <h2 className="font-medium text-xl">Produtos</h2>

          {productArray.length > 0 ? (
            <div className="flex flex-wrap gap-6 w-2/4">
              {productArray.map((product) => (
                <div
                  onClick={() => {
                    navigate(`/products?details=${product.path}`);
                  }}
                  className="select-none cursor-pointer flex flex-col items-center justify-between bg-gray-300 p-2 px-4 min-w-fit rounded hover:-translate-y-6 duration-500"
                  key={product.id}
                >
                  <div className="text-center">
                    <h1 className="font-bold text-xl flex items-center gap-1 text-center">
                      {product.name}
                    </h1>
                    <h2 className="font-bold flex flex-col text-2xl">
                      <span>
                        {product.price}{" "}
                        <span className="text-xl font-normal text-gray-800">
                          R$/mes
                        </span>
                      </span>
                    </h2>
                  </div>

                  <div className="flex flex-col w-full gap-y-2">
                    {Object.entries(product.items).map(([itemName, value]) => {
                      let icon;

                      if (String(value) === "true") {
                        icon = <CheckCircle2 className="text-green-700" />;
                      } else if (String(value) === "false") {
                        icon = <XCircle className="text-red-700" />;
                      } else if (String(value) == "warn") {
                        icon = <AlertCircle className="text-yellow-600" />;
                      }

                      return (
                        <div
                          key={itemName}
                          className="font-medium flex items-center gap-2 bg-gray-200 p-2 w-full"
                        >
                          {icon} {itemName}
                        </div>
                      );
                    })}
                  </div>
                  <Link
                    to={`/products?details=${product.path}`}
                    className="bg-[#1ED760] p-2 rounded font-bold w-full my-2"
                  >
                    DETALHES
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <ProductSkeleton />
          )}

          <h2 className="font-medium text-xl">Pacotes</h2>

          <div className="grid lg:grid-cols-3 gap-6 w-2/4">
            <div
              onClick={() => {
                navigate("/products?details=5WYZOjkxns5H1xbG9kKJCg==");
              }}
              className="cursor-pointer flex flex-col items-center justify-between bg-gradient-to-b from-yellow-300 to-gray-300 p-2 min-h-[20rem] min-w-[16.666667%] rounded hover:-translate-y-6 duration-500"
            >
              <div className="relative w-full font-bold text-xs">
                <span className="md:absolute justify-center md:justify-normal rounded top-0 flex items-center gap-2 bg-yellow-500 p-1">
                  EM DESTAQUE
                </span>
              </div>

              <h1 className="font-medium text-xl flex items-center gap-1">
                <Star /> Sócio
              </h1>
              <h2 className="font-bold flex flex-col text-2xl">
                <s className="font-medium text-red-600 text-base">620 R$</s>
                <span>
                  520{" "}
                  <span className="text-xl font-normal text-gray-800">
                    R$/mes
                  </span>
                </span>
              </h2>
              <div className="flex flex-col gap-y-2 w-full">
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  +1 Logo totalmente gratuita
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  +2 videos de até 30 minutos(depois de editado) por semana
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  +2 thumbnails por semana
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />E muito mais...
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  10% de desconto por pagamento via PIX
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  Economize 151.66%(300 R$)
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <AlertCircle className="text-yellow-600 my-0.5" size={40} />A
                  cada 5 minutos adicionais no video mais adicionais será
                  cobrado uma taxa de 15R$
                </div>
              </div>
              <Link
                to="/products?details=5WYZOjkxns5H1xbG9kKJCg=="
                className="bg-[#1ED760] p-2 rounded font-bold  w-full my-2"
              >
                DETALHES
              </Link>
            </div>

            <div
              onClick={() => {
                navigate("/products?details=hEqS+sR7cmvIjH08xwGJCQ==");
              }}
              className="cursor-pointer flex flex-col items-center justify-between bg-gradient-to-b from-blue-300 to-gray-300 p-2 min-h-[20rem] min-w-[16.666667%] rounded hover:-translate-y-6 duration-500"
            >
              <div className="relative w-full font-bold text-xs">
                <span className="md:absolute justify-center md:justify-normal rounded top-0 flex items-center gap-2 bg-blue-500 p-1">
                  CUSTO BENEFÍCIO
                </span>
              </div>

              <h1 className="font-bold text-xl flex items-center gap-1">
                <CircleDollarSign /> Premium
              </h1>
              <h2 className="font-bold flex flex-col text-2xl">
                <s className="font-medium text-red-600 text-base">299,90 R$</s>
                <span>
                  260{" "}
                  <span className="text-xl font-normal text-gray-800">
                    R$/mes
                  </span>
                </span>
              </h2>
              <div className="flex flex-col gap-y-2 w-full">
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  +1 Logo totalmente gratuita
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  +1 videos de até 25 minutos(depois de editado) por semana
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  +1 thumbnails por semana
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />E muito mais...
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  10% de desconto por pagamento via PIX
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  Economize 157.69%(110,10 R$)
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <AlertCircle className="text-yellow-600 my-0.5" size={40} />A
                  cada 5 minutos adicionais no video mais adicionais será
                  cobrado uma taxa de 15R$
                </div>
              </div>
              <Link
                to="/products?details=hEqS+sR7cmvIjH08xwGJCQ=="
                className="bg-[#1ED760] p-2 rounded font-bold  w-full my-2"
              >
                DETALHES
              </Link>
            </div>

            <div
              onClick={() => {
                navigate("/products?details=je0x6EIdHwy9d10k+GuopQ==");
              }}
              className="cursor-pointer flex flex-col items-center justify-between bg-gradient-to-b from-lime-400 to-gray-300 p-2 min-h-[20rem] min-w-[16.666667%] rounded hover:-translate-y-6 duration-500"
            >
              <h1 className="font-bold text-xl flex items-center gap-1">
                <Popcorn /> Basico
              </h1>
              <h2 className="font-bold flex flex-col text-2xl">
                <span>
                  260{" "}
                  <span className="text-xl font-normal text-gray-800">
                    R$/mes
                  </span>
                </span>
              </h2>
              <div className="flex flex-col gap-y-2 w-full">
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <XCircle className="text-red-700" />
                  +1 Logo totalmente gratuita
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  +1 videos de até 20 minutos(depois de editado) por semana
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  +1 thumbnails por semana
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />E muito mais...
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  10% de desconto por pagamento via PIX
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <CheckCircle2 className="text-green-700" />
                  Economize 123,07%(60R$)
                </div>
                <div className="font-medium flex items-center gap-2 bg-gray-200 p-2">
                  <AlertCircle className="text-yellow-600 my-0.5" size={40} />A
                  cada 5 minutos adicionais no video mais adicionais será
                  cobrado uma taxa de 15R$
                </div>
              </div>
              <Link
                to="/products?details=je0x6EIdHwy9d10k+GuopQ=="
                className="bg-[#1ED760] p-2 rounded font-bold  w-full my-2"
              >
                DETALHES
              </Link>
            </div>
          </div>
        </section>
        {/*         <section className="flex flex-col items-center text-center mt-5 gap-4">
          <Accordion type="single" collapsible className="w-1/4">
            <AccordionItem value="1">
              <AccordionTrigger>Quais são os benefícios?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Nossos serviços podem ajudar a trazer uma nova cara para sua
                  empresa, negócio individual ou até mesmo seu canal no YouTube.
                  Oferecemos uma variedade de serviços, incluindo o design de
                  logos, a criação de thumbnails e a edição de vídeos simples e
                  curtos. Nosso objetivo é ajudá-lo a chamar a atenção de seu
                  público-alvo e a aumentar a visibilidade de sua marca.
                </p>
                <p>
                  Aqui estão alguns dos benefícios específicos de nossos
                  serviços:
                </p>
                <p>
                  <span className="text-gray-500 font-medium">-</span> Logos de
                  alta qualidade que ajudarão sua empresa a se destacar da
                  concorrência.
                </p>
                <p>
                  <span className="text-gray-500 font-medium">-</span>{" "}
                  Thumbnails atraentes que chamarão a atenção dos espectadores e
                  os levarão a clicar em seus vídeos.
                </p>
                <p>
                  <span className="text-gray-500 font-medium">-</span> Vídeos
                  editados profissionalmente que serão de alta qualidade e
                  atraentes para os espectadores.
                </p>
                <p>
                  Se você está procurando uma maneira de melhorar a aparência de
                  sua empresa ou canal, entre em contato conosco hoje. Ficaremos
                  felizes em ajudá-lo a alcançar seus objetivos.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section> */}
      </div>
      {form == "sucessCheckout" && (
        <div className="flex items-center justify-center top-0 left-0 h-screen fixed w-full bg-white bg-opacity-50 overflow-hidden">
          <div
            className={`${animate} p-2 bg-gray-200 shadow w-1/4 text-center`}
          >
            <div
              className="relative hover:text-red-500 duration-300 cursor-pointer"
              onClick={closeSucessCheckout}
            >
              <X className="absolute" />
            </div>
            <h1 className="font-bold text-center">
              COMPRA CONCLUIDA COM SUCESSO!
            </h1>
            <h2>
              Estamos analisando sua compra e logo após entraremos em contato
              com você!
            </h2>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
