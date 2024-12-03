import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Common/Navbar';
import OpenRoute from './Components/Auth/OpenRoute';
import PrivateRoute from './Components/Auth/PrivateRoute';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import AdminDetails from './Pages/AdminDetails';
import InstructorDetails from './Pages/InstructorDetails';
import StudentDetails from './Pages/StudentDetails';

function App() {
  return (
    <div className='w-screen min-h-screen bg-slate-900 flex flex-col font-inter'>
      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/login' element={
          <OpenRoute>
            <Login />
          </OpenRoute>
          } />
        
        <Route path='/signup' element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
          } />

        <Route path='/details/admin' element={
            <PrivateRoute>
              <AdminDetails />
            </PrivateRoute>
          } />

        <Route path='/details/instructor' element={
            <PrivateRoute>
              <InstructorDetails />
            </PrivateRoute>
          } />

        <Route path='/details/student' element={
            <PrivateRoute>
              <StudentDetails />
            </PrivateRoute>
          } />

      </Routes>
      
    </div>
  );
}

export default App;
