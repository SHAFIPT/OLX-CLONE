// import avathar from '../../assets/avatar.png'
import {db} from '../../firebase'
import { collection, getDocs } from "firebase/firestore";
import loadingGif from '../../assets/loading.gif';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export interface ProductArray {
  id : string,
  title : string,
  category : string,
  price : number,
  description : string,
  imageUrl : string
}

const Card = () => {
  
  const [products , setProducts] = useState<ProductArray[]>([]);
  const [loading , setLoading] = useState<boolean>(true);

  const navigate = useNavigate()

  useEffect(()=> {
    const fetchProduct = async () => {
      try {
        const querySnapShort = await getDocs(collection(db, 'products'))
        const productList : ProductArray[] = []
        querySnapShort.forEach((doc)=> {
          productList.push({...doc.data(), id : doc.id} as ProductArray);
        });
        setProducts(productList)
      } catch (error) {
        console.error("Error fetching product : '", error)
      }finally{
        setLoading(false)
      }
    };

    fetchProduct();
  },[])

  const handleProductDetails = (productId : string) =>{
    navigate(`/products/${productId}`)
  }

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


     <div className="px-4 sm:px-6 md:px-8 lg:px-40 py-4 sm:py-6 mt-4 sm:mt-7">
      <p className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 px-2 sm:px-0">
        Fresh recommendations
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {products.map((product) => (
          <div 
            onClick={() => handleProductDetails(product.id)}
            key={product.id} 
            className="product_list border cursor-pointer border-gray-300 rounded-[4px] shadow-md p-2 sm:p-3 md:p-4 hover:shadow-lg transition-shadow"
          >
            <img 
              src={product.imageUrl || "default-image.jpg"} 
              alt=''
              className="w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover rounded-md mb-2 sm:mb-3"
              
            />
            <div className="text-left">
              <h1 className="text-base sm:text-lg font-semibold mb-1"><span>₹ </span>{product.price}</h1>
              <h2 className="text-[18px] sm:text-[17px] font-medium text-gray-600">{product.title}</h2>
              <h2 className="text-sm sm:text-[15px] font-bold text-gray-600">{product.category}</h2>
              <h2 className="text-sm sm:text-base text-gray-600">{product.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default Card;