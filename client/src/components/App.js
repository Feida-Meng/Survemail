import React, {Component} from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import Header from './Header'

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
              {/* exact is same as exact={true} */}
            {/* <Route exact path='/' component={} /> */}

          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
