import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteVisitor } from '../../actions/visitor';

const VisitorItem = ({
  name,
  email,
  cellphone,
  direction,
  zip,
  date,
  birthday,
  amount,
  ages,
  _id,
  deleteVisitor,
}) => {
  return (
    <Fragment>
      <div className="profile bg-light">
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
          <p>
            <small className="textbold">Teléfono: </small>
            {cellphone}
          </p>
          <p>
            <small className="textbold">ZipCode: </small> {zip}
          </p>
          <p>
            {direction && (
              <span>
                <small className="textbold">Dirección: </small> {direction}
              </span>
            )}
          </p>
          <p>
            {birthday && (
              <span>
                <small className="textbold">Fecha de nacimiento: </small>
                {birthday.slice(0, 10)}
              </span>
            )}
          </p>
          <p>
            <small className="textbold">Fecha de visita: </small>
            {date.slice(0, 10)}
          </p>
          <p>
            {amount && (
              <span>
                <small className="textbold">Cant. Hijo(s): </small>
                {amount} <small className="textbold">| Edad(es): </small>
                {ages.join()}
              </span>
            )}
          </p>
        </div>
        <div className="my-t-1">
          <Link to={`/update_visitor/${_id}`} className="btn btn-success ">
            <i className="fas fa-user-edit"></i> Editar info
          </Link>
          <button className="btn btn-danger" onClick={() => deleteVisitor(_id)}>
            <i className="fas fa-trash-alt"></i> Eliminar
          </button>
        </div>
      </div>
    </Fragment>
  );
};

VisitorItem.propTypes = {
  // visitor: PropTypes.object.isRequired,
  deleteVisitor: PropTypes.func.isRequired,
};

export default connect(null, { deleteVisitor })(VisitorItem);