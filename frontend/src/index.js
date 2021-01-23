import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
  
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  
  transition: transitions.SCALE
}
ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter><App/></BrowserRouter>
  </AlertProvider>
  ,
  document.getElementById('root')
);

