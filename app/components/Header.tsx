'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import styles from './Header.module.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      const cart = JSON.parse(storedCart)
      setCartCount(cart.length)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          TrendyMart
        </Link>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search products..." />
          <button><Search size={20} /></button>
        </div>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
        <ul className={`${styles.navList} ${isMenuOpen ? styles.open : ''}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li className={styles.cartIcon}>
            <Link href="/cart">
              <ShoppingBag size={24} />
              <span className={styles.cartCount}>{cartCount}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header