import React from 'react'

interface Props { name: string; role: string; icon: string }

export default function SkillBadge({ name, role, icon }: Props): React.JSX.Element {
  return (
    <div className="skill-badge">
      <span className="skill-icon">{icon}</span>
      <div className="skill-info">
        <strong>{name}</strong>
        <span>{role}</span>
      </div>
    </div>
  )
}
