import { useState, useEffect } from 'react'
import LandingPage from './landingpage/landingpage'
import Game from './protected/Game'
import GameModal from './protected/GameModal'
import Login from './auth/login'
import Signup from './auth/signup'

import './App.css'

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [gameMode, setGameMode]   = useState(null)
  const [authPage, setAuthPage] = useState(null) // 'login', 'signup', or null
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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

  // Agar login page show karna hai
  if (authPage === 'login') {
    return (
      <Login 
        setAuth={setIsAuthenticated}
        onBack={() => setAuthPage(null)}
        onSwitchToSignup={() => setAuthPage('signup')}
      />
    )
  }

  // Agar signup page show karna hai
  if (authPage === 'signup') {
    return (
      <Signup 
        setAuth={setIsAuthenticated}
        onBack={() => setAuthPage(null)}
        onSwitchToLogin={() => setAuthPage('login')}
      />
    )
  }

  return (
    <>
      <LandingPage onPlayNow={() => setShowModal(true)} onSignInClick={() => setAuthPage('login')} />

      {showModal && (
        <GameModal
          onClose={() => setShowModal(false)}
          onSelect={handleSelectMode}
        />
      )}
    </>
  )
}