import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createVisitor, getVisitorById } from '../../actions/visitor';

const UpdateVisitor = ({
  visitor: { visitor, loading },
  createVisitor,
  history,
  getVisitorById,
  match,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cellphone: '',
    direction: '',
    zip: 0,
    birthday: '',
    amount: '',
    ages: '',
  });

  const [displaySonOptions, toggleSonOptions] = useState(true);

  useEffect(() => {
    getVisitorById(match.params._id);

    setFormData({
      name: loading || !visitor.name ? '' : visitor.name,
      email: loading || !visitor.email ? '' : visitor.email,
      cellphone: loading || !visitor.cellphone ? '' : visitor.cellphone,
      direction: loading || !visitor.direction ? '' : visitor.direction,
      zip: loading || !visitor.zip ? '' : visitor.zip,
      birthday: loading || !visitor.birthday ? '' : visitor.birthday,
      amount: loading || !visitor.sons.amount ? '' : visitor.sons.amount,
      ages: loading || !visitor.sons.amount ? '' : visitor.sons.ages.join(),
    });
  }, [setFormData, loading, match.params._id]);

  const {
    name,
    email,
    cellphone,
    direction,
    zip,
    birthday,
    amount,
    ages,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createVisitor({ ...formData, _id: match.params._id }, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Actualiza un Visitante</h1>
      <p className="lead">
        <i className="fas fa-user m-1"></i>Agrega la siguiente información!{' '}
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
            placeholder="Direccion"
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
            onChange={(e) => onChange(e)}
          />
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
          value="Actualizar   "
        />
        <Link className="btn btn-light my-1 textbold" to="/visitors">
          Ver Visitantes
        </Link>
      </form>
    </Fragment>
  );
};

UpdateVisitor.propTypes = {
  createVisitor: PropTypes.func.isRequired,
  getVisitorById: PropTypes.func.isRequired,
  visitor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  visitor: state.visitor,
});

export default connect(mapStateToProps, { createVisitor, getVisitorById })(
  withRouter(UpdateVisitor)
);
