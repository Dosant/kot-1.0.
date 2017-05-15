import React from 'react';

const StatusIcon = ({isConnected}) => {
  return isConnected ? (
    <i className="fa fa-circle text-success"></i>
  ) : (
    <i className="fa fa-circle text-danger"></i>
  )
}

const Header = ({isConnected, reconnect}) => {
  return (
    <nav className="navbar navbar-default" style={{backgroundColor: '#fff'}}>
    <div className="container-fluid">
      <div className="navbar-header">
        <span className="navbar-brand">Имитация КОТ 1.0.</span>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a>Соединие c сервером системы: {isConnected ? 'Активно' : 'Отсутствует'} <StatusIcon isConnected={isConnected}/></a>
          </li>
          <li>
            <button className="btn btn-info btn-simple" onClick={reconnect} style={{position: 'relative', top: '4px'}}><i className="ti-reload" /></button>
          </li>
          <li>
            <a>v0.3</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default Header;