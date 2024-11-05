import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './components/SideBar/Sidebar';
import MainContent from './components/MainContent/MainContent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: "column", height: '100vh', width: '100vw'}}>
      <Sidebar />
      <MainContent />
    </div>
    </>
  )
}

export default App
