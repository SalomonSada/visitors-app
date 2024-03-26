import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    rol: '',
  });

  const { name, email, password, password2, rol } = formData;

  const clearFormData = () => {
    name = '';
    email = '';
    password = '';
    password2 = '';
    rol = '';
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2)
      setAlert('Las contraseñas no coinciden', 'danger');
    if (rol === '' || rol === '0')
      setAlert('Establezca el rol de usuario', 'danger');
    else {
      register({ name, email, password, rol });
      setAlert('Usuario registrado', 'success');
    }
    window.scrollTo(0, 0);
  };

  // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
  const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  const userToken = parseJwt(localStorage.token);

  // Redirect if doesn't have aproppiated rol
  if (userToken.user.rol !== 'Admin') {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Registrate</h1>
      <p className="lead">
        <i className="fas fa-user m-1"></i>Crea tu Usuario
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Correo Electrónico"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <select name="rol" value={rol} onChange={(e) => onChange(e)}>
            <option value="0">Seleccione Rol de usuario</option>
            <option value="Admin">Admin</option>
            <option value="Ujier">Ujier</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            /*  minLength="6" */
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirma tu Contraseña"
            name="password2"
            /*  minLength="6" */
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          value="Registrar"
          className="btn btn-primary btn-altern"
        />
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
