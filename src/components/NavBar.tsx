import {Link, useNavigate} from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    return (
      <>
          <div className="flex items-center justify-between gap-4">
              <button
                  className="hover:cursor-pointer group"
                  onClick={() => navigate("/MyStocks")}
              >
                  <div className = "flex flex-col gap-2 justify-center items-center">
                      <h1 className="font-bold text-3xl text-gradient bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] bg-clip-text text-transparent transition-transform duration-300 group-hover:brightness-125">StockScope
                      </h1>
                      <p className="text-white text-[14px]">Smart Alerts. Smarter Moves.</p>
                  </div>
              </button>

              <nav className="flex gap-2">
                  <Link to="/MyStocks"   className="hover:text-link">My Stocks</Link>
                  <Link to="/TrendsAndNews" className="hover:text-link">Trends & News</Link>
                  <Link to="/Alerts" className="hover:text-link">Alerts</Link>
                  <Link to="/Profile" className="hover:text-link">Profile</Link>
              </nav>
              <button
                  className="ring rounded-3xl p-3 hover:text-link hover:ring-link hover:cursor-pointer hover:scale-95 transition-transform duration-100"
                  onClick={() => navigate("/Discover")}
              >
                  <p>Discover</p>
              </button>

          </div>
          <hr className="border-gray-300 mt-6" />

      </>
    );
};

export default NavBar;
