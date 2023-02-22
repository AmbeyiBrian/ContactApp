import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'

import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route, Link, Outlet } from 'react-router-dom'

import Contacts from './components/contacts.jsx'
import Clients from './components/clients.jsx'

function App() {
  const router=createBrowserRouter(
        createRoutesFromElements(
                <Route path='/' element={<Root />}>
                    <Route index element={<Clients />} />
                    <Route path="/Contacts" element={<Contacts />} />
                </Route>
            )
        )
  return (
        <div className='app'>
            <RouterProvider router={router} />
        </div>
  );
}

const Root=()=>{
    return(
        <>
            <div>
                <div className='row text-center my-3'>
                    <div className='col-2'>
                        <Link className='btn btn-dark' to="/">General</Link>
                    </div>
                    <div className='col-2'>
                        <Link className='btn btn-dark' to="/Contacts">Contacts</Link>
                    </div>
                    <div className='col-8'>
                    </div>
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </>
        )
    }

export default App;
