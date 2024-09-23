import React, { useContext, useState } from 'react'
import user from '../assets/images/user.png'
import '../assets/css/wallet.css'
import { Badge, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import authCheck from '../helpers/authCheck'
import { AuthContext } from '../context/AuthContext'

const WalletPage = () => {
  authCheck();
  const { user } = useContext(AuthContext);

  
    const [duration,setDuration]=useState('today');
    const times=[
        {name:'Today',value:'today'},
        {name:'Yesterday',value:'yesterday'},
        {name:'This Week',value:'thisWeek'},
        {name:'Last Week',value:'lastWeek'},
    ]
  return (
    <div className='py-4 px-2 px-sm-4'>
        {/* <div className="walletBg walletCard rounded-4 p-2 d-flex align-items-center gap-2">
            <img src={user} className='walletUserImg' />
            <i className="fas fa-circle-user"></i>
            <div>
                <p className="fw-semibold mb-1">{user?.name}</p>
                <p>ID : {user?.user_name}</p>
                <p>Balance : <span className="fw-semibold">{Number(user?.balance).toLocaleString()}</span> Ks</p>
            </div>
        </div> */}
        <div className="py-3 d-flex align-items-center justify-content-center gap-3">
          <Link to={'/deposit'} className='btn btn-outline-warning rounded-5 px-3 fw-semibold'>
            Desposit
          </Link>
          <Link className='btn btn-outline-warning rounded-5 px-3 fw-semibold' to={'/with-draw'}>
            Withdraw
          </Link>
        </div>
        <h4 className=" mb-4 fw-bold mt-5">  Transaction History  </h4>
        <div className="d-flex align-items-center  flex-wrap gap-2 gap-sm-3">
            {times.map((time,index)=>{
                return <div className={`me-1 me-sm-0 cursor-pointer pb-2 ${duration===time.value ? 'tableActive' : ''} `} onClick={()=>setDuration(time.value)} key={index}>
                    <p className="duration fw-semibold text-nowrap">{time.name}</p>
                </div>
            })}
        </div>
        <Table className='mt-4 tableText'   bordered hover>
      <thead> 
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className='bg-white'>
          <td>1</td>
          <td>Thu Aug 15 2024	</td>
          <td>10000</td>
          <td>
            <Badge bg='success' >Success</Badge>
          </td>
        </tr>
        
      </tbody>
    </Table>
    </div>
  )
}

export default WalletPage
