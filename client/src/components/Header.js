import React, {Component} from 'react';
import { connect } from 'react-redux';


class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return; //return nothing while waiting for server to response
        break;
      case false:
        return (
          <li>
            <a href='/auth/google'> Login with Google </a>
          </li>
        );
        break;
      default:
        return (
          <li>
            <a href='/api/logout'> Logout</a>
          </li>
        );

    }
  }


  render() {
    console.log(this.props);
    return (
      <nav>
        <div className='nav-wrapper #fb8c00 orange darken-1'>
          <a className='left brand-logo'>
            Survemail
          </a>

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
