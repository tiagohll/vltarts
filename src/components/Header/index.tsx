import {
  ChevronRight,
  Search,
  ShoppingCart,
  Trash,
  User,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConfig";
import { useCallback, useEffect, useState } from "react";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { VltArts } from "../icons/vlt-arts";

interface Cart {
  [key: string]: {
    id: string;
    name: string;
    category: string;
    price: number;
    ammount: number;
  };
  Logo: {
    id: string;
    name: string;
    category: string;
    price: number;
    ammount: number;
  };
  Thumbnail: {
    id: string;
    name: string;
    category: string;
    price: number;
    ammount: number;
  };
  "Edição Simples": {
    id: string;
    name: string;
    category: string;
    price: number;
    ammount: number;
  };
}

interface UserInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  cart: Cart;
}

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

export default function Header() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [cartShow, setCartShow] = useState(false);
  const [animateSlide, setAnimteSlide] = useState("animate-slide-in");
  const [animateOpacity, setAnimateOpacity] = useState("animate-opacity-show");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [products, setProducts] = useState<Products[]>([]);
  const [search, setSearch] = useState("");

  const fetchUser = useCallback(() => {
    const db = getDatabase();
    const dbRef = ref(db, "users/" + user?.uid + "/");
    onValue(dbRef, (snapshot) => {
      setUserInfo(snapshot.val());
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUser();
    }

    if (cartShow) {
      document.body.style.overflow = "hidden";
      document.body.style.cursor = "default";

      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (!target.closest(".cart")) {
          hiddenCart();
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.body.style.overflow = "";
        document.body.style.cursor = "";
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [user, fetchUser, cartShow]);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "items/products/");
    const fetchProducts = () => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        const userList: Products[] = data ? Object.values(data) : [];
        setProducts(userList);
      });
    };

    fetchProducts();
  }, []);

  const showCart = () => {
    setCartShow(true);
    setAnimteSlide("animate-slide-in");
    setAnimateOpacity("animate-opacity-show");
  };

  const hiddenCart = () => {
    setAnimteSlide("animate-slide-down ");
    setAnimateOpacity("animate-opacity-hidden");
    setTimeout(() => {
      setCartShow(false);
    }, 550);
  };

  const setAmmount = (itemName: string, ammount: number) => {
    const db = getDatabase();
    const dbRef = ref(
      db,
      "users/" + user?.uid + "/cart/" + itemName + "/ammount"
    );
    if (ammount < 49) {
      set(dbRef, ammount).catch((error) => {
        console.error("Erro ao atualizar ammount:", error);
      });
      if (ammount < 1) {
        remove(ref(db, "users/" + user?.uid + "/cart/" + itemName)).catch(
          (error) => {
            console.error("Erro ao atualizar ammount:", error);
          }
        );
      }
    }
  };

  const remCartItem = (itemName: string) => {
    const dbRef = ref(
      getDatabase(),
      "users/" + user?.uid + "/cart/" + itemName
    );
    remove(dbRef);
  };

  const calculateSubtotal = () => {
    if (!userInfo?.cart) return 0;

    let subtotal = 0;
    for (const itemName in userInfo.cart) {
      const itemData = userInfo.cart[itemName];
      subtotal += itemData.ammount * itemData.price;
    }

    return subtotal;
  };

  const filteredProducts =
    search.length > 0
      ? products?.filter((product) => {
          return (
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.id?.toString().includes(search)
          );
        })
      : [];

  return (
    <>
      <nav>
        <div className="flex justify-between items-center p-2 bg-[#1ED760] w-full">
          <Link to="/">
            <VltArts size={120} />
          </Link>
          <div className="relative w-1/4">
            <div>
              <Search className="absolute m-2" />
              {search !== "" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <X
                        className="absolute right-2 my-2.5 cursor-pointer"
                        onClick={() => {
                          setSearch("");
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Limpar pesquisa</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            <input
              className="w-full pl-10 pr-10 rounded-[10px] bg-[#24F46E] p-2 placeholder-gray-700 outline-none"
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            {filteredProducts.length > 0 && (
              <div className="absolute bg-[#24F46E] py-2 w-full rounded-[10px] my-2 shadow z-[499]">
                {filteredProducts.map((product) => {
                  const productName = product.name;
                  const searchTerm = search.toLowerCase();
                  const startIndex = productName
                    .toLowerCase()
                    .indexOf(searchTerm);
                  const endIndex = startIndex + searchTerm.length;
                  const highlightedText = (
                    <span className="font-medium">
                      {productName.slice(startIndex, endIndex)}
                    </span>
                  );

                  return (
                    <button
                      onClick={() => {
                        navigate(`/products?details=${product.path}`);
                      }}
                      className="font-bold p-2 flex hover:bg-[#18c957] duration-300 w-full"
                      key={product.id}
                    >
                      <Search className="mr-3" />
                      {startIndex !== -1 ? (
                        <>
                          {productName.slice(0, startIndex)}
                          {highlightedText}
                          {productName.slice(endIndex)}
                        </>
                      ) : (
                        productName
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex items-center mx-8">
            {user ? (
              <div className="flex items-center gap-x-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <button onClick={() => navigate("/app/my-account")}>
                        <User />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Minha conta</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <button onClick={showCart}>
                        <ShoppingCart />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Meu carrinho</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <>
                <span>
                  Bem-vindo visitante,
                  <br />
                  <Link to="/cadastro" className="font-bold">
                    cadastre-se
                  </Link>{" "}
                  ou
                  <br />
                  <Link to="/login" className="font-bold">
                    faça seu login
                  </Link>
                </span>
              </>
            )}
          </div>
        </div>
        <div className="shadow p-2 w-full font-medium text-gray-700">
          <Link to="/" className="mx-6 hover:text-black duration-200">
            Inicio
          </Link>
          <Link to="/products" className="mx-6 hover:text-black duration-200">
            Produtos
          </Link>
        </div>
      </nav>
      {cartShow ? (
        <>
          <div
            className={`${animateOpacity} overflow-y-scroll z-[100] animate-opacity-show absolute bg-white w-full h-screen top-0 bg-opacity-30 overflow-hidden`}
          >
            <div
              className={`${animateSlide} cart bg-white p-3 h-screen w-full sm:w-3/6 lg:w-2/6 absolute right-0 flex flex-col items-center text-center`}
            >
              <button
                onClick={hiddenCart}
                className="sm:absolute relative -left-[172px] sm:-left-10 top-0 p-2 bg-zinc-300 rounded-l"
              >
                <ChevronRight />
              </button>
              {userInfo?.cart ? (
                <>
                  <h1 className="font-bold">
                    ITENS NO MEU CARRINHO ({Object.keys(userInfo.cart).length})
                  </h1>
                  <div className="gap-y-5 border rounded border-gray-300 p-5 w-full flex flex-col items-center text-zinc-400">
                    {Object.entries(userInfo?.cart || {}).map(
                      ([itemName, itemData]) => {
                        return (
                          <div
                            key={itemName}
                            className="text-black flex items-center text-center justify-beetween gap-2 w-full"
                          >
                            <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
                              {String(itemData.name).charAt(0).toUpperCase()}
                            </div>
                            <div className="font-medium flex flex-col text-sm">
                              <h1>Produto: {String(itemData.name)}</h1>
                              <h2>Categoria: {String(itemData.category)}</h2>
                            </div>
                            <div className="flex flex-col">
                              <span className="flex items-center gap-x-3 bg-zinc-200 p-1 rounded font-medium">
                                <button
                                  onClick={() => {
                                    setAmmount(
                                      itemName,
                                      Number(itemData.ammount) - 1
                                    );
                                  }}
                                  className="p-1 bg-zinc-400 rounded px-3 font-bold text-lg text-white"
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  value={Number(itemData.ammount)}
                                  onChange={(e) => {
                                    const dbRef = ref(
                                      getDatabase(),
                                      "users/" +
                                        user?.uid +
                                        "/cart/" +
                                        itemName +
                                        "/ammount"
                                    );
                                    set(dbRef, e.target.value);
                                  }}
                                  className="p-1 w-6 bg-transparent border-none"
                                />
                                <button
                                  onClick={() => {
                                    setAmmount(
                                      itemName,
                                      Number(itemData.ammount) + 1
                                    );
                                  }}
                                  className="p-1 bg-zinc-400 rounded px-3 font-bold text-lg text-white"
                                >
                                  +
                                </button>
                              </span>
                              <span className="font-bold">
                                R$
                                {Number(itemData.price) *
                                  Number(itemData.ammount)}
                              </span>
                            </div>
                            <button
                              className="hover:text-red-600 duration-300"
                              onClick={() => {
                                remCartItem(itemName);
                              }}
                            >
                              <Trash />
                            </button>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className="w-full border border-gray-300 my-2">
                    <h1 className="border border-gray-300 font-bold">
                      Resumo do pedido
                    </h1>
                    <div className="flex justify-between p-2">
                      <span>Subtotal</span>
                      <span>R${calculateSubtotal()}</span>
                    </div>
                    <div className="flex justify-end gap-2 font-bold p-2">
                      <s className="text-gray-500 text">
                        R${calculateSubtotal()}
                      </s>
                      <span className="text-green-600">
                        R${calculateSubtotal() - 0.1 * calculateSubtotal()}
                      </span>
                    </div>
                    <p className="text-green-600 font-medium">
                      Valor com{" "}
                      <span className="font-bold">10% de desconto</span> no PIX.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/checkout");
                    }}
                    className="p-3 bg-[#1ED760] font-bold w-full rounded mb-3 text-white"
                  >
                    IR PARA O CARRINHO
                  </button>
                  <button className="p-3 bg-gray-300 w-full rounded mb-3">
                    Escolher mais produtos
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center font-bold">
                  <ShoppingCart />
                  <h1>SEU CARRINHO ESTÁ VAZIO</h1>
                  <p className="text-[14px] font-normal">
                    Busque pela nossa{" "}
                    <Link to="/products" className="text-green-600">
                      página de produtos
                    </Link>{" "}
                    os produtos desejados para adicionar em seu carrinho de
                    compras
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
