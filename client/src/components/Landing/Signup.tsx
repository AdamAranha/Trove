import React, { useState } from 'react';
import eye from '../../assets/eye.svg';
import eyeOff from '../../assets/eye-off.svg';
import { type } from 'os';

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
    const [valErr, setValErr] = useState({
        emailErr: '',
        passErr: ''
    })
    const [showPassVal, setShowPassVal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState({
        LENGTH: false,
        UPPERCASE: false,
        LOWERCASE: false,
        NUMBER: false,
        WHITESPACE: false
    });

    function changePage(): void {
        setShowLogin(true);
        setShowSignup(false);
        setCredentials({ email: '', password: '' });
        setShowPassword(false);
        setValErr({ emailErr: '', passErr: '' })
        setPassword({
            LENGTH: false,
            UPPERCASE: false,
            LOWERCASE: false,
            NUMBER: false,
            WHITESPACE: false
        });
    }

    function handleChange(event: any): void {
        const { name, value } = event.target;
        const regexLength = /^.{0,7}$/
        const regexUpper = /^[^A-Z]{1,}$/
        const regexLower = /^[^a-z]{1,}$/
        const regexNumber = /^[^\d]{1,}$/

        setCredentials(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        });
        if (regexLength.test(value) || value === '') { validations('LENGTH', false) } else { validations('LENGTH', true) };
        if (regexUpper.test(value) || value === '') { validations('UPPERCASE', false) } else { validations('UPPERCASE', true) }
        if (regexLower.test(value) || value === '') { validations('LOWERCASE', false) } else { validations('LOWERCASE', true) }
        if (regexNumber.test(value) || value === '') { validations('NUMBER', false) } else { validations('NUMBER', true) }
        if ([...value].includes(' ') || value === '') { validations('WHITESPACE', false) } else { validations('WHITESPACE', true) }
    }

    function validations(name: string, value: boolean) {
        setPassword(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    function handleSubmit(event: any): void {
        event.preventDefault();
        setValErr({ emailErr: '', passErr: '' })
        const { email, password } = credentials;
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const regexPassword = /^(.{0,7}|[^A-Z]{1,}|[^a-z]{1,}|[^\d]{1,})$|[\s]/
        if (!regexEmail.test(email)) {
            setValErr(prevInput => {
                return {
                    ...prevInput,
                    emailErr: '*Username/Password incorrect.'
                }
            });
        }
        if (regexPassword.test(password)) {
            setValErr(prevInput => {
                return {
                    ...prevInput,
                    passErr: '*Username/Password incorrect.'
                }
            });
        } else console.log('wtf')
        // Checks for special characters
        // const regex2 = /[^((0-9)|(a-z)|(A-Z)|\s)]/
    }

    return (
        showSignup ?
            <div className='flex flex-col text-yellow-50 p-7 rounded justify-center 
           2xl:bg-slate-800
            2xl:h-[800px] 2xl:w-[700px] 2xl:p-20 2xl:justify-self-center 2xl:self-center'>
                <h2 className='text-4xl 2xl:text-5xl font-medium mb-2'>Sign up.</h2>
                <p className='mb-7 2xl:block'>Enter the email address and password used to create an account.</p>
                <form className='flex flex-col' onSubmit={(event) => handleSubmit(event)}>
                    <label className='mb-1'>Email</label>
                    <input className='p-2 rounded text-slate-800 w-full' name='email' onChange={event => handleChange(event)} value={credentials.email} />
                    <p className='h-1 mb-7 text-red-400'>{valErr.emailErr}</p>
                    <label className='mb-1'>Password</label>
                    <div className='relative w-full'>
                        {showPassVal ?
                            <div className='grid absolute w-full h-56 -top-64 bg-slate-800 2xl:bg-slate-900 rounded shadow-black shadow-lg p-5 leading-7'>
                                <p className='font-semibold'>Must Contain:</p>
                                <p className={`indent-4 ${password.LENGTH ? 'text-emerald-400' : 'text-red-500 2xl:text-red-400'}`}>At least 8 characters in length</p>
                                <p className={`indent-4 ${password.WHITESPACE ? 'text-emerald-400' : 'text-red-500 2xl:text-red-400'}`}>No whitespaces</p>
                                <p className={`indent-4 ${password.UPPERCASE ? 'text-emerald-400' : 'text-red-500 2xl:text-red-400'}`}>An Upper case letter (A-Z)</p>
                                <p className={`indent-4 ${password.LOWERCASE ? 'text-emerald-400' : 'text-red-500 2xl:text-red-400'}`}>A Lower case letter (a-z)</p>
                                <p className={`indent-4 ${password.NUMBER ? 'text-emerald-400' : 'text-red-500 2xl:text-red-400'}`}>A number (0-9)</p>
                            </div>
                            : null}
                        <input className='p-2 rounded text-slate-800 w-full' name='password' type={showPassword ? 'text' : 'password'} onChange={(event) => handleChange(event)} onFocus={() => setShowPassVal(true)} onBlur={() => setShowPassVal(false)} value={credentials.password} />
                        <img className='absolute h-8 w-8 top-1 right-2' src={showPassword ? eye : eyeOff} alt={showPassword ? 'Password is visible' : 'Password is not visible'} onClick={() => setShowPassword(!showPassword)} />
                    </div>
                    <p className='h-1 mb-7 text-red-400'>{valErr.passErr}</p>
                </form>
                <button className='sticky b-0 w-full mb-2 bg-emerald-500 self-center hover:bg-emerald-600 text-slate-800  font-semibold rounded p-2' onClick={handleSubmit}>Sign up</button>
                <p className='text-center'>Already have an account?<span className='cursor-pointer font-semibold text-emerald-400 hover:text-emerald-500' onClick={changePage}> Log in</span></p>
                <p className='text-center cursor-pointer font-semibold text-emerald-400 hover:text-emerald-500' onClick={() => console.log('Sucks bro')}>Forgot your Password?</p>
            </div>
            : null
    )
}

export default Signup