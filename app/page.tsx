'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './components/ProductCard'
import styles from './page.module.css'

const featuredProducts = [
  { id: 1, name: 'Modern Desk Lamp', price: 49.99, image: '/product-desk-lamp.png' },
  { id: 2, name: 'Ergonomic Office Chair', price: 199.99, image: '/product-office-chair.png' },
  { id: 3, name: 'Wireless Bluetooth Earbuds', price: 79.99, image: '/product-wireless-earbuds.png' },
  { id: 4, name: 'Smart Home Security Camera', price: 129.99, image: '/product-security-camera.png' },
]

const heroSlides = [
  { image: '/hero-slide-1.jpg', title: 'New Arrivals', subtitle: 'Check out our latest collection' },
  { image: '/hero-slide-2.jpg', title: 'Summer Sale', subtitle: 'Up to 50% off on selected items' },
  { image: '/hero-slide-3.jpg', title: 'Free Shipping', subtitle: 'On orders over $100' },
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribed with email:', email)
    setIsSubscribed(true)
    setEmail('')
  }

  useEffect(() => {
    if (isSubscribed) {
      const timer = setTimeout(() => setIsSubscribed(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isSubscribed])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.heroSlide} ${index === currentSlide ? styles.active : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className={styles.heroContent}>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.description}>{slide.subtitle}</p>
              <Link href="/products" className={`btn btn-primary ${styles.cta}`}>
                Shop Now
              </Link>
            </div>
          </div>
        ))}
        <button className={`${styles.slideButton} ${styles.prevButton}`} onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>
        <button className={`${styles.slideButton} ${styles.nextButton}`} onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>
      </div>
      <section className={styles.featuredProducts}>
        <h2>Featured Products</h2>
        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link href="/products" className={`btn btn-secondary ${styles.viewAllButton}`}>
          View All Products <ArrowRight size={20} />
        </Link>
      </section>
      <section className={styles.newsletter}>
        <h2>Subscribe to Our Newsletter</h2>
        <p>Stay updated with our latest products and offers!</p>
        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
        {isSubscribed && (
          <p className={styles.subscriptionMessage}>Thank you for subscribing!</p>
        )}
      </section>
    </div>
  )
}