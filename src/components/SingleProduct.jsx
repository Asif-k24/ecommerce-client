import { IoCartOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import Chair from "../assets/images/chair.png";
import ImageNotFound from "../assets/images/nope-not-here.png";
import { addToReduxCart, setReduxcart } from '../redux/slice/cartSlice';

export default function SingleProduct({ type, product, user }) {
    const reduxUser = useSelector((wholeReduxStore) => { return wholeReduxStore.user.value })
    const dispatch = useDispatch()

    function addTocart(e) {
        e.preventDefault()
        toast.dismiss()
        if (reduxUser) {    
            if (reduxUser.role == "buyer") {
                // add cart items in redux
                console.log("here...");
                dispatch(addToReduxCart(product))
            } else {
                toast.error("Forbidden | Only for buyer")
            }
        } else {
            toast.error("Login Required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    }

    return (
        <Link to={`/products/${product._id}`}>
            <div className='relative rounded bg-white border text-center drop-shadow-xl hover:bg-primary group hover:border-primary'>
                <img
                    src={product.image || ImageNotFound}
                    alt=""
                    className={`w-full bg-white h-52 object-contain `}
                />
                <div className={`py-2 px-4 ${type == "latest" ? "flex items-center justify-between" : ""}`}>
                    <p className='my-2 text-lg text-secondary font-semibold group-hover:text-white'>{product.name}</p>
                    <p className='text-primary group-hover:text-white'>${product.price}</p>
                </div>
                <span onClick={addTocart} className='hidden absolute left-4 top-4 bg-primary-light p-4 border group-hover:inline-block rounded-full text-black'>
                    <IoCartOutline />
                </span>
            </div>
        </Link>
    )
}