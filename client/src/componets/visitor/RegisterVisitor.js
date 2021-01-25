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
    zip: '',
    checkZip: false,
    birthday: '',
    amount: '',
    ages: '',
  });

  const {
    name,
    email,
    cellphone,
    direction,
    zip,
    checkZip,
    birthday,
    amount,
    ages,
  } = formData;

  const onChange = (e) => {
    createFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeAndCheck = (e) => {
    if (!isNaN(e.target.value)) {
      return createFormData({ ...formData, zip: e.target.value });
    }
    createFormData({ ...formData, checkZip: true });
    if (e.target.value === '') {
      createFormData({ ...formData, checkZip: false });
    }
  };

  const [displaySonOptions, toggleSonOptions] = useState(false);

  const clearFormData = () => {
    formData.name = '';
    formData.email = '';
    formData.cellphone = '';
    formData.direction = '';
    formData.zip = '';
    formData.birthday = '';
    formData.amount = '0';
    formData.ages = '';
    toggleSonOptions(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createVisitor(formData, history);
    clearFormData();
  };

  return (
    <Fragment>
      <h1 className="large text-primary">
        <i className="fas fa-user m-1"></i>Registra un Visitante
      </h1>
      <p className="lead">
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
            placeholder="Direction"
            name="direction"
            value={direction}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* ZipCode, Ej: 32804"
            name="zip"
            value={zip}
            onChange={(e) => onChangeAndCheck(e, checkZip)}
          />
          {checkZip && (
            <div>
              {' '}
              <small>El campo ZipCode acepta solamente números.</small>
            </div>
          )}
        </div>
        <div className="form-group">
          <h4 className="left">Fecha de nacimiento</h4>
          <input
            type="date"
            name="birthday"
            value={birthday}
            onChange={(e) => onChange(e)}
          />
        </div>
        {/*  */}
        <div className="my-1 left">
          <button
            onClick={() => toggleSonOptions(!displaySonOptions)}
            type="button"
            className="btn btn-light textbold"
          >
            Agregar Hijos (Opcional)
          </button>
          <span></span>
        </div>

        {displaySonOptions && (
          <Fragment>
            <div className="form-group">
              <select
                name="amount"
                value={amount}
                onChange={(e) => onChange(e)}
              >
                <option value="0">Seleccione la cantidad de hijos</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="o">Más de 5</option>
              </select>
            </div>
            {Number(amount) > 0 && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Edades"
                  name="ages"
                  value={ages}
                  onChange={(e) => onChange(e)}
                />
                <small className="form-text">
                  Por favor, separar cada edad con una coma (ej. 4, 9, 14)
                </small>
              </div>
            )}
          </Fragment>
        )}

        <input
          type="submit"
          className="btn btn-primary my-1"
          value="Registrar"
        />
        <Link className="btn btn-light my-1 textbold" to="/visitors">
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
