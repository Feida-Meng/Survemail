import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


//reduxForm added props including handleSubmit
class SurveyForm extends Component {

  renderFields() {
    return _.map(formFields, ({label, name}) => {
      return (<Field key={name} component={SurveyField} label={label} name={name} />);
    });
  }

  render() {
    return (
      <div>
        <form className="survey-form" onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          <div>
            {this.renderFields()}
            <Link to='/surveys' className='red btn-flat white-text' >
              Cancel
            </Link>
            <button className='teal btn-flat right white-text' type='submit'>
              Next
              <i className='material-icons right'> done </i>
            </button>
          </div>
        </form>
      </div>
    );

  }
}

function validate(values) {
  const errors = {}

  _.each(formFields, ({ label,name }) => {
    if (!values[name]) {
      errors[name] = label + ' must be provided';
    }
  });

  if (values.recipients) {
    errors.recipients = validateEmails(values.recipients);
  }
  return errors;
}

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm);
