const FlightResults = ({ flights }) => {
  if (!flights || flights.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">No Flights Found</div>
    );
  }

  return (
    <div className="mt-6 grid gap-4  md:grid-cols-2">
      {flights.map((flight, index) => (
        <div
          key={index}
          className="border rounded-2xl p-4 shadow-md  bg-white hover:shadow-lg  transition"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{flight.airline}</h2>
            <span className="text-sm  text-gray-600">
              #{flight.flightNumber}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-700">
            <p>
              <strong>From:</strong>
              {flight.origin}
            </p>
            <p>
              <strong>To:</strong>
              {flight.destination}
            </p>
            <p>
              <strong>Departure:</strong>{" "}
              {new Date(flight.departureTime).toLocaleString()}
            </p>
            <p>
              <strong>Arrival:</strong>{" "}
              {new Date(flight.arrivalTime).toLocaleString()}
            </p>
            <p>
              <strong>Stops:</strong> {flight.stops}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              <span className="text-green-600 font-bold">
                ₹{flight.price.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
