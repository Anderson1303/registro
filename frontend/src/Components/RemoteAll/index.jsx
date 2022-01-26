import React,{useState,useEffect} from 'react';
import Search from '../Search';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';

const formatData = (colum) => {
    if(moment(colum).format("DD/MM/YYYY") === "01/01/0001" || colum == null)
        return "";
    return moment(colum).format("DD/MM/YYYY");
}

const formatCpf = (colum) =>{
    if(colum === null)
        return '';
    var cpf = colum;
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r !== cpf.substring(j, j+1)) result = false;
    });
    return result;
}

const columns = [{
    dataField: 'carteirinha',
    text: 'Carteirinha',
    sort: true,
    headerStyle: (colum, colIndex) => {
        return { width: '12%'                                                                       };
    }
},
{
    dataField: 'nm_beneficiario',
    text: 'Nome',
    sort: true,
    headerStyle: (colum, colIndex) => {
        return { width: '15%' };
    }
},
{
    dataField: 'dt_nascimento',
    text: 'Data de nascimento',
    sort: true,
    formatter: formatData,
    headerStyle: (colum, colIndex) => {
        return { width: '8%' };
    }
},
{
    dataField: 'telefone',
    text: 'Telefone',
    sort: true,
    headerStyle: (colum, colIndex) => {
        return { width: '10%' };
    }
},
{
    dataField: 'tp_agenda',
    text: 'Tipo de atendimento',
    sort: true,
    headerStyle: (colum, colIndex) => {
        return { width: '10%' };
    }
},
{
    dataField: 'email',
    text: 'E-mail',
    sort: true,
    headerStyle: (colum, colIndex) => {
        return { width: '20%' };
    }
},
{
    dataField: 'cpf_beneficiario',
    text: 'CPF',
    sort: true,
    formatter: formatCpf,
    headerStyle: (colum, colIndex) => {
        return { width: '10%' };
    }
},
{
    dataField: 'dt_agenda',
    text: 'Data de atendimento',
    formatter: formatData,
    sort: true,
},
{
    dataField: 'hr_agenda',
    text: 'Hora',
    sort: true,
}, ];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize,filters,searchList,updateVal,props }) => {

    const [query, setQuery] = useState("");
    const search = async (val) => {
         updateVal(val);
         setQuery(val);
     }

    useEffect(() => {
        const timeOutId = setTimeout(() => searchList({page, sizePerPage,search: true,val: query}), 500);
        return () => clearTimeout(timeOutId);
    }, [query]);
 
     const toRegister = () =>{
         props.history.replace('/registrar')
     }
 
     return(
         <div style={{width: '90%',marginLeft: '5%',marginTop: '3%'}}>
                 <div style={{width: '100%'}}>
                     <div className="row">
                         <Search toRegister={toRegister} onSearch={search} searchList={searchList} />
                     </div>
                     <BootstrapTable
                         keyField="id"
                         data={ data }
                         columns={ columns } 
                         striped bordered hover
                         headerClasses={'tabindex'}
                         bootstrap4
                         pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
                         onTableChange={ onTableChange }
                         defaultSorted={ defaultSorted }
                         remote
                     />
                     <br />
                 </div>
         </div>)
 }

 export default RemoteAll;