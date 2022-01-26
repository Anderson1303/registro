import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from 'react-input-mask';

const InputCRMAusente = ({atualizaDados,value,setData,mask,title, register,name,porcWidth,errors,required,marginRight }) => ( 
    <div style={{width: porcWidth,marginLeft: marginRight,fontSize: 14}} >
    <label style={{width: '100%',fontWeight: 'bold'}}>{title}</label>
    <InputMask type={mask == "99/99/9999" ? "date" : "custom"} className="form-control" name={name}  ref={register({ required })} value={value} onChange={(e) => {
            setData(e.target.value)
            if(name === "cpf_beneficiario" || name === "carteirinha"){
                atualizaDados(name,e);
            }
        }} mask={mask != "99/99/9999" ? mask : null}>
    </InputMask>
    {errors && <p style={{color: 'red'}}>{errors.message}</p>}
</div>
);

/*

*/

export default InputCRMAusente;