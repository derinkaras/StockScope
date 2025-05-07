import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyStocks from './pages/MyStocks.tsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from "./components/NavBar.tsx";
import Discover from "./pages/Discover.tsx";
import TrendsAndNews from "./pages/TrendsAndNews.tsx";
import Alerts from "./pages/Alerts.tsx";
import Profile from "./pages/Profile.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <div className="min-h-screen bg-background-primary text-primary sm:px-10 sm:py-4 md:px-14 md:py-4 xl:px-[500px] lg:py-8 font-cal">
              <NavBar/>
              <Routes>
                  <Route index element = {<MyStocks/>}/>
                  <Route path="/MyStocks" element={<MyStocks/>}/>
                  <Route path="/TrendsAndNews" element={<TrendsAndNews />} />
                  <Route path="/Alerts" element={<Alerts />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/Discover" element={<Discover />} />
              </Routes>
          </div>
      </BrowserRouter>
  </StrictMode>,
)
