import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/register_visitor">
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Register a Visitor</span>
        </Link>
      </li>
      <li>
        <Link to="/visitors">
          <i className="fas fa-search"></i>{' '}
          <span className="hide-sm">Check Visitor</span>
        </Link>
      </li>
      <li>
        <Link to="/login" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Sign Out</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/dashboard">
          <i className="fas fa-cross"></i> Church of Jesus Christ
        </Link>
      </h1>
      {!loading && ( // CHECAR EL LOADING !loading
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
