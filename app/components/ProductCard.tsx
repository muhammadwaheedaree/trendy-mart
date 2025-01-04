'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import styles from './ProductCard.module.css'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isAdded])

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItemIndex = cart.findIndex((item: Product) => item.id === product.id)
    
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    setIsAdded(true)

    const event = new CustomEvent('cartUpdated', { detail: { cartCount: cart.length } });
    window.dispatchEvent(event);
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <div className={styles.actions}>
          <Link href={`/products/${product.id}`} className={styles.detailsButton}>
            View Details
          </Link>
          <button 
            className={`${styles.cartButton} ${isAdded ? styles.added : ''}`} 
            onClick={addToCart}
            disabled={isAdded}
          >
            {isAdded ? 'Added' : <ShoppingCart size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard