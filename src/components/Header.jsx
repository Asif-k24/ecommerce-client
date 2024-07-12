// import React from 'react'
import { FaRegUser } from 'react-icons/fa'
import { FiPhoneCall, FiSearch } from 'react-icons/fi'
import { IoCartOutline } from 'react-icons/io5'
import { MdMailOutline } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { logoutReduxUser, setReduxUser } from '../redux/slice/userSlice'
import ProtectedComponent from './ProtectedComponent'
// import Todos from "./components/Todos";

export default function Header({ user }) {

  const { pathname } = useLocation()
  const reduxUser = useSelector((reduxStore) => { return reduxStore.user.value })
  const cartItems = useSelector((reduxStore) => { return reduxStore.cart.cartItems })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(pathname);

  const handleLogout = () => {
    dispatch(logoutReduxUser())
    navigate("/")
  }

  let totalCartItems = 0
  cartItems.forEach(item => {
    totalCartItems += item.quantity
  });

  // console.log(pathname);

  return (
    <>
      {/* ------------------- 1st Header ------------------- */}

      <header className=" bg-primary text-white">
        <nav className="flex flex-col sm:flex-row container py-3 justify-between items-center">
          <div className="">

            <MdMailOutline className="inline" /> <span>mhhasanul@gmail.com</span>
            <FiPhoneCall className="inline ml-12" /> <span>(12345)67890</span>
          </div>

          <div className="flex items-center gap-4">
            {
              reduxUser?.name
              &&
              <span>
                {reduxUser.name}
              </span>
            }
            {
              reduxUser
                ?
                <button onClick={handleLogout}>logout</button>
                :
                < Link to={"/login"}>Login</Link>
            }
            <FaRegUser className="inline ml-[6px]" />
            <ProtectedComponent role={"buyer"}>
              <IoCartOutline className="inline ml-3" />
            </ProtectedComponent>

          </div>
          {/* <p className="text-center text-6xl">Todos List</p> */}
        </nav>
      </header >

      {/* <Todos /> */}

      {/* -------------------2nd Header------------------- */}

      < header className="bg-white" >
        <nav className="flex flex-col container py-5 items-center gap-4 md:flex-row lg:gap-16">
          <Link to={"/"} className="text-4xl font-bold text-primary-dark">Hekto</Link>

          <div className="flex flex-col gap-4 items-center grow justify-between md:flex-row">
            <ul className="flex items-center gap-9">
              <li><Link to="/" className={`${pathname == "/" ? "text-secondary" : ""} hover:text-secondary`}>Home</Link></li>
              <li><Link to="/products" className={`${pathname == "/products" ? "text-secondary" : ""} hover:text-secondary`}>Products</Link></li>
              <ProtectedComponent role="seller">
                <li><Link to="/products/create" className={`${pathname == "/products/create" ? "text-secondary" : ""} hover:text-secondary`}>Create Products</Link></li>
              </ProtectedComponent>
              <ProtectedComponent role="buyer">
                <li><Link to="/cart" className={`${pathname == "/cart" ? "text-secondary" : ""} hover:text-secondary`}><span>Cart</span><IoCartOutline className="inline mx-1" />({ totalCartItems })</Link></li>
              </ProtectedComponent>
            </ul>
            <form action="" onSubmit={(e) => {
              e.preventDefault()
              navigate("/products?search_term=" + e.target.search_term.value)
            }} className="flex">
              <input name="search_term" type="search" className="border-2 px-2 focus:border-secondary focus:outline-none" />
              <button className=" bg-secondary text-white px-4 py-3">
                <FiSearch />
              </button>
            </form>
          </div>

        </nav>
      </header >
    </>
  )
}
