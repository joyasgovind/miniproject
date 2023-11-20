// script.js
document.getElementById("flightForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const origin = document.getElementById("ori").value;
    const destination = document.getElementById("des").value;
    const departureDate = document.getElementById("dep").value;
    const returnDate = document.getElementById("ret").value;
    const travelers = document.getElementById("tra").value;
    const travelClass = document.getElementById("class").value;

    // Placeholder for flight data (replace with your actual data)
    const indianFlights = [
        { 
            origin: "Delhi", 
            destination: "Mumbai", 
            airline: "SpiceJet", 
            price: 5000, 
            departureTime: "10:00 AM", 
            flightNumber: "AI123", 
            aircraftModel: "Boeing 737", 
            availableSeats: 120 
        },
        { 
            origin: "Mumbai", 
            destination: "Delhi", 
            airline: "IndiGo", 
            price: 5500, 
            departureTime: "11:30 AM", 
            flightNumber: "IG456", 
            aircraftModel: "Airbus A320", 
            availableSeats: 150 
        },
        { 
            origin: "Delhi", 
            destination: "Bangalore", 
            airline: "SpiceJet", 
            price: 4800, 
            departureTime: "9:15 AM", 
            flightNumber: "SG789", 
            aircraftModel: "Boeing 737", 
            availableSeats: 100 
        },
        { 
            origin: "Chennai", 
            destination: "Kolkata", 
            airline: "GoAir", 
            price: 4700, 
            departureTime: "3:20 PM", 
            flightNumber: "G102", 
            aircraftModel: "Airbus A320", 
            availableSeats: 120 
        },
        { 
            origin: "Kolkata", 
            destination: "Chennai", 
            airline: "Vistara", 
            price: 5100, 
            departureTime: "5:45 PM", 
            flightNumber: "UK567", 
            aircraftModel: "Boeing 737", 
            availableSeats: 130 
        },
        { 
            origin: "Hyderabad", 
            destination: "Bangalore", 
            airline: "AirAsia India", 
            price: 4900, 
            departureTime: "1:30 PM", 
            flightNumber: "AAI202", 
            aircraftModel: "Airbus A320", 
            availableSeats: 110 
        },
        { 
            origin: "Bangalore", 
            destination: "Hyderabad", 
            airline: "SpiceJet", 
            price: 5200, 
            departureTime: "4:45 PM", 
            flightNumber: "SG303", 
            aircraftModel: "Boeing 737", 
            availableSeats: 130 
        },
        // Additional airplanes for the same routes with slightly different prices
		
		 { 
            origin: "Mumbai", 
            destination: "Delhi", 
            airline: "Air India", 
            price: 5700, 
            departureTime: "12:00 PM", 
            flightNumber: "IM452", 
            aircraftModel: "Airbus A220", 
            availableSeats: 50
        },
		
		 { 
            origin: "Mumbai", 
            destination: "Delhi", 
            airline: "Akasa Air", 
            price: 6200, 
            departureTime: "10:45 AM", 
            flightNumber: "IG656", 
            aircraftModel: "Airbus A220", 
            availableSeats: 20
        },
		
		{ 
            origin: "Mumbai", 
            destination: "Delhi", 
            airline: "SpiceJet", 
            price: 5345, 
            departureTime: "05:30 PM", 
            flightNumber: "IE321", 
            aircraftModel: "BOOEING F230", 
            availableSeats: 45
        },
		
		
        { 
            origin: "Delhi", 
            destination: "Mumbai", 
            airline: "Air India", 
            price: 5200, 
            departureTime: "12:30 PM", 
            flightNumber: "AI456", 
            aircraftModel: "Boeing 747", 
            availableSeats: 130 
        },
		
		{ 
            origin: "Delhi", 
            destination: "Mumbai", 
            airline: "Vistara", 
            price: 6250, 
            departureTime: "10:30 AM", 
            flightNumber: "AI456", 
            aircraftModel: "Boeing 849", 
            availableSeats: 130 
        },
		
        { 
            origin: "Delhi", 
            destination: "Bangalore", 
            airline: "SpiceJet", 
            price: 5100, 
            departureTime: "11:00 AM", 
            flightNumber: "SG567", 
            aircraftModel: "Boeing 777", 
            availableSeats: 120 
        },
        { 
            origin: "Chennai", 
            destination: "Kolkata", 
            airline: "GoAir", 
            price: 5000, 
            departureTime: "3:30 PM", 
            flightNumber: "G303", 
            aircraftModel: "Airbus A320", 
            availableSeats: 110 
        },
        { 
            origin: "Kolkata", 
            destination: "Chennai", 
            airline: "Vistara", 
            price: 5300, 
            departureTime: "6:00 PM", 
            flightNumber: "UK789", 
            aircraftModel: "Boeing 737", 
            availableSeats: 140 
        },
        { 
            origin: "Hyderabad", 
            destination: "Bangalore", 
            airline: "AirAsia India", 
            price: 5100, 
            departureTime: "10:30 AM", 
            flightNumber: "AAI303", 
            aircraftModel: "Airbus A330", 
            availableSeats: 150 
        },
        { 
            origin: "Bangalore", 
            destination: "Hyderabad", 
            airline: "SpiceJet", 
            price: 5200, 
            departureTime: "1:45 PM", 
            flightNumber: "SG456", 
            aircraftModel: "Boeing 777", 
            availableSeats: 170 
        },
    ];

    const filteredFlights = indianFlights.filter(flight =>
        flight.origin.toLowerCase() === origin.toLowerCase() &&
        flight.destination.toLowerCase() === destination.toLowerCase()
    );

    // Adjust prices for round trips
    if (document.getElementById("rou").checked) {
        filteredFlights.forEach(flight => {
            flight.price *= 2; // Double the price for round trips
        });
    }

    // Adjust prices based on travel class
    const classMultipliers = {
        "Economy": 1.0,
        "Business": 1.5,
        "Premium": 2.0
        // Add more classes and multipliers as needed
    };
    const classMultiplier = classMultipliers[travelClass] || 1.0;
    filteredFlights.forEach(flight => {
        flight.price *= classMultiplier;
    });

    // Sort flights by price (low to high)
    filteredFlights.sort((a, b) => a.price - b.price);

    // Open searchResults.html and pass the search results as a parameter
    const searchResultsTab = window.open(`searchResults.html?results=${encodeURIComponent(JSON.stringify(filteredFlights))}`, "_blank");
});
