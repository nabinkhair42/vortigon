import React from 'react'

const LoadingAnimation = () => {
  return (
    <>
      <div className='flex gap-[2px]'>
        <div className='h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-2 w-2 bg-primary rounded-full animate-bounce'></div>
      </div>
    </>
  )
}

export default LoadingAnimation;