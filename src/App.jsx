import { useCallback, useEffect, useState } from "react"
import React from 'react'

const App = () => {
  const [len, setlen] = useState(8);
  const [pass, setPass] = useState("")
  const [ch, setch] = useState(false)
  const [d, setd] = useState(false)
 const [Copy, setCopy] = useState("Copy")
  const Copy_Pass = useCallback(()=> {
    window.navigator.clipboard.writeText(pass);

    setCopy('Copied')

    setTimeout(() => {
        setCopy('Copy')
    }, 2000);
}, [pass])


  let passGen = useCallback( ()=>{
    let p="";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = '1234567890';
    let special_char = '~!@#$%^&*';

    if(ch){
      str+=number;
    }

    if(d) {
      str+=special_char;
    }

    for(let i=0 ; i<len ; i++) {
      let idx = Math.floor(Math.random()* str.length+1)
      p+=str.charAt(idx)
    }
    setPass(p)
  }, [len, pass, ch, d])
  
  useEffect(
    passGen, [len, d, ch, setPass])
  
  return (
      <>
      <div className='bg-black h-screen flex justify-center'>
        <div className='mt-30 w-xl text-xl rounded-xl h-fit p-4.5 bg-gray-600 flex-wrap'>
          <div className=" text-center mb-5 text-white text-3xl font-bold">
            PASSWORD GENERATOR
          </div>
          <div className='mb-2 w-full flex justify-between rounded h-10 '>
            <div className='rounded-xl w-full pl-3 bg-white rounded-r-none text-orange-500 grid items-center'>{pass}</div>
            <button className='bg-blue-500 rounded-xl w-30 cursor-pointer rounded-l-none' onClick={Copy_Pass}>{Copy}</button>
          </div>
          <div className='w-full rounded h-10 md:flex-col flex items-center justify-around text-orange-500 flex-wrap'>
            <div className="flex gap-4">
              <input type="range" id="length" min="4" max="32" onChange={(e)=>{{setlen(e.target.value)}}}/>
              <div className="w-20"> Length({len})</div>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" name="digit" id="d" onChange={()=>{{setd(!d)}}} />
              <label htmlFor="d">Digit</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" name="char" id="ch" onChange={()=>{{setch(!ch)}}}/>
              <label htmlFor="ch">Special Character</label>
            </div>
          </div>
          <button className="w-full justify-center bg-blue-500 flex rounded-2xl p-2 text-xl mt-4 flex-wrap" onClick={passGen}>Generate New Password</button>
        </div>
      </div>
    </>
  )
}

export default App
