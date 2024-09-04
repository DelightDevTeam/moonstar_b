import React, { useContext } from 'react'
 import promo from '../assets/images/promo.png';
import { Badge } from 'react-bootstrap';
import Banners from '../components/Banners';
import authCheck from '../helpers/authCheck';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';

const PromotionPage = () => {
  authCheck();
  const { content } = useContext(AuthContext);
  const {data:promotions, loading} = useFetch(BASE_URL + "/promotion");
  console.log(promotions);
  
  return (
    <div className='py-4 px-2 px-sm-4 px-lg-5'>
      <Banners/>
      <div className="px-3 pt-3 mt-3 mt-sm-5 row">
        <h1 className="fw-semibold mb-4 text-center">{content.footer_nav.promotion}</h1>
        {[1,2,3].map((item,index)=>{
            return <div className="mb-4  col-sm-6 col-lg-4 px-2"  key={index}>
                 <div className='promotionCard p-3 rounded-4'>
                <img className='img-fluid rounded-4' src={promo} />
                <small className='d-block mt-2'>ဖရီးဘောနပ် 3,000ကျပ်</small>
                <Badge bg="warning" text="dark">
                 <small>အကောင့်ဖွင့်ဘောနပ်</small>
                </Badge>
                <small className="d-block text-secondary">2024.8.20 - 2025.8.20</small>
            </div>
            </div>
        })}
      </div>
    </div>
  )
}

export default PromotionPage