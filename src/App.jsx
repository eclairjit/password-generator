import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [specialCharsAllowed, setSpecialCharsAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(
    () => {
      
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numAllowed) str += "0123456789"
      if(specialCharsAllowed) str += "!@#$%^&*()?';,.+-/"

      for(let i=0; i<length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

    },
    [length, numAllowed, specialCharsAllowed, setPassword]
  )
  
  const copyPasswordToClipBoard = useCallback(
    () => {
      
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)

    },
    [password]
  )
  

  useEffect(() => {
  
    passwordGenerator()

  }, [length, numAllowed, specialCharsAllowed, passwordGenerator]);
  

  return (
    <>
      <div className='w-full max-w-lg pb-2 mx-auto shadow-md rounded-lg px-4 my-8 text-yellow-500 bg-slate-800'>

        <h1 className='text-white text-center my-3 pt-5'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 rounded-lg text-red-500'
          placeholder='Password'
          readOnly={true}
          ref={passwordRef}
        />

          <button
          onClick={copyPasswordToClipBoard}
          className='outline-none bg-green-700 hover:bg-green-600 active:bg-blue-500 text-white px-3 py-0.5 shrink-0 rounded-lg ml-1'>
            Copy
          </button>

        </div>

        <div className='flex gap-x-4'>

          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
              type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
            </div>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setNumAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            defaultChecked={specialCharsAllowed}
            id="specialCharInput"
            onChange={() => {
              setSpecialCharsAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="specialCharInput">Special Characters</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
