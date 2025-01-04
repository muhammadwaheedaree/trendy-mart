'use client'

import { useState } from 'react'
import Link from 'next/link'
 import { ArrowRight } from 'lucide-react'
import { FiFacebook } from "react-icons/fi";
import { SlSocialTwitter } from "react-icons/sl";
import { CiInstagram } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";


import styles from './Footer.module.css'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribed with email:', email)
    setEmail('')
    // Here you would typically send the email to your server
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <h3>TrendyMart</h3>
            <p>Your destination for innovative and stylish products.</p>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FiFacebook size={24} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><SlSocialTwitter size={24} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><CiInstagram size={24} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><CiYoutube size={24} /></a>
            </div>
          </div>
          <div className={styles.column}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Customer Service</h4>
            <ul>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping & Returns</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Newsletter</h4>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form onSubmit={handleSubmit} className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit"><ArrowRight size={24} /></button>
            </form>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p>&copy; 2024 TrendyMart. All rights reserved.</p>
          <div className={styles.paymentIcons}>
            {/* <img src="/visa-icon.png" alt="Visa" />
            <img src="/mastercard-icon.png" alt="Mastercard" />
            <img src="/paypal-icon.png" alt="PayPal" />
            <img src="/amex-icon.png" alt="American Express" /> */}
          </div>
        </div>
      </div>
    </footer>
  )
}