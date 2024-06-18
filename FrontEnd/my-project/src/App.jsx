
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (<>
    <div className=' bg-gray-400 flex flex-col min-h-screen'>
    <div className='w-full block'>
      <Header />
      <main className='flex-grow'>
  <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  </>)
}

export default App