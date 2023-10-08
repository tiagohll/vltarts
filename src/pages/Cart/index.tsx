import { FormEvent, useCallback, useEffect, useState } from "react";
import { auth } from "../../services/firebaseConfig";
import {
  DataSnapshot,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

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

interface Order {
  [key: string]: {
    id: string;
    name: string;
    items: Cart;
    price: number;
    stats: string;
    time: string;
    message: string;
  };
}

interface UserInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  cart: Cart;
  orders: Order;
}

export default function Cart() {
  const user = auth.currentUser;
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [cupom, setCupom] = useState("");
  const [finalCupom, setFinalCupom] = useState("");
  const [realCupom, setRealCupom] = useState(false);
  const [cupomInvalid, setCupomInvalid] = useState<number>();
  const validsCupom = ["VINNI10", "L3B10", "TH10", "VLT10"];
  const navigate = useNavigate();

  const fetchUser = useCallback(() => {
    const db = getDatabase();
    const dbRef = ref(db, "users/" + user?.uid + "/");
    onValue(dbRef, (snapshot) => {
      setUserInfo(snapshot.val());
    });
  }, [user]);

  useEffect(() => {
    document.title = "Checkout - VLT Art's";

    fetchUser();
  }, [fetchUser]);

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

  const calculateSubtotal = () => {
    if (!userInfo?.cart) return 0;

    let subtotal = 0;
    for (const itemName in userInfo.cart) {
      const itemData = userInfo.cart[itemName];
      subtotal += itemData.ammount * itemData.price;
    }

    return subtotal;
  };

  const cupomSubmit = (e: FormEvent) => {
    e.preventDefault();
    const upperCaseCupom = cupom.toUpperCase();
    if (cupom != finalCupom) {
      if (validsCupom.includes(upperCaseCupom)) {
        setFinalCupom(upperCaseCupom);
        setRealCupom(true);
        setCupomInvalid(0);
        setCupom("");
      }
    } else {
      setCupomInvalid(2);
    }
    if (!validsCupom.includes(upperCaseCupom)) {
      setCupomInvalid(1);
    }
  };

  const calculateTotalOrders = async () => {
    try {
      const db = getDatabase();
      const usersRef = ref(db, "users");

      let totalOrders = 0;

      const usersSnapshot = await get(usersRef);

      if (usersSnapshot.exists()) {
        usersSnapshot.forEach((userSnapshot) => {
          const userOrdersRef = ref(
            db,
            "users/" + userSnapshot.key + "/orders"
          );
          onValue(userOrdersRef, (snapshot: DataSnapshot) => {
            snapshot.forEach(() => {
              totalOrders += 1;
            });
          });
        });
      }

      return totalOrders + 1;
    } catch (error) {
      console.error("Erro ao calcular o total de orders:", error);
      return 0;
    }
  };

  const finalizeCheckout = async () => {
    if (userInfo) {
      const db = getDatabase();
      try {
        const totalOrders = await calculateTotalOrders();
        const orderId = userInfo.orders
          ? Object.keys(userInfo.orders).length + 1
          : 1;
        const price = realCupom
          ? calculateSubtotal() - 0.1 * calculateSubtotal()
          : calculateSubtotal();
        const dbRef = ref(
          db,
          "users/" + user?.uid + "/orders/" + `VLT-${totalOrders}-${orderId}`
        );
        const order = {
          id: `VLT-${totalOrders}-${orderId}`,
          name: `VLT-${totalOrders}-${orderId}`,
          items: userInfo?.cart,
          price: price,
          message: "Aguarde. Pedido em andamento.",
          stats: "Em andamento",
          time: new Date().toLocaleString(),
        };
        set(dbRef, order);

        await remove(ref(db, "users/" + user?.uid + "/cart"));

        navigate("/?form=sucessCheckout");
      } catch (error) {
        console.error("Erro ao finalizar o checkout:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="w-full flex flex-col items-center">
        <section className="container flex flex-col items-center">
          <h1 className="font-bold text-2xl text-center">Carrinho</h1>
          {userInfo?.cart ? (
            <div className="w-3/4 p-2 rounded flex flex-col lg:flex-row gap-4">
              <Table className="rounded max-h-[10px]">
                <TableRow className="w-full">
                  <TableHeader className="w-full">
                    <TableHead className="border border-gray-300">
                      Produto
                    </TableHead>
                    <TableHead className="border border-gray-300">
                      Preço
                    </TableHead>
                    <TableHead className="border border-gray-300">
                      Quantidade
                    </TableHead>
                    <TableHead className="border border-gray-300">
                      Total
                    </TableHead>
                  </TableHeader>
                </TableRow>

                <TableBody>
                  {Object.entries(userInfo?.cart || {}).map(
                    ([itemName, itemData]) => {
                      return (
                        <TableRow
                          className="font-medium text-center border border-gray-300"
                          key={itemName}
                        >
                          <TableCell className="border border-gray-300">
                            <div className="flex items-center gap-2 p-1 font-bold">
                              <div className="p-3 select-none px-5 bg-gradient-to-br from-[#24F46E] to-lime-600 rounded font-bold">
                                {String(itemData.name).charAt(0).toUpperCase()}
                              </div>
                              <span>{itemData.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="border border-gray-300">
                            {itemData.price}
                          </TableCell>
                          <TableCell className="border border-gray-300">
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
                          </TableCell>
                          <TableCell className="flex flex-col text-sm">
                            <span className="text-[17px]">
                              R${itemData.price * itemData.ammount}
                            </span>
                            <span className="font-bold text-[24px] text-green-600">
                              R$
                              {itemData.price * itemData.ammount -
                                0.1 * (itemData.price * itemData.ammount)}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
              <div className="w-full lg:w-2/4 border border-gray-300 rounded my-2 flex flex-col items-center">
                <h1 className="w-full font-bold text-center border border-gray-300 p-2">
                  Resumo do pedido
                </h1>
                <div className="flex justify-between p-2 border border-gray-300 w-full">
                  <span>Subtotal</span>
                  <span>R${calculateSubtotal()}</span>
                </div>
                {realCupom && (
                  <div className="flex justify-between p-2 border border-gray-300 w-full">
                    <span>
                      Cupom: <strong>{finalCupom}</strong>
                    </span>
                    <span>{0.1 * calculateSubtotal()} R$</span>
                  </div>
                )}

                <div className="flex justify-between px-2 border-t border-x border-gray-300 w-full">
                  <span>Total</span>
                  <span>
                    <p>
                      {realCupom
                        ? calculateSubtotal() - 0.1 * calculateSubtotal()
                        : calculateSubtotal()}{" "}
                      R$
                    </p>
                    <p className="text-green-600 text-xl font-bold">
                      {realCupom
                        ? calculateSubtotal() -
                          0.1 * calculateSubtotal() -
                          0.1 * calculateSubtotal()
                        : calculateSubtotal() - 0.1 * calculateSubtotal()}{" "}
                      R$
                    </p>
                  </span>
                </div>
                <p className="text-green-600 font-medium px-2 border-b border-x text-end border-gray-300 w-full">
                  Valor com <span className="font-bold">10% de desconto</span>{" "}
                  no PIX.
                </p>
                <form className="w-full flex" onSubmit={cupomSubmit}>
                  <input
                    className="w-full bg-transparent p-1 px-3"
                    placeholder="Cupom"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value)}
                  />
                  <button type="submit" className="p-1 bg-zinc-300 rounded-l">
                    Aplicar
                  </button>
                </form>
                {(cupomInvalid === 1 && (
                  <span className="text-red-600">Cupom inválido</span>
                )) ||
                  (cupomInvalid == 2 && (
                    <span className="text-red-600">
                      Você ja está usando este cupom
                    </span>
                  ))}
                <button
                  onClick={finalizeCheckout}
                  className="bg-green-600 p-2 w-full rounded mt-2 font-bold text-white hover:bg-green-500 duration-500"
                >
                  Finalizar
                </button>
                <Link
                  to="/"
                  className="bg-gray-300 p-2 w-full rounded mt-2 text-center"
                >
                  Escolher mais produtos
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center max-w-xl">
              <h1 className="text-xl font-bold text-zinc-500">
                SEU CARRINHO ESTÁ VAZIO
              </h1>
              <h2>
                Navegue agora pelas categorias de nossa loja e escolha os
                produtos desejados para adicionar em seu carrinho de compras
              </h2>
              <button className="w-full p-2 bg-green-600 rounded text-white font-bold">
                CONTINUAR COMPRANDO
              </button>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}
