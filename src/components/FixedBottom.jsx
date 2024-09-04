import React, { useContext } from 'react'
import { CiMail } from 'react-icons/ci'
import { FaDownload, FaHeadset, FaHome } from 'react-icons/fa'
import { FiGift } from 'react-icons/fi'
import { IoMdMenu } from 'react-icons/io'
import { LuWallet } from 'react-icons/lu'
import { RiGameFill } from 'react-icons/ri'
import { TbCashBanknoteFilled } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"

const FixedBottom = () => {
  const { content } = useContext(AuthContext);
    const menus=[
        {icon:<FaHome size={23} />,name: content.footer_nav.home,link:'/'},
        {icon:<FiGift  size={23} />,name: content.footer_nav.promotion,link:'/promotion'},
        {icon:<LuWallet  size={23} />,name: content.footer_nav.wallet,link:'/wallet'},
        {icon:<RiGameFill  size={23} />,name: content.footer_nav.logs,link:'/game-logs'},
         {icon:<FaHeadset  size={23} />,name: content.footer_nav.contact,link:'/contact'},
     ]
  return (
    <>
    <div className='fixed-bottom gap-2 bg-gradient  pt-1 rounded-top-4 px-2'>
      {menus.map((menu,index)=>{
        return <Link to={menu.link} className='text-center mb-3 ' key={index}>
            {menu.icon}
            <p className="footerText">{menu.name}</p>
        </Link>
      })}
    </div>
    <div className='fixed-bottom2  bg-gradient py-4 px-2'>
      {menus.map((menu,index)=>{
        return <Link to={menu.link} className='text-center mb-3 ' key={index}>
            {menu.icon}
            <p className="footerText">{menu.name}</p>
        </Link>
      })}
    </div>
    </>
  )
}

export default FixedBottom
