import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const ProgressBar = ({ passwordStrength }: { passwordStrength: number }) => {
    const clampedStrength = Math.min(100, Math.max(0, passwordStrength));
  
    let strengthClass = '';
    if (clampedStrength < 30) {
      strengthClass = 'weak';
    } else if (clampedStrength >= 30 && clampedStrength < 70) {
      strengthClass = 'medium';
    } else {
      strengthClass = 'strong';
    }
  
    return (
      <div className='w-full bg-gray-400 h-2 mt-2 rounded'>
        <div
          className={`h-full rounded ${strengthClass == 'weak' && ('bg-red-600') || strengthClass == 'medium' && ('bg-yellow-500') || strengthClass == 'strong' && ('bg-green-600')}`}
          style={{ width: `${clampedStrength}%`, transition: 'width 0.3s ease-in-out' }}
        ></div>
      </div>
    );
};

export default function Login() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [loginErr, setLoginErr] = useState('');
    const [gLoginErr, setGLoginErr] = useState(false);
    const navigate = useNavigate();

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const isValidEmail = (email: string) => {
        const emailRegex  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        if (email.length > 3 && password.length > 8) {

            const auth = getAuth();
            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('Login bem-sucedido');
                navigate(-1);
            } catch (error) {
                console.error('Erro ao fazer login:', error);
            
                if (error instanceof FirebaseError) {
                    setGLoginErr(true);
                    console.log('Código do erro:', error.code);
                    console.log('Mensagem do erro:', error.message);
                    if (error.code) {
                    setLoginErr('E-mail ou senha inválidos.');
                    } else {
                    setLoginErr('Desconhecido, entre em contato com o suporte.');
                    }
                } else {
                    console.log('Erro desconhecido ao fazer login.');
                }
            }
        } else {
            if (password.length > 0) {
                if (password.length < 8) {
                    setPasswordError('length');
                }
            }
            
            if (password === '') {
                setPasswordError('required');
            }
            if (email.length > 0) {
                if (!isValidEmail) {
                    setEmailError('invalid');
                }
            }

            if (email === '') {
                setEmailError('required');
            }
        }
        
    }

    const calculatePasswordStrength = (password: string): number => {
        if (password.length === 0) {
          return 0;
        }
      
        let strength = 0;
      
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasUpperCaseLetter = /[A-Z]/.test(password);
        const hasLowerCaseLetter = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
      
        if (hasSpecialCharacter) {
          strength += 25;
        }
      
        if (hasUpperCaseLetter) {
          strength += 25;
        }
      
        if (hasLowerCaseLetter) {
          strength += 25;
        }
      
        if (hasNumber) {
          strength += 25;
        }
      

        if (password.length > 1) {
          strength += 25;
        }
      
        if (strength > 100) {
          strength = 100;
        }
      
        return strength;
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordStrength(calculatePasswordStrength(event.target.value));
    }


    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            navigate('/app/my-account');
        }
    })

    if (user) {
        return null
    } else {
        return (
            <>
                <Header />
                    <div className='min-h-screen'>
                        <h1 className='text-4xl font-bold text-center mt-3'>Cadastro</h1>
                        <form className='flex flex-col justify-center m-5 items-center' onSubmit={handleLogin}>

                            {gLoginErr ? (
                                <div className="bg-red-500 w-5/6 md:w-3/6 xl:w-1/6 p-3 rounded-lg duration-500">
                                    <span className='font-bold'>ERRO:</span> {loginErr}
                                </div>
                            ) : null}

                            <div className='flex flex-col font-medium text-gray-500 w-5/6 md:w-3/6 xl:w-1/6 duration-500'>

                                <label htmlFor="name">E-mail:</label>

                                <input
                                    type="email"
                                    id="email"
                                    className='p-2 rounded text-black bg-transparent'
                                    placeholder="e-mail@e-mail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError === 'invalid' && (
                                    <span className='text-red-500 text-sm'>Email inválido. Insira um email válido.</span>
                                )}

                                {emailError === 'required' && (
                                    <span className='text-red-500 text-sm'>Email inválido. Certifique-se de digitar um email válido.</span>
                                )}
                                

                                

                            </div>

                            <div className=' flex flex-col font-medium text-gray-500 w-5/6 md:w-3/6 xl:w-1/6 duration-500'>

                                <label htmlFor="password">Senha:</label>


                                <div className='relative'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className='p-2 pr-11 rounded text-black bg-transparent w-full'
                                        placeholder="Senha"
                                        value={password}
                                        onChange={handleChangePassword}
                                    />
                                    <button
                                        type="button"
                                        className='absolute right-2 top-3 px-2 focus:outline-none'
                                        onClick={handleTogglePassword}
                                        >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                <ProgressBar passwordStrength={passwordStrength} />

                                <span className={`text-sm ${passwordStrength < 30 && ('text-red-600') || passwordStrength >= 30 && passwordStrength < 60 && ('text-yellow-500') || passwordStrength >= 60 && ('text-green-600')}`}>Senha {passwordStrength < 30 && ('fraca') || passwordStrength >= 30 && passwordStrength < 60 && ('média') || passwordStrength >= 60 && ('forte')}</span>

                                {passwordError === 'length' && (
                                    <span className='text-red-500 text-sm'>Senha inválida. A senha deve conter pelo menos 8 caracteres.</span>
                                )}

                                {passwordError === 'required' && (
                                    <span className='text-red-500 text-sm'>Senha inválida. Certifique-se de digitar uma senha válida.</span>
                                )}

                                

                            </div>

                            <button type="submit" className='p-2 bg-[#24F46E] w-5/6 md:w-3/6 xl:w-1/6 mt-5 rounded font-bold hover:bg-green-500 duration-500'>Entrar</button>
                            <span className='text-xl font-medium my-2 text-center'>OU</span>
                            <span className="text-gray-800 font-medium text-center">Faça seu<Link to='/login' className='text-black font-bold'>cadastro</Link></span>

                        </form>
                        
                    </div>
                <Footer/>
            </>
        )
    }
}