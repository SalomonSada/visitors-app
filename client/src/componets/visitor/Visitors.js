import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllVisitors, setSearchField } from '../../actions/visitor';
import VisitorList from './VisitorList';

const Visitors = ({
  visitor: { visitors, loading, searchField },
  getAllVisitors,
  setSearchField,
}) => {
  useEffect(() => {
    getAllVisitors();
  }, [getAllVisitors]);

  const filteredVisitors = visitors.filter((visitor) => {
    return visitor.name.toLowerCase().includes(searchField.toLowerCase());
  });

  console.log(filteredVisitors);

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
          <div className="form form-group search-input">
            <input
              type="text"
              placeholder="Filtra acá por nombre"
              name="name"
              onChange={(e) => setSearchField(e.target.value)}
            />
          </div>
          <div className="profiles">
            {visitors.length > 0 ? (
              <VisitorList visitorL={filteredVisitors} />
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
