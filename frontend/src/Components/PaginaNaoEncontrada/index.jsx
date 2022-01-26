import React from 'react';
import './pagina-nao-encontrada.css';
import pagina_404 from '../../Images/page_404.png';
import {
    withRouter, Redirect
  } from "react-router-dom";

const PaginaNaoEncontrada = (props) => {

    if(props.location.pathname === "/")
        return <Redirect to="/login" />
    
    return (<div>
               <img className="pagina" alt="logo da unimed" src={pagina_404} />
            </div>)
}

export default withRouter(PaginaNaoEncontrada);