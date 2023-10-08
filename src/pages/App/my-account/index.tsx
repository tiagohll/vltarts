import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import UserSidebar from "../../../components/UserSidebar";
import { AlertTriangle } from "lucide-react";
import { auth } from "../../../services/firebaseConfig";
import { getDatabase, onValue, ref } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

interface Cart {
  [key: string]: {
    id: number;
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

interface AdminInterface {
  isTrue: boolean;
}

interface UserInfo {
  id: number;
  name: string;
  phone: string;
  email: string;
  cart: Cart;
  orders: Order;
  admin: AdminInterface;
}

export default function MyAccount() {
  const [page, setPage] = useState("myorders");
  const user = auth.currentUser;
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signOutModal, setSignOutModal] = useState(false);
  const [animateModal, setAnimateModal] = useState("");
  const [animateBackground, setAnimateBackground] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(getDatabase(), `users/${user?.uid}`);
    onValue(dbRef, (snapshot) => {
      setUserInfo(snapshot.val());
      setIsLoading(false);
    });

    if (!user) {
      navigate("/login");
    }

    if (signOutModal) {
      document.body.style.overflow = "hidden";
      document.body.style.cursor = "default";

      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (!target.closest(".modal")) {
          hideSignOutModal();
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.body.style.overflow = "";
        document.body.style.cursor = "";
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [user, navigate, signOutModal]);

  const showSignOutModal = () => {
    setSignOutModal(true);
    setAnimateModal("animate-modal-show");
    setAnimateBackground("animate-opacity-show");
  };

  const hideSignOutModal = () => {
    setAnimateModal("animate-modal-hide");
    setAnimateBackground("animate-opacity-hidden");
    setTimeout(() => {
      setSignOutModal(false);
    }, 510);
  };

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center">
          <div className="container flex flex-col sm:flex-auto">
            <h1 className="mx-5 mt-2">
              Olá <span className="font-bold">{user.displayName}</span>!
              Acompanhe aqui seus pedidos e seus dados cadastrais.
              <button
                className="underline hover:font-medium"
                onClick={showSignOutModal}
              >
                Sair
              </button>
            </h1>
            <div>
              <UserSidebar pageA={page} setPage={setPage} />
            </div>

            <section className="flex flex-col w-full items-center text-center my-2 sm:my-3 sm:m-5 gap-4">
              {!isLoading ? (
                page == "myorders" ? (
                  userInfo?.orders ? (
                    <>
                      <div className="w-full sm:w-2/4 p-2 rounded">
                        <Table>
                          <TableHeader className="border border-gray-300 bg-[#f2f2f2] text-zinc-500 font-medium">
                            <TableRow>
                              <TableHead>Pedido</TableHead>
                              <TableHead>Valor</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Mensagem</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="font-medium text-center border border-gray-300">
                            {Object.entries(userInfo?.orders || {}).map(
                              ([itemName, itemData]) => {
                                return (
                                  <TableRow key={itemName}>
                                    <TableCell>
                                      <div className="flex flex-col">
                                        <span className="font-medium text-green-600">
                                          {itemData.id}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                          {itemData.time}
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell>R$ {itemData.price}</TableCell>
                                    <TableCell
                                      className={`${
                                        (itemData.stats == "Entregue" &&
                                          "text-green-600") ||
                                        (itemData.stats == "Cancelado" &&
                                          "text-red-600") ||
                                        (itemData.stats == "Em andamento" &&
                                          "text-yellow-500")
                                      } `}
                                    >
                                      {itemData.stats}
                                    </TableCell>
                                    <TableCell className="w-1/4 text-sm">
                                      {itemData.message}
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </>
                  ) : (
                    <span className="font-medium">
                      Você ainda não fez nenhum pedido.{" "}
                      <Link className="font-bold" to="/products">
                        Ver produtos.
                      </Link>
                    </span>
                  )
                ) : (
                  <div className="w-full sm:w-2/4 p-2 rounded flex flex-col bg-zinc-300">
                    <h2 className="font-medium">
                      Nome: <span className="font-bold">{userInfo?.name}</span>
                    </h2>
                    <h2 className="font-medium">
                      E-mail:{" "}
                      <span className="font-bold">{userInfo?.email}</span>
                    </h2>
                    <h2 className="font-medium">
                      Telefone:{" "}
                      <span className="font-bold">{userInfo?.phone}</span>
                    </h2>
                  </div>
                )
              ) : (
                <div className="border-4 border-gray-300 animate-spin border-t-[#1ed760] p-3.5 rounded-full"></div>
              )}
            </section>
          </div>
        </div>

        {signOutModal && (
          <div
            className={`${animateBackground} flex items-center justify-center top-0 w-full h-screen bg-white bg-opacity-50 absolute`}
          >
            <div
              className={`${animateModal} modal bg-zinc-200 w-1/4 shadow p-2 py-10 text-center flex flex-col items-center font-bold gap-2 text-lg`}
            >
              <h1 className="flex gap-2 text-center justify-center">
                <AlertTriangle className="text-red-600" /> Você realmente deseja
                sair da sua conta?
              </h1>
              <div className="flex gap-5 font-medium">
                <button
                  onClick={handleLogout}
                  className="p-1 bg-green-500 rounded hover:bg-green-600 duration-200"
                >
                  Sim, sair
                </button>
                <button
                  onClick={hideSignOutModal}
                  className="p-1 bg-red-500 rounded hover:bg-red-600 duration-200"
                >
                  Não, cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </>
    );
  } else {
    return null;
  }
}
