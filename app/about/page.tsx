'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import styles from './about.module.css'

const teamMembers = [
  { name: 'Emily Chen', position: 'CEO & Founder', image: '/team-emily-chen.png' },
  { name: 'Michael Rodriguez', position: 'CTO', image: '/team-michael-rodriguez.png' },
  { name: 'Sarah Johnson', position: 'Head of Design', image: '/team-sarah-johnson.png' },
  { name: 'David Kim', position: 'Customer Experience Manager', image: '/team-david-kim.png' }
]

const faqItems = [
  {
    question: 'What makes TrendyMart unique?',
    answer: 'TrendyMart offers a curated selection of innovative and stylish products, focusing on quality and customer satisfaction. Our team carefully selects each item to ensure it meets our high standards.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary depending on the destination. You can check the exact costs and estimated delivery time during the checkout process.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most items. If you re not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Please note that items must be in their original condition and packaging.'
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can reach our customer support team through various channels. You can email us at support@trendymart.com, call us at +92 (323) 829-3672, or use the contact form on our website. We aim to respond to all inquiries within 24 hours.'
  }
]

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About TrendyMart</h1>
        <p className={styles.subtitle}>Your Destination for Innovative and Stylish Products</p>
      </header>

      <section className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src="/about-team-photo.png"
            alt="TrendyMart Team"
            width={600}
            height={400}
            layout="responsive"
          />
        </div>
        <div className={styles.textContent}>
          <p>
            TrendyMart is your one-stop destination for innovative and stylish products. We curate a selection of high-quality items to enhance your daily life, from tech gadgets to home essentials.
          </p>
          <p>
            Our mission is to provide our customers with exceptional products and outstanding service. We believe in the power of good design and its ability to improve our lives.
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <h2 className={styles.valuesTitle}>Our Values</h2>
        <div className={styles.valuesList}>
          <div className={styles.valueItem}>
            <h3>Quality</h3>
            <p>We ensure that every product meets our high standards.</p>
          </div>
          <div className={styles.valueItem}>
            <h3>Innovation</h3>
            <p>We constantly seek new and improved solutions for our customers.</p>
          </div>
          <div className={styles.valueItem}>
            <h3>Customer Satisfaction</h3>
            <p>Your happiness is our top priority.</p>
          </div>
          <div className={styles.valueItem}>
            <h3>Sustainability</h3>
            <p>We&apos;re committed to environmentally friendly practices.</p>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <h2 className={styles.teamTitle}>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.position}`}
                  width={200}
                  height={200}
                  layout="responsive"
                />
              </div>
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.faq}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqItems.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                {item.question}
                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openFaq === index && (
                <div className={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to Experience TrendyMart?</h2>
        <Link href="/products" className={styles.ctaButton}>
          Shop Now <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  )
}