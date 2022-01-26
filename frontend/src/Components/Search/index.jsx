import React from 'react';

import {
  withRouter,
} from "react-router-dom";

const Search = ({onSearch, searchList, toRegister}) => {
    let input;
    const handleClick = (value) => {
      onSearch(value,searchList);
    };
    return (
      <div style={{width: '100%'}}>
        <label style={{marginLeft: '1%'}}>Buscar</label>
        <div className="row" style={{marginLeft: '1%'}}>
          <input
            className="form-control"
            style={ { backgroundColor: 'rgba(236, 236, 236, 1)',color: '#000000', marginBottom: '2%',width: '20%'} }
            ref={ n => input = n }
            type="text"
            onChange={(e) => handleClick (e.target.value)}
          />
          <button type="button" onClick={()=>  toRegister() } className="btn btn-success register-falta">Registrar novo atendimento</button>
        </div>
      </div>
    );
  };

export default withRouter(Search);