import { useState, useEffect, useRef } from 'react'
import './StatsSection.css'

const statsData = [
  { number: 10,   suffix: 'M+', label: 'Active Players' },
  { number: 50,   suffix: 'M+', label: 'Games Played' },
  { number: 1000, suffix: '+',  label: 'Lessons' },
  { number: 150,  suffix: '+',  label: 'Countries' },
]

function useCountUp(target, duration = 1500, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])
  return count
}

function StatItem({ number, suffix, label, started }) {
  const count = useCountUp(number, 1500, started)
  return (
    <div className="stat-item">
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-text">{label}</div>
    </div>
  )
}

export default function StatsSection() {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="stats-container">
          {statsData.map(s => (
            <StatItem key={s.label} {...s} started={started} />
          ))}
        </div>
      </div>
    </section>
  )
}