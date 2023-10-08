import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Check, Plus, X } from "lucide-react";
import { auth } from "../../services/firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

interface AddProduct {
  name: string;
  category: string;
  price: number;
}

/* const items = [
  "zFF7r01N1VRY9bRlzxDAAXqlD87MuRwBM9jtOTWssE8=", // EdSi
  "pQdnGRnKivSbqqONF3VahQ==", // Ba
  "2JTJOEplz6zVSnTHT6z1Ew==", // Lg
  "IJqf66wDTzP37QHy1OlLiQ==", // Tn
  "jCgkAmJpg6eRZ/JM/OXgAQ==", // Sh
]; */

export default function Product() {
  const search = new URLSearchParams(useLocation().search);
  const id = search.get("details");
  const user = auth.currentUser;
  const [addProduct, setAddProduct] = useState<AddProduct>();
  const [animate, setAnimate] = useState("");
  const [addError, setAddError] = useState(false);

  const addCart = (itemName: string) => {
    const dbRef = ref(getDatabase(), `users/${user?.uid}/cart/` + itemName);
    if (itemName == "Logo") {
      setAnimate("animate-slide-in");
      setAddProduct({
        name: "Logo",
        category: "Imagens",
        price: 30,
      });

      set(dbRef, {
        id: 1,
        name: "Logo",
        category: "Imagens",
        price: 30,
        ammount: 1,
      });

      setTimeout(() => {
        setAnimate("animate-slide-down");
        setTimeout(() => {
          setAddProduct(undefined);
        }, 550);
      }, 5000);
    } else if (itemName == "Thumbnail") {
      setAnimate("animate-slide-in");
      setAddProduct({
        name: "Thumbnail",
        category: "Imagens",
        price: 25,
      });

      set(dbRef, {
        id: 2,
        name: "Thumbnail",
        category: "Imagens",
        price: 25,
        ammount: 1,
      });

      setTimeout(() => {
        setAnimate("animate-slide-down");
        setTimeout(() => {
          setAddProduct(undefined);
        }, 550);
      }, 5000);
    } else if (itemName == "Edição Simples") {
      setAnimate("animate-slide-in");
      setAddProduct({
        name: "Edição Simples",
        category: "Videos",
        price: 50,
      });

      set(dbRef, {
        id: 3,
        name: "Edição Simples",
        category: "Videos",
        price: 50,
        ammount: 1,
      });

      setTimeout(() => {
        setAnimate("animate-slide-down");
        setTimeout(() => {
          setAddProduct(undefined);
        }, 550);
      }, 5000);
    } else if (itemName == "Shorts") {
      setAnimate("animate-slide-in");
      setAddProduct({
        name: "Shorts",
        category: "Videos",
        price: 10,
      });

      set(dbRef, {
        id: 7,
        name: "Shorts",
        category: "Videos",
        price: 10,
        ammount: 1,
      });

      setTimeout(() => {
        setAnimate("animate-slide-down");
        setTimeout(() => {
          setAddProduct(undefined);
        }, 550);
      }, 5000);
    } else if (itemName == "Sócio") {
      setAnimate("animate-slide-in");
      setAddProduct({
        name: "Sócio",
        category: "Pacotes",
        price: 520,
      });

      set(dbRef, {
        id: 4,
        name: "Sócio",
        category: "Pacotes",
        price: 520,
        ammount: 1,
      });

      setTimeout(() => {
        setAnimate("animate-slide-down");
        setTimeout(() => {
          setAddProduct(undefined);
        }, 550);
      }, 5000);
    } else if (itemName == "Banner") {
      setAnimate("animate-slide-in");
      setAddProduct({
        name: "Banner",
        category: "Imagens",
        price: 40,
      });

      set(dbRef, {
        id: 8,
        name: "Banner",
        category: "Imagens",
        price: 40,
        ammount: 1,
      });

      setTimeout(() => {
        setAnimate("animate-slide-down");
        setTimeout(() => {
          setAddProduct(undefined);
        }, 550);
      }, 5000);
    } else if (itemName == "Premium") {
      setAnimate("animate-slide-in");
      setAddProduct({
        name: "Premium",
        category: "Pacotes",
        price: 260,
      });

      set(dbRef, {
        id: 5,
        name: "Premium",
        category: "Pacotes",
        price: 260,
        ammount: 1,
      });

      setTimeout(() => {
        setAnimate("animate-slide-down");
        setTimeout(() => {
          setAddProduct(undefined);
        }, 550);
      }, 5000);
    } else if (itemName == "Básico") {
      setAnimate("animate-slide-in");
      setAddProduct({
        name: "Básico",
        category: "Pacotes",
        price: 260,
      });

      set(dbRef, {
        id: 6,
        name: "Básico",
        category: "Pacotes",
        price: 260,
        ammount: 1,
      });

      setTimeout(() => {
        setAnimate("animate-slide-down");
        setTimeout(() => {
          setAddProduct(undefined);
        }, 550);
      }, 5000);
    } else {
      setAnimate("animate-slide-in");
      setAddError(true);

      setTimeout(() => {
        setAnimate("animate-slide-down");
        setTimeout(() => {
          setAddError(false);
        }, 550);
      }, 5000);
    }
  };

  useEffect(() => {
    document.title = "Produtos - VLT Art's";
  })

  return (
    <section>
      <Header />
      <div className="flex flex-col items-center text-center w-full my-5">
        {id == "zFF7r01N1VRY9bRlzxDAAXqlD87MuRwBM9jtOTWssE8=" && (
          <>
            <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
              E
            </div>
            <h1 className="font-bold text-2xl text-center flex">
              Edição simples
            </h1>
            <button
              className="p-2 bg-green-500 rounded flex gap-x-2 font-medium my-3"
              onClick={() => addCart("Edição Simples")}
            >
              <Plus /> Adicionar ao carrinho
            </button>
            <div className="max-w-xl gap-5">
              <h1 className="font-bold">Edição de vídeo simples e econômica</h1>
              <p>
                Oferecemos um serviço de edição de vídeo simples e econômico.
                Podemos editar vídeos de até 15 minutos de duração, incluindo
                cortar, recortar, adicionar música, títulos e transições. Se o
                seu vídeo for mais longo que 15 minutos, cobraremos uma taxa de
                R$ 15 por cada 5 minutos adicionais.
              </p>
              <p>
                Nossos editores são profissionais experientes que podem ajudá-lo
                a criar um vídeo de aparência profissional. Trabalharemos com
                você para entender suas necessidades e criar um vídeo que atenda
                aos seus padrões.
              </p>
              <h1 className="font-bold">
                Quais são os tipos de edição que você oferece?
              </h1>
              <li>Corte e edição</li>
              <li>
                Adição de música, legendas, cortes, efeitos simples transições,
                memes
              </li>
              <h1 className="font-bold">
                Quanto tempo leva para editar um vídeo?
              </h1>
              <p>
                O tempo necessário para editar um vídeo varia de acordo com o
                tamanho do vídeo e os tipos de edição que você solicitar.
                Geralmente, leva entre 12 e 60 horas para editar um vídeo de até
                15 minutos de duração.
              </p>
              <h1 className="font-bold">
                Quais são suas políticas de reembolso?
              </h1>
              <p>
                Se você não estiver satisfeito com o resultado da edição, poderá
                solicitar um reembolso dentro de 16 horas após o recebimento do
                vídeo. Após o reembolso, você precisará remover o vídeo do ar.
                Se você não remover o vídeo do ar, poderemos entrar na justiça
                para apagar seu vídeo.
              </p>
              <h2 className="font-medium">
                Entre em contato conosco hoje para saber mais sobre nosso
                serviço de edição de vídeo simples e econômico!
              </h2>
            </div>
          </>
        )}

        {id == "2JTJOEplz6zVSnTHT6z1Ew==" && (
          <>
            <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
              L
            </div>
            <h1 className="font-bold text-2xl text-center flex">Logo</h1>
            <button
              className="p-2 bg-green-500 rounded flex gap-x-2 font-medium my-3"
              onClick={() => addCart("Logo")}
            >
              <Plus /> Adicionar ao carrinho
            </button>
            <div className="max-w-xl">
              <h2 className="font-bold">Logo simples e profissional</h2>
              <p>
                Se você está procurando um logo simples e profissional para sua
                empresa, não procure mais! Oferecemos um serviço de design de
                logo que é acessível e de qualidade. Podemos criar um logo que
                seja relevante para sua empresa e que seja fácil de lembrar e
                identificar.
              </p>
              <p>
                Para apenas R$30, você pode obter um logo simples e
                profissional. E para R$50, você pode ter direito a uma logo
                clara e escura para sua empresa.
              </p>
              <p>
                Nossos designers são profissionais experientes que podem
                ajudá-lo a criar um logo que atenda às suas necessidades.
                Trabalharemos com você para entender suas ideias e criar um logo
                que seja perfeito para sua empresa.
              </p>
              <p>
                Entre em contato conosco hoje para saber mais sobre nosso
                serviço de design de logo!
              </p>
              <h2 className="font-bold">
                Aqui estão alguns dos benefícios de ter um logo profissional:
              </h2>
              <li>
                Um logo profissional pode ajudá-lo a se destacar da
                concorrência.
              </li>
              <li>
                Um logo profissional pode ajudar a construir a confiança com
                seus clientes.
              </li>
              <li>Um logo profissional pode ajudar a aumentar as vendas.</li>
              <li>
                Um logo profissional pode ajudar a criar uma identidade única
                para sua empresa.
              </li>
              <h2 className="font-medium">
                Se você está procurando um logo profissional que ajude a sua
                empresa a crescer, entre em contato conosco hoje!
              </h2>
            </div>
          </>
        )}

        {id == "IJqf66wDTzP37QHy1OlLiQ==" && (
          <>
            <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
              T
            </div>
            <h1 className="font-bold text-2xl text-center flex">Thumbnail</h1>
            <button
              className="p-2 bg-green-500 rounded flex gap-x-2 font-medium my-3"
              onClick={() => addCart("Thumbnail")}
            >
              <Plus /> Adicionar ao carrinho
            </button>
            <div className="max-w-xl">
              <h2 className="font-bold">
                Thumbnails de vídeo atraentes e envolventes
              </h2>
              <p>
                Oferecemos um serviço de criação de thumbnails de vídeo por
                apenas R$25. Nossos thumbnails são projetados para serem
                atraentes e envolventes, e para ajudá-lo a obter mais
                visualizações para seus vídeos.
              </p>
              <h2 className="font-bold">Como funcionam nossos thumbnails</h2>
              <p>
                Nossos designers são profissionais experientes que podem
                ajudá-lo a criar thumbnails que atendam às suas necessidades.
                Trabalharemos com você para entender suas ideias e criar
                thumbnails que sejam perfeitos para seus vídeos.
              </p>
              <h2 className="font-bold">
                O que nossos thumbnails podem fazer por você
              </h2>
              <p>
                Nossos thumbnails podem ajudá-lo a obter mais visualizações para
                seus vídeos, aumentando a visibilidade e a atenção. Eles também
                podem ajudar a melhorar a identidade visual do seu canal,
                tornando-o mais reconhecível e atraente para o seu público-alvo.
              </p>
              <h2 className="font-bold">Como começar</h2>
              <p>
                Para começar, basta entrar em contato conosco e nos informar
                sobre as suas necessidades. Faremos um orçamento personalizado
                para você e começaremos a trabalhar nos seus thumbnails assim
                que recebermos o seu sinal verde.
              </p>
              <h2 className="font-bold">Entre em contato conosco hoje</h2>
              <h2 className="font-medium">
                Não espere mais! Entre em contato conosco hoje e saiba mais
                sobre nosso serviço de criação de thumbnails de vídeo.
              </h2>
            </div>
          </>
        )}

        {id == "pQdnGRnKivSbqqONF3VahQ==" && (
          <>
            <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
              B
            </div>
            <h1 className="font-bold text-2xl text-center flex">
              Banners personalizados para chamar a atenção
            </h1>
            <button
              className="p-2 bg-green-500 rounded flex gap-x-2 font-medium my-3"
              onClick={() => addCart("Banner")}
            >
              <Plus /> Adicionar ao carrinho
            </button>
            <div className="max-w-xl">
              <h2 className="font-bold">
                Quer criar banners personalizados que chamem a atenção e ajudem
                você a alcançar seus objetivos? Com o nosso serviço de criação
                de banners personalizados, você pode ter um design profissional
                e exclusivo para o seu site, blog, mídia social ou qualquer
                outro lugar que você precise de um banner.
              </h2>
              <h2 className="font-bold">Benefícios:</h2>
              <li>
                Design personalizado: Nossos designers trabalharão com você para
                criar um banner que seja único e relevante para sua marca.
              </li>
              <li>
                Qualidade profissional: Nossos banners são criados por designers
                experientes que usam as melhores ferramentas e técnicas.
              </li>
              <li>
                Resultados comprovados: Nossos banners têm ajudado nossos
                clientes a aumentar o tráfego, gerar leads e aumentar as vendas.
              </li>
              <h2 className="font-bold">Como começar</h2>
              <p>
                Para começar, basta entrar em contato conosco e nos informar
                sobre as suas necessidades. Faremos um orçamento personalizado
                para você e começaremos a trabalhar no seu banner assim que
                recebermos o seu sinal verde.
              </p>
            </div>
          </>
        )}

        {id == "jCgkAmJpg6eRZ/JM/OXgAQ==" && (
          <>
            <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
              S
            </div>
            <h1 className="font-bold text-2xl text-center flex">
              Vídeos curtos com legenda: fale com todos
            </h1>
            <button
              className="p-2 bg-green-500 rounded flex gap-x-2 font-medium my-3"
              onClick={() => addCart("Shorts")}
            >
              <Plus /> Adicionar ao carrinho
            </button>
            <div className="max-w-xl">
              <h2 className="font-bold">
                Quer criar vídeos curtos que sejam acessíveis a todos? Com o
                nosso serviço de criação de vídeos curtos com legenda, você pode
                garantir que seus vídeos sejam compreendidos por pessoas de
                todas as origens e habilidades auditivas.
              </h2>
              <h2 className="font-bold">Benefícios:</h2>
              <li>
                Legendas personalizadas: Nossos vídeos são criados com legendas
                personalizadas, criadas por profissionais.
              </li>
              <li>
                Acessibilidade: Seus vídeos serão acessíveis a pessoas de todas
                as origens e habilidades auditivas.
              </li>
              <h2 className="font-bold">Como começar</h2>
              <p>
                Para começar, basta entrar em contato conosco e nos informar
                sobre as suas necessidades. Faremos um orçamento personalizado
                para você e começaremos a trabalhar no seu vídeo assim que
                recebermos o seu sinal verde.
              </p>
            </div>
          </>
        )}

        {id == "5WYZOjkxns5H1xbG9kKJCg==" && (
          <>
            <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
              S
            </div>
            <h1 className="font-bold text-2xl text-center flex">
              Pacote Sócio: Seu canal de sucesso
            </h1>
            <button
              className="p-2 bg-green-500 rounded flex gap-x-2 font-medium my-3"
              onClick={() => addCart("Sócio")}
            >
              <Plus /> Adicionar ao carrinho
            </button>
            <div className="max-w-xl">
              <h2 className="font-bold">
                Quer ter um canal de sucesso no YouTube? Com o Pacote Sócio,
                você terá tudo o que precisa para criar vídeos incríveis e
                conquistar mais espectadores.
              </h2>
              <h2 className="font-bold">Benefícios:</h2>
              <li>
                1 Logo gratuita: Sua empresa terá uma logo profissional e
                personalizada, que ajudará a transmitir sua identidade visual de
                forma clara e eficaz.
              </li>
              <li>
                2 Vídeos editados(por semana) até 30 minutos: Seus vídeos serão
                editados por profissionais qualificados, garantindo um resultado
                de alta qualidade e que chamará a atenção do seu público-alvo.
              </li>
              <li>
                2 Thumbnails personalizados (por semana): Seus vídeos terão
                thumbnails personalizados, que ajudarão a aumentar o número de
                cliques.
              </li>
              <h2 className="font-bold">Economia:</h2>
              <p>
                O Pacote Sócio oferece uma economia de 151,66% em comparação com
                a compra dos serviços separadamente.
              </p>
              <h2 className="font-bold">Aviso:</h2>
              <p>
                A cada 5 minutos adicionais no vídeo, será cobrada uma taxa de
                R$ 15.
              </p>
              <br />
              <p>
                O Pacote Sócio é a solução perfeita para empresas que desejam
                crescer e se destacar na concorrência. Com esse pacote, você
                terá acesso a uma série de benefícios que ajudarão a sua empresa
                a alcançar seus objetivos.
              </p>
            </div>
          </>
        )}

        {id == "hEqS sR7cmvIjH08xwGJCQ==" && (
          <>
            <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
              S
            </div>
            <h1 className="font-bold text-2xl text-center flex">
              Pacote Premium: Crie vídeos incríveis com facilidade
            </h1>
            <button
              className="p-2 bg-green-500 rounded flex gap-x-2 font-medium my-3"
              onClick={() => addCart("Premium")}
            >
              <Plus /> Adicionar ao carrinho
            </button>
            <div className="max-w-xl">
              <h2 className="font-bold">
                Quer criar vídeos incríveis sem precisar se preocupar com edição
                ou design? Com o Pacote Premium, você terá tudo o que precisa
                para criar vídeos de alta qualidade com facilidade.
              </h2>
              <h2 className="font-bold">Benefícios:</h2>
              <li>
                1 Logo gratuita: Sua empresa terá uma logo profissional e
                personalizada, que ajudará a transmitir sua identidade visual de
                forma clara e eficaz.
              </li>
              <li>
                1 Vídeo editado(por semana) até 25 minutos: Seus vídeos serão
                editados por profissionais qualificados, garantindo um resultado
                de alta qualidade e que chamará a atenção do seu público-alvo.
              </li>
              <li>
                1 Thumbnails personalizados (por semana): Seus vídeos terão
                thumbnails personalizados, que ajudarão a aumentar o número de
                cliques.
              </li>
              <h2 className="font-bold">Economia:</h2>
              <p>
                O Pacote Sócio oferece uma economia de 157,69% em comparação com
                a compra dos serviços separadamente.
              </p>
              <h2 className="font-bold">Aviso:</h2>
              <p>
                A cada 5 minutos adicionais no vídeo, será cobrada uma taxa de
                R$ 15.
              </p>
              <br />
              <p>
                O Pacote Premium é a solução perfeita para empresas que desejam
                criar vídeos de alta qualidade sem precisar investir muito tempo
                ou dinheiro. Com esse pacote, você terá acesso a uma série de
                benefícios que ajudarão a sua empresa a alcançar seus objetivos.
              </p>
            </div>
          </>
        )}

        {id == "je0x6EIdHwy9d10k GuopQ==" && (
          <>
            <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
              S
            </div>
            <h1 className="font-bold text-2xl text-center flex">
              Pacote Básico: Comece a criar vídeos incríveis hoje mesmo
            </h1>
            <button
              className="p-2 bg-green-500 rounded flex gap-x-2 font-medium my-3"
              onClick={() => addCart("Básico")}
            >
              <Plus /> Adicionar ao carrinho
            </button>
            <div className="max-w-xl">
              <h2 className="font-bold">
                Quer criar vídeos incríveis para o seu canal no YouTube, mas não
                tem tempo ou dinheiro para investir em uma produção
                profissional? Com o Pacote Básico, você terá tudo o que precisa
                para começar a criar vídeos de alta qualidade sem complicações.
              </h2>
              <h2 className="font-bold">Benefícios:</h2>
              <li>
                1 Vídeo editado(por semana) até 20 minutos: Seus vídeos serão
                editados por profissionais qualificados, garantindo um resultado
                de alta qualidade e que chamará a atenção do seu público-alvo.
              </li>
              <li>
                1 Thumbnails personalizados (por semana): Seus vídeos terão
                thumbnails personalizados, que ajudarão a aumentar o número de
                cliques.
              </li>
              <h2 className="font-bold">Economia:</h2>
              <p>
                O Pacote Premium oferece uma economia de 123,07% em comparação
                com a compra dos serviços separadamente.
              </p>
              <h2 className="font-bold">Aviso:</h2>
              <p>
                A cada 5 minutos adicionais no vídeo, será cobrada uma taxa de
                R$ 15.
              </p>
              <br />
              <p>
                O Pacote Básico é a solução perfeita para iniciantes que desejam
                criar vídeos de alta qualidade sem precisar investir muito
                dinheiro ou tempo. Com esse pacote, você terá acesso a uma série
                de benefícios que ajudarão você a alcançar seus objetivos.
              </p>
            </div>
          </>
        )}
        {id && (
          <Link
            to="/products"
            className="p-1 border-b border-transparent hover:border-green-600 font-semibold"
          >
            Ver todos produtos
          </Link>
        )}
      </div>

      {!id /* && items.includes(String(id)) */ && (
        <section className="flex flex-wrap gap-3 justify-center px-10">
          <ProductCard
            name="Edição Simples"
            description="Oferecemos um serviço de edição de vídeo simples e econômico. Podemos editar vídeos de até 15 minutos de duração, incluindo cortar, recortar, adicionar música, títulos e transições. Se o seu vídeo for mais longo que 15 minutos, cobraremos uma taxa de R$ 15 por cada 5 minutos adicionais."
            url="zFF7r01N1VRY9bRlzxDAAXqlD87MuRwBM9jtOTWssE8="
          />
          <ProductCard
            name="Banner"
            description="Oferecemos um serviço de edição de vídeo simples e econômico. Podemos editar vídeos de até 15 minutos de duração, incluindo cortar, recortar, adicionar música, títulos e transições. Se o seu vídeo for mais longo que 15 minutos, cobraremos uma taxa de R$ 15 por cada 5 minutos adicionais."
            url="pQdnGRnKivSbqqONF3VahQ=="
          />
          <ProductCard
            name="Logo"
            description="Oferecemos um serviço de edição de vídeo simples e econômico. Podemos editar vídeos de até 15 minutos de duração, incluindo cortar, recortar, adicionar música, títulos e transições. Se o seu vídeo for mais longo que 15 minutos, cobraremos uma taxa de R$ 15 por cada 5 minutos adicionais."
            url="2JTJOEplz6zVSnTHT6z1Ew=="
          />
          <ProductCard
            name="Shorts"
            description="Oferecemos um serviço de edição de vídeo simples e econômico. Podemos editar vídeos de até 15 minutos de duração, incluindo cortar, recortar, adicionar música, títulos e transições. Se o seu vídeo for mais longo que 15 minutos, cobraremos uma taxa de R$ 15 por cada 5 minutos adicionais."
            url="jCgkAmJpg6eRZ/JM/OXgAQ=="
          />
          <ProductCard
            name="Thumbnail"
            description="Oferecemos um serviço de edição de vídeo simples e econômico. Podemos editar vídeos de até 15 minutos de duração, incluindo cortar, recortar, adicionar música, títulos e transições. Se o seu vídeo for mais longo que 15 minutos, cobraremos uma taxa de R$ 15 por cada 5 minutos adicionais."
            url="IJqf66wDTzP37QHy1OlLiQ=="
          />
          <ProductCard
            name="Sócio"
            type={1}
            description="Oferecemos um serviço de edição de vídeo simples e econômico. Podemos editar vídeos de até 15 minutos de duração, incluindo cortar, recortar, adicionar música, títulos e transições. Se o seu vídeo for mais longo que 15 minutos, cobraremos uma taxa de R$ 15 por cada 5 minutos adicionais."
            url="5WYZOjkxns5H1xbG9kKJCg=="
          />
          <ProductCard
            name="Premium"
            type={1}
            description="Oferecemos um serviço de edição de vídeo simples e econômico. Podemos editar vídeos de até 15 minutos de duração, incluindo cortar, recortar, adicionar música, títulos e transições. Se o seu vídeo for mais longo que 15 minutos, cobraremos uma taxa de R$ 15 por cada 5 minutos adicionais."
            url="hEqS+sR7cmvIjH08xwGJCQ=="
          />
          <ProductCard
            name="Basico"
            type={1}
            description="Oferecemos um serviço de edição de vídeo simples e econômico. Podemos editar vídeos de até 15 minutos de duração, incluindo cortar, recortar, adicionar música, títulos e transições. Se o seu vídeo for mais longo que 15 minutos, cobraremos uma taxa de R$ 15 por cada 5 minutos adicionais."
            url="je0x6EIdHwy9d10k+GuopQ=="
          />
        </section>
      )}

      {addProduct ? (
        <Link
          to="/checkout"
          className={`fixed rounded overflow-hidden right-0 p-2 top-32 bg-white shadow my-2 ${animate}`}
          key={addProduct.name}
        >
          <h1 className="font-bold flex gap-x-2">
            <Check /> PRODUTO ADICIONADO
          </h1>
          <div className="text-black flex items-center text-center justify-beetween gap-2 w-full">
            <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
              {addProduct.name.charAt(0).toUpperCase()}
            </div>
            <div className="font-medium flex flex-col text-sm">
              <h1>Produto: {addProduct.name}</h1>
              <h2>Categoria: {addProduct.category}</h2>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">R$ {addProduct.price}</span>
            </div>
          </div>
        </Link>
      ) : null}

      {addError && (
        <div
          className={`fixed rounded overflow-hidden right-0 p-2 top-32 bg-white shadow my-2 ${animate}`}
        >
          <h1 className="font-bold flex gap-x-2">
            <X /> ERRO
          </h1>
          <div className="text-black flex items-center text-center justify-beetween gap-2 w-full">
            <div className="p-3 select-none px-5 bg-gradient-to-br from-red-500 to-red-700 rounded font-bold">
              E
            </div>
            <div className="font-medium flex flex-col text-sm">
              <h1>Erro ao adicionar produto:</h1>
              <h2>Produto não encontrado</h2>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </section>
  );
}
