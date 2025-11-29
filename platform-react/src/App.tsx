import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget/ChatWidget'

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ChatWidget />
    </>
  )
}

export default App
