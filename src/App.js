import React from 'react'
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import Hash from './components/hash'
import Block from './components/block'
import BlockChain from './components/blockchain'

class App extends React.Component{
  render(){
    return (
      <div>
        <Header />
        <Hash />
        <Block />
        <BlockChain />
        <Footer />
      </div>
    )
  }
}

export default App;
