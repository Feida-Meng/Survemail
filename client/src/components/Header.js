import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return; //return nothing while waiting for server to response
      case false:
        return (
          <li>
            <a href='/auth/google'> Login with Google </a>
          </li>
        );
      default:
        return [
          <li key='payments'> <Payments /> </li>,
          <li key='creadits'> Credits: {this.props.auth.credits} </li>,
          <li key='logout'><a href='/api/logout'> Logout</a></li>
        ];
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className='nav-wrapper #fb8c00 orange darken-1'>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'
          >
            Survemail
          </Link>

          <ul className='right'>

            {this.renderContent()}

          </ul>

        </div>
      </nav>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}
export default connect(mapStateToProps)(Header);
