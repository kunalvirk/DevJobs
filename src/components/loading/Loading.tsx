import Image from 'next/image'
import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="h-screen bg-white">
        <div className="flex justify-center items-center h-full">
            <Image className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" width={64} height={64} />
        </div>
    </div>
  )
}

export default Loading