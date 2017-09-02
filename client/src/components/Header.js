import React, {Component} from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className='nav-wrapper #fb8c00 orange darken-1'>
          <a className='left brand-logo'>
            Survemail
          </a>

          <ul className='right'>
            <li>
              <a> Login with Google</a>
            </li>
          </ul>

        </div>
      </nav>
    );
  }
}

export default Header;
