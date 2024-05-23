
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (<>
    <div className=' bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
  <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  </>)
}

export default App