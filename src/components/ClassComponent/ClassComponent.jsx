import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Введите число в белое поле',
    userNumber: '',
    randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) + this.props.min,
    count: 0,
    again: style.none
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));
    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Вы забыли ввести число',
        };
      }
      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }
      return {
        result: `Вы угадали число ${state.userNumber}!
        Попыток: ${state.count}`,
        again: style.again,
      };
    });
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleClick = () => {
    this.setState({
      again: style.none,
      count: 0,
      result: 'Введите число в белое поле',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) + this.props.min,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form
          className={style.form}
          onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадайте число от 0 до 10
          </label>
          <input
            className={style.input}
            type='number'
            id='user_number'
            onChange={this.handleChange} />
          <button className={style.btn} type="submit">Угадать</button>
          <button
            className={this.state.again}
            type="reset"
            onClick={this.handleClick}>Сыграть ещё</button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
