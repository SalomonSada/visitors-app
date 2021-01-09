import React, { Fragment } from 'react';
//import PropTypes from 'prop-types';

const VisitorItem = ({ name, email, cellphone, direction, date }) => {
  return (
    <Fragment>
      <div className="profile bg-light">
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
          <p>{cellphone}</p>
          <p>
            <small className="textbold">ZipCode:</small> {direction}
          </p>
          <p>{date}</p>
        </div>
      </div>
    </Fragment>
  );
};

/* VisitorItem.propTypes = {
  visitor: PropTypes.object.isRequired,
}; */

export default VisitorItem;
