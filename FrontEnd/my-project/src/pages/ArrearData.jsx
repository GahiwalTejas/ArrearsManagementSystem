import React from 'react'
import Input from "../component/Input";
import Button from "../component/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ArrearData() {
  const { register, handleSubmit } = useForm();
  const id = useSelector((state) => state.auth.userData.id);

  const login = async (data) => {
    // setError("");  Reset error state
    fetch("http://localhost:51514/api/Arrears", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp)=> {console.log(resp)
      }).catch((err)=>console.log(err))

    }
  return (
    <div className='flex justify-center m-2 font-bold'>


<form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            {/* <Input label="Store Name: " placeholder="Enter store name " type="text" {...register("Store Name", { required: true, })} /> */}
            <Input label="Store Id: " type="number" placeholder="Enter Store Id" {...register("StoreId", { required: true, })} />

            <Input label="Amount: " placeholder="Enter Amount" {...register("Amount", { required: true, pattern: {
       value: /^[+-]?(\d+(\.\d{1,3})?|\.\d{1,3})$/,
      message: "Invalid amount format. Up to 3 decimal places allowed."
    } })} />
            <Input label="Custmore Id: " type="number" placeholder="Cust Id" value={id} {...register("UserId")} />
{/* <label>Cust Id</label><input type='text' value={id}></input> */}
            <Button type="submit" className="w-full">Add Arrear</Button>
          </div>
        </form>
    </div>
  )
}

export default ArrearData