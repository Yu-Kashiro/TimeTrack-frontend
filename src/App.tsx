import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import railsLogo from './assets/rails.svg'
import './App.css'
import { Link } from 'react-router-dom'
import { HStack } from '@chakra-ui/react'

function App() {

  return (
    <>
      <div>
        <Link to={"/time-entry"}>時間入力画面</Link>
      </div>
      <div>
        <Link to={"/signup"}>サインアップ画面</Link>
      </div>
      <HStack justify="center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://rubyonrails.org" target="_blank">
          <img src={railsLogo} className="logo rails" alt="Rails logo" />
        </a>
      </HStack>
      <h5>Powered by Vite + React + Rails</h5>
    </>
  )
}

export default App
