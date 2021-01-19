import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllVisitors, setSearchField } from '../../actions/visitor';
import VisitorList from './VisitorList';
import { filter } from 'lodash';
//import _ from 'lodash';

const Visitors = ({
  visitor: { visitors, loading, searchField },
  getAllVisitors,
  setSearchField,
}) => {
  const [formData, setFormData] = useState({
    filterBy: 2,
  });

  const { filterBy } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //  filterFunction();
  };

  useEffect(() => {
    getAllVisitors();
  }, [getAllVisitors]);

  const filteredVisitorsByName = visitors.filter((visitor) => {
    return visitor.name.toLowerCase().includes(searchField.toLowerCase());
  });

  const filteredVisitorByZip = visitors.filter((visitor) => {
    return visitor.zip.toString().includes(searchField);
  });

  const filterFunction = () => {
    if (filterBy === 1) {
      console.log('NAME::::', filteredVisitorsByName);
      return filteredVisitorsByName;
    }
    if (filterBy === 2) {
      console.log('ZIP::::', filteredVisitorByZip);
      return filteredVisitorByZip;
    } else {
      console.log('FILTERBY::::', filterBy);
      console.log('ALL::::', visitors);
      return visitors;
    }
    /* switch (filterBy) {
      case 1:
        console.log('NAME::::', filteredVisitorsByName);
        return filteredVisitorsByName;
      case 2:
        console.log('ZIP::::', filteredVisitorByZip);
        return filteredVisitorByZip;
      default:
        console.log('FILTERBY::::', filterBy);
        console.log('ALL::::', visitors);
        return visitors;
    } */
  };

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
            </select>
          </div>

          {filterBy > 0 && (
            <div className="form form-group search-input">
              <input
                type="text"
                placeholder={`Filtre aca`}
                name="name"
                onChange={(e) => setSearchField(e.target.value)}
              />
            </div>
          )}

          <div className="profiles">
            {visitors.length > 0 ? (
              <VisitorList visitorL={filterFunction()} />
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
  visitor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  visitor: state.visitor,
});

export default connect(mapStateToProps, { getAllVisitors, setSearchField })(
  Visitors
);
