import react from 'react'
import { Routes,Route } from 'react-router-dom'
import Landing from '../pages/Landing/Landing'
import Navbar from '../components/Navbar/Navbar'
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';

const Home=()=>{
    return (
        <>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>  
        </>
    )
}

export default Home;