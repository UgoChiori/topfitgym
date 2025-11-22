import React from 'react';
import { Link } from 'react-router-dom';



const ProfileCard: React.FC = () => {
  return (
    <div>ProfileCard
         <Link to="/edit-profile" className='text-green-800 hover:underline'>Edit Profile</Link>
    </div>
  )
}

export default ProfileCard