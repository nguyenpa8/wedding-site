import { weddingData } from '../data/weddingData.js';

export default function InfoLocation() {
  const handleOpenMaps = (mapLink) => {
    if (mapLink) {
      window.open(mapLink, '_blank');
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-center text-gray-800 mb-4">
          Địa điểm
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Lễ cưới sẽ được tổ chức tại hai địa điểm
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Groom's House Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-8">
            <h3 className="text-2xl font-light text-rose-600 mb-4">
              {weddingData.locations.groom.title}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {weddingData.locations.groom.address}
            </p>
            <button
              onClick={() => handleOpenMaps(weddingData.locations.groom.mapLink)}
              disabled={!weddingData.locations.groom.mapLink}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                weddingData.locations.groom.mapLink
                  ? 'bg-rose-600 text-white hover:bg-rose-700 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Open in Google Maps
            </button>
          </div>

          {/* Bride's House Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-8">
            <h3 className="text-2xl font-light text-rose-600 mb-4">
              {weddingData.locations.bride.title}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {weddingData.locations.bride.address}
            </p>
            <button
              onClick={() => handleOpenMaps(weddingData.locations.bride.mapLink)}
              disabled={!weddingData.locations.bride.mapLink}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                weddingData.locations.bride.mapLink
                  ? 'bg-rose-600 text-white hover:bg-rose-700 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Open in Google Maps
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
