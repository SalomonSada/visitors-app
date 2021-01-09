import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/register">
          <i className="fas fa-address-card"></i>{' '}
          <span className="hide-sm">Registrar Usuario</span>
        </Link>
      </li>
      <li>
        <Link to="/register_visitor">
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Registrar visitante</span>
        </Link>
      </li>
      <li>
        <Link to="/visitors">
          <i className="fas fa-search"></i>{' '}
          <span className="hide-sm">Buscar visitantes</span>
        </Link>
      </li>
      <li>
        <Link to="/" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Cerrar Sesión</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      {/*  <li>
        <Link to="/register">Registrate</Link>
      </li> 
      <li>
        <Link to="/">Iniciar Sesión</Link>
      </li> */}
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-cross"></i> Iglesia Casa de Dios
        </Link>
      </h1>
      {!loading && (
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
