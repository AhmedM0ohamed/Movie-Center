import axios from "axios";
import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({decode}){

    let navigate = useNavigate();
    const [loginFlag , setloginFlag] = useState(false);
    const [userInfo, setUserInfo] = useState( {
        email : '',
        password : '0'
    } );
    const [errList , setErrorList] = useState( [] );
    const [signupError , setsignupError] = useState( '' );
    function getUser(e){
        setErrorList([]);
        let inputValue = e.target.value;
        let newUser = { ...userInfo };
        newUser[ `${e.target.id}` ] = inputValue;
        setUserInfo( newUser );
    }
    async function submitForm(e){
        e.preventDefault(); 
        setloginFlag(true);
        let schema = Joi.object( {
            email : Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
            password : Joi.string().pattern(/^[a-z0-9]{4,8}$/i).required()
        } );
        const JoiResponse = schema.validate( userInfo , { abortEarly : false });
        if(JoiResponse.error){
            setErrorList(JoiResponse.error.details);
            setloginFlag(false);
        }
        else{
            // for register errors
            let {data} = await axios
            .post( 'https://movie-db-notes-be.vercel.app/api/v1/auth/signin' , userInfo)
            .catch( error => {
                if(error.response){
                    setloginFlag(false);
                    setsignupError(error.response.data.message);
                }
            });
            if(data.message === 'Done'){
                setsignupError('');
                localStorage.setItem( "token" , data.token );
                decode();
                navigate('/home'); 
                setloginFlag(false);
            }
        }
    }
    function getCurrentError( key ){
        for (const iterator of errList) {
            if(iterator.context.key === key){
                return iterator.message;
            }
        }
        return '';
    }
    return<>
        <div className="w-75 m-auto">
            {
                signupError !== '' ?<div className="alert alert-danger">
                    {
                        signupError
                    }
                </div> : <></>
            }
            <form onSubmit={ submitForm }>
                <label htmlFor="email">email</label>
                <input onChange={ getUser } type="text" id="email" className="my-3 form-control" placeholder="Enter your email"/>
                {
                    getCurrentError('email').length === 0? '' : <div className="alert alert-danger">
                        {
                            getCurrentError('email')
                        }
                    </div>
                }
                <label htmlFor="password">password</label>
                <input onChange={ getUser } type="password" id="password" className="my-3 form-control" placeholder="Password"/>
                {
                    getCurrentError('password').length === 0? '' : <div className="alert alert-danger">
                        {
                            getCurrentError('password')
                        }
                    </div>
                }
                <button className="btn btn-outline-info">
                    {
                        loginFlag ? <i className="fa-solid fa-spinner fa-spin"></i> : 'login'
                    }
                </button>
            </form>
        </div>
    </>
}