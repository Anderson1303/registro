import React from 'react';
import ReactLoading from 'react-loading';
import './loading.css';
 
const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} style={{height: '3%',width: '3%',marginLeft: '47%'}} />
);
 
export default Loading;