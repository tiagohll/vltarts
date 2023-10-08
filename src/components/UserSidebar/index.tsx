import { AlertTriangle, FileText, LogOut, Package, /* User */ } from "lucide-react"
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const userPages = [
/*     {
        id: 1,
        icon: User,
        path: "myaccount",
        title: "Minha conta"
    }, */
    {
        id: 2,
        icon: Package,
        path: "myorders",
        title: "Meus pedidos"
    },
    {
        id: 3,
        icon: FileText,
        path: "mydata",
        title: "Meus dados"
    }
]

interface SettingsSideBarProps {
    pageA: string;
    setPage: (page: string) => void;
}

export default function UserSidebar({pageA, setPage}: SettingsSideBarProps) {
    const [signOutModal, setSignOutModal] = useState(false);
    const [animateModal, setAnimateModal] = useState('');
    const [animateBackground, setAnimateBackground] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (signOutModal) {
            document.body.style.overflow = 'hidden';
            document.body.style.cursor = 'default';

            const handleOutsideClick = (event: MouseEvent) => {
                const target = event.target as HTMLElement;
        
                if (!target.closest('.cart')) {
                    hideSignOutModal()
                }
            };
        
            document.addEventListener('mousedown', handleOutsideClick);
        
            return () => {
                document.body.style.overflow = '';
                document.body.style.cursor = '';
                document.removeEventListener('mousedown', handleOutsideClick);
            };
        }
    }, [signOutModal])

    const showSignOutModal = () => {
        setSignOutModal(true);
        setAnimateModal('animate-modal-show');
        setAnimateBackground('animate-opacity-show');
    }

    const hideSignOutModal = () => {
        setAnimateModal('animate-modal-hide');
        setAnimateBackground('animate-opacity-hidden');
        setTimeout(() => {
            setSignOutModal(false);
        }, 510);
    }

    const handleLogout = async () => {
        const auth = getAuth();
    
        try {
          await signOut(auth);
          navigate('/login');
        } catch (error) {
            console.log(error)
        }
    };
    
    return (
        <>
            <div className='xl:w-1/12 fixed p-1 py-2 bg-zinc-300 gap-2 rounded m-5'>
                {userPages.map((page) => (
                    <button
                        key={page.id}
                        className={`flex items-center w-full p-2 my-1 rounded gap-2 ${pageA == page.path && "bg-zinc-400 bg-opacity-50 font-bold"} duration-300 hover:bg-zinc-400 hover:bg-opacity-50 font-medium`}
                        onClick={() => {setPage(page.path)}}
                    >
                        <page.icon size={24} />
                        <span>{page.title}</span>
                    </button>
                ))}
                <button
                    className={`flex items-center w-full p-2 my-1 rounded gap-2 duration-300 hover:bg-zinc-400 hover:bg-opacity-50 font-medium`}
                    onClick={showSignOutModal}
                >
                    <LogOut size={24} />
                    <span>Sair</span>
                </button>
            </div>

            {signOutModal && (
                <div className={`${animateBackground} flex items-center justify-center modal left-0 top-0 w-full h-screen bg-white bg-opacity-50 absolute`}>
                    <div className={`${animateModal} bg-zinc-200 w-1/4 shadow p-2 py-10 text-center flex flex-col items-center font-bold gap-2 text-lg`}>
                        <h1 className='flex gap-2 text-center justify-center'><AlertTriangle className='text-red-600' /> Você realmente deseja sair da sua conta?</h1>
                        <div className='flex gap-5 font-medium'>
                            <button onClick={handleLogout} className='p-1 bg-green-500 rounded hover:bg-green-600 duration-200'>Sim, sair</button>
                            <button onClick={hideSignOutModal} className='p-1 bg-red-500 rounded hover:bg-red-600 duration-200'>Não, cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}