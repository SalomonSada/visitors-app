import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteVisitor, getVisitorById } from '../../actions/visitor';

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
  prayRequest,
  otherChurch,
  _id,
  deleteVisitor,
  getVisitorById,
}) => {
  const [formData, setFormData] = useState({
    edit: false,
    pray: false,
  });

  const { edit, pray } = formData;

  return (
    <Fragment>
      <div className="profile bg-light">
        <div>
          <h2>{name}</h2>
          <p>
            <small className="textbold">Email: </small> {email}
          </p>
          <p>
            <small className="textbold">Teléfono: </small>
            {cellphone}
          </p>
          <p>
            <small className="textbold">ZipCode: </small> {zip}
          </p>
          <p>
            <small className="textbold">Dirección: </small> {direction}
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
          <p>
            {otherChurch && (
              <span>
                <small className="textbold">Visita otra iglesia: </small>
                <small>{otherChurch}</small>
              </span>
            )}
          </p>
          <p>
            {prayRequest && (
              <span>
                <small
                  className="textbold textbold2"
                  onClick={() => setFormData({ ...formData, pray: !pray })}
                >
                  Ver petición de oración{' '}
                </small>{' '}
                <br />
                {pray && <small>{prayRequest}</small>}
              </span>
            )}
          </p>
        </div>

        <div className="my-t-1">
          <button
            className="btn btn-success"
            onClick={() => {
              getVisitorById(_id);
              setTimeout(() => setFormData({ ...formData, edit: true }), 1000);
            }}
          >
            {edit && <Redirect to={`/update_visitor/${_id}`} />}
            <i className="fas fa-user-edit"></i>Editar info
          </button>

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
  getVisitorById: PropTypes.func.isRequired,
};

export default connect(null, { deleteVisitor, getVisitorById })(VisitorItem);
