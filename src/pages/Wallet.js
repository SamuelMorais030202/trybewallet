import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="main-wallet">
        <div className="header-form">
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
