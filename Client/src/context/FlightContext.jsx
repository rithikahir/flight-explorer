import { createContext, useContext, useState } from "react";

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [flightResults, setFlightResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  return (
    <FlightContext.Provider
      value={{
        searchQuery,
        flightResults,
        filteredResults,
        setFilteredResults,
        setFlightResults,
        setSearchQuery,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => useContext(FlightContext);
