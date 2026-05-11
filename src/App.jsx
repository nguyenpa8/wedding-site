import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import FallingHearts from './components/FallingHearts'
import Hero from './components/Hero'
import CoupleIntroduction from './components/CoupleIntroduction'
import Countdown from './components/Countdown'
import VideoSection from './components/VideoSection'
import Gallery from './components/Gallery'
import InfoLocation from './components/InfoLocation'
import Guestbook from './components/Guestbook'
import CinematicSection from './components/CinematicSection'
import ImageDivider from './components/ImageDivider'
import { weddingData } from './data/weddingData'

function App() {
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem('wedding_opened')
  )

  function handleOpen() {
    sessionStorage.setItem('wedding_opened', '1')
    setShowSplash(false)
  }

  return (
    <>
      {showSplash && <SplashScreen onOpen={handleOpen} />}
      <FallingHearts />
      <Hero />

      <div className="site-content">
        <CoupleIntroduction />

        <Countdown />

        <VideoSection />

        <Gallery />

        <InfoLocation />

        <Guestbook />
      </div>
    </>
  )
}

export default App
