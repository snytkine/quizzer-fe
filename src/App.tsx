import React from 'react';
import logo from './logo.svg';
import Button from 'antd/es/button';
import Layout1 from './Components/Layout1';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './store/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(

));

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout1/>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
