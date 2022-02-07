import React, { useState } from 'react';
import eye from '../../assets/eye.svg';
import eyeOff from '../../assets/eye-off.svg';
import info from '../../assets/info.svg';

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
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    function changePage(): void {
        setShowLogin(false);
        setShowSignup(true);
        setCredentials({ email: '', password: '' });
        setShowPassword(false);
        setEmailErr('');
        setPasswordErr('');
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
        setEmailErr('');
        setPasswordErr('');
        const { email, password } = credentials;
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const regexPassword = /^(.{0,7}|[^A-Z]{1,}|[^a-z]{1,}|[^\d]{1,})$|[\s]/
        if (!regexEmail.test(email)) setEmailErr('*Please enter a valid email address.');
        if (regexPassword.test(password)) setPasswordErr('*Password must be atleast 8 characters, and contain atleast 1 uppercase letter, 1 lowercase letter, and 1 number.');
        // Checks for special characters
        // const regex2 = /[^((0-9)|(a-z)|(A-Z)|\s)]/
    }

    // return (
    //     showLogin ?
    //         <div className="bg-slate-800 text-yellow-50 flex flex-col p-20 h-[800px] w-[700px] self-center justify-center justify-self-center rounded">
    //             <h2 className='text-5xl font-medium mb-2'>Log in.</h2>
    //             <p className='mb-2'>Enter your email address and a password to create an account.</p>
    //             <form className='flex flex-col' onSubmit={(event) => handleSubmit(event)}>
    //                 <label className='mb-1 mt-4'>Email</label>
    //                 <input className='p-2 rounded text-slate-800' name='email' onChange={event => handleChange(event)} value={credentials.email} />
    //                 <p className='h-1 mb-7 text-red-400'>
    //                     {emailErr}
    //                 </p>
    //                 <label className='mb-1'>Password</label>
    //                 <div className='relative'>
    //                     <input className='p-2 rounded text-slate-800 w-full' name='password' type={showPassword ? 'text' : 'password'} onChange={(event) => handleChange(event)} value={credentials.password} />
    //                     <img className='h-8 w-8 absolute right-2 translate-y-1/2 bottom-1/2' onClick={() => setShowPassword(!showPassword)} src={showPassword ? eye : eyeOff} alt={showPassword ? 'password is visible' : 'password is not visible'} />
    //                 </div>
    //                 <p className='h-1 text-red-400'>
    //                     {passwordErr}
    //                 </p>
    //                 <button className='mt-12 mb-5 bg-emerald-500 text-slate-800 font-semibold p-2 rounded hover:bg-emerald-600' type='submit'>Log in</button>
    //             </form>
    //             <p className='text-center'>Don't have an account? <span className='cursor-pointer font-semibold text-emerald-400 hover:text-emerald-500' onClick={() => changePage()}>Sign up</span></p>
    //             <p className=' cursor-pointer font-semibold text-center text-emerald-400 hover:text-emerald-500'>Forgot password?</p>
    //         </div>
    //         : null
    // )

    return (
        showLogin ?
            <div className='bg-slate-800 text-yellow-50 self-center justify-self-center rounded
            h-[500px] w-[350px] p-7
            2xl:h-[800px] 2xl:w-[700px] 2xl:p-20'>
                <h2 className='text-4xl font-medium mb-2'>Log in.</h2>
                <p className='hidden 2xl:block'>Enter your email address and a password to create an account.</p>
                <form className='flex flex-col' onSubmit={(event) => handleSubmit(event)}>
                    <label className='mb-1'>Email</label>
                    <input className='p-2 rounded text-slate-800 w-64' name='email' onChange={event => handleChange(event)} value={credentials.email} />
                    <p className='mb-7 text-red-400'> {emailErr} </p>
                    <label className='mb-1'>Password</label>
                    <div className='relative'>
                        <input className='p-2 rounded text-slate-800 w-full' name='password' type={showPassword ? 'text' : 'password'} onChange={(event) => handleChange(event)} value={credentials.password} />
                        <img className='absolute h-8 w-8 top-1 right-2' src={showPassword ? eye : eyeOff} alt={showPassword ? 'Password is visible' : 'Password is not visible'} onClick={() => setShowPassword(!showPassword)} />
                    </div>
                    <p className='mb-7 text-red-400'> {passwordErr} </p>
                    <button className='bg-emerald-500 hover:bg-emerald-600 text-slate-800  font-semibold rounded p-2' type='submit'>Log in</button>
                </form>
                <p className='text-sm text-center'>Don't have an account?<span className='cursor-pointer font-semibold text-emerald-400 hover:text-emerald-500' onClick={changePage}> Create an account</span></p>
            </div>
            : null
    )
}

export default Login