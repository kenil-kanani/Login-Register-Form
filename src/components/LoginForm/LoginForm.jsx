import React, { useRef, useState } from 'react'
import Input from '../Input/Input'
import './LoginForm.css'
import { emailValidate } from '../../helper/emailValidate'
import { passwordValidate } from '../../helper/passwordValidate'
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const LoginForm = () => {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [formInput, setFormInput] = useState({ email: '', password: '' })

    function formValidate() {
        if (!passwordValidate(formInput.password)) {
            passwordRef.current.focus()
            passwordRef.current.setInvalid()
            passwordRef.current.shake()
        }
        if (!emailValidate(formInput.email)) {
            emailRef.current.focus()
            emailRef.current.setInvalid()
            emailRef.current.shake()
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        formValidate()
        if (!emailValidate(formInput.email) || !passwordValidate(formInput.password)) return
        console.log("Form submitted")
    }

    return (
        <div>
            <form className='login-form' onSubmit={handleSubmit} noValidate>
                <h1 className='sign-in-text'>Sign In</h1>
                <div className="wrapper email-input-wrapper">
                    <div className='input-icon'>
                        <MdOutlineMailOutline size={"30px"} color='gray' />
                    </div>
                    <Input
                        type={"email"}
                        id={"email-input"}
                        label={"email"}
                        ref={emailRef}
                        formInput={formInput}
                        setFormInput={setFormInput}
                        placeholder={"email"}
                        onBlurFn={() => {
                            if (!emailValidate(formInput.email)) {
                                emailRef.current.setInvalid()
                                emailRef.current.shake()
                            }
                        }}
                    />
                </div>
                <div className="wrapper password-input-wrapper">
                    <div className='input-icon'>
                        <RiLockPasswordLine size={"30px"} color='gray' />
                    </div>
                    <Input
                        type={"password"}
                        id={"password-input"}
                        label={"password"}
                        ref={passwordRef}
                        formInput={formInput}
                        setFormInput={setFormInput}
                        placeholder={"password"}
                        onBlurFn={() => {
                            if (!passwordValidate(formInput.password)) {
                                passwordRef.current.setInvalid()
                                passwordRef.current.shake()
                            }
                        }}
                    />
                </div>

                <p className='forgot-password-text'>Forgot Password?</p>

                <input className='submit-btn' type="submit" value={"Submit"} />
            </form>
        </div>
    )
}

export default LoginForm