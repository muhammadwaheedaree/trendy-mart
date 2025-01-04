'use client'

import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import styles from './products.module.css'

const products = [
  { id: 1, name: 'Modern Desk Lamp', price: 49.99, image: '/product-desk-lamp.png' },
  { id: 2, name: 'Ergonomic Office Chair', price: 199.99, image: '/product-office-chair.png' },
  { id: 3, name: 'Wireless Bluetooth Earbuds', price: 79.99, image: '/product-wireless-earbuds.png' },
  {id: 4,name: 'Smart Home Security Camera',price: 129.99,image: '/product-security-camera.png',},
  { id: 5, name: 'Portable Power Bank', price: 39.99, image: '/product-power-bank.png' },
  { id: 6, name: 'Noise-Cancelling Headphones', price: 249.99, image: '/product-headphones.png' },
  { id: 7, name: 'Fitness Smartwatch', price: 179.99, image: '/product-smartwatch.png' },
  { id: 8, name: 'Compact Air Purifier', price: 89.99, image: '/product-air-purifier.png' },
  { id: 9, name: 'Foldable Laptop Stand ', price: 399.99, image: '/product-laptop-stand.png' },
  { id: 10, name: 'Wireless Charging Pad', price: 29.99, image: '/product-charging-pad.png' },
  { id: 11, name: 'Smart LED Light Bulb', price: 19.99, image: '/product-led-bulb.png' },
  { id: 12, name: 'Portable Bluetooth Speaker', price: 69.99, image: '/product-bluetooth-speaker.png' },
]

export default function Products() {
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy === 'price') {
      return a.price - b.price
    }
    return 0
  })

  const filteredProducts = sortedProducts.filter((product) => {
    if (filterBy === 'all') return true
    if (filterBy === 'under50') return product.price < 50
    if (filterBy === '50to100') return product.price >= 50 && product.price <= 100
    if (filterBy === 'over100') return product.price > 100
    return true
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Products</h1>
      <div className={styles.filters}>
        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
        <select
          className={styles.select}
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="under50">Under $50</option>
          <option value="50to100">$50 - $100</option>
          <option value="over100">Over $100</option>
        </select>
      </div>
      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}