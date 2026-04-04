import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import StatsSection from './components/StatsSection'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import GameModal from './components/GameModal'
import Game from './components/Game'
import './App.css'

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [gameMode, setGameMode]   = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in')
      elements.forEach(el => {
        const top = el.getBoundingClientRect().top
        if (top < window.innerHeight - 150) el.classList.add('visible')
      })
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSelectMode = (mode) => {
    setGameMode(mode)
    setShowModal(false)
  }

  const handleBack = () => {
    setGameMode(null)
  }

  // Agar game mode select ho gaya toh game dikhao
  if (gameMode) {
    return <Game mode={gameMode} onBack={handleBack} />
  }

  return (
    <>
      <AnimatedBackground />
      <Header onPlayNow={() => setShowModal(true)} />
      <main>
        <Hero onPlayNow={() => setShowModal(true)} />
        <Features />
        <StatsSection />
        <Testimonials />
        <CTA onPlayNow={() => setShowModal(true)} />
      </main>
      <Footer />

      {showModal && (
        <GameModal
          onClose={() => setShowModal(false)}
          onSelect={handleSelectMode}
        />
      )}
    </>
  )
}