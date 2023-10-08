import { Edit, Info, Plus, User, Users } from "lucide-react";
import AdminBar from "../../components/Adminbar";
import { auth } from "../../../../services/firebaseConfig";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import ModalCreateTeam from "./createTeamModal";
import { Skeleton } from "../../../../components/ui/skeleton";
import VerifyAdminIsTrue from "../../verifyAdminIsTrue";

interface AdminPermissions {
    createTeam: boolean;
    createProject: boolean;
    changeTeams: boolean;
    changeProjects: boolean;
    deleteTeam: boolean;
    deleteProject: boolean
    deleteReports: boolean;
    seeAllTeams: boolean;
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
}

interface MembersInterface {
    name: string;
    position: string;
    id: string;
}

interface ProjectsInterface {
    id: number;
    conclued: boolean;
    title: string;
    desc: string;
}

interface Teams {
    id: number;
    concluedProjects: number;
    pendingProjects: number;
    totalProjects: number;
    members: { [key: string]: MembersInterface };
    projects: ProjectsInterface[];
}

export default function AdminTeam() {
    const user = auth.currentUser
    const [userInfo,setUserInfo] = useState<UserAdmin>()
    const [teamsInfo, setTeamsInfo] = useState<Teams>()
    const [isLoading, setIsLoading] = useState(true)
    const [concluedProjects, setConcluedProjects] = useState(0)
    const [modalCreateTeam, setModalCreateTeam] = useState(false)


    useEffect(() => {
        if (user) {
            onValue(ref(getDatabase(), `users/${user.uid}`), (snapshot) => {
                setUserInfo(snapshot.val())
            })
        }
    }, [user])

    useEffect(() => {
        if (user) {
            onValue(ref(getDatabase(), `teams/${userInfo?.admin.team}`), (snapshot) => {
                setTeamsInfo(snapshot.val())
                setConcluedProjects(snapshot.val().concluedProjects)
                setIsLoading(false)
            })
        }
    }, [user, userInfo])

    return (
        <VerifyAdminIsTrue>
            <div className='lg:flex'>
                <AdminBar atualPage="team" />
                {modalCreateTeam && (
                    <ModalCreateTeam setPage={setModalCreateTeam} />
                )}
                <div className='p-5 w-full'>
                    <div className='bg-gray-300 shadow p-2 w-full rounded'>
                        <h1 className="font-bold text-2xl flex items-center gap-2"><Users /> Time</h1>
                        <h2 className='font-medium'>{userInfo?.admin.team} ({userInfo?.admin.position})</h2>
                        <div className='bg-white p-2 rounded flex justify-between items-center'>
                            <div className='flex gap-2 items-center'>
                            {userInfo?.admin.permissions.seeAllTeams ? (
                                <>
                                    <button className='font-bold bg-gray-200 hover:bg-gray-200 p-2 rounded duration-500'>Administrator</button>
                                    <button className='font-bold hover:bg-gray-200 p-2 rounded duration-500'>Promoter</button>
                                </>

                            ) : (
                                <button className='font-bold bg-gray-200 hover:bg-gray-200 p-2 rounded duration-500'>{userInfo?.admin.team}</button>
                            )}
                            </div>
                            {userInfo?.admin.permissions.createTeam && (
                                <div className='flex items-center'>
                                    <button onClick={() => setModalCreateTeam(true)} className='font-bold hover:bg-gray-200 p-2 rounded duration-500'><Plus /></button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='bg-gray-300 my-2 p-2 rounded w-full h-[80%] flex items-center justify-center'>
                        <div className='bg-white p-2 rounded w-full h-full'>
                        {isLoading ? (
                                <div className='flex md:flex-col space-x-2'>
                                    <Skeleton className='w-1/12 p-2 h-24 bg-gray-200 space-y-1'>
                                        <Skeleton className='bg-gray-300 p-2 w-full' />
                                        <Skeleton className='bg-gray-300 p-2 w-[30%] h-[75%]' />
                                    </Skeleton>
                                    <Skeleton className='w-1/12 p-2 h-24 bg-gray-200 space-y-1'>
                                        <Skeleton className='bg-gray-300 p-2 w-full' />
                                        <Skeleton className='bg-gray-300 p-2 w-[30%] h-[75%]' />
                                    </Skeleton>
                                    <Skeleton className='w-1/12 p-2 h-24 bg-gray-200 space-y-1'>
                                        <Skeleton className='bg-gray-300 p-2 w-full' />
                                        <Skeleton className='bg-gray-300 p-2 w-[30%] h-[75%]' />
                                    </Skeleton>
                                </div>
                                
                            ) : (
                                <div className='flex flex-col lg:flex-row gap-5 items-center'>
                                    <div className='bg-gray-200 p-2 rounded w-full lg:w-2/4'>
                                        <h2 className='font-bold'>Projetos concluidos</h2>
                                        <span className='text-green-600 font-medium text-2xl'>{concluedProjects}</span>
                                    </div>

                                    <div className='bg-gray-200 p-2 rounded w-full lg:w-2/4'>
                                        <h2 className='font-bold'>Projetos iniciados</h2>
                                        <span className='font-medium text-2xl'>{teamsInfo?.totalProjects}</span>
                                    </div>

                                    <div className='bg-gray-200 p-2 rounded w-full lg:w-2/4'>
                                        <h2 className='font-bold'>Numero total de membros</h2>
                                        <span className='font-medium text-2xl'>{Object.values(teamsInfo?.members ?? {}).length}</span>
                                    </div>
                                </div>
                            )}
                            <h2 className='font-bold text-2xl my-2'>Membros do time</h2>
                            {isLoading ? (
                                <div className='space-y-2'>
                                    <div className='flex items-center space-x-4 '>
                                        <Skeleton className='p-2 w-full rounded bg-gray-200 flex space-x-4'>
                                            <Skeleton className='h-12 w-12 bg-gray-300 rounded' />
                                            <div className='flex flex-col w-full gap-2'>
                                                <Skeleton className='p-2 w-1/6 rounded bg-gray-300' />
                                                <Skeleton className='p-2 w-1/4 rounded bg-gray-300' />
                                            </div> 
                                        </Skeleton>
                                    </div>
                                    <div className='flex items-center space-x-4 '>
                                        <Skeleton className='p-2 w-full rounded bg-gray-200 flex space-x-4'>
                                            <Skeleton className='h-12 w-12 bg-gray-300 rounded' />
                                            <div className='flex flex-col w-full gap-2'>
                                                <Skeleton className='p-2 w-1/6 rounded bg-gray-300' />
                                                <Skeleton className='p-2 w-1/4 rounded bg-gray-300' />
                                            </div> 
                                        </Skeleton>
                                    </div>
                                    <div className='flex items-center space-x-4 '>
                                        <Skeleton className='p-2 w-full rounded bg-gray-200 flex space-x-4'>
                                            <Skeleton className='h-12 w-12 bg-gray-300 rounded' />
                                            <div className='flex flex-col w-full gap-2'>
                                                <Skeleton className='p-2 w-1/6 rounded bg-gray-300' />
                                                <Skeleton className='p-2 w-1/4 rounded bg-gray-300' />
                                            </div> 
                                        </Skeleton>
                                    </div>
                                </div>

                            ) : (
                                teamsInfo?.members && Object.entries(teamsInfo.members).map(([memberId, memberInfo]) => (
                                    <div className='bg-gray-200 p-2 rounded flex justify-between items-center my-2' key={memberId}>
                                        <div className='flex gap-2'>
                                            <div className='flex items-center p-2 bg-white rounded px-3'>
                                                <User />
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='font-bold'>{memberInfo.name}</span>
                                                <span className='font-medium'>{memberInfo.position}</span>
                                            </div>
                                        </div>

                                        <div className='flex gap-2'>
                                            <button className='hover:bg-white p-2 rounded flex items-center text-yellow-500 duration-500'>
                                                <Info />
                                            </button>
                                            {userInfo?.admin.permissions.addPermissions && (
                                                <button className='hover:bg-white p-2 rounded flex items-center duration-500'>
                                                    <Edit />
                                                </button>
                                            )}

                                        </div>

                                    </div>
                                ))
                            )}
                    </div>
                    </div>
                </div>
            </div>
        </VerifyAdminIsTrue>
    )
}