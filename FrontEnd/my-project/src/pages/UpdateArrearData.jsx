import React, { useEffect, useState } from "react";
import Input from "../component/Input";
import Button from "../component/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function UpdateArrearData() {
  const { register, handleSubmit } = useForm();
  const [error,setError]=useState('');
  const { data } = useParams();
  const [amount, setAmount] = useState(0);
  const [amountPaid, setPaidAmount] = useState(0);
  const nav=useNavigate();
  // const id = useSelector((state) => state.auth.userData.id);
  const [arrearData, setArrearData] = useState({});
  useEffect(() => {
    console.log(data);
    4;
    fetch(`http://localhost:51514/api/Arrears/getArrearByArrearId/${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp[0].Amount);
        setArrearData(resp[0]);
        setAmount(resp[0].Amount);
      });
  }, []);



  const arrearForm = async (formData) => {
    if (amountPaid > amount) {
      setError("Paid amount cannot be greater than the total amount.");
      return;
    }

    const updatedData = {
     
      Amount: amount-amountPaid,
      ArrearId:data
    };

    fetch(`http://localhost:51514/api/Arrears/${data}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((resp) =>nav('/lentTakenCustomers'))
      // .then((resp) => {
      //   console.log(resp);
        
        
      // })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center m-2 font-bold">
      <form onSubmit={handleSubmit(arrearForm)} className="mt-8">
        <div className="space-y-5 ">
          <div className="w-full flex ">
            <label className="inline-block m-1 pl-1 p-2">Amount Payable:</label>
            <input
              value={amount}
              type="number"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full "
            ></input>
          </div>
          <div className="w-full flex ">
            <label className="inline-block m-1 pl-1 p-2">Amount </label>
              <input
                placeholder="Enter the Amount Which You want to paid"
                onChange={(e) => setPaidAmount(e.target.value)}
                type="number"
                 step="0.01"
                className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full "
              ></input>
          </div>
          <div className="w-full flex ">
            <label className="inline-block m-1 pl-1 p-2">User Name:</label>
            <input
              value={arrearData.Name}
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full "
            ></input>
          </div>
<p>{error}</p>
          <Button type="submit" className="w-full">
            Update Arrear
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateArrearData;
