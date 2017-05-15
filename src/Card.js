import React from 'react';

const Card = ({title, subtitle, children}) => {
  return (
    <div className="col-xs-12">
      <div className="card">
        <div className="header">
          <h4 className="title">{title}</h4>
          <p className="category">{subtitle}</p>
        </div>
        <div className="content">
          <div className="row">
              <div className="col-xs-12" style={{'paddingLeft': '20px', 'paddingRight': '20px'}}>
                {children}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;