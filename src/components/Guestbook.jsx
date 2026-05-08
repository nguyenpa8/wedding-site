import { useState } from 'react'

export default function Guestbook() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [wishes, setWishes] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name.trim() && message.trim()) {
      setWishes([
        { id: Date.now(), name, message },
        ...wishes
      ])
      setName('')
      setMessage('')
    }
  }

  return (
    <section id="guestbook" className="py-16 px-4 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-pink-900 mb-12">Wedding Wishes</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-pink-100">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-semibold text-pink-900 mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-semibold text-pink-900 mb-2">
              Your Wish
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your wedding wishes..."
              rows="4"
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Send Wish
          </button>
        </form>

        {/* Messages List */}
        <div>
          <h3 className="text-2xl font-semibold text-pink-900 mb-6">
            {wishes.length} {wishes.length === 1 ? 'Wish' : 'Wishes'}
          </h3>

          {wishes.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No wishes yet. Be the first to share!</p>
          ) : (
            <div className="space-y-4">
              {wishes.map((wish) => (
                <div key={wish.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-pink-300">
                  <p className="font-semibold text-pink-900 mb-2">{wish.name}</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{wish.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
