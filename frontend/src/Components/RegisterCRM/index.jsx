
import React from 'react';

import {
    BrowserRouter as Router,
    withRouter,
  } from "react-router-dom";

import './register-crm.css';
import axios from 'axios';
import {getToken} from '../../Helper';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import RemoteAll from '../RemoteAll';

var thad = null;

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      totalSize: 0,
      sizePerPage: 30,
      name: '',
      val: ''
    };
    thad = this;
  }

  componentDidMount(){
    this.handleTableChange = this.handleTableChange.bind(this);
    this.getData();
    this.getListServicos({page: 1,sizePerPage: 10});
  }

  updateVal(val){
      thad.setState({val});
  }

  formatData(str,posI,caract){
    var ans = '';
    var pos = 0;
    try{
        var sz = str.length
        for(var i = 0; i < sz; i++){
            if(posI.includes(i)){
                ans+=caract[pos++];
            }
            if('0' <= str[i] && str[i] <= '9')
            ans+=str[i];
        }
    }catch(e){
        return "";
    }
    return ans;
  }

  async getData(){
    const token = getToken();
    const url = `${process.env.REACT_APP_API}/prestador`;
    const result = await  axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} });
    try{
        this.setState({name: result.data.nm_prestador+" - "+result.data.ds_especialidade});
    }catch(e){
        this.setState({name: e.message});
    }
  }
  
  async getListServicos({ page, sizePerPage,sortOrder, sortField, val}){
    const token = getToken();
    if(sortField === undefined)
      sortField="id";
    if(sortOrder === undefined)
      sortOrder = "desc";
    var url = `${process.env.REACT_APP_API}/prestador/servicos?page=${page}&sizePerPage=${sizePerPage}&sortOrder=${sortOrder}&sortField=${sortField}&val=${val}`;
    const result = await  axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} });

    var data = result.data;
    var info = data.prestador;
    const sz = data.countRegister;
    //var szPage = sz-(parseInt((sz/sizePerPage))*sizePerPage)  

    if(sz === 0){
        thad.setState({totalSize: sz,sizePerPage,page: page, data: []});
    }else{
        thad.setState({
            page,
            data: info,
            totalSize: sz,
            sizePerPage
        })
    }
}

  handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
    thad.getListServicos({ page, sizePerPage, filters, sortField, sortOrder, search : false, val: '' });
  }

  render() {
    const { data, sizePerPage, page, name } = this.state;
    return (
    <Router >
        <div>
            <div style={{flex: 1}}>
                <div style={{marginLeft: '5%',}}>
                    <div style={{fontSize: 22,color: 'red'}}>Lista de registro</div>
                    <div style={{fontFamily: 'bold'}}>{name}</div>    
                </div>
            </div>
            <RemoteAll
                searchList={this.getListServicos}
                data={ data }
                page={ page }
                props={thad.props}
                updateVal={this.updateVal}
                sizePerPage={ sizePerPage }
                totalSize={ this.state.totalSize }
                onTableChange={ this.handleTableChange }/>
        </div>
    </Router>
    );
  }
}

export default withRouter(Container);