import React from 'react';
import VisitorItem from './VisitorItem';

const VisitorList = ({ visitorL }) => {
  return (
    <div className="tc">
      {visitorL.map((visitor, i) => {
        return (
          <VisitorItem
            key={visitorL[i].id}
            name={visitorL[i].name}
            email={visitorL[i].email}
            cellphone={visitorL[i].cellphone}
            direction={visitorL[i].direction}
            date={visitorL[i].date}
          />
        );
      })}
    </div>
  );
};

export default VisitorList;
