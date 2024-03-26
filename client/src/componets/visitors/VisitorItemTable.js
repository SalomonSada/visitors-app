import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteVisitor, getVisitorById } from '../../actions/visitor';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const VisitorItemTable = ({ visitorL, rol }) => {
  return (
    <Fragment>
      <ReactHTMLTableToExcel
        id="exportar"
        className="btn btn-light textbold m"
        table="visitantes"
        filename={`Visitantes a fecha ${new Date().toString().slice(0, 15)}`}
        sheet="Visitantes"
        buttonText="Exportar a Excel"
      />
      <div>
        <table className="m-1" id="visitantes">
          <thead>
            <tr>
              <th className="p-x m-x">Nombre</th>
              <th className="p-x m-x">Email</th>
              <th className="p-x m-x">Teléfono</th>
              <th className="p-x m-x">Dirección</th>
              <th className="p-x m-x">Zipcode</th>
              <th className="p-x m-x">Visita</th>
              <th className="p-x m-x">nacimiento</th>
              <th className="p-x m-x">Hijos</th>
              <th className="p-x m-x">Iglesia</th>
              <th className="p-x m-x">Peticion</th>
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
                  <td className="p-x m-x">
                    {visitorL[i].birthday && visitorL[i].birthday.slice(0, 10)}
                  </td>
                  <td>
                    {visitorL[i].sons.ages.length > 0 &&
                      visitorL[i].sons.ages.join(', ') + ' años'}
                  </td>
                  <td>{visitorL[i].otherChurch}</td>
                  <td>{visitorL[i].prayRequest}</td>
                  {/* <td   ver + info
                    className="p-x m-x pointerCursor"
                    onClick={() => {
                      console.log('test');
                    }}
                  >
                    +
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

VisitorItemTable.propTypes = {
  // visitor: PropTypes.object.isRequired,
  deleteVisitor: PropTypes.func.isRequired,
  getVisitorById: PropTypes.func.isRequired,
};

export default connect(null, { deleteVisitor, getVisitorById })(
  VisitorItemTable
);
