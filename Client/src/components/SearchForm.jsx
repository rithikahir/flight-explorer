import { useState } from "react";
import { useFlight } from "../context/FlightContext";
import { getFlights } from "../api/getFlights";
import FlightResults from "./FlightResults";

const SearchForm = () => {
  const {
    setSearchQuery,
    setFlightResults,
    setFilteredResults,
    flightResults,
  } = useFlight();
  const [loading, setLoading] = useState(false);

  const [tripType, setTripType] = useState("oneway");
  const [returnDate, setReturnDate] = useState("");
  const [segment, setSegment] = useState([
    {
      origin: "",
      destination: "",
      date: "",
    },
  ]);

  const addSegment = () => {
    if (segment.length < 3) {
      setSegment([
        ...segment,
        {
          origin: "",
          destination: "",
          date: "",
        },
      ]);
    }
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    setSegment([
      {
        origin: "",
        destination: "",
        date: "",
      },
    ]);
    setReturnDate("");
    setFlightResults([]);
  };

  const handleSegmentChange = (index, feild, value) => {
    const updated = [...segment];
    updated[index][feild] = value;
    setSegment(updated);
  };

  // Handling main Submit After Filling.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = { tripType, segment, returnDate };
    setSearchQuery(query);
    setLoading(true);
    // API CALL
    const allFlights = await getFlights(query);

    setFlightResults(allFlights);
    setFilteredResults(allFlights);
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="flex gap-4 mb-4">
          {["oneway", "roundtrip", "multicity"].map((type) => (
            <button
              key={type}
              type="button"
              className={`px-3 py-1 border rounded ${
                tripType === type ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => handleTripTypeChange(type)}
            >
              {type === "oneway"
                ? "One-Way"
                : type === "roundtrip"
                ? "Round-Trip"
                : "Multi-city"}
            </button>
          ))}
        </div>
        {/* Segment form */}
        {segment.map((seg, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              type="text"
              placeholder="Origin"
              className="input"
              value={seg.origin}
              onChange={(e) => handleSegmentChange(i, "origin", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Destination"
              value={seg.destination}
              className="input"
              onChange={(e) =>
                handleSegmentChange(i, "destination", e.target.value)
              }
              required
            />
            <input
              type="date"
              className="input"
              onChange={(e) => handleSegmentChange(i, "date", e.target.value)}
              value={seg.date}
              required
            />
          </div>
        ))}

        {/* Round-trip return date */}
        {tripType === "roundtrip" && (
          <div className="mb-2">
            <label className="flex">Return Date: </label>
            <input
              type="date"
              className="border rounded px-3 py-2 flex w-[33%]"
              onChange={(e) => setReturnDate(e.target.value)}
              value={returnDate}
              required
            />
          </div>
        )}

        {/* Multi-city Add Segment */}

        {tripType === "multicity" && segment.length < 3 && (
          <button
            type="button"
            className="text-blue-600 underline flex"
            onClick={addSegment}
          >
            + Add another city
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Search Flight
        </button>
      </form>

      {loading ? (
        <p className="text-center mt-4">Loading flights...</p>
      ) : (
        <FlightResults flights={flightResults} />
      )}
    </>
  );
};

export default SearchForm;
