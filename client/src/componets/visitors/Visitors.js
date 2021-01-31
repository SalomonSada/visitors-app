import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {
  getAllVisitors,
  setSearchField,
  setSearchField2,
} from '../../actions/visitor';
import VisitorList from './VisitorList';

const Visitors = ({
  visitor: { visitors, loading, searchField, searchFieldToDate },
  getAllVisitors,
  setSearchField,
  setSearchField2,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    filterBy: 0,
  });

  const { filterBy } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllVisitors();
  }, [getAllVisitors]);

  const filteredVisitor = visitors.filter((visitor) => {
    switch (filterBy) {
      case '1':
        return visitor.name.toLowerCase().includes(searchField.toLowerCase());
      case '2':
        return visitor.zip; /* .toString() 
          .includes(searchField);*/
      case '3':
        let from = new Date(searchField).getTime(); // miliseconds from 1970 to the date in  searchFiled
        let to = new Date(searchFieldToDate).getTime();
        let time = new Date(visitor.date).getTime();
        if (searchField === '' || searchFieldToDate === '') return visitors;
        return from < time && time <= to; // + a day in miliseconds
      case '4':
        let today = new Date();
        let day = String(today.getDate());
        let month = String(today.getMonth() + 1);
        let year = today.getFullYear();
        if (month.length === 1) month = 0 + month;
        if (day.length === 1) day = 0 + day;
        today = year + '-' + month + '-' + day;
        return visitor.date.toString().includes(today);
      default:
        return visitors;
    }
  });

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Visitantes</h1>
          <p className="lead">
            <i className="fas fa-search"></i> Busca los visitantes ya
            registrados
          </p>

          <div className="form form-group">
            <select
              name="filterBy"
              value={filterBy}
              onChange={(e) => onChange(e)}
            >
              <option value={0}>Seleccionar Filtro</option>
              <option value={1}>Nombre</option>
              <option value={2}>ZipCode</option>
              <option value={3}>Fecha</option>
              <option value={4}>Hoy</option>
            </select>
          </div>

          {filterBy > 0 &&
            filterBy < 2 && ( // debe ir hasta 3, despues de arreglar zipcode
              <div className="form form-group search-input">
                <input
                  type="text"
                  placeholder={`Filtre aca`}
                  name="name"
                  onChange={(e) => setSearchField(e.target.value)}
                />
              </div>
            )}

          {
            /* repairing zipcode alert */
            filterBy == 2 && (
              <div className="form form-group search-input repairingBugText">
                <input
                  type="text"
                  placeholder={`Temporalmente deshabilitado`}
                  zip="zip"
                  onChange={(e) => setSearchField(e.target.value)}
                />
              </div>
            )
          }

          {filterBy === '3' && (
            <Fragment>
              <small>Desde</small>
              <div className="form form-group search-input">
                <input
                  type="date"
                  placeholder={`Filtre aca`}
                  name="name"
                  onChange={(e) => setSearchField(e.target.value)}
                />
              </div>
              <small>Hasta</small>
              <div className="form form-group search-input construccion">
                <input
                  type="date"
                  placeholder={`Filtre aca`}
                  name="name"
                  onChange={(e) => setSearchField2(e.target.value)}
                />
              </div>
            </Fragment>
          )}

          <div className="profiles">
            {visitors.length > 0 ? (
              <VisitorList visitorL={filteredVisitor} />
            ) : (
              <Spinner />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Visitors.propTypes = {
  getAllVisitors: PropTypes.func.isRequired,
  setSearchField: PropTypes.func.isRequired,
  setSearchField2: PropTypes.func.isRequired,
  visitor: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  visitor: state.visitor,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getAllVisitors,
  setSearchField,
  setSearchField2,
})(Visitors);
