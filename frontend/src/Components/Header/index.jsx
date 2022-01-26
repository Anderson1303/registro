import React from 'react';
import './header.css';
import { withRouter } from 'react-router-dom';

const Header = (props) => {
    const {isLoged} = props;

    const atualizaLogin = () => {
        props.history.push('/logout')
    }

    return (
        <div style={styles.main}>
            <span className="title">
            {"Registro "}
            </span>
            {isLoged && <span onClick={()=> { atualizaLogin() } } className="header">
                SAIR
            </span>}
        </div> 
    )
}

let styles = {
    main: {
        backgroundColor: 'green',
        height: 60,
    },
};

export default withRouter(Header);

