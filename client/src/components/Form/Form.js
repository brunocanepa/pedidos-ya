import React from 'react';
import PropTypes from 'prop-types';

import container from '../../containers/Form.container';
import styles from './styles';
import InputForm from '../InputForm';
import ButtonForm from '../ButtonForm';
import dictionary from '../../localization';

class Form extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    inputValues: PropTypes
      .arrayOf(PropTypes.string)
      .isRequired,
    onTextChange: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
    validForm: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
  }

  render() {
    const {form, inputValues, onTextChange, onSend, validForm, errorMessage} = this.props;
    const {title, inputs, send} = form;
    return (
      <div style={styles.content}>
        <h2>{title.text}</h2>
        <div style={styles.inputContent}>
          {inputs.map((input, index) => (
            <InputForm
              key={index}
              id={index}
              type={input.type}
              value={inputValues[index]}
              placeholder={input.text}
              required
              autoFocus={index == 0}
              onChange={onTextChange(index)}></InputForm>
          ))}
        </div>
        <div style={styles.errorContent}>
          {!validForm && <label style={styles.errorLabel}>{errorMessage || dictionary.form.error} </label>}
        </div>
        <ButtonForm onClick={onSend} text={send.text} nextRoute={send.nextRoute} event={send.event}/>
      </div>
    );
  }
}

export default container(Form);