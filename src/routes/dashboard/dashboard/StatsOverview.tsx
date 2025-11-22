import React from 'react'
import { NavLink } from 'react-router-dom'


const StatsOverview: React.FC = () => {
  return (
    <div>Stats Overview <br/>
        <NavLink to="/dashboard-home" className="text-green-800 hover:underline">Back to Dashboard</NavLink>
    </div>
  )
}

export default StatsOverview