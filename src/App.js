import './App.css';
import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Seat from './Seat';
import Chair from './pages/chair/chair';

function App() {
  return (
    <div className="App">
     <Header/>
     <Chair/>
     <Footer/>
    </div>
  );
}

export default App;
