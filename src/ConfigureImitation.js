import React, { Component } from 'react';

const ChooseElement = () => {
  return (
    <form>
      <div className="row">
        <div className="col-md-5">
          <div className="form-group">
            <label>
              Участок:{' '}
              <small>На данный момент доступен 1 участок: Вельск</small>
            </label>
            <select disabled className="form-control">
              <option>Вельск</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};

const SetPeriod = ({handleChange, isDisabled}) => {
  return (
    <form>
      <div className="row">
        <div className="col-md-8">
          <div className="form-group">
            <label>
              Периодичность снятий показаний:{' '}
              <small>Показаний в час на каждый участок</small>
            </label>
            <div className="row">
              <div className="col-xs-4">
                <input type="number" className="form-control border-input" disabled={isDisabled} placeholder='Показаний в час' min={0} onChange={(event) => handleChange(event.target.value)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const SetErrorProbability = ({handleChange, isDisabled}) => {
  return (
    <form>
      <div className="row">
        <div className="col-md-8">
          <div className="form-group">
            <label>
              Вероятность ошибки:{' '}
              <small>Вероятность генерации критической ситуации</small>
            </label>
            <div className="row">
              <div className="col-xs-4">
                <input type="number" className="form-control border-input" disabled={isDisabled} placeholder='Вероятность в %' min={0} max={100} onChange={(event) => handleChange(null, event.target.value)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}


class ConfigureImitation extends Component {
  constructor() {
    super();
    this.state = {
      period: null,
      errorRate: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.isStartDisabled = this.isStartDisabled.bind(this);
  }

  handleChange(period, errorRate) {
    if (period) {
      this.setState({
        period
      })
    } else if (errorRate) {
      this.setState({
        errorRate
      })
    }
  }

  isStartDisabled() {
    return !(this.state.errorRate && this.state.period) || !this.props.isConnected || this.props.isActive
  }

  isStopDisabled() {
    return !this.props.isActive;
  }

  render() {
    return (
      <div>
        <ChooseElement />
        <SetPeriod handleChange={this.handleChange} isDisabled={this.props.isActive}/>
        <SetErrorProbability handleChange={this.handleChange} isDisabled={this.props.isActive}/>
        <hr/>
        <div className="row">
          <button
                className="btn btn-success btn-simple" disabled={this.isStartDisabled()} onClick={() => this.props.start(this.state)}
              >
                Начать имитацию
          </button>
          <button
                className="btn btn-danger btn-simple" disabled={this.isStopDisabled()} onClick={this.props.stop}
              >
                Остановить имитацию
          </button>
        </div>
      </div>
    );
  }
}

export default ConfigureImitation;