import React, { useState, useEffect } from 'react';
import {getToken} from '../../Helper';
import {
    Route,
    Redirect,
  } from "react-router-dom";
import axios from 'axios';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const [login,setLogin] = useState(false);
    const [isLoading,setLoading] = useState(false);

    const checkToken = async () => {
        try{
            const token = getToken();
            const url = `${process.env.REACT_APP_API}/auth/check-token`;
            const resp = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} });
            setLogin(resp.data.status)
            setLoading(true)
        }catch(e){
            setLogin(false)
            setLoading(true)
        }
    };

    useEffect(e => {
        checkToken()
    },[])

    if(isLoading)
        return (<Route
            {...rest}
            render={props =>
                login ? (
                <Component {...props} />
            ) : 
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            
            }
        />)
        return <div/>
    };

export default PrivateRoute;