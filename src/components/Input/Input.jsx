import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import './Input.css'

const Input = ({ type, id, label, formInput, setFormInput, onBlurFn, ...props }, ref) => {

    const [text, setText] = useState('')
    const localRef = useRef(null)
    const [isValid, setIsValid] = useState(true)
    const [shake, setShake] = useState(false)

    useEffect(() => {
        setShake(false)
        setIsValid(true)
    }, [text])

    useImperativeHandle(ref, () => {
        return {
            focus: () => localRef.current.focus(),
            setInvalid: () => setIsValid(false),
            shake: () => setShake(true)
        }
    }, [])

    return (
        <div className='input-div'>
            <input
                className={`input-field ${isValid ? '' : 'error-input'} ${shake ? 'shake' : ''}`}
                value={text}
                id={id}
                type={type}
                onChange={e => {
                    setText(e.target.value)
                    setFormInput({ ...formInput, [label]: e.target.value })
                }}
                ref={localRef}
                onBlur={() => onBlurFn()}
                {...props}
            />
            <p className={`error-text ${isValid ? "display-hidden" : ""}`}>{`*${label} is not valid.`}</p >
        </div>
    )
}

export default React.forwardRef(Input)
