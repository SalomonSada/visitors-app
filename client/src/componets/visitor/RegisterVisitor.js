import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createVisitor } from '../../actions/visitor';

const RegisterVisitor = ({ createVisitor, history }) => {
  const [formData, createFormData] = useState({
    name: '',
    email: '',
    cellphone: '',
    direction: '',
  });

  const { name, email, cellphone, direction } = formData;

  const onChange = (e) => {
    createFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearFormData = () => {
    formData.name = '';
    formData.email = '';
    formData.cellphone = '';
    formData.direction = '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createVisitor(formData, history);
    clearFormData();
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Registra un Visitante</h1>
      <p className="lead">
        <i className="fas fa-user m-1"></i>Agrega la siguiente información! {" "}
        <small>* = Campos Obligatorios</small>
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Nombre"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="* Correo Electrónico"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Número de teléfono"
            name="cellphone"
            value={cellphone}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* ZipCode, Ej: 32804"
            name="direction"
            value={direction}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Registrar" />
        <Link className="btn btn-light my-1" to="/visitors">
          Ver Visitantes
        </Link>
      </form>
    </Fragment>
  );
};

RegisterVisitor.propTypes = {
  createVisitor: PropTypes.func.isRequired,
};

export default connect(null, { createVisitor })(withRouter(RegisterVisitor));
