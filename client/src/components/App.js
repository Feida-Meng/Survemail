import React, {Component} from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route path='/' component={Landing} />
            <Route path='/surveys' component={Dashboard} />
              {/* exact is same as exact={true} */}
            {/* <Route exact path='/' component={} /> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);
