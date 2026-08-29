import React from 'react'
import EasterEggRedirect from '@site/src/components/EasterEggRedirect'

export default function Root({ children }) {
  return (
    <>
      <EasterEggRedirect />
      {children}
    </>
  )
}
