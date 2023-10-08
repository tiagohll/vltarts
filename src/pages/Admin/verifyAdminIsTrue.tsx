import { ReactNode, useEffect, useState } from "react";
import { auth } from "../../services/firebaseConfig";
import { get, getDatabase, ref } from "firebase/database";
import Page404 from "../404";

export default function VerifyAdminIsTrue({ children }: { children: ReactNode }) {
    const [isTrue, setIsTrue] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getAdminIsTrue = async () => {
            if (auth.currentUser) {
                const snapshot = await get(ref(getDatabase(), `users/${auth.currentUser.uid}`));
                const userData = snapshot.val();

                if (userData?.admin?.isTrue) {
                    setIsTrue(true);
                }
            }
            setIsLoading(false);
        };

        setTimeout(() => {
            getAdminIsTrue();
        }, 300);
        
    }, []);

    if (isLoading) {
        // Mostrar um indicador de carregamento enquanto os dados são buscados
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <div className='border-2 border-b-green-500 border-gray-300 rounded-full p-5 animate-spin' />
            </div>
        );
    } else if (auth.currentUser) {
        console.log(auth.currentUser.uid + ":", isTrue);
        return (
            <>
                {isTrue && children}
            </>
        );
    }
    else {
        return <Page404 />
    }
}