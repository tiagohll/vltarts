import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../../services/firebaseConfig";
import { Eye, EyeOff } from "lucide-react";
import { ref, set } from "firebase/database";



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






export default function Cadastro() {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [phone, setPhone] = useState('+55');
    const [phoneError, setPhoneError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    

    const formatPhone = (value: string) => {
        // Remove all non-digit characters from the input value
        const digitsOnly = value.replace(/\D/g, '');
    
        if (digitsOnly.length <= 2) {
          // For 2 digits or less, simply set the value
          setPhone(`+55${digitsOnly}`);
        } else {
          // Apply the desired phone number format
          const formattedPhone = `+55 (${digitsOnly.slice(2, 4)}) ${digitsOnly.slice(
            4,
            5
          )} ${digitsOnly.slice(5, 9)} ${digitsOnly.slice(9)}`;
    
          setPhone(formattedPhone);
        }
    };
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        formatPhone(value);
    };

    const isValidEmail = (email: string) => {
        const emailRegex  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const handleCadastro = async (event: FormEvent) => {
        event.preventDefault();
        if (name !== '' && phone !== '+55' && email.length > 3 && password.length > 8) {

                try {
                    const { user } = await createUserWithEmailAndPassword(auth, email, password);
                    if (user) {
                        await updateProfile(user, {
                            displayName: name,
                        });
                        const db = database;
                        const userRef = ref(db, `users/${user.uid}/`);
                        const newUser = {
                            id: user.uid,
                            name: name,
                            phone: phone,
                            email: email,
                            cart: [],
                        }
                        await set(userRef, newUser);
                    }

                    navigate('/app/my-account');
                } catch (error) {
                    console.error(error);
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
                if (!isValidEmail(email)) {
                    setEmailError('invalid');
                }
            }

            if (email === '') {
                setEmailError('required');
            }
            if (name === '') {
                setNameError('required');
            }
            if (phone === '+55') {
                setPhoneError('required');
            }
        }
        
    }

    const calculatePasswordStrength = (password: string): number => {
        // Se a senha não atender a nenhum critério, retorna 0%
        if (password.length === 0) {
          return 0;
        }
      
        // Inicializa a força da senha com 0%
        let strength = 0;
      
        // Verifica os critérios individuais e atualiza a força de acordo
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasUpperCaseLetter = /[A-Z]/.test(password);
        const hasLowerCaseLetter = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
      
        // Cada critério pode adicionar uma porcentagem à força da senha
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
      
        // Se o tamanho da senha for maior que 1, adiciona mais 25% à força
        if (password.length > 1) {
          strength += 25;
        }
      
        // Limita a força da senha a 100%
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
                        <form className='flex flex-col justify-center m-5 items-center' onSubmit={handleCadastro}>

                            <div className='flex flex-col font-medium text-gray-500 w-5/6 md:w-3/6 xl:w-1/6 duration-500'>

                                <label htmlFor="name">Nome:</label>

                                <input
                                    type="text"
                                    id="name"
                                    className='p-2 rounded text-black bg-transparent'
                                    placeholder="Nome"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                />

                                {nameError === 'required' && (
                                    <span className='text-red-500 text-sm'>Nome inválido. Certifique-se de digitar um nome válido.</span>
                                )}
                                

                            </div>

                            <div className='flex flex-col font-medium text-gray-500 w-5/6 md:w-3/6 xl:w-1/6 duration-500'>

                                <label htmlFor="phone">Telefone:</label>

                                <input
                                    type="text"
                                    id="phone"
                                    className='p-2 rounded text-black bg-transparent'
                                    placeholder="+55 (12) 3 4567-8901"
                                    value={phone}
                                    onChange={handleChange}
                                />

                                {phoneError === 'required' && (
                                    <span className='text-red-500 text-sm'>Telefone inválido. Certifique-se de digitar um número válido.</span>
                                )}

                                

                            </div>

                            <div className='flex flex-col font-medium text-gray-500 w-5/6 md:w-3/6 xl:w-1/6 duration-500'>

                                <label htmlFor="name">E-mail:</label>

                                <input
                                    type="email"
                                    id="email"
                                    className='p-2 rounded text-black bg-transparent'
                                    placeholder="seu-melhor@e-mail.com"
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

                            <button type="submit" className='p-2 bg-[#24F46E] w-5/6 md:w-3/6 xl:w-1/6 mt-5 rounded font-bold hover:bg-green-500 duration-500'>Cadastrar-se</button>
                            <span className='text-xl font-medium my-2 text-center'>OU</span>
                            <span className="text-gray-800 font-medium text-center">Faça <Link to='/login' className='text-black font-bold'>login</Link></span>

                        </form>
                        
                    </div>
                <Footer/>
            </>
        )
    }
}