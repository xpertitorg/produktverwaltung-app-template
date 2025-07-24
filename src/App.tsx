import React, { useState } from "react";
import produkte from "./produkte.json";

function App() {
  const [zugewiesen, setZugewiesen] = useState([]);

  const hinzufügen = (p) => {
    if (!zugewiesen.find(e => e.artikelnummer === p.artikelnummer)) {
      setZugewiesen([...zugewiesen, p]);
    }
  };

  const entfernen = (artikelnummer) => {
    setZugewiesen(zugewiesen.filter(p => p.artikelnummer !== artikelnummer));
  };

  const summe = zugewiesen.reduce((acc, p) => acc + p.preis, 0).toFixed(2);
  const gruppen = [...new Set(produkte.map(p => p.kategorie))];

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Zugewiesene Produkte</h1>
        <div className="flex flex-wrap gap-4">
          {zugewiesen.map((p) => (
            <div key={p.artikelnummer} className="relative bg-white border rounded-xl p-4 shadow w-64">
              <button onClick={() => entfernen(p.artikelnummer)} className="absolute top-2 right-2 text-sm text-red-400 hover:text-red-600">✕</button>
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-xs text-gray-500">#{p.artikelnummer}</p>
              <p className="text-sm font-medium mt-1">{p.preis.toFixed(2)} €</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-xl font-bold">Gesamtsumme: {summe} €</div>
      </main>

      <aside className="w-80 p-4 border-l bg-white overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Produktbausteine</h2>
        {gruppen.map(gruppe => (
          <div key={gruppe} className="mb-6">
            <h3 className="text-md font-semibold mb-2">{gruppe}</h3>
            <div className="flex flex-col gap-3">
              {produkte.filter(p => p.kategorie === gruppe && !zugewiesen.some(z => z.artikelnummer === p.artikelnummer)).map(p => (
                <div key={p.artikelnummer}
                     onClick={() => hinzufügen(p)}
                     style={{ backgroundColor: p.farbe }}
                     className="cursor-pointer p-4 rounded-xl shadow-sm hover:shadow-md transition border">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-600">#{p.artikelnummer} – {p.preis.toFixed(2)} €</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}

export default App;
