import React from 'react';
import {logout} from '../../Helper';
import './logout.css';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {

    constructor(props){
        super(props);

        this.state ={
            isLoged: true,
            tempo: 3
        }
    }

    atualizaTempo(id,loged){
        const {setLoading} = this.props;
        if(id === -1){
            loged(false);
            setLoading(true)
            logout();
            return;
        }
        setTimeout(() => {
            this.setState(this.setState({tempo: id}));
            this.atualizaTempo(id-1,loged);
        },100);
        return;
    }

    componentDidMount(){
        const {loged} = this.props;
        setTimeout(() => {
            this.atualizaTempo(3,loged);
        },50)
    }

    render(){
        const {tempo} = this.state;
        return (<div>
            <p className="redirect-login">Você será redirecionado para a tela de login em {tempo}</p>
            {tempo === 0 && <Redirect to="/login"/> }
        </div>)
    }
}

export default Logout;