import React, { useState } from "react";
import produkte from "./produkte.json";

function App() {
  const [zugewiesen, setZugewiesen] = useState([]);

  const hinzufügen = (produkt) => {
    setZugewiesen([...zugewiesen, produkt]);
  };

  const entfernen = (artikelnummer) => {
    setZugewiesen(zugewiesen.filter(p => p.artikelnummer !== artikelnummer));
  };

  const istZugewiesen = (artikelnummer) =>
    zugewiesen.some(p => p.artikelnummer === artikelnummer);

  const summe = zugewiesen.reduce((acc, p) => acc + p.preis, 0).toFixed(2);

  const gruppen = [...new Set(produkte.map(p => p.kategorie))];

  return (
    <div className="flex h-screen p-4 font-sans">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Zugewiesene Produkte</h1>
        <div className="flex flex-wrap gap-4">
          {zugewiesen.map((p) => (
            <div key={p.artikelnummer} className="relative border rounded-2xl p-4 shadow bg-white w-60">
              <button onClick={() => entfernen(p.artikelnummer)} className="absolute top-1 right-2 text-gray-400 hover:text-red-600">✕</button>
              <h2 className="text-md font-semibold">{p.name}</h2>
              <p className="text-xs text-gray-500">#{p.artikelnummer}</p>
              <p className="text-sm mt-1 font-medium">{p.preis.toFixed(2)} €</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-lg font-semibold">Monatliche Summe: {summe} €</div>
      </div>

      <div className="w-72 p-4 border-l overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4">Produkte</h2>
        {gruppen.map(gruppe => (
          <div key={gruppe} className="mb-4">
            <h3 className="text-md font-semibold mb-2">{gruppe}</h3>
            <div className="flex flex-col gap-2">
              {produkte.filter(p => p.kategorie === gruppe && !istZugewiesen(p.artikelnummer)).map((p) => (
                <div
                  key={p.artikelnummer}
                  style={{ backgroundColor: p.farbe }}
                  onClick={() => hinzufügen(p)}
                  className={`cursor-pointer border rounded-xl p-3 shadow-sm hover:shadow-md transition text-sm`}
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-600">#{p.artikelnummer} – {p.preis.toFixed(2)} €</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
