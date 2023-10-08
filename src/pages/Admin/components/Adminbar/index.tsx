import { Flag, FolderOpenDot, Home, Menu, Search, Settings, User, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../../services/firebaseConfig";
import { getDatabase, onValue, ref } from "firebase/database";
import { Input } from "../../../../components/ui/input";

interface AdminBar {
    atualPage: string;
}

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
    admin: AdminInterface;
}

export default function AdminBar({atualPage}: AdminBar) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [animate, setAnimate] = useState("");
    const user = auth.currentUser
    const [userInfo,setUserInfo] = useState<UserAdmin>()
    const [searchOn, setSearchOn] = useState(false)

    const show = () => {
        setAnimate("animate-show-sidebar");
        setIsOpen(true);
        
    }

    const hidden = () => {
        setIsOpen(false);
        setAnimate("animate-hide-sidebar");
    }

    const clearSearch = () => {
        setSearch("");
    }

    useEffect(() => {
        if (user) {
            onValue(ref(getDatabase(), `users/${user.uid}`), (snapshot) => {
                setUserInfo(snapshot.val())
            })
        }
    }, [user])

    return (
        <>
            {isOpen ? (
                <nav className={`${animate} h-screen lg:w-[20%] lg:relative lg:bg-transparent absolute w-[100%] bg-white z-10 flex flex-col p-5 font-medium shadow justify-between`}>
                    <div className='gap-y-1 flex flex-col w-full'>
                        <div className='h-[40px] w-full mb-5 flex items-center gap-2'>
                            <button onClick={hidden} className='p-2 hover:bg-gray-300 rounded-full duration-700'><Menu /></button>
                            
                            <img
                                className='h-[50px]'
                                src='https://firebasestorage.googleapis.com/v0/b/design-6a54f.appspot.com/o/images%2Fpublic%2FVLTPNG.png?alt=media&token=c4af6e40-50e2-45e7-8700-abd70df34d1b' 
                            />
                        </div>
                        <div className='relative'>
                            <div>
                                <Search className='absolute m-[9px]'/>
                                <X className={`absolute right-2 mt-[9px] cursor-pointer ${search.length > 0 ? "block" : "hidden"}`} onClick={clearSearch} />
                            </div>

                            <input 
                                type="text"
                                className='peer hover:bg-gray-300 w-full bg-transparent p-2 pl-10 pr-10 rounded placeholder-gray-700 focus:bg-gray-300'
                                placeholder="Buscar..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Link
                            to='/admin' 
                            className={`${atualPage === 'home' ? 'bg-gray-300' : ''} hover:bg-gray-300 flex justify-start gap-5 p-2 rounded duration-500`}
                        >
                            <Home /> Dashboard
                        </Link>
                        {userInfo?.admin?.team && (
                            <>
                                <Link 
                                    to='/admin/team' 
                                    className={`${atualPage === 'team' ? 'bg-gray-300' : ''} hover:bg-gray-300 flex justify-start gap-5 p-2 rounded duration-500`}
                                >
                                    <Users /> Time
                                </Link>

                                <Link 
                                    to='/admin/projects' 
                                    className={`${atualPage === 'projects' ? 'bg-gray-300' : ''} hover:bg-gray-300 flex justify-start gap-5 p-2 rounded duration-500`}
                                >
                                    <FolderOpenDot /> Projetos
                                </Link>
                            </>

                        )}



                        {userInfo?.admin?.permissions?.seeReports && (
                            <Link
                                to='/admin/reports' 
                                className={`${atualPage === 'reports' ? 'bg-gray-300' : ''} hover:bg-gray-300 flex justify-start gap-5 p-2 rounded duration-500`}
                            >
                                <Flag /> Reports
                            </Link>
                        )}

                    </div>
                    <div className='gap-y-2 font-normal'>
                        <h1 className='p-2'>Seu time: <Link to={`/admin/team?team=${userInfo?.admin?.team}`} className="font-medium">{userInfo?.admin?.team} ({userInfo?.admin?.position})</Link></h1>
                        <Link to='/admin/team?user=uid' className='flex hover:bg-gray-300 duration-500 items-center gap-5 group p-1 font-medium rounded'>
                            <div className='p-2 group-hover:bg-gray-200 bg-gray-300 rounded-full h-10 w-10 flex items-center duration-500'><User /></div>
                            <span className='max-w-[80%] overflow-hidden duration-500'>Tiago Henrique</span>
                        </Link>
                    </div>

                    <div className='w-full'>
                        <Link to='/admin/settings' 
                            className={`${atualPage === 'settings' ? 'bg-gray-300' : ''} hover:bg-gray-300 flex justify-start gap-5 p-2 rounded duration-500`}
                        >
                            <Settings/> Configurações
                        </Link>
                    </div>
                </nav>

            ) : (

                <nav className={`lg:${animate} lg:h-screen h-10 w-full lg:w-[10%] 2xl:w-[5%] z-10 flex lg:flex-col p-5 font-medium md:shadow justify-between`}>
                    <button onClick={show} className='p-2 hover:bg-gray-300 rounded-full duration-700 hidden md:flex lg:hidden'><Menu /></button>
                    <button onClick={show} className='p-2 hover:bg-gray-300 rounded-full duration-700 flex md:hidden'><Menu /></button>
                    <div className='gap-y-1 flex-col w-full hidden lg:flex'>
                        <div className='h-[40px] w-full mb-5 flex items-center gap-2'>
                            <button onClick={show} className='hover:bg-gray-300 flex justify-center gap-5 p-2 rounded duration-500'><Menu /></button>
                            
                            <img
                                className='h-[50px] hidden lg:flex'
                                src='https://firebasestorage.googleapis.com/v0/b/design-6a54f.appspot.com/o/images%2Fpublic%2FVLTPNG.png?alt=media&token=c4af6e40-50e2-45e7-8700-abd70df34d1b' 
                            />
                        </div>
                        <div className='relative w-full'>
                            {searchOn && (
                                <div className='relative'>
                                    <div>
                                        {search.length > 0 && (
                                            <X className='absolute left-[385%] z-50 mt-[9px] cursor-pointer' onClick={clearSearch} />
                                        )}
                                        
                                    </div>
                                    <Input 
                                        type="text" 
                                        placeholder="Buscar..." 
                                        autoFocus 
                                        className='absolute left-[90%] w-[30vh] pr-12'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>

                            )}
                            <div onClick={() => setSearchOn(!searchOn)}>
                                <Search size={40} className={`cursor-text hover:bg-gray-300 w-full p-2 rounded ${searchOn ? ("bg-gray-300") : ("bg-transparent")}`}/>
                            </div>
                        </div>
                        <Link
                            to='/admin' 
                            className={`${atualPage === 'home' ? 'bg-gray-300' : ''} hover:bg-gray-300 flex justify-center gap-5 p-2 rounded duration-500`}
                        >
                            <Home />
                        </Link>

                        <Link 
                            to='/admin/team' 
                            className={`${atualPage === 'team' ? 'bg-gray-300' : ''} hover:bg-gray-300 flex justify-center gap-5 p-2 rounded duration-500`}
                        >
                            <Users />
                        </Link>

                        <Link 
                            to='/admin/projects' 
                            className={`${atualPage === 'projects' ? 'bg-gray-300' : ''} hover:bg-gray-300 flex justify-center gap-5 p-2 rounded duration-500`}
                        >
                            <FolderOpenDot />
                        </Link>

                        <Link 
                            to='/admin/reports' 
                            className={`${atualPage === 'reports' ? 'bg-gray-300' : ''} hover:bg-gray-300 flex justify-center gap-5 p-2 rounded duration-500`}
                        >
                            <Flag />
                        </Link>
                    </div>

                    <div className='lg:w-full'>
                        <Link to='/admin/settings' 
                            className={`${atualPage === 'settings' ? 'bg-gray-300' : ''} hover:bg-gray-300 flex justify-center gap-5 p-2 rounded duration-500`}
                        >
                            <Settings/>
                        </Link>
                    </div>
                </nav>
            )}
            
        </>
    )
}