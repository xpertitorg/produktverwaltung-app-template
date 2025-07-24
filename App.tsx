
import React, { useState } from "react";

const produkte = [
  {
    artikelnummer: 200,
    beschreibung: "xDomain - Verwaltung und Pflege der Domain - SSL Zertifizierung ...",
    verkaufspreis: 19.9,
    einheit: "Stück",
    mehrwertsteuer: 19.0,
  },
  {
    artikelnummer: 210,
    beschreibung: "xProtect Standard - Endpoint Protection für Clients ...",
    verkaufspreis: 3.99,
    einheit: "Stück",
    mehrwertsteuer: 19.0,
  }
];

export default function App() {
  const [ausgewählteProdukte, setAusgewählteProdukte] = useState<number[]>([]);

  const toggleProdukt = (nummer: number) => {
    setAusgewählteProdukte((prev) =>
      prev.includes(nummer)
        ? prev.filter((n) => n !== nummer)
        : [...prev, nummer]
    );
  };

  const gesamtkosten = produkte
    .filter((p) => ausgewählteProdukte.includes(p.artikelnummer))
    .reduce((sum, p) => sum + p.verkaufspreis, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Produktzuweisung (intern)</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produkte.map((produkt) => (
          <div
            key={produkt.artikelnummer}
            onClick={() => toggleProdukt(produkt.artikelnummer)}
            className={\`cursor-pointer border rounded-2xl p-4 shadow hover:shadow-md transition \${ausgewählteProdukte.includes(produkt.artikelnummer) ? "border-blue-500 bg-blue-50" : "bg-white"}\`}
          >
            <h2 className="text-lg font-semibold mb-2">
              Artikel {produkt.artikelnummer}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {produkt.beschreibung.slice(0, 100)}...
            </p>
            <p className="font-bold">
              {produkt.verkaufspreis.toFixed(2).replace(".", ",")} € / {produkt.einheit}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-white rounded-xl shadow text-right">
        <span className="text-lg font-medium">Gesamtkosten:&nbsp;</span>
        <span className="text-xl font-bold">
          {gesamtkosten.replace(".", ",")} € / Monat
        </span>
      </div>
    </div>
  );
}
