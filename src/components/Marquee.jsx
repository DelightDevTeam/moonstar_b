import React from 'react'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'

const Marquee = () => {
  const {data:bannerText} = useFetch(BASE_URL + "/bannerText");

  return (
    <div className='bg-dark text-white p-1'>
      <marquee  behavior="" direction="left">
        {bannerText?.text}
      </marquee>
    </div>
  )
}

export default Marquee
