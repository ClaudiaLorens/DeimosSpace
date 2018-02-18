import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li>
                  <NavLink exact activeClassName="active" to="/">Posts</NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/comments">Comments</NavLink>
                </li>
              </ul>
            </div>

          </div>
        </nav>
    </header>
);

export default Header;