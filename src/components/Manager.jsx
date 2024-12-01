import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    // let passwordArray ;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
    // else{
    //     passwordArray = [];
    // }
  }, []);

  const copyText = (text) => {
    // changing the color of the button
    // e.target.style.backgroundColor = "green";
    return () => {
      toast(
        <span>
          {" "}
          <span style={{ color: "red" }}>{text}</span> Copied to clipboard!
        </span>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: "Bounce",
        }
      );
      navigator.clipboard.writeText(text);
    };
  };

  const ShowPassword = () => {
    // alert("Show the password ?");

    passwordRef.current.type = "password";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.svg")) {
      ref.current.src = "icons/eye.svg";
    } else {
      ref.current.src = "icons/eyecross.svg";
      passwordRef.current.type = "text";
    }
  };

  const SavePassword = () => {
    // check if the form is empty
    if (form.site === "" || form.username === "" || form.password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    console.log(form);
    setpasswordArray([...passwordArray, {...form, id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
    setform({site: "", username: "" , password: ""});

    // console.log(passwordArray) we can't see the updated passwordArray here because it is asynchronous
    console.log([...passwordArray, form]);
  };

  const DeletePassword = (id) => {
    
    let c = confirm("Are you sure you want to delete the password ?");
    if (c){
      console.log("Deleting the password with id ", id);
    setpasswordArray(passwordArray.filter(item => item.id !== id)); 
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
    }
    // console.log(form);
    // setpasswordArray([...passwordArray, {...form, id:uuidv4()}]);
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    // // console.log(passwordArray) we can't see the updated passwordArray here because it is asynchronous
    // console.log([...passwordArray, form]);
  };
  const editPassword = (id) => {
    console.log("Editing the password with id ", id);
    setform(passwordArray.filter(item => item.id === id)[0]);
    setpasswordArray(passwordArray.filter(item => item.id !== id));

  }

  

  const HandleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="container mx-auto text-black  max-w-4xl">
        <h1 className="text-4xl text-center p-2 font-bold">JK's Pass</h1>
        <p className=" text-center text-slate-400 ">
          manage all the passwords here
        </p>
        <div className=" flex items-center flex-col p-4 gap-4  ">
          <input
            value={form.site}
            onChange={HandleChange}
            placeholder="Enter website url"
            className=" border border-green-500 w-full rounded-full py-1 px-4 "
            type="text"
            name="site"
            id=""
          />

          <div className=" w-full justify-between flex gap-8">
            <input
              value={form.username}
              onChange={HandleChange}
              name="username"
              placeholder="Enter usename"
              className=" border border-green-500 w-full rounded-full py-1 px-4"
              type="text"
            />
            <div className="relative ">
              <input
                value={form.password}
                name="password"
                onChange={HandleChange}
                placeholder="Enter password"
                className="border-green-500 border w-full rounded-full py-1 px-6"
                type="password"
                ref={passwordRef}
              />

              <span
                onClick={ShowPassword}
                className="absolute right-2 top-2 text-black cursor-pointer "
              >
                <img ref={ref} width={24} src="icons/eye.svg" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={SavePassword}
            className="flex justify-center items-center gap-1 bg-green-500 rounded-full w-fit px-3 py-1 hover:bg-green-400 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-3">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords saved</div>}
          {/* table */}
          {passwordArray.length != 0 && (
            <table className=" w-full table-auto overflow-hidden rounded-md">
              <thead className="bg-purple-600">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-blue-300 text-center min-w-32">
                        <div className="flex justify-center gap-4 items-center">
                          <a
                            className="text-blue-500 underline"
                            target="_blank"
                            href={item.site}
                          >
                            {item.site}
                          </a>
                          <button
                            onClick={copyText(item.site)}
                            className="border border-blue-400 p-2 text-sm rounded-full bg-blue-900 text-white "
                          >
                            Copy
                          </button>
                        </div>
                      </td>
                      <td className=" py-2 border border-blue-300 text-center min-w-32">
                        <div className="flex justify-center gap-4 items-center">
                          <span>{item.username}</span>
                          <button
                            onClick={copyText(item.username)}
                            className="border border-blue-400 p-2 text-sm rounded-full bg-blue-900 text-white "
                          >
                            Copy
                          </button>
                        </div>
                      </td>
                      <td className=" py-2 border border-blue-300 text-center min-w-32">
                        <div className="flex justify-center gap-4 items-center">
                          <span>{item.password}</span>
                          <button
                            onClick={copyText(item.password)}
                            className="border border-blue-400 p-2 text-sm rounded-full bg-blue-900 text-white "
                          >
                            Copy
                          </button>
                        </div>
                      </td>
                      <td className=" py-2 border border-blue-300 text-center min-w-12">
                        <span className="cursor-pointer mx-1" onClick={() => {editPassword(item.id)}} >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{width:"30px",height:"30px",cursor:"pointer"}}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1" onClick={() => {DeletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            style={{width:"30px",height:"30px",cursor:"pointer"}}
                          ></lord-icon>
                        </span>
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Manager;