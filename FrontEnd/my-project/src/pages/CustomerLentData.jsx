import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

function CustomerLentData() {
    const nav=useNavigate()
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [LentDetails, setLentDetails] = useState([]);
 //   const [amount,setAmount]=useState(0);
    const id = useSelector((state) => state.auth.userData.id);
    const [amount, setAmount] = useState(0);


    let totalAmount=0;
    //  const addArrear=()=>{
    //    nav("/addArrearData")
    //  }
   
     const convertDate = (isoDate) => {
       const date = new Date(isoDate);
       const day = String(date.getDate()).padStart(2, '0');
       const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
       const year = date.getFullYear();
   
       return `${day}-${month}-${year}`;
     };
   
     const convertTime = (isoTime) => {
       const [hours, minutes, seconds] = isoTime.split(':');
       const formattedSeconds = seconds.split('.')[0]; // Remove milliseconds
   
       return `${hours}:${minutes}:${formattedSeconds}`;
     };
   
     console.log(id);
     useEffect(() => {
       fetch(`http://localhost:51514/api/Arrears/getArrearByStore/${id}`, {
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
           console.log(resp[0]);
           console.log(resp[1]);
   
           setLentDetails(resp);
   resp.map((lent,index)=>{
   totalAmount=totalAmount+lent.Amount
   })
   
   setAmount(totalAmount)
   
});
}, []);

   


   
    

    const handleSearchChange = async (event) => {
       // event.preventDefault();

        setKeyword(event.target.value);
        
        const response = await fetch(`http://localhost:51514/api/users/search?keyword=${keyword}`);
        if (response.ok) {
            const data = await response.json();
            setSearchResults(data);
        } else {
            console.error('Error fetching search results');
        }
    };

    const handleSearchSubmit = async (event) => {
       
debugger
        const response = await fetch(`http://localhost:51514/api/users/search?keyword=${keyword}`);
        if (response.ok) {
            const data = await response.json();
            setSearchResults(data);
        } else {
            console.error('Error fetching search results');
        }
    };
    const navUpdate=(data)=>{
      nav(`/updateArrearData/${data}`)
    }
  
    return (
        <div>
             <div className="flex justify-end text-3xl font-bold mt-2 mx-2 ">
        <label className="bg-sky-600 text-yellow-50">Total Lent Given</label><p className="text-red-500 flex bg-slate-50"> {Number(amount).toFixed(4)} <p className="mx-1">Rs</p></p> 
        </div>
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        name="keyword"
                        value={keyword}
                        onChange={handleSearchChange}
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Customers..."
                        required
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SearchCustomer</button>
                </div>
            </form>

          

            <div>
                {searchResults.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {searchResults.map((store, index) => (
                            <li  className="w-1/4 p-4 ps-10  text-sm mx-96 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            key={index}>{store}</li>
                        ))}
                    </ul>
                ) : keyword.length > 1 ? (
                    <p>No results found</p>
                ):null}
            </div>

            <div className="text-center font-bold text-5xl p-2">Lent Details</div>
        {LentDetails.length > 0 ? (
          <ul className="list-disc list-inside p-2">
            {LentDetails.map((lent, index) => (



              <li
                className="w-2/4 flex m-2 p-2 ps-10  text-sm mx-96 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                key={index}
              >
               <label  className="px-2 text-blue-500 font-bold">Amount :</label><p className="text-red-500 font-bold"> {Number(lent.Amount).toFixed(3)}</p>
              
              <label  className="px-2 text-blue-500 font-bold">Date :</label> <p className="text-red-500 font-bold"> {convertDate(lent.Dates)
              }</p>
              
               <label className="px-2 text-blue-500 font-bold">Time :</label><p className="text-red-500 font-bold"> {convertTime(lent.Times)}</p>
               <label className="px-2 text-blue-500 font-bold">User :</label><p className="text-red-500 font-bold"> {lent.userName}</p>
               
               <label  className="px-4 text-blue-500 font-bold">Edit :</label><button onClick={()=>navUpdate(lent.ArrearId)} className="text-red-500 font-bold"> UpdateMoney</button>
            
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}









        </div>
    );
}

export default CustomerLentData;
