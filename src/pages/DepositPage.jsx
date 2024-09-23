import React, { useContext, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import authCheck from "../helpers/authCheck";
import BASE_URL from "../hooks/baseURL";
import useFetch from "../hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import useHandleSubmit from "../hooks/useHandleSubmit";
import { useNavigate } from "react-router-dom";

const DepositPage = () => {
  authCheck();
  const { content } = useContext(AuthContext);
  const { data: banks } = useFetch(BASE_URL + "/agent-payment-type");
  const [selectedBank, setSelectedBank] = useState({});
  const [amount, setAmount] = useState("");
  const [refNo, setRefNo] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  

  const handleCopyText = (e) => {
    e.preventDefault();
    if (selectedBank.account_no) {
      navigator.clipboard.writeText(selectedBank.account_no);
      toast.success("Copied", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };
  const { inputSubmit, error, loading, errMsg } = useHandleSubmit();
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
      agent_payment_id: selectedBank.id,
      amount,
      refrence_no: refNo,
      note
    };
  
    const res = await inputSubmit(BASE_URL + "/transaction/deposit", inputData);
    
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
  };

  return (
    <div className="py-4 px-2 px-sm-4">
      <ToastContainer />
      <h3 className="mb-4 fw-semibold text-center">{content?.wallet?.deposit}</h3>

      <div>
        <h5 className="mb-3">{content?.wallet?.choose_payment}</h5>
        <div className="d-flex align-items-center gap-2">
          {banks &&
            banks.map((bank, index) => (
              <div
                className="cursor-pointer"
                onClick={() => setSelectedBank(bank)}
                key={index}
              >
                <img
                  src={bank.payment_type.image_url}
                  alt={bank.payment_type.name}
                  className={`${selectedBank === bank
                    ? "border border-3 border-warning"
                    : ""
                    } rounded-4 bankImg`}
                    width={100}
                />
                {/* <p className="text-center">{bank.payment_type.name}</p> */}
              </div>
            ))}
        </div>
        {selectedBank.id && (
          <div className="border rounded-3 p-2 mt-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={selectedBank?.payment_type?.image_url}
                  className=""
                  width={60}
                />
                <div>
                  <p className="fw-semibold">{selectedBank?.account_name}</p>
                  <p className="fw-semibold">{selectedBank?.account_no}</p>
                </div>
              </div>

              <div>
                <button type="button" onClick={handleCopyText} className="btn btn-outline-warning">Copy</button>
              </div>
            </div>
          </div>
        )}

        <Form className="my-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="depositFormName">
            <Form.Label>{content?.wallet?.amount}</Form.Label>
            <Form.Control
              type="number"
              placeholder={content?.wallet?.enter_amount}
              onChange={e => setAmount(e.target.value)}
              value={amount}
            />
            {error?.amount && <p className="text-danger">{error.amount}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="depositFormPhone">
            <Form.Label>{content?.wallet?.ref_no}*</Form.Label>
            <Form.Control
              type="text"
              placeholder={content?.wallet?.enter_ref_no}
              onChange={e => setRefNo(e.target.value)}
              value={refNo}
            />
            {error?.refrence_no && <p className="text-danger">{error.refrence_no}</p>}
          </Form.Group>


          <Form.Group className="mb-3" controlId="depositFormNote">
            <Form.Label>{content?.wallet?.note}</Form.Label>
            <Form.Control as="textarea"
              placeholder={content?.wallet?.enter_note} rows={3}
              onChange={e => setNote(e.target.value)}
              value={note}
            />
            {error?.note && <p className="text-danger">{error.note}</p>}
          </Form.Group>

          <button type="submit" className="bg-gradient w-full py-2 rounded-5">
            <h5 className="fw-semibold">
              {loading && <Spinner animation="border" size="sm" />}
              {content?.wallet?.submit}
            </h5>
          </button>
        </Form>
      </div>
    </div>
  );
};

export default DepositPage;
