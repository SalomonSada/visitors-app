import React, { Fragment } from 'react';
import VisitorItem from './VisitorItem';

const VisitorList = ({ visitorL, rol }) => {
  return (
    <Fragment>
      {visitorL.map((visitor, i) => {
        return (
          <VisitorItem
            key={visitorL[i]._id}
            name={visitorL[i].name}
            email={visitorL[i].email}
            cellphone={visitorL[i].cellphone}
            direction={visitorL[i].direction}
            zip={visitorL[i].zip}
            date={visitorL[i].date.toLocaleString('en-Us', {
              timeZone: 'America/Caracas',
            })}
            birthday={visitorL[i].birthday}
            amount={visitorL[i].sons.amount}
            ages={visitorL[i].sons.ages}
            prayRequest={visitorL[i].prayRequest}
            otherChurch={visitorL[i].otherChurch}
            _id={visitorL[i]._id}
            rol={rol}
          />
        );
      })}
    </Fragment>
  );
};

export default VisitorList;
