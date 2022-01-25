import React, { useState } from 'react';
import eye from '../../assets/eye.svg';
import eyeOff from '../../assets/eye-off.svg';

interface Props {
    showLogin: boolean,
    setShowLogin: Function,
    setShowSignup: Function
}

const Login: React.FC<Props> = ({ showLogin, setShowLogin, setShowSignup }) => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    function changePage(): void {
        setShowLogin(false);
        setShowSignup(true);
        setCredentials({ email: '', password: '' });
        setShowPassword(false);
    }

    function handleChange(event: any): void {
        const { name, value } = event.target;
        setCredentials(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        });
    }

    function handleSubmit(event: any): void {
        event.preventDefault();
        const { email, password } = credentials;
        console.log(`Email: ${email}\nPassword: ${password}`);
    }


    return (
        showLogin ?
            <div className="bg-slate-800 text-yellow-50 flex flex-col p-20 h-[800px] w-[700px] self-center justify-center justify-self-center rounded">
                <h2 className='text-5xl font-medium mb-2'>Log in.</h2>
                <p className='mb-10'>Acess the site with the data you entered during registration.</p>
                <form className='flex flex-col' onSubmit={(event) => handleSubmit(event)}>
                    <label className='mb-1'>Email</label>
                    <input className=' mb-7 p-2 rounded text-slate-800' name='email' onChange={event => handleChange(event)} value={credentials.email} />
                    <label className='mb-1'>Password</label>
                    <div className='relative'>
                        <input className='p-2 rounded text-slate-800 w-full' name='password' type={showPassword ? 'text' : 'password'} onChange={(event) => handleChange(event)} value={credentials.password} />
                        <img className='h-8 w-8 absolute right-2 translate-y-1/2 bottom-1/2' onClick={() => setShowPassword(!showPassword)} src={showPassword ? eye : eyeOff} alt='password is visible' />
                    </div>
                    <button className='mt-12 mb-5 bg-emerald-500 text-slate-800 font-semibold p-2 rounded hover:bg-emerald-600' type='submit'>Log in</button>
                </form>
                <p className='text-center'>Don't have an account? <span className='cursor-pointer font-semibold text-emerald-400 hover:text-emerald-500' onClick={() => changePage()}>Sign up</span></p>
                <p className=' cursor-pointer font-semibold text-center text-emerald-400 hover:text-emerald-500'>Forgot password?</p>
            </div>
            : null
    )
}

export default Login