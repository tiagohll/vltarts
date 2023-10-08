import {  Check, Edit, FolderOpenDot, GanttChartSquare, Info, Plus} from "lucide-react";
import AdminBar from "../../components/Adminbar";
import { auth } from "../../../../services/firebaseConfig";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import ModalCreateProject from "./createProjectModal";
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
}

interface MembersInterface {
    name: string;
    position: string;
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
    members: MembersInterface;
    projects: ProjectsInterface[];
}

export default function AdminProjects() {
    const user = auth.currentUser
    const [teamsInfo, setTeamsInfo] = useState<Teams>()
    const [userInfo, setUserInfo] = useState<UserAdmin>()
    const [concluedProjects, setConcluedProjects] = useState(0)
    const [totalProjects, setTotalProjects] = useState(0)
    const [pendingProjects, setPendingProjects] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [modalCreateProject, setModalCreateProject] = useState(false)
    const [selected, setSelected] = useState(
        {
            id: 0
        }
    )

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
                setTotalProjects(snapshot.val().totalProjects)
                setPendingProjects(snapshot.val().pendingProjects)
                setIsLoading(false)
            })
        }
    }, [user, userInfo])

    const selectProject = (project: number) => {
        if (selected.id !== project) {
            setSelected({
                id: project
            })
        } else {
            setSelected({
                id: 0
            })
        }
    }

    const setConclued = async (project: number) => {
        if (user) {
            set(ref(getDatabase(), `teams/${userInfo?.admin.team}/concluedProjects`), concluedProjects + 1)
            set(ref(getDatabase(), `teams/${userInfo?.admin.team}/projects/${project}/conclued`), true);
            set(ref(getDatabase(), `teams/${userInfo?.admin.team}/totalProjects`), concluedProjects + pendingProjects);
            if (pendingProjects > 0) {
                set(ref(getDatabase(), `teams/${userInfo?.admin.team}/pendingProjects`), pendingProjects - 1);
              }

            await setSelected({
                id: 0
            })
        }
    }

    return (
        <VerifyAdminIsTrue>
            <div className='flex'>
                <AdminBar atualPage="projects" />
                {modalCreateProject && (
                    <ModalCreateProject setPage={setModalCreateProject} />
                )}
                <div className='p-5 w-full'>
                    <div className='bg-gray-300 shadow p-2 w-full rounded'>
                        <h1 className="font-bold text-2xl flex items-center gap-2"><FolderOpenDot /> Projetos</h1>
                        <h2 className='font-medium'>Ajuda o seu time a concluir seus projetos.</h2>

                        <div className='bg-white p-2 rounded flex justify-between items-center'>
                            <div className='flex gap-2 items-center'>
                            {userInfo?.admin.permissions.seeAllTeamsProjects ? (
                                <>
                                    <button className='font-bold bg-gray-200 hover:bg-gray-200 p-2 rounded duration-500'>Administrator</button>
                                    <button className='font-bold hover:bg-gray-200 p-2 rounded duration-500'>Promoter</button>
                                </>

                            ) : (
                                <button className='font-bold bg-gray-200 hover:bg-gray-200 p-2 rounded duration-500'>{userInfo?.admin.team}</button>
                            )}
                            </div>
                            {userInfo?.admin.permissions.createProject && (
                                <div className='flex items-center'>
                                    <button onClick={() => setModalCreateProject(true)} className='font-bold hover:bg-gray-200 p-2 rounded duration-500'><Plus /></button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='bg-gray-300 my-2 p-2 rounded w-full h-[80%] flex items-center justify-center'>
                        <div className='bg-white p-2 rounded w-full h-full'>
                            {isLoading ? (
                                <div className='flex space-x-2'>
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
                                <div className='flex gap-5 items-center'>
                                    <div className='bg-gray-200 p-2 rounded'>
                                        <h2 className='font-bold'>Projetos concluidos</h2>
                                        <span className='text-green-600 font-medium text-2xl'>{teamsInfo?.concluedProjects}</span>
                                    </div>

                                    <div className='bg-gray-200 p-2 rounded'>
                                        <h2 className='font-bold'>Projetos pendentes</h2>
                                        <span className='font-medium text-2xl'>{teamsInfo?.pendingProjects}</span>
                                    </div>

                                    <div className='bg-gray-200 p-2 rounded'>
                                        <h2 className='font-bold'>Numero total de projetos</h2>
                                        <span className='font-medium text-2xl'>{totalProjects}</span>
                                    </div>
                                </div>
                            )}
                            <h2 className='font-bold text-2xl my-2'>Projetos</h2>
                            {selected.id !== 0 && (
                                <div className='flex gap-2 my-2'>
                                    <button className='bg-gray-200 p-2 font-medium rounded' onClick={() => setConclued(selected.id)}>Marcar como concluido</button>
                                    {userInfo?.admin.permissions.deleteProject && (
                                        <button className='bg-gray-200 p-2 font-medium rounded'>Excluir</button>  
                                    )}
                                    
                                </div>
                            )}
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
                                teamsInfo?.projects.map((project) => (
                                    !project.conclued ? (
                                        <div onClick={() => selectProject(project.id)} className={`my-2 select-none flex justify-between p-2 rounded ${selected?.id === project.id ? 'bg-blue-200' : 'bg-gray-200'} items-center duration-200`} key={project.id}>
                                            <div className='flex gap-2 items-center duration-500'>
                                                {selected?.id === project.id && (
                                                    <div className='cursor-pointer flex items-center justify-center bg-blue-400 rounded h-8 w-8'>
                                                        <Check size={20} />
                                                    </div>
                                                )}
                                                <div className={`flex items-center p-2 ${selected?.id === project.id ? 'bg-blue-100' : 'bg-white'} rounded px-3 duration-200`}>
                                                    <GanttChartSquare />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='font-bold'>{project.title}</span>
                                                    <span className='font-medium'>{project.desc}</span>
                                                </div>

                                            </div>

                                            <div className='flex gap-2'>
                                                <button className='hover:bg-white p-2 rounded flex items-center duration-500'>
                                                    <Info />
                                                </button>
                                                {userInfo?.admin.permissions.changeProjects && (
                                                    <button className='hover:bg-white p-2 rounded flex items-center duration-500'>
                                                        <Edit />
                                                    </button>
                                                )}

                                            </div>

                                        </div>
                                    ) : (
                                        <div className={`my-2 select-none flex justify-between bg-gradient-to-r from-green-200 to-gray-200 p-2 rounded`} key={project.id}>
                                            <div className='flex gap-2 items-center duration-500'>
                                                <div className={`flex items-center p-2 bg-white rounded px-3 duration-200`}>
                                                    <GanttChartSquare />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='font-bold'>{project.title}</span>
                                                    <span className='font-medium'>{project.desc}</span>
                                                </div>

                                            </div>

                                            <div className='flex gap-2'>
                                                <button className='hover:bg-white p-2 rounded flex items-center duration-500'>
                                                    <Info />
                                                </button>
                                                {userInfo?.admin.permissions.changeProjects && (
                                                    <button className='hover:bg-white p-2 rounded flex items-center duration-500'>
                                                        <Edit />
                                                    </button>
                                                )}

                                            </div>

                                        </div>
                                    )
                                    
                                ))
                        )}
                    </div>
                    </div>
                </div>
            </div>
        </VerifyAdminIsTrue>
    )
}