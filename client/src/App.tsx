import React from 'react';
import logo from './logo.svg';
import './App.css';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';

function App() {
  return <Router>{renderRoutes(routes)}</Router>;
}

export default App;
