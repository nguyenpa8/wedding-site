import Hero from './components/Hero'
import CoupleIntroduction from './components/CoupleIntroduction'
import Countdown from './components/Countdown'
import VideoSection from './components/VideoSection'
import MusicPlayer from './components/MusicPlayer'
import Gallery from './components/Gallery'
import InfoLocation from './components/InfoLocation'
import Guestbook from './components/Guestbook'
import CinematicSection from './components/CinematicSection'
import ImageDivider from './components/ImageDivider'
import { weddingData } from './data/weddingData'

function App() {
  return (
    <>
      <Hero />

      <div
        className="min-h-screen"
        style={{
          backgroundColor: "#fff0f5",
          backgroundImage:
            "radial-gradient(circle at 10% 10%, rgba(255,182,210,0.35) 0%, transparent 45%), radial-gradient(circle at 90% 15%, rgba(255,210,225,0.3) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(255,182,210,0.3) 0%, transparent 40%), radial-gradient(circle at 15% 90%, rgba(255,220,232,0.25) 0%, transparent 45%)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <CoupleIntroduction />

        <Countdown />

        <VideoSection />

        <MusicPlayer />

        <Gallery />

        <InfoLocation />

        <Guestbook />
      </div>
    </>
  )
}

export default App
