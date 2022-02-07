import React, { useState } from 'react';
import eye from '../../assets/eye.svg';
import eyeOff from '../../assets/eye-off.svg';

interface Props {
    showSignup: boolean,
    setShowSignup: Function,
    setShowLogin: Function
}

const Signup: React.FC<Props> = ({ showSignup, setShowSignup, setShowLogin }) => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function changePage(): void {
        setShowLogin(true);
        setShowSignup(false);
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
        if (!regexEmail.test(email)) setEmailErr('*Please enter a valid email address');
        if (regexPassword.test(password)) setPasswordErr('*Please enter a valid password');
        // Checks for special characters
        // const regex2 = /[^((0-9)|(a-z)|(A-Z)|\s)]/
    }

    return (
        showSignup ?
            <div className="bg-slate-800 text-yellow-50 flex flex-col p-20 h-[800px] w-[700px] self-center justify-center justify-self-center rounded">
                <h2 className='text-5xl font-medium mb-2'>Sign up.</h2>
                <p className='mb-2'>Acess the site with the data you entered during registration.</p>
                <form className='flex flex-col' onSubmit={(event) => handleSubmit(event)}>
                    <label className='mb-1 mt-4'>Email</label>
                    <input className='p-2 rounded text-slate-800' name='email' onChange={event => handleChange(event)} value={credentials.email} />
                    <p className='h-1 mb-7 text-red-400'>
                        {emailErr}
                    </p>
                    <label className='mb-1'>Password</label>
                    <div className='relative'>
                        <input className='p-2 rounded text-slate-800 w-full' name='password' type={showPassword ? 'text' : 'password'} onChange={(event) => handleChange(event)} value={credentials.password} />
                        <img className='h-8 w-8 absolute right-2 translate-y-1/2 bottom-1/2' onClick={() => setShowPassword(!showPassword)} src={showPassword ? eye : eyeOff} alt={showPassword ? 'password is visible' : 'password is not visible'} />
                    </div>
                    <p className='h-1 text-red-400'>
                        {passwordErr}
                    </p>
                    <button className='mt-12 mb-5 bg-emerald-500 text-slate-800 font-semibold p-2 rounded hover:bg-emerald-600' type='submit'>Register</button>
                </form>
                <p className='text-center mb-6'>Already have an account? <span className='cursor-pointer font-semibold text-emerald-400 hover:text-emerald-500' onClick={() => changePage()}>Log in</span></p>
            </div>
            : null
    )
}

export default Signup