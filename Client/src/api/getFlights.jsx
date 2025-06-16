const API_KEY = "2898faffceaa1fbe17907190e468a72f";

export const getFlights = async (query) => {
  const { segment } = query;

  try {
    const allResults = [];

    // Fetch all data (max 100 entries per request)
    const url = `${import.meta.env.VITE_API_URL}/api/flights`;

    const response = await fetch(url);
    const data = await response.json();

    const allData = data.data || [];
    console.log("Fetched Data Sample:", allData.slice(0, 5));
    console.log("Search Segments:", segment);

    for (let seg of segment) {
      const filtered = allData.filter((item) => {
        const depMatch =
          item?.departure?.iata?.toLowerCase() === seg.origin.toLowerCase();
        const arrMatch =
          item?.arrival?.iata?.toLowerCase() === seg.destination.toLowerCase();
        const dateMatch = item?.flight_date?.startsWith(seg.date);

        return depMatch && arrMatch && dateMatch;
      });

      console.log("Filtered for segment:", seg, "=>", filtered.length);

      const result = filtered.map((item) => ({
        airline: item.airline.name,
        flightNumber: item.flight.number,
        origin: item.departure.iata,
        destination: item.arrival.iata,
        departureTime: item.departure.scheduled,
        arrivalTime: item.arrival.scheduled,
        stops: item.stopovers || 0,
        price: Math.floor(Math.random() * 8000) + 3000,
      }));

      allResults.push(...result);
    }

    return allResults;
  } catch (error) {
    console.error("Flight API error:", error);
    return [];
  }
};
