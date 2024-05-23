import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Toaster from "./toaster/Toaster";
import Logo from "./Logo/Logo";
import Select from "./Select";
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit,watch } = useForm();
  const [text, setText] = useState("Registration Successfully");
  const [classStyle, setClassStyle] = useState(
    "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
  );
  const optionsObject = [ {name:'Select Your Role', value : 0},
                          {name:'Customer', value : 1},
                          { name:'Seller', value : 2}
                                  
                                  ];
  let labels="Select Role";
  const [isVisible, setIsVisible] = useState(false);
  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // Close the toast after 5000 milliseconds (5 seconds)
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Clear the timeout if the component unmounts before the timeout is reached
    return () => clearTimeout(timeoutId);
  }, [isVisible, setIsVisible]); // Empty dependency array ensures useEffect runs only once on component mount

  const create = async (data) => {
    setError(" ");

    try {
      debugger;
      fetch("http://localhost:51514/api/users/registration", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp) {
            console.log("setIsvisible =>", isVisible);

            setIsVisible(true);
            console.log("setIsvisible =>", isVisible);
          } else {
            setClassStyle(
              "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
            );
            setText("Registration Failed");
            setIsVisible(true);
            setError("Registration Failed....");
          }
        })
        .then(() => {
          if (text === "Registration Successfully") {
            navigate("/login");
          } else {
            setClassStyle(
              "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
            );
            setText("Registration Failed");
            setIsVisible(true);
            setError("Registration Failed....");
          }
        });
    } catch (error) {
      console.log(error);
      setError("Registration Failed......", error);
    }
  };
  const selectedRole = watch("RoleId");

  return (
    <>
      {isVisible ? (
        <Toaster
          text={text}
          className={classStyle}
          onClick={handleClose}
        ></Toaster>
      ) : null}
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />
              {/* <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              /> */}
              <Select 
              options={optionsObject}
             
              {...register("RoleId", {
                required: true,
              })}
            ></Select>
                 {selectedRole == 2 && (
                <Input
                  label="Store Name: "
                  placeholder="Enter your Store Name"
                  {...register("StoreName", { required: true })}
                />
              )}




              <Input
                label="Mo. Number: "
                type="text"
                placeholder="Enter your Mobile Number"
                {...register("MoNumber", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /(\+)?(91)?( )?[789]\d{9}/g.test(value) ||
                      "Mobile No. must be a valid",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;