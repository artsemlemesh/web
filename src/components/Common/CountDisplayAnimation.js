import React, { useState, useRef, useEffect } from 'react'

const CountDisplayAnimation = ({ cartLength }) => {
  const [prevLength, setPrevLength] = useState(0)
  const [isInitialRender, setIsInitialRender] = useState(true)
  const countRef = useRef(null)

  const triggerAnimation = (element) => {
    element.classList.add('animate') // Add CSS class to trigger animation
    setTimeout(() => {
      element.classList.remove('animate') // Remove CSS class to reset animation
    }, 500)
  }
  useEffect(() => {
    if (cartLength !== prevLength) {
      setIsInitialRender(false)
      setPrevLength(cartLength)
      if (isInitialRender == false) {
        triggerAnimation(countRef.current) // Pass DOM element for animation
      }
    }
  }, [cartLength, prevLength, triggerAnimation])

  return (
    <span className="cart_count" ref={countRef}>
      {cartLength}
    </span>
  )
}

export default CountDisplayAnimation
