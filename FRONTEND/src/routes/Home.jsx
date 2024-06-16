import react from 'react'
import { Routes,Route } from 'react-router-dom'
import Landing from '../pages/Landing/Landing'
import Navbar from '../components/Navbar/Navbar'

const Home=()=>{
    return (
        <>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
            </Routes>  
        </>
    )
}

export default Home;