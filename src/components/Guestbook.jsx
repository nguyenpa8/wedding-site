import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { weddingData } from '../data/weddingData'

export default function Guestbook() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [wishes, setWishes] = useState([])

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

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
    <section
      id="guestbook"
      ref={ref}
      className="relative py-20 md:py-24 px-4 overflow-hidden"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="mb-14 space-y-4" variants={itemVariants}>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-center text-gray-900 tracking-tight">
            Lời Chúc Từ Khách Mời
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-rose-400 to-rose-300 mx-auto rounded-full" />
          <p className="text-lg md:text-xl text-gray-600 font-light text-center max-w-2xl mx-auto pt-4">
            Những lời chúc tốt đẹp từ những người thân yêu
          </p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-10 mb-14 border border-rose-100" variants={itemVariants}>
          <div className="mb-7">
            <label htmlFor="name" className="block text-base font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif' }}>
              Tên Của Bạn
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn"
              className="w-full px-5 py-3 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-0 text-gray-700 transition-colors duration-200"
            />
          </div>

          <div className="mb-7">
            <label htmlFor="message" className="block text-base font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif' }}>
              Lời Chúc Của Bạn
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Chia sẻ lời chúc hôn nhân của bạn..."
              rows="5"
              className="w-full px-5 py-3 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-0 text-gray-700 resize-none transition-colors duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            style={{ fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif' }}
          >
            Gửi Lời Chúc
          </button>
        </motion.form>

        {/* Messages List */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8 tracking-tight">
            {wishes.length} {wishes.length === 1 ? 'Wish' : 'Wishes'}
          </h3>

          {wishes.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-lg">
              No wishes yet. Be the first to share!
            </p>
          ) : (
            <motion.div className="space-y-6" variants={staggerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
              {wishes.map((wish) => (
                <motion.div key={wish.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-7 border-l-4 border-rose-400" variants={itemVariants}>
                  <p className="font-serif font-bold text-rose-700 mb-3 text-lg">{wish.name}</p>
                  <p className="text-gray-700 whitespace-pre-wrap font-light leading-relaxed">{wish.message}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
