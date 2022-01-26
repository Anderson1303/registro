import React, { useEffect, useState } from 'react';
import {
    Link,
    withRouter 
} from "react-router-dom";
import axios from 'axios';
import {login,logout,getToken} from '../../Helper';
import Loading from '../Loading';
import './login.css';

const Login = (props) => {
    const {error,isLoged,setUser,title,setLoged,setError,id,handleSignIn} = props;
    const [loading,setLoading] = useState(false);

    const goLogin = async() => {
        try{
            const response = await handleSignIn(id);
            if(response.token !== undefined){
                login(response.token)
                setLoged(true)
                setError("");
                props.history.push("/listar");
            }else{
                logout()
                setLoged(false)
                setError("Usuário não encontrado")
            }
        }catch(e ){
            logout()
            setLoged(false)
            setError("Usuário não encontrado")
        }
    }

    const checkToken = async e => {
        try{
            const token = getToken();
            const url = `${process.env.REACT_APP_API}/auth/check-token`;
            const resp = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} });
            if(resp.status !== undefined){
                props.history.push("/listar");
                setLoading(true)
            }else{
                setLoged(false)
            }
        }catch(e){
            setLoading(true)
        }
    }

    useEffect(() => {
        checkToken();
    })

    const handleKeyDown = (event) => {
        if(event.keyCode === 13) { 
            goLogin();
      }
    }

    if(loading)
        return (
            <div style={{marginLeft: '37%'}}>
                <label className="titleApp">{title}</label>
                <div className="row">
                <input maxLength="8" type="text" onChange={(e)=> setUser(e.target.value)} id="form1" onKeyDown={handleKeyDown} className="form-control"/>
                <nav>
                <ul>
                    <Link to={isLoged ? "/listar" : "/login"}><button onClick={() => goLogin()} type="button" className="btn btn-success">
                        Entrar</button></Link>
                </ul>
                </nav>
                </div>
                {error.length > 0 && <p style={{color: 'red'}}>{error}</p>}
            </div>
        )
    return <div>
        <Loading />
    </div>
}

export default withRouter(Login);