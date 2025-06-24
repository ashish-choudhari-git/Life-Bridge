import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Availability from './pages/Availability/Availability.jsx';
import Donate from './pages/Donate/Donate.jsx';
import { ToastContainer, toast } from 'react-toastify';
import NearBloodBank from "./pages/NBB/NearBloodBank.jsx"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Navbar />

      <div style={{ paddingTop: '4rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/NearestBloodBank" element={<NearBloodBank />} />
        </Routes>
      </div>
      <Footer/>

      {/* Toastify container */}
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
