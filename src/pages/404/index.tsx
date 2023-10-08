import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Lottie from 'react-lottie';
import animationData from '../../assets/lottie/404.json';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Page404() {
    const navigate = useNavigate()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData
    }

    useEffect(() => {
        document.title = "Página não encontrada - VLT Art's"
    })

    return (
        <>
            <Header />
                <section className='flex justify-center divide-x-2 min-h-screen'>
                    <div className='flex flex-col items-center font-medium m-10'> 
                        <span className='font-bold my-5'>Página não encontrada. Tente</span>
                        <div className='flex gap-2'>
                            <button onClick={() => {navigate(-1)}} className='p-2 bg-[#24F46E] hover:bg-green-500 rounded duration-500'>Voltar para a página anterior</button>
                            <Link to='/' className='hover:bg-gray-300 duration-500 p-2 rounded'>Voltar para a página inicial</Link>
                        </div>

                        <div className='hidden sm:flex'>
                            <Lottie options={defaultOptions} width={600} />
                        </div>
                    </div>
                    
                </section>
            <Footer />
        </>
    )
}