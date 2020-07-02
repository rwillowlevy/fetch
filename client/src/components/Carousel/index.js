import React from 'react'
import { Carousel } from 'react-materialize'
import 'materialize-css'

function Carousels ({children}) {
  return (
    <>
      <Carousel
        carouselId='Carousel-2'
        images={[
          'https://picsum.photos/250/250?image=0',
          'https://picsum.photos/250/250?image=1',
          'https://picsum.photos/250/250?image=2',
          'https://picsum.photos/250/250?image=3',
          'https://picsum.photos/250/250?image=4'
        ]}
        options={{
          fullWidth: true
        }}
      />
    </>
  )
}

export default Carousels
