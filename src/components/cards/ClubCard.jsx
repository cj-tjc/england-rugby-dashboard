import React from 'react';
import { withRouter } from 'react-router-dom';

const ClubCard = ({
  name,
  defaultAddress1,
  defaultAddress2,
  defaultAddress3,
  defaultCity,
  defaultPostalCode,
  _id,
  history
}) => {
  const hasAddress =
    defaultAddress1 ||
    defaultAddress2 ||
    defaultAddress3 ||
    defaultCity ||
    defaultPostalCode;
  return (
    <div
      className="rfu-card rfu-card__club"
      onClick={() => history.push(`/clubs/${_id}`)}
    >
      <h1 className="rfu-card-title">{name}</h1>
      <div className="rfu-card-address">
        {hasAddress ? (
          <>
            {defaultAddress1 ? <p>{defaultAddress1}</p> : null}
            {defaultAddress2 ? <p>{defaultAddress2}</p> : null}
            {defaultAddress3 ? <p>{defaultAddress3}</p> : null}
            {defaultCity ? <p>{defaultCity}</p> : null}
            {defaultPostalCode ? (
              <p style={{ fontWeight: 400 }}>{defaultPostalCode}</p>
            ) : null}
          </>
        ) : (
          <p>No Address Supplied.</p>
        )}
      </div>
    </div>
  );
};

export default withRouter(ClubCard);
