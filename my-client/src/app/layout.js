'use client'
import { appReducer } from '@/reducers/appReducer'
import { init } from '@/utils/init'
import { Inter } from 'next/font/google'
import { useReducer } from 'react'
import { appCtx } from '@/contexts/appContext'
import { Header } from '@/components/Header'
import  Menu  from '@/components/Menu'
import { Footer } from '@/components/Footer'
import 'bootstrap/dist/css/bootstrap.css'
import { Loader } from '@/components/Loader'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  const [state,dispatch] = useReducer(appReducer,init)
  return (
    <html lang="en">
      <body className='container-fluid m-0'>
        <appCtx.Provider value = {{state,dispatch}}>
          <Header/>
          {state.isLoggedIn &&<Menu/>}
        {children}
<Footer/>
{state.isShowLoader && <Loader/>}
<ToastContainer/>
        </appCtx.Provider>
        </body>
    </html>
  )
}
