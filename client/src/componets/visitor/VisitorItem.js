import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const VisitorItem = ({ visitor: { name, email, cellphone, direction } }) => {
  return (
    <Fragment>
      <div className="profile bg-light">
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
          <p>{cellphone}</p>
          <p>{direction}</p>
        </div>
      </div>
    </Fragment>
  );
};

VisitorItem.propTypes = {
  visitor: PropTypes.object.isRequired,
};

export default VisitorItem;
