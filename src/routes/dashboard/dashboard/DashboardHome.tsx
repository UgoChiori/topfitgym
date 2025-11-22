import React from 'react';
import { Link } from 'react-router-dom';



const DashboardHome: React.FC = () => {
  return (
    <div>Dashboard Home <br/>
     <Link to="/member-profile" className='text-green-800 hover:underline'>View Profile</Link>
        <Link to="/member-stats" className='text-green-800 hover:underline'>View Your Stats</Link>
    </div>
  )
}

export default DashboardHome