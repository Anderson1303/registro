import React, { useState, useEffect } from 'react';
import './registrar-falta.css';
import InputCRMAusente from '../InputCRMAusente';
import Loading from '../Loading';
import axios from 'axios';
import {getToken} from '../../Helper';
import moment from 'moment';
import { useForm } from "react-hook-form";
import {
  withRouter, Link 
} from "react-router-dom";

let yup = require('yup');

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

const RegistrarFalta = (props) => {
  
    const [user, setData] = useState({CD_PRESTADOR: "", DS_ESPECIALIDADE: "", NM_PRESTADOR: ""})
    const [name,setName] = useState();
    const [carteirinha,setCarteirinha] = useState("");
    const [cpf,setCpf] = useState("");
    const [email,setEmail] = useState("");
    const [nome,setNome] = useState("");
    const [data_nascimento,setDataNascimento] = useState(null);
    const [tipo_atendimento,setTipoAtendimento] = useState("Primeira consulta");
    const [telefone,setTelefone] = useState("");
    const [data_consulta,setDataConsulta] = useState(moment().format("YYYY-MM-DD"));
    const [hora,setHora] = useState(moment().format("HH:mm"));
    const [loading,setLoading] = useState(0);

   /* const schema = yup.object().shape({
      email: yup.string().email(),
      nm_beneficiario: yup.string().test("teste","Campo obrigatório",value => {
        return nome.length >= 4
      }),
      nm_beneficiario: yup.string().test("teste","Campo obrigatório",value => {
        return nome.length >= 4
      }),
    });*/

    let schema = yup.object().shape({
      nm_beneficiario: yup.string().test("","Informe no mínimo 4 carater",function(val){
        return nome.length >= 4 ;
      }),
      telefone: yup.string().test("","Informe no mínimo 11 carater",function(val){
        return getNumber(telefone) >= 11 ;
      }),
    })
    
    const getNumber = (number) => {
      var ans = 0;
      for(var i = 0; i < number.length; i+=1){
        const numberi = number[i];
        if(numberi >= '0' && numberi <= '9'){
          ans+=1;
        }
      }
      return ans;
    }

    const { register, handleSubmit, errors } = useForm({
      validationSchema: schema
    });

    console.log(errors.email)

    const goBack = () => {
      props.history.replace('/listar');
    }

    const onSubmit = data => registerFalta(data);
    
    useEffect(() =>{
      getData();
    },[])

    const formatData= (info) =>{
      const matricula = info.cd_matricula||"";
      const carteirinha = info.cd_mat_alternativa||"";
      const nasc = info.dt_nascimento||"";
      const cpf = info.nr_cpf||"";
      const email = info.ds_email||"";
      const fone = info.nr_telefone||"";
      const nome = info.nm_segurado||"";
      return {matricula,carteirinha,nasc,nome,cpf,email,fone};
    }

    const leftPad = (value, totalWidth, paddingChar) => {
      var length = totalWidth - value.toString().length + 1;
      return Array(length).join(paddingChar || '0') + value;
    }

    const enviarSms = async(telefone) =>{
      const token = getToken();
      const url = `${process.env.REACT_APP_API}/enviar-sms/paciente-faltante`;
      const result = await axios.post(url,null,{ headers: {"Authorization" : `Bearer ${token}`, "telefone": '55'+telefone}});
      try{
        const data = result.data;
        if(data.resposta){
          //sms enviado com sucesso
        }else{
          //não mandou sms
        }
      }catch(e){
        //sms não enviado
      }
    }

    const atualizaDados = async (name,c,b = c.target.value) =>{
      var a = replaceAll(b, '.', '');
      a = replaceAll(a, '_', '');  
      a = replaceAll(a, '-', '');  
      if(a.toString().length >= 10){
        const url = `${process.env.REACT_APP_API}/beneficiario/${(name === 'carteirinha' ? 'carteirinha' : 'cpf')}`;
        const token = getToken();
        const data = (name === "carteirinha") ? {cd_mat_alternativa: a.toString()} : {nr_cpf: a.toString()}
        const result = await axios.post(url,data,{ headers: {"Authorization" : `Bearer ${token}`} });
        if(result.data.resposta !== null){
          //calback da resposta do cpf ou da carteirinha
          const info = result.data.resposta;
          const data = formatData(info);
          setNome(data.nome)
          setCpf(leftPad(data.cpf,11))
          setCarteirinha(leftPad(data.carteirinha,17))
          setDataNascimento(moment(data.nasc).format("YYYY-MM-DD"))
          setTelefone(data.fone)
          setEmail(data.email)
        }
      }
    }

    const getData = async() => {
      const token = getToken();
      const url = `${process.env.REACT_APP_API}/prestador`;
      const result = await  axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} });
      try{
          const info = result.data
          setData({CD_PRESTADOR: info.cd_prestador ,DS_ESPECIALIDADE: info.ds_especialidade, NM_PRESTADOR: info.nm_prestador})
          setName(result.data.nm_prestador+" - "+result.data.ds_especialidade);
      }catch(e){
          setName(" ");
      }
    }

    const getCarteirinha = () => {
      var carteirinhaI = carteirinha;
      carteirinhaI = replaceAll(carteirinhaI,'-','')
      carteirinhaI = replaceAll(carteirinhaI,'_','')
      carteirinhaI = replaceAll(carteirinhaI,'.','')
      return carteirinhaI;
    }

    const registerFalta = async (data) => {
      data.cd_prestador = user.CD_PRESTADOR||"";
      data.ds_especialidade = user.DS_ESPECIALIDADE||"";
      data.nm_prestador = user.NM_PRESTADOR||"";
      data.tp_agenda = tipo_atendimento;
      if(data_nascimento != null){
        data.dt_nascimento = moment(data_nascimento, "YYYY-MM-DD").format('YYYY-MM-DD');
      }
      console.log('nasc ',data_nascimento)
      data.dt_agenda = data_consulta;
      data.carteirinha = getCarteirinha();

      var fone = ""+ replaceAll(telefone, '-', '');  
      fone = replaceAll(fone, '_', ''); 
      fone = replaceAll(fone, '(', ''); 
      fone = replaceAll(fone, ')', ''); 
      data.telefone = fone;

      var cpfi = "" + replaceAll(cpf, '-', ''); 
      cpfi = replaceAll(cpfi, '_', ''); 
      cpfi = replaceAll(cpfi, '.', ''); 
      cpfi = replaceAll(cpfi, '.', ''); 
      data.nm_beneficiario = nome;
      data.cpf_beneficiario = cpfi;
      data.hr_agenda = hora;
      
      //api de integração web
      const token = getToken();
      const url = `${process.env.REACT_APP_API}/beneficiario/registrar-falta`;
      setLoading(1)
      const result = await axios.post(url,data, { headers: {"Authorization" : `Bearer ${token}`} });
      try{
        const data = result.data;
        if(data.resposta === 1){
          setTelefone(fone);
          if(fone.toString().length >= 11){
            enviarSms(fone);
          }
          setTimeout(() => {
            props.history.replace('/listar');
          }, 500);
        }else{
          //SMS não enviado
          //erro
        }
      }catch(e){
        //erro
      }
    }

    //mmc(2,3,4) = 12
    //2 = 12/2 = 6px
    //3 = 12/3 = 4px
    //4 = 12/4 = 3px
    //ficar alinhado os inputs
    return (
        <React.Fragment>
            <div style={{marginLeft: '21.3%',}}>
              <div style={{fontSize: 22,color: 'red'}}>Novo atendimento ausente</div>
              <div style={{fontFamily: 'bold'}}>{name}</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="main row" style={{marginLeft: '21%',marginTop: '1%',width: '100%'}}>
                    <InputCRMAusente mask="9999.9999.999999.99-9" value={carteirinha} setData={setCarteirinha} errors={errors.carteirinha} register={register} 
                      name="carteirinha" atualizaDados={atualizaDados} title={"Carteirinha"} porcWidth={'12%'} marginRight={4}/>
                    <InputCRMAusente mask="999.999.999-99" errors={errors.cpf_beneficiario} register={register}
                      name="cpf_beneficiario" value={cpf} setData={setCpf} title={"CPF"} atualizaDados={atualizaDados} porcWidth={'12%'} marginRight={4}/>
                    <InputCRMAusente mask="" value={email} setData={setEmail} errors={errors.email} register={register}
                      name="email" title={"E-mail"} porcWidth={'32%'} marginRight={4}/>
                </div>
                <div className="main row" style={{marginLeft: '21%',marginTop: '1%'}}>
                    <InputCRMAusente mask="" value={nome} setData={setNome} errors={errors.nm_beneficiario} register={register}
                      name="nm_beneficiario" title={"Nome"} porcWidth={'40%'} marginRight={6}/>
                    <InputCRMAusente mask="99/99/9999" value={data_nascimento} setData={setDataNascimento} errors={errors.dt_nascimento} register={register}
                      name="dt_nascimento" title={"Data de Nascimento"} porcWidth={'16%'} marginRight={6}/>
                </div>
                <div className="main row" style={{marginLeft: '21%',marginTop: '1%'}}>
                    <InputCRMAusente mask="(99) 99999-9999" value={telefone} setData={setTelefone} errors={errors.telefone} register={register} 
                      name="telefone" title={"Celular"} porcWidth={'22%'} marginRight={3} />

                    <div style={{width: '12%',marginLeft: 4,fontSize: 14}}>
                      <label style={{width: '100%',fontWeight: 'bold'}}>{"Tipo de atendimento"}</label>
                      <select value={tipo_atendimento} name="TP_AGENDA" onChange={e => setTipoAtendimento(e.target.value)} className="browser-default custom-select">
                        <option value="Primeira consulta">Primeira consulta</option>
                        <option value="Consulta">Consulta</option>
                        <option value="Exame/procedimento">Exame/procedimento</option>
                      </select>
                    </div>
                    <InputCRMAusente mask="99/99/9999" value={data_consulta} setData={setDataConsulta} errors={errors.dt_agenda} register={register} 
                      name="dt_agenda" title={"Data da consulta"} porcWidth={'10%'} marginRight={3}/>
                    <InputCRMAusente mask="99:99" value={hora} setData={setHora} errors={errors.hr_agenda} register={register} 
                      name="hr_agenda" title={"Hora"} porcWidth={'12%'} marginRight={3}/>
                </div>
                  <button type="button" className={"btn btn-secondary ola"} disabled={loading ? true : false} style={{marginTop: "0.5%",marginLeft: '21%'}} onClick={goBack}>Voltar</button>
                  <input type="submit" style={{marginTop: '0.5%',marginRight: '22%',right: 0,position: 'absolute',backgroundColor: 'green'}} value="Gravar" className={"btn btn-primary"} disabled={loading ? true : false}/>
             </form>
        </React.Fragment>
    )
}

export default withRouter(RegistrarFalta);