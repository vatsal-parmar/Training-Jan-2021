import React, { useState, useEffect } from "react";
// import loadingImg from "../../images/loading.gif";
import { FaRupeeSign } from "react-icons/fa";

const BookingCard = ({
  pnr: { journey_date, from, to, ticket_price, train, _id },
  viewTicket,
  cancelBooking,
}) => {
  const [isCancleAvail, setIsCancleAvail] = useState(false);

  useEffect(() => {
    var d1 = new Date();
    var d2 = new Date(journey_date);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    if (d1 <= d2) {
      setIsCancleAvail(true);
    } else {
      setIsCancleAvail(false);
    }
  }, []);

  return (
    <div className="col-md-6 mx-auto alert alert-primary my-2 border border-primary">
      <div className="row">
        <div className="col-6">
          <p>Train : {train.train_name}</p>
          <p>From : {from.station_name}</p>
          <p>To : {to.station_name}</p>
        </div>
        <div className="col-6">
          <p>Journey Date : {journey_date}</p>
          <p>
            Ticket Price : <FaRupeeSign /> {ticket_price}
          </p>
          <button
            className="btn btn-sm btn-primary"
            type="button"
            onClick={() => viewTicket(_id)}
          >
            View Ticket
          </button>
          {isCancleAvail && (
            <button
              className="ml-2 btn btn-sm btn-danger"
              type="button"
              onClick={() => cancelBooking(_id)}
            >
              Cancel Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
