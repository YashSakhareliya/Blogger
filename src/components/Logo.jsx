import React from 'react'

function Logo({width = '80px'}) {
  return (
    <div className='flex gap-4 items-center content-center'>
      <img src="../src/public/60736.png" alt="logo image" width="40px"/>
      <span className='font-medium text-2xl'>Blogger</span>
    </div>
  )
}

export default Logo
