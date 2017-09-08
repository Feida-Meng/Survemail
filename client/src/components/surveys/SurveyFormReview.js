import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import  formFields from './formFields';
import * as actions from '../../actions';



const SurveyFormReview = ({onBack, formValues, submitSurvey, history}) => {

  const reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label> {field.label} </label>
        <div>
          { formValues[field.name] }
        </div>
      </div>
    );
  })

  return (
    <div>
      <h5> Please confirm your entries </h5>
      {reviewFields}
      <button
        className="yellow white-text btn-flat"
        onClick={onBack}
      >
        Back
      </button>
      <button
        className="green btn-flat white-text right"

        onClick={() => submitSurvey(formValues, history) }
      >
        Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values};
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));;
