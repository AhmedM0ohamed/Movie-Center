import axios from "axios";
import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register(){

    let navigate = useNavigate();
    const [loginFlag , setloginFlag] = useState(false);
    const [errList , setErrorList] = useState( [] );
    const [signupError , setsignupError] = useState( '' );
    const [user , setUser] = useState( {
        first_name : '', 
        last_name : '', 
        age : 0, 
        email : '',
        password : '0'
    } );
    function getUser(e){
        setErrorList([]);
        let inputValue = e.target.value;
        let newUser = { ...user };
        newUser[ `${e.target.id}` ] = inputValue;
        setUser( newUser );
    }
    async function submitForm(e){
        e.preventDefault();
        setloginFlag(true);
        let schema = Joi.object( {
            first_name : Joi.string().min(3).max(10).alphanum().required(), 
            last_name : Joi.string().min(3).max(10).alphanum().required(), 
            age : Joi.number().min(18).max(60).required(), 
            email : Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
            password : Joi.string().pattern(/^[a-z0-9]{4,8}$/i).required()
        
        } );
        const JoiResponse = schema.validate( user , { abortEarly : false });
        if(JoiResponse.error){
            setErrorList(JoiResponse.error.details);
            setloginFlag(false);
        }
        else{
            //for register errors
            let { data } = await axios
            .post( 'https://movie-db-notes-be.vercel.app/api/v1/auth/signup' , user)
            .catch( function(error){
                if(error.response){
                    setsignupError(error.response.data.message);
                    setloginFlag(false);
                }
            });
            if(data.message === 'Done'){
                setsignupError('');
                navigate('/login');
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
    return  <>
        <div className="w-75 m-auto">
            <form onSubmit={ submitForm }>
                {
                    signupError !== '' ?<div className="alert alert-danger">
                        {
                            signupError
                        }
                    </div> : <></>
                }
                <label htmlFor="first_name">first_name</label>
                <input onChange={ getUser } type="text" id="first_name" className="my-3 form-control" placeholder="first_name"/>
                {
                    getCurrentError('first_name').length === 0? '' : <div className="alert alert-danger">
                        {
                            getCurrentError('first_name')
                        }
                    </div>
                }
                <label htmlFor="last_name">last_name</label>
                <input onChange={ getUser } type="text" id="last_name" className="my-3 form-control" placeholder="last_name"/>
                {
                    getCurrentError('last_name').length === 0? '' : <div className="alert alert-danger">
                        {
                            getCurrentError('last_name')
                        }
                    </div>
                }
                <label htmlFor="email">email</label>
                <input onChange={ getUser } type="email" id="email" className="my-3 form-control" placeholder="email"/>
                {
                    getCurrentError('email').length === 0? '' : <div className="alert alert-danger">
                        {
                            getCurrentError('email')
                        }
                    </div>
                }
                <label htmlFor="age">age</label>
                <input onChange={ getUser } type="number" id="age" className="my-3 form-control" placeholder="age"/>
                {
                    getCurrentError('age').length === 0? '' : <div className="alert alert-danger">
                        {
                            getCurrentError('age')
                        }
                    </div>
                }
                <label htmlFor="password">password</label>
                <input onChange={ getUser } type="password" id="password" className="my-3 form-control" placeholder="password"/>
                {
                    getCurrentError('password').length === 0? '' : <div className="alert alert-danger">
                        {
                            getCurrentError('password')
                        }
                    </div>
                }
                <button className="btn btn-outline-info">
                    {
                        loginFlag ? <i className="fa-solid fa-spinner fa-spin"></i> : 'register'
                    }
                </button>
            </form>
        </div>
    </>
}