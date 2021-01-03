import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllVisitors } from '../../actions/visitor';
import VisitorItem from './VisitorItem';

const Visitors = ({ visitor: { visitors, loading }, getAllVisitors }) => {
  useEffect(() => {
    getAllVisitors();
  }, [getAllVisitors]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Visitors</h1>
          <p className="lead">
            <i className="fas fa-search"></i> Search the Visitors Registered
          </p>
          <div className="form form-group search-input">
            <input type="text" placeholder="Filter by Name" name="name" />
          </div>
          <div className="profiles">
            {visitors.length > 0 ? (
              visitors.map((visitor) => (
                <VisitorItem key={visitor._id} visitor={visitor} />
              ))
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
  visitor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  visitor: state.visitor,
});

export default connect(mapStateToProps, { getAllVisitors })(Visitors);
