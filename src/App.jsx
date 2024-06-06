import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = () => { 
    let pass = "";

    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numberString = "0123456789";
    let charString = "@#$%^&*()";

    if (numberAllowed) {
      str = str + numberString;
    }

    if (charAllowed) {
      str = str + charString;
    }


    for (let i = 1; i < length; i++) {

      let index = Math.floor(Math.random() * str.length);
      pass = pass + str.charAt(index);
    }

    setPassword(pass);
  }

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed])

  const copyTextToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    toast.success("Copied to Clipboard");
  }

  return (
    <>
      <div className='flex h-screen items-center justify-center'>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
          <h1 className='text-white text-center my-3'>
            Password Generator
          </h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly />
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyTextToClipboard}>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" min={6} max={100} value={length} className='cursor-pointer' id='length' onChange={(e) => setLength(e.target.value)} />
              <label htmlFor="length">Length: {length}</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input type="checkbox" name='' id='' defaultChecked={numberAllowed} onChange={() => { setNumberAllowed((prev) => !prev) }} />
              <label htmlFor="number">Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input type="checkbox" name='' id='' defaultChecked={charAllowed} onChange={() => { setCharAllowed((prev) => !prev) }} />
              <label htmlFor="number">Characters</label>
            </div>

          </div>
        </div>
      </div>
      <Toaster />

    </>
  )
}

export default App
