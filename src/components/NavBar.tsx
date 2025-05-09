import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <header className="bg-background-secondary px-6 py-4 rounded-xl shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/MyStocks" className="group hover:cursor-pointer" aria-label="Navigate to My Stocks">
                        <div className="flex flex-col gap-1 justify-center items-center">
                            <h1 className="font-bold text-3xl text-gradient bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] bg-clip-text text-transparent transition-transform duration-300 group-hover:brightness-125">
                                StockScope
                            </h1>
                            <p className="text-white text-[14px]">Smart Alerts. Smarter Moves.</p>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <nav aria-label="Main navigation" className="flex flex-wrap justify-center gap-4 text-white">
                        <NavLink
                            to="/MyStocks"
                            className={ ({isActive}) =>
                                isActive ? "text-link font-semibold" : "hover:text-link"
                            }
                        >
                            My Stocks
                        </NavLink>
                        <NavLink
                            to="/TrendsAndNews"
                            className={({ isActive }) =>
                                isActive ? "text-link font-semibold" : "hover:text-link"
                            }
                        >
                            Trends & News
                        </NavLink>
                        <NavLink
                            to="/Alerts"
                            className={({ isActive }) =>
                                isActive ? "text-link font-semibold" : "hover:text-link"
                            }
                        >
                            Alerts
                        </NavLink>
                        <NavLink
                            to="/Profile"
                            className={({ isActive }) =>
                                isActive ? "text-link font-semibold" : "hover:text-link"
                            }
                        >
                            Profile
                        </NavLink>
                    </nav>

                    {/* Discover Button Styled Link */}
                    <Link
                        to="/Discover"
                        className="ring rounded-3xl px-4 py-2 hover:text-link hover:ring-link hover:scale-95 transition-transform duration-100"
                        aria-label="Discover page"
                    >
                        Discover
                    </Link>
                </div>
            </header>
            <hr className="border-gray-300 mt-6" />
        </>
    );
};

export default NavBar;
