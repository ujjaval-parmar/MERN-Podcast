import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { apiGanerator } from "./helper/apiGanerator";
import { login } from "./redux/authSlice";
import { setUser } from "./redux/userSlice";
import { setMainLoading } from "./redux/mainLoadingSlice";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

const App = () => {

  const { isMainLoading } = useSelector(state => state.mainLoading);

  const dispatch = useDispatch();


  const navigate = useNavigate();


  const [error, setError] = useState(null);


  const checkToken = async () => {
    try {
      setError(null);
      dispatch(setMainLoading(true));

      const response = await apiGanerator('user/check-token', "GET", true);



      const data = await response.json();


      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch(setMainLoading(false));
      dispatch(setUser({ user: data.data }));
      dispatch(login());




    } catch (err) {
      console.log(err);
      // toast.error(err.message);
      setError(err.message);
      dispatch(setMainLoading(false));
      // navigate('/');

    }
  }

  useEffect(() => {

    checkToken();


  }, [])







  return (
    <div className="relative">

      <ToastContainer />

      {isMainLoading ?
        <div className="min-h-screen  px-4 flex items-center justify-center bg-green-100 relative">
          <div className="w-[260px] h-[260px] rounded-full border-[10px] border-green-800 border-r-0 border-l-0 animate-spin ">

          </div>
          <p className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-bold text-gray-700 tracking-wider text-lg">Loading.....</p>
        </div>
        :
        <Outlet />}

      <AudioPlayer />

    </div>
  )
}


export default App