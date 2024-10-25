import Rooms from '@/components/Rooms'
import React from 'react'

const page = ({params}) => {

  return (
    <div>
        <Rooms roomId = {params.roomId}/>
    </div>
  )
}

export default page