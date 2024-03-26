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
import VisitorPartialTable from './VisitorPartialTable';

const Visitors = ({
  visitor: { visitors, loading, searchField, searchFieldToDate },
  getAllVisitors,
  setSearchField,
  setSearchField2,
  auth,
}) => {
  const [formData, setFormData] = useState({
    filterBy: 0,
  });

  const [displayOptions, toggleOptions] = useState({
    celular: false,
  });
  const { celular } = displayOptions;

  const { filterBy } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllVisitors();
  }, [getAllVisitors]);

  function parseJwt(token) {
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
  }

  const userToken = parseJwt(localStorage.token);

  // console.log(userToken.user.rol);

  const filteredVisitor = visitors.filter((visitor) => {
    switch (filterBy) {
      case '1':
        return visitor.name.toLowerCase().includes(searchField.toLowerCase());
      case '2': //zip
        if (visitor.zip) return visitor.zip.toString().includes(searchField);
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
          <button
            onClick={() =>
              toggleOptions({ ...displayOptions, celular: !celular })
            }
            type="button"
            className="btn btn-light textbold m"
          >
            Ver
            {!celular ? ' visualización por tabla' : ' visualización agrupada'}
          </button>

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
            filterBy <= 2 && ( // debe ir hasta 3, despues de arreglar zipcode
              <div className="form form-group search-input">
                <input
                  type="text"
                  placeholder={`Filtre aca`}
                  name="name"
                  onChange={(e) => setSearchField(e.target.value)}
                />
              </div>
            )}

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
          {!celular ? (
            <div className="profiles">
              {visitors.length > 0 ? (
                <VisitorList
                  visitorL={filteredVisitor}
                  rol={userToken.user.rol}
                />
              ) : (
                <Spinner />
              )}
            </div>
          ) : (
            <div>
              {visitors.length > 0 ? (
                <VisitorPartialTable
                  visitorL={filteredVisitor}
                  rol={userToken.user.rol}
                />
              ) : (
                <Spinner />
              )}
            </div>
          )}
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  visitor: state.visitor,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllVisitors,
  setSearchField,
  setSearchField2,
})(Visitors);
