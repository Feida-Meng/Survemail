import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { new: true};
  // }
  //shortcut for above
  state = { showFormReview: false};

  renderContent() {
    if (this.state.showFormReview) {
      return  <SurveyFormReview
              onBack={ () => this.setState({showFormReview: false}) }
              />;
    }
    return  <SurveyForm
              onSurveySubmit={ () => this.setState({showFormReview: true}) }
            />;
  }

  render() {
    return(
      <div>
        {this.renderContent()}
      </div>
    );
  }

}

//to clear out all the fields 
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
