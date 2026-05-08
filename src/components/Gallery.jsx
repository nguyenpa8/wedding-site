import { weddingData } from '../data/weddingData.js'

export default function Gallery() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-center mb-12 text-gray-800">
          Gallery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weddingData.gallery.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
