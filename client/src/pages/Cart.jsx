import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Hourglass } from "react-loader-spinner";
import cartImg from "../assets/emptyCart.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Cart() {
  const [cartBooks, setcartBooks] = useState();
  const [loader, setloader] = useState(true);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    id: localStorage.getItem("id"),
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/api/v1/get-user-cart`, { headers });
        setcartBooks(response.data.cart);
        setloader(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetch();
  }, [cartBooks]);

  useEffect(() => {
    if (cartBooks && cartBooks.length > 0) {
      let total = 0;
      cartBooks.map((items) => (total += items.price));
      setTotal(total);
      total = 0;
    }
  }, [cartBooks]);

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `/api/v1/order-placed`,
        { order: cartBooks },
        { headers }
      );
      toast.success(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const removeCartBook = async (bookid) => {
    try {
      if (confirm("Are You sure to remove book from cart?")) {
        const response = await axios.put(
          `/api/v1/remove-from-cart/${bookid}`,
          {},
          { headers }
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" bg-zinc-900 min-h-screen h-auto text-white">
      {loader && (
        <div className=" w-full h-screen flex justify-center items-center ">
          <Hourglass
            visible={loader}
            height="100"
            width="100"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      )}
      {cartBooks && cartBooks.length == 0 && (
        <>
          <div className="h-screen flex flex-col justify-center items-center">
            <p className=" text-5xl text-zinc-500 font-semibold p-3">
              Empty Cart
            </p>
            <img src={cartImg} alt="cart Image" className=" h-48" />
          </div>
        </>
      )}
      {cartBooks && cartBooks.length > 0 && (
        <div className="pt-24 p-5 flex flex-col md:flex-row justify-between">
          {/* Cart Items on the Left */}
          <div className="w-full md:w-3/5 max-w-[1000px] flex flex-col">
            <h1 className="text-7xl text-zinc-500 font-semibold">Your Cart</h1>
            {cartBooks.map((items, i) => (
              <div
                key={i}
                className="w-full bg-zinc-800 mt-5 flex flex-col px-7 py-6"
              >
                <div className="flex flex-col md:flex-row justify-between items-center w-full md:space-x-9">
                  <Link
                    to={`/view-book-details/${items._id}`}
                    className="flex-shrink-0 mb-4 md:mb-0"
                  >
                    <img
                      src={items.url}
                      alt="book"
                      className="h-36 w-30 object-cover"
                    />
                  </Link>
                  <div className="flex-grow flex flex-col space-y-3">
                    <Link to={`/view-book-details/${items._id}`}>
                      <p className="text-3xl text-zinc-200 font-semibold">
                        {items.title}
                      </p>
                      <p className="text-xl text-zinc-400 font-semibold">
                        {items.desc.slice(0, 100)}...
                      </p>
                    </Link>
                    <div className="flex justify-between items-center">
                      <div className="text-4xl text-zinc-100 font-semibold">
                        &#8377;{items.price}
                      </div>
                      <button
                        className="w-14 bg-red-100 hover:bg-red-200 text-red-600 h-14 text-4xl flex justify-center items-center rounded"
                        onClick={() => removeCartBook(items._id)}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Amount and Place Order on the Right */}
          <div className="w-full md:w-2/5 flex justify-end md:justify-start flex-col pt-[6rem]">
            <div className="bg-zinc-800 h-auto md:h-84 mx-auto w-full max-w-[20rem] p-6 rounded-md space-y-6">
              <h1 className="text-6xl font-semibold text-zinc-200 text-center">
                Total Amount
              </h1>
              <div className="flex justify-between w-full text-zinc-400 font-semibold px-4 text-2xl">
                <p>{cartBooks.length} books</p>
                <p>&#8377; {total}</p>
              </div>
              <button
                className="bg-blue-400 p-4 text-zinc-950 font-semibold text-2xl w-full rounded-md hover:bg-blue-500 outline-none transition-all duration-300"
                onClick={placeOrder}
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
