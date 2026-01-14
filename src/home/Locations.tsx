import React from 'react'

const locations = [
  {
    name: "Lekki Phase 1",
    city: "Lagos",
    lat: 6.4474,
    lng: 3.4726,
    address: "Lekki Phase 1, Lagos",
  },
  {
    name: "Ikeja GRA",
    city: "Lagos",
    lat: 6.6018,
    lng: 3.3515,
    address: "Ikeja GRA, Lagos",
  },
  {
    name: "Victoria Island",
    city: "Lagos",
    lat: 6.4281,
    lng: 3.4219,
    address: "Victoria Island, Lagos",
  },
  {
    name: "Jabi",
    city: "Abuja",
    lat: 9.0765,
    lng: 7.4477,
    address: "Jabi, Abuja",
  },
  {
    name: "Wuse 2",
    city: "Abuja",
    lat: 9.0820,
    lng: 7.4891,
    address: "Wuse 2, Abuja",
  },
];


const Locations: React.FC = () => {
  return (
    <section className="px-6 sm:px-12 py-20 bg-white">
      <h1 className="text-3xl font-semibold mb-14 text-center text-green-800">
        LOCATIONS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {locations.map((loc, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center"
          >
         
            <div className="w-40 h-40 rounded-full overflow-hidden border shadow-sm mb-6">
              <iframe
                title={loc.name}
                width="100%"
                height="100%"
                loading="lazy"
                className="border-0"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=15&output=embed`}
              />
            </div>

     
            <div className="bg-green-700 text-white px-6 py-2 rounded-full font-bold tracking-wide mb-4">
              {loc.name.toUpperCase()}
            </div>

         
            <p className="text-sm text-gray-600">{loc.address}</p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full font-semibold transition"
            >
              VISIT NOW
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Locations;


