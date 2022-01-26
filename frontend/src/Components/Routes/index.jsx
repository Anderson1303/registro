import React, { useState, useEffect } from 'react';
import '../App/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from '../Header';
import RegisterCRM from '../RegisterCRM'
import RegisterFalta from '../RegistrarFalta';
import RotaPrivada from '../RotaPrivada';
import Loading from '../Loading';
import Login from '../Login';
import Logout from '../Logout';
import PaginaNaoEncontrada from '../PaginaNaoEncontrada';
import axios from 'axios';
import { getToken } from '../../Helper';

const title = "Informe o CRM";

const Routes = (props) => {
    const [isLoged,setLoged] = useState(false);
    const [isLoading,setLoading] = useState(true);
    const [id,setUser] = useState("");
    const [error,setError] = useState(""); 

    const handleSignIn = async(id) =>{
        try {
            const url = `${process.env.REACT_APP_API}/auth/login`;
            const result = await axios.post(url, { crm: id });
            return result.data
        } catch (err) {
            return []
        }
    }

    const checkToken = async () => {
        try{
            const token = getToken();
            const url = `${process.env.REACT_APP_API}/auth/check-token`;
            const resp = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} });
            setLoged(resp.data.status)
            setLoading(true)
        }catch(e){
            setLoged(false)
            setLoading(true)
        }
    };

    useEffect(e => {
        checkToken()
    },[])

    if(isLoading)
        return (
            <Router basename={process.env.REACT_APP_BASEPATH}>
                <div>
                <Header setLoged={setLoged} isLoged={isLoged}/>
                <Switch>
                    <Route exact path="/registro-ausentes">
                        <Login error={error} isLoged={isLoged} setUser={setUser} title={title} setLoged={setLoged} setError={setError} id={id} handleSignIn={handleSignIn}/>
                    </Route>
                    <Route path="/login">
                        <Login error={error} isLoged={isLoged} setUser={setUser} title={title} setLoged={setLoged} setError={setError} id={id} handleSignIn={handleSignIn}/>
                    </Route>
                    <RotaPrivada path="/registrar" component={() => <RegisterFalta />} />
                    <RotaPrivada path="/listar" component={() => <RegisterCRM />} />
                    <RotaPrivada path="/logout" component={() => <Logout setLoading={setLoading} loged={setLoged}/>} />
                    <Route path="*">
                        <PaginaNaoEncontrada />
                    </Route>
                </Switch>
                </div>
            </Router >
            );
        return <div>
            <Loading color="green"/>
        </div>
}

export default Routes;
