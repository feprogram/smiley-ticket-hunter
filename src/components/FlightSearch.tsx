import { SearchForm } from "./SearchForm";

export const FlightSearch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-2">
            Flight Search
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Find Your Flight</h1>
          <p className="text-gray-600">
            Search for the best flights on Smiles
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-100">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};