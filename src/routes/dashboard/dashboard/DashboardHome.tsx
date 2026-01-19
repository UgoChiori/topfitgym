import React from 'react';
import { Link } from 'react-router-dom';



const DashboardHome: React.FC = () => {
  return (
    <div>Dashboard Home <br/>
     <Link to="/userprofile" className='text-green-800 hover:underline'>View Profile</Link>
        <Link to="/userstatistics" className='text-green-800 hover:underline'>View Your Stats</Link>
    </div>
  )
}

export default DashboardHome