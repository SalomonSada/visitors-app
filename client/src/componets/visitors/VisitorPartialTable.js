import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteVisitor, getVisitorById } from '../../actions/visitor';
import VisitorItemTable from './VisitorItemTable';
import Spinner from '../layout/Spinner';

const VisitorPartialTable = ({ visitorL, rol }) => {
  const [formData, setFormData] = useState({
    edit: false,
    pray: false,
    exportar: false,
  });

  const { edit, pray, exportar } = formData;
  return (
    <Fragment>
      <button
        className="btn btn-light textbold m"
        onClick={() => setFormData({ ...formData, exportar: !exportar })}
      >
        {!exportar
          ? 'Pre exportar a Excel'
          : 'Volver a visualización por tabla'}
      </button>
      {!exportar ? (
        <div className="partialTable">
          <table className="m-1" id="visitantes">
            <thead>
              <tr>
                <th className="p-x m-x">Nombre</th>
                <th className="p-x m-x">Email</th>
                <th className="p-x m-x">Teléfono</th>
                <th className="p-x m-x">Dirección</th>
                <th className="p-x m-x">Zipcode</th>
                <th className="p-x m-x">Visita</th>
                <th className="p-x m-x">+Info</th>
              </tr>
            </thead>
            <tbody>
              {visitorL.map((visitor, i) => {
                return (
                  <tr>
                    <td className="p-x m-x">{visitorL[i].name}</td>
                    <td className="p-x m-x">{visitorL[i].email}</td>
                    <td className="p-x m-x">{visitorL[i].cellphone}</td>
                    <td className="p-x m-x">{visitorL[i].direction}</td>
                    <td>{visitorL[i].zip}</td>
                    <td className="p-x m-x">{visitorL[i].date.slice(0, 10)}</td>
                    <td
                      className="p-x m-x pointerCursor"
                      onClick={() => {
                        alert(
                          visitorL[i].birthday
                            ? '\nFecha de nacimiento: ' +
                                visitorL[i].birthday.slice(0, 10)
                            : '\nFecha de nacimiento: Sin datos'
                        );
                        alert(
                          visitorL[i].sons.amount > 0
                            ? '\nCantidad de hijos: ' +
                                visitorL[i].sons.amount +
                                ' || Edad(es): ' +
                                visitorL[i].sons.ages.join(', ') +
                                ' años'
                            : '\nCantidad de hijos: 0'
                        );
                        alert(
                          visitorL[i].otherChurch
                            ? '\nVisita otra iglesia: ' +
                                visitorL[i].otherChurch
                            : '\nVisita otra iglesia: No'
                        );
                        alert(
                          visitorL[i].prayRequest
                            ? '\nPetición de oración: ' +
                                visitorL[i].prayRequest
                            : '\nPetición de oración: Sin datos'
                        );
                      }}
                    >
                      +
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {visitorL.length > 0 ? (
            <VisitorItemTable visitorL={visitorL} />
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </Fragment>
  );
};

VisitorPartialTable.propTypes = {
  // visitor: PropTypes.object.isRequired,
  deleteVisitor: PropTypes.func.isRequired,
  getVisitorById: PropTypes.func.isRequired,
};

export default connect(null, { deleteVisitor, getVisitorById })(
  VisitorPartialTable
);
