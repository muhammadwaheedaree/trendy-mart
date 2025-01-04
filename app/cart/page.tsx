'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import styles from './cart.module.css'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCartItems = () => {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
      }
      setIsLoading(false)
    }

    loadCartItems()
    window.addEventListener('storage', loadCartItems)

    return () => {
      window.removeEventListener('storage', loadCartItems)
    }
  }, [])

  const updateCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('storage'))
  }

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    updateCart(updatedCart)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    updateCart(updatedCart)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getSubtotal = () => {
    return getTotalPrice()
  }

  const getTax = () => {
    return getTotalPrice() * 0.1 // Assuming 10% tax
  }

  const getShipping = () => {
    return getTotalPrice() > 100 ? 0 : 10 // Free shipping over $100, otherwise $10
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading your cart...</div>
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <ShoppingBag size={64} />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven&apos;t added any items to your cart yet.</p>
        <Link href="/products" className={styles.continueShoppingBtn}>
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>
      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <Image src={item.image} alt={item.name} width={100} height={100} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>
              <div className={styles.quantityControls}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus size={20} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus size={20} />
                </button>
              </div>
              <p className={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</p>
              <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.cartSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryItem}>
            <span>Subtotal</span>
            <span>${getSubtotal().toFixed(2)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>Tax</span>
            <span>${getTax().toFixed(2)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>Shipping</span>
            <span>{getShipping() === 0 ? 'Free' : `$${getShipping().toFixed(2)}`}</span>
          </div>
          <div className={`${styles.summaryItem} ${styles.total}`}>
            <span>Total</span>
            <span>${(getSubtotal() + getTax() + getShipping()).toFixed(2)}</span>
          </div>
          <button className={styles.checkoutBtn}>Proceed to Checkout</button>
          <Link href="/products" className={styles.continueShopping}>
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}