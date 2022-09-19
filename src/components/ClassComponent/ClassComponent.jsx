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
    isOver: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Вы забыли ввести число',
        };
      }
      if (state.userNumber > 10 || state.userNumber < 0) {
        return {
          result: 'Число должно быть между 0 и 10 включительно',
          userNumber: ''
        };
      }
      if (state.userNumber > state.randomNumber) {
        return {
          count: state.count + 1,
          result: `${state.userNumber} больше загаданного`,
          userNumber: ''
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          count: state.count + 1,
          result: `${state.userNumber} меньше загаданного`,
          userNumber: ''
        };
      }
      return {
        result: `Вы угадали число ${state.userNumber}!
        Попыток: ${state.count + 1}`,
        isOver: true,
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
      count: 0,
      result: 'Введите число в белое поле',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) + this.props.min,
      userNumber: '',
      isOver: false
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
            onChange={this.handleChange}
            value={this.state.userNumber}
            disabled={this.state.isOver}
          />
          {this.state.isOver ?
            <button
              className={style.btn}
              type="reset"
              onClick={this.handleClick}
            >Сыграть ещё</button> :
            <button className={style.btn} type="submit">Угадать</button>}
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
