import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';

import Main from './Components/Main';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDataLayerContext } from './DataLayer';
import Category from './Components/Category';
function App() {
  const [{ token }] = useDataLayerContext();
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forgot' element={<ForgotPassword />}></Route>
        {
          token && <Route path="/main" element={<Main />}>
            <Route path='/main' element={<Category />} ></Route>
          </Route>
        }
        <Route path='*' element={<Navigate to="/login" />} ></Route>
      </Routes>
      <ToastContainer theme='colored' autoClose={5000} hideProgressBar={true} newestOnTop={true} />
    </div>
  );
}

export default App;
