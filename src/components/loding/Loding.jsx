import React from 'react'
import { Waveform } from '@uiball/loaders'

const Loding = () => {
  return (
    <div className='w-full h-full flex flex-row items-center justify-center'>
        <Waveform 
        size={35}
        lineWeight={3.5}
        speed={1} 
        color="#FFA726" />
    </div>
  )
}

export default Loding