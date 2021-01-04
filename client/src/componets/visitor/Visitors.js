import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllVisitors } from '../../actions/visitor';
import VisitorItem from './VisitorItem';

const Visitors = ({
  visitor: { visitors, loading, searchField },
  getAllVisitors,
}) => {
  useEffect(() => {
    getAllVisitors();
  }, [getAllVisitors]);

  const [formData, setFormData] = useState({
    searchBox: '',
  });

  const { searchBox } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filtered = visitors.filter((visitor) => {
    return visitor.name.toLowerCase().includes(searchBox.toLowerCase());
  });

  //console.log(filtered);

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
            <input
              type="text"
              placeholder="Filter by Name"
              name="searchBox"
              value={searchBox}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="profiles">
            {visitors.length > 0 ? (
              visitors.map((visitor, i) => (
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
