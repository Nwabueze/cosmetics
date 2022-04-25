import React from 'react';

import './utils/global.css';
import Header from './components/Header';
import Products from './components/Product';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
