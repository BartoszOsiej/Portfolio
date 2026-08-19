import React from 'react'

export default function AuroraBackground(): React.JSX.Element {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div className="grid-overlay" />
      <div className="noise-overlay" />
    </div>
  )
}
