import { Home } from "lucide-react";
import AdminBar from "../../components/Adminbar";
import VerifyAdminIsTrue from "../../verifyAdminIsTrue";
/* import { useEffect, useState } from "react";
import { auth } from "../../../../services/firebaseConfig";
import { getDatabase, onValue, ref } from "firebase/database"; */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* interface AdminPermissions {
    createTeam: boolean;
    createProject: boolean;
    changeTeams: boolean;
    changeProjects: boolean;
    deleteTeam: boolean;
    deleteProject: boolean
    deleteReports: boolean;
    seeAllTeams: boolean;
    seeAllTeamsProjects: boolean;
    seeReports: boolean;
    replyReports: boolean;
    addPermissions: boolean;
}

interface AdminInterface {
    isTrue: boolean;
    position: "CEO";
    team: string;
    permissions: AdminPermissions;
}

interface UserAdmin {
    uid: string;
    email: string;
    name: string;
    phone: string;
    photoURL: string;
    admin: AdminInterface;
} */

export default function AdminHome() {
  /*     const user = auth.currentUser
    const [userInfo, setUserInfo] = useState<UserAdmin>()

    useEffect(() => {
        if (user) {
            onValue(ref(getDatabase(), `users/${user.uid}`), (snapshot) => {
                setUserInfo(snapshot.val())
            })
        }
    }, [user]) */

  const data = [
    {
      name: "Janeiro",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
    {
      name: "Fevereiro",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
    {
      name: "Março",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
    {
      name: "Abril",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
    {
      name: "Maio",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
    {
      name: "Junho",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
    {
      name: "Julho",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
    {
      name: "Agosto",
      Lucros: 0,
      Gastos: 79.8,
      amt: 0,
    },
    {
      name: "Setembro",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
    {
      name: "Outubro",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
    {
      name: "Novembro",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
    {
      name: "Dezembro",
      Lucros: 0,
      Gastos: 0,
      amt: 0,
    },
  ];

  return (
    <VerifyAdminIsTrue>
      <div className="flex">
        <AdminBar atualPage="home" />
        <div className="p-5 w-full">
          <div className="bg-gray-300 shadow p-2 w-full rounded">
            <h1 className="font-bold text-2xl flex items-center gap-2">
              <Home /> Dashboard
            </h1>
            <h2 className="font-medium">
              Ultimas atualizações e dados sobre a loja.
            </h2>
            <div className="bg-white p-2 rounded flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <button className="font-bold bg-gray-200 hover:bg-gray-200 p-2 rounded duration-500">
                  Vendas
                </button>
                <button className="font-bold hover:bg-gray-200 p-2 rounded duration-500">
                  Usuarios
                </button>
              </div>
            </div>

            <div className="bg-gray-300 my-2 rounded w-full h-full flex items-center justify-center">
              <div className="bg-white p-2 rounded w-full h-full">
                <h2 className="font-bold text-2xl my-2">
                  Relatórios de vendas
                </h2>
                <div className="flex gap-5 items-center">
                  <div className="bg-gray-200 p-2 rounded">
                    <h2 className="font-bold">Lucro bruto</h2>
                    <span className="text-green-600 font-medium text-2xl">
                      R$ 340
                    </span>
                  </div>

                  <div className="bg-gray-200 p-2 rounded">
                    <h2 className="font-bold">Lucro total</h2>
                    <span className="font-medium text-2xl">R$ 560</span>
                  </div>

                  <div className="bg-gray-200 p-2 rounded">
                    <h2 className="font-bold">Numero total de vendas</h2>
                    <span className="font-medium text-2xl">0</span>
                  </div>
                </div>
                <ResponsiveContainer
                  width="90%"
                  height={400}
                  className="border py-2 m-2 rouded"
                >
                  <LineChart data={data}>
                    <defs>
                      <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#2451b7"
                          stopOpacity={0.4}
                        ></stop>
                        <stop
                          offset="75%"
                          stopColor="#2451b7"
                          stopOpacity={0.5}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickCount={8}
                      tickFormatter={(number) => `${number.toFixed(2)}`}
                    />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid opacity={0.6} vertical={false} />
                    <Line
                      type="monotone"
                      dataKey="Lucros"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="Gastos" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VerifyAdminIsTrue>
  );
}
