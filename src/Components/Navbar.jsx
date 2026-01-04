import { useState, useEffect, useRef } from "react";
import { FaRegUserCircle, FaShoppingCart, FaSun } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";
import Useauth from "../Hooks/Useauth";
import { useQuery } from "@tanstack/react-query";
import { fetchAddToCart } from "./api";
import Swal from "sweetalert2"; 

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { User, logout } = Useauth();

    const { data: cartData } = useQuery({
        queryKey: ["cart", User?.email],
        queryFn: () => fetchAddToCart(User.email),
        enabled: !!User?.email
    });

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout(); 
            Swal.fire({
                icon: 'success',
                title: 'Logged Out',
                text: 'You have successfully logged out!',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'Something went wrong!',
            });
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-black shadow">
            <div className="max-w-[95%] mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-orange-500">FoodHub</Link>
                    <ul className="hidden md:flex items-center gap-6">
                        <li><Link className="text-gray-700 dark:text-gray-200 font-medium hover:text-orange-500 transition" to="/">Home</Link></li>
                        <li><Link className="text-gray-700 dark:text-gray-200 font-medium hover:text-orange-500 transition" to="/restaurants">Restaurants</Link></li>
                        <li><Link className="text-gray-700 dark:text-gray-200 font-medium hover:text-orange-500 transition" to="/foods">Foods</Link></li>
                        <li><Link className="text-gray-700 dark:text-gray-200 font-medium hover:text-orange-500 transition" to="/how-it-works">How It Works</Link></li>
                        <li><Link className="text-gray-700 dark:text-gray-200 font-medium hover:text-orange-500 transition" to="/contact">Contact</Link></li>
                    </ul>
                    <div className="hidden md:flex items-center gap-4">
                        <button onClick={() => setDark(!dark)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition">
                            {dark ? <FaSun size={25} /> : <IoMdMoon size={25} />}
                        </button>
                        <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition">
                            <FaShoppingCart size={25} />
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cartData?.length || 0}</span>
                        </Link>
                        {User ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
                                >
                                    {User.photoURL ? (<img src={User.photoURL} alt="" className="rounded-full w-8 h-8" />) : (<FaRegUserCircle size={25} />)}
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-44 rounded-md bg-white dark:bg-gray-800 shadow-lg overflow-hidden transition">
                                        <Link className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" to="/dashboard">Dashboard</Link>
                                        <Link className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" to="/orders">My Orders</Link>
                                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button><Link to='/login' className="btn-primary w-full">Login</Link></button>
                        )}
                    </div>
                    <div className="flex md:hidden items-center gap-2">
                        <button onClick={() => setDark(!dark)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition">
                            {dark ? <FaSun size={25} /> : <IoMdMoon size={18} />}
                        </button>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                            {menuOpen ? <RxCross2 className="text-black dark:text-white" size={22} /> : <IoMenuSharp className="text-black dark:text-white" size={22} />}
                        </button>
                    </div>
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-3">
                    <Link className="block py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200" to="/">Home</Link>
                    <Link className="block py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200" to="/restaurants">Restaurants</Link>
                    <Link className="block py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200" to="/foods">Foods</Link>
                    <Link className="block py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200" to="/how-it-works">How It Works</Link>
                    <Link className="block py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200" to="/contact">Contact</Link>
                    {User && (
                        <>
                            <Link className="block py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200" to="/dashboard">Dashboard</Link>
                            <Link className="block py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200" to="/cart">Cart</Link>
                            <button onClick={handleLogout} className="block py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-left w-full">
                                Logout
                            </button>
                        </>
                    )}
                    {!User && (
                        <button><Link to='/login' className="btn-primary w-full py-2">Login</Link></button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
