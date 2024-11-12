// import Footer from "../../Components/Footer/Footer"
import { useContext, useEffect, useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import avathar from '../../assets/avatar.png'
import Footer from "../../Components/Footer/Footer";
import Navbar2 from "../../Components/Navbar2/Navbar2";
import { ProductArray } from "../../Components/Cards/Card";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import {db} from '../../firebase'
import loadingGif from '../../assets/loading.gif';
import { AuthContext } from "../../AuthContext";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Product = () => {

  const { user} = useContext(AuthContext) || { user: null, loginWithGoogle: () => {} };
  const {productId} = useParams<{productId : string}>();
  const [loading ,setLoading] = useState<boolean>(true)
  const [product ,setProducts] = useState <ProductArray | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 13;
  const imagesPerView = Math.floor((830 - 100) / (60 + 20)); // Calculate how many images fit in view
  const maxIndex = totalImages - imagesPerView;

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // When at the start, immediately jump to end
        return maxIndex;
      }
      return Math.max(prevIndex - 1, 0);
    });
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        // When at the end, immediately jump to start
        return 0;
      }
      return Math.min(prevIndex + 1, maxIndex);
    });
  };

  useEffect(()=>{
    const fetchData = async () => {
      try {
        if(productId){
          const docRef = doc(db, 'products',productId);
          const docSnap = await getDoc(docRef)
          if(docSnap.exists()){
            setProducts({id : docSnap.id , ...docSnap.data()} as ProductArray);
          }else{
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching product! :", error)
      }finally{
        setLoading(false)
      }
    }

    fetchData();
  },[productId])

  return (
    <div>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <img src={loadingGif} alt="Loading..." className="w-16 h-16" />
          </div>
        </div>
      )}
  
      <Navbar />
      <Navbar2 />
  
      {product && (
        <div className="container flex flex-col lg:flex-row justify-between gap-6 p-4 md:p-8 lg:p-32 bg-[#f2f4f5]">
          {/* Left column */}
          <div className="left_row flex flex-col w-full lg:w-[60%]">
            {/* Product Image */}
            <div className="product_imge w-full border h-[300px] md:h-[400px] lg:h-[470px] bg-white">
              <img
                src={product.imageUrl || "default-image.jpg"}
                alt={product.title}
                className="object-contain w-full h-full cursor-pointer border-2"
              />
            </div>
  
            {/* Image Slider */}
            <div className="sub_imgages w-full border h-[80px] flex items-center relative bg-white mt-4">
              <button
                onClick={handleLeftClick}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[60px] z-10 bg-gray-400 hover:bg-gray-500 text-white rounded cursor-pointer transition-colors duration-200 flex items-center justify-center"
                aria-label="Previous image"
              >
                <span className="text-xl">&lt;</span>
              </button>
  
              <div className="overflow-hidden mx-5 flex-1">
                <div
                  className="imgaes_container flex gap-10 transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 70}px)` }}
                >
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                  <img key="" src={product.imageUrl}  className="w-[60px] h-[60px] object-cover border flex-shrink-0 cursor-pointer"/>
                </div>
              </div>
  
              <button
                onClick={handleRightClick}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 h-[60px] z-10 bg-gray-400 hover:bg-gray-500 text-white rounded cursor-pointer transition-colors duration-200 flex items-center justify-center"
                aria-label="Next image"
              >
                <span className="text-xl">&gt;</span>
              </button>
            </div>
  
            {/* Description */}
            <div className="description mt-6 border p-3 h-auto min-h-[200px] bg-white">
              <p className="font-bold text-lg mb-2 p-3 text-[19px]">Description</p>
              <h1 className="w-full lg:w-[720px] text-gray-700 p-3 font-normal">{product.description}</h1>
            </div>
          </div>
  
          {/* Right column */}
          <div className="right_row flex flex-col lg:w-[40%] gap-4">
            {/* Price box */}
            <div className="Price_Box border w-full h-auto min-h-[160px] p-5 bg-white">
              <p className="text-[38px] font-medium">₹{product.price}</p>
              <h1>{product.title}</h1>
              <h3>{product.category}</h3>
            </div>
  
            {/* User details */}
            <div className="user_Details border w-full h-auto min-h-[160px] p-5 bg-white flex items-start gap-4">
              <img src={avathar} alt="Avatar" className="object-cover w-[95px] h-[85px] flex-shrink-0" />
              <div className="flex flex-col justify-between h-full w-full">
                <p className="text-[25px] font-medium py-[20px]">Seller Name</p>
                <div className="mt-2 w-full">
                  <button className="w-full py-2 border-2 border-gray-600 text-black rounded hover:border-[#002f34] hover:bg-[#f1f1f1] font-medium">
                    Chat With Seller
                  </button>
                </div>
              </div>
            </div>
  
            {/* Posted in */}
            <div className="Poseted_in border w-full h-auto min-h-[100px] p-5 bg-white mt-9">
              <p className="text-[24px] font-medium">Posted in</p>
              <h1 className="text-[15px] p-1">Place and Location</h1>
            </div>
  
            {/* Google Map */}
            <div className="google_map border w-full h-auto min-h-[280px] p-5 bg-white mt-2">
              <LoadScript googleMapsApiKey="AIzaSyDM8i8V9KPHxEAIqfXdbi1ZYydnWYkDHVA">
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '240px' }}
                  center={{ lat: 28.7041, lng: 77.1025 }} // Set default center (you can replace this with dynamic location data)
                  zoom={15}
                >
                  {/* Add Marker */}
                  <Marker position={{ lat: 28.7041, lng: 77.1025 }} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      )}
  
      <Footer />
    </div>
  );
};

export default Product;
