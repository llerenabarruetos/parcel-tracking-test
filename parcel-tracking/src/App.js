import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SimpleJWTDisplay from './views/SimpleJWTDisplay';
import TrackingPage from './views/TrackingPage/TrackingPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <h3>Parcel Tracking Test Application</h3>
        </header>

        <div className="contentContainer">
          <Routes>
            <Route path='/' element={<SimpleJWTDisplay/>}/>
            <Route path='/track' element={<TrackingPage/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
