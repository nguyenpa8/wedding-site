import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { weddingData } from '../data/weddingData'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwRoRq5L3IwBu7RzcPVOHYxaINvDFg6RYBO0zuy0nTWtkTFnZn3BGzJ0bmeLarNlWs4/exec';

export default function Guestbook() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [wishes, setWishes] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!name.trim() || !message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Vui lòng điền đầy đủ thông tin' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
        }),
      })

      setWishes([
        { id: Date.now(), name: name.trim(), message: message.trim() },
        ...wishes
      ])
      
      setName('')
      setMessage('')
      setSubmitStatus({ type: 'success', message: 'Cảm ơn lời chúc của bạn! ❤️' })
      
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Error submitting guestbook entry:', error)
      setSubmitStatus({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại.' })
    } finally {
      setIsSubmitting(false)
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

          {submitStatus && (
            <div className={`mb-5 p-4 rounded-xl text-center font-medium ${
              submitStatus.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 shadow-md ${
              isSubmitting 
                ? 'bg-rose-400 cursor-not-allowed' 
                : 'bg-rose-600 hover:bg-rose-700 hover:shadow-lg'
            } text-white`}
            style={{ fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif' }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang gửi...
              </span>
            ) : (
              'Gửi Lời Chúc'
            )}
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
