
import './App.css'
import AddingProducts from './components/AddingProducts'
import Bulk from './components/Bulk'
import Signup from './components/Signup'
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/add' element={<PrivateRoute element={AddingProducts}/>}/>
      <Route path='/' element={<PrivateRoute element={Bulk}/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
