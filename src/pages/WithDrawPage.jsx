import React, { useContext, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap';
import authCheck from '../helpers/authCheck';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import { useNavigate } from 'react-router-dom';
import useHandleSubmit from '../hooks/useHandleSubmit';
import { toast, ToastContainer } from 'react-toastify';

const WithDrawPage = () => {
  authCheck();
  const { content } = useContext(AuthContext);
  const { data: banks } = useFetch(BASE_URL + "/agent-payment-type");
  const [selectedBank, setSelectedBank] = useState({});
  const [accountName, setAccountName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  // console.log(selectedBank);
  // return;
  const { inputSubmit, loading, error, errMsg } = useHandleSubmit();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBank?.id) {
      toast.error("Please select a payment method", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
      return;
    }
    const inputData = {
      account_name: accountName,
      account_no: accountNo,
      amount: amount,
      note: note,
      payment_type_id: selectedBank.payment_type_id,
    }
    // console.log(inputData);
    
    const res = await inputSubmit(BASE_URL + "/transaction/withdraw", inputData);
    if (res) {
      toast.success("Transaction successful!", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
      navigate("/wallet");
    }
  }
  

  return (
    <div className='py-4 px-2 px-sm-4'>
      <ToastContainer />
      <h3 className=" mb-4 fw-semibold  text-center">  Withdraw </h3>
      <div>
        <h5 className='  mb-3'>Choose Payment Method </h5>
        <div className="">
          <div className="container">
            <div className="row">
              {banks && banks.map((bank, index) => (
                <div className="col-3 mb-3" key={index}>
                  <div className='cursor-pointer' onClick={() => setSelectedBank(bank)} >
                    <img width={"100%"} src={bank.payment_type.image_url} className={`${selectedBank.payment_type_id === bank.payment_type_id ? 'border border-3 border-warning' : ''} rounded-4`} />
                    {/* <p className=' text-center'>{bank.name}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Form className='my-4' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Account Name*</Form.Label>
            <Form.Control type="text" 
            placeholder="Account Name" 
            onChange={e => setAccountName(e.target.value)}
            value={accountName}
            />
            {error?.account_name && <p className='text-danger'>{error?.account_name}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Account Number*</Form.Label>
            <Form.Control type="text" 
            placeholder="Account Number" 
            onChange={e => setAccountNo(e.target.value)}
            value={accountNo}
            />
            {error?.account_no && <p className='text-danger'>{error?.account_no}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Amount*</Form.Label>
            <Form.Control type="text" placeholder="Amount" 
            onChange={e=> setAmount(e.target.value)}
            value={amount}
            />
            {error?.amount && <p className='text-danger'>{error?.amount}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your note</Form.Label>
            <Form.Control as="textarea" placeholder='Write here...' rows={3} 
            onChange={e => setNote(e.target.value)}
            value={note}
            />
          </Form.Group>
          <button className="bg-gradient w-full py-2 rounded-5">
            <h5 className="fw-semibold">{loading && <Spinner className='me-2' size='sm' />}Submit</h5>
          </button>
        </Form>
      </div>
    </div>
  )
}

export default WithDrawPage
