import React, { Component } from 'react';
import Header from './Header';
import ConfigureImitation from './ConfigureImitation';
import Card from './Card';
import './App.css';
import {startImitation, stopImitation, getStatus, tryToReconnect} from './api.js';

const StatusIcon = ({isConnected}) => {
  return isConnected ? (
    <i className="fa fa-circle text-success"></i>
  ) : (
    <i className="fa fa-circle text-danger"></i>
  )
}

class App extends Component {
  constructor(){
    super();

    this.state ={
      isConnected: false,
      isActive: false
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reconnect = this.reconnect.bind(this);
  }

  componentDidMount() {
    this.checkStatus();
  }

  checkStatus() {
    getStatus()
      .then(({ isConnected, isActive }) => {
        this.setState({
          isConnected: isConnected,
          isActive: isActive
        });
      })
  }

  start({period, errorRate}) {
    period = +period;
    errorRate = (+errorRate) / 100;
    console.log(period, errorRate);

    startImitation({period, errorRate})
      .then(() => {
        this.setState({
          isActive: true
        })
      })
  }

  stop() {
    stopImitation()
      .then(() => {
        this.setState({
          isActive: false
        })
      })
  }

  reconnect() {
    tryToReconnect()
      .then(({status}) => {
        this.checkStatus();
      })
  }

  render() {
    return (
      <div >
        <Header isConnected={this.state.isConnected} reconnect={this.reconnect}/>
        <div className="container row center">
          <Card title='Настройка имитационного модуля' subtitle='Настройка переодичности снятия показаний. Настройка уровня риска.'>
            <ConfigureImitation start={this.start} stop={this.stop} isConnected={this.state.isConnected} isActive={this.state.isActive}/>
          </Card>
          <Card title='Имитация' subtitle='Имитационный процесс работы датчиков КОТ 1.0'>
            <h5>Состояние: {this.state.isActive ? 'Активно' : 'Приостановленно'} <StatusIcon isConnected={this.state.isActive}/></h5>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
