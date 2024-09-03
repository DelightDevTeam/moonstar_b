import React from 'react'
import { Carousel } from 'react-bootstrap'
import b1 from '../assets/images/b1.png'
import b2 from '../assets/images/b2.png'
import b3 from '../assets/images/b3.png'
import b4 from '../assets/images/b4.png'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'

const Banners = () => {
  const {data: banners} = useFetch(BASE_URL + "/banner");
  return (
    <Carousel>
        {banners &&banners.map((banner,index)=>{
            return <Carousel.Item key={index}>
                <img src={banner.img_url} className='bannerImg img-fluid rounded-4 w-100' />
            </Carousel.Item>
        })}
    </Carousel>
  )
}

export default Banners
