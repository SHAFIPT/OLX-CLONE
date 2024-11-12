import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Components/Footer/Footer";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {db , storage} from '../../firebase' 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingGif from '../../assets/loading.gif';


interface ErrorType {
    title?:string,
    category?:string,
    price?:string,
    description?:string
}

const ProductSelling = () => {
    
    const [title , setTite] = useState("");
    const [category , setCategory] = useState("");
    const [price , setPrice] = useState("");
    const [description , setDescription] = useState("");
    const [image , setImage] = useState("");
    const [imageFile , setImageFile] = useState<File | null>(null);
    const [loading , setLoading] = useState(false);
    const [errors , setError] = useState<ErrorType>({})

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: Partial<ErrorType> = {};

        if(!title) newErrors.title = "Title is required";
        if(!category) newErrors.category = "Category is required";
        if (!price) {
            newErrors.price = "Price is required";
        } else if (isNaN(Number(price)) || parseFloat(price) <= 0) {
            newErrors.price = "Price must be a positive number";
        } else if (/[^0-9.]/.test(price)) {
            newErrors.price = "Price must not contain special characters or letters";
        }
        if(!description){
            newErrors.description = "Description is required";
        }
        setError(newErrors)
        return Object.keys(newErrors).length === 0

    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(file){
            setImage(URL.createObjectURL(file))
            setImageFile(file)
        }
    }

    const handleDivClick = () => {
        document.getElementById("imageUpload")?.click();
      };

    const handleSubmit = async () => {
        if(!validateForm())return;
        try {
            setLoading(true)

            let imageUrl = "";

            if(imageFile){
                const storageRef = ref(storage , `product_images/${imageFile.name}`)
                await uploadBytes(storageRef, imageFile)

                imageUrl = await getDownloadURL(storageRef)
            }

            const productRef = collection(db , "products");
            await addDoc(productRef , {
                title : title,
                category : category,
                price : price,
                description : description,
                imageUrl : imageUrl
            });

            setTite("")
            setCategory("")
            setPrice("")
            setDescription("")
            setImage("")
            setImageFile(null);
            
            setTimeout(()=>{
                navigate('/')     
            },500)
            
        } catch (error) {
           console.error("Error adding document: ", error);
        }finally{
            setLoading(false)
        }
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


        {/* Navigation */}
        <div className="nav_sell h-[65px] bg-[#f7f8f9] flex items-center px-4 sm:px-8">
            <FontAwesomeIcon 
                icon={faArrowLeft} 
                className="text-[#002f34] text-xl cursor-pointer"
                onClick={() => window.history.back()}
            />
        </div>

        {/* Page Title */}
        <p className="w-full flex justify-center text-[24px] sm:text-[30px] font-semibold p-2 text-center">
          Post your Ad
        </p>

        {/* Main Form Container */}
        <div className="selling_page border w-[90%] sm:w-[80%] md:w-[600px] lg:w-[500px] h-auto mx-auto rounded-[4px] mb-24 bg-white">
            <h1 className="text-left p-4 sm:p-7 text-[16px] sm:text-[18px] font-medium">
              CREATE AN AD
            </h1>

            {/* Form Fields */}
            <div className="inputFields px-4 sm:px-8 p-1">
                {/* Title Input */}
                <div className="relative mb-4">
                    <input 
                        type="text" 
                        value={title}
                        placeholder="Enter the title"
                        onChange={(e) => setTite(e.target.value)} 
                        className="w-full sm:w-[420px] mb-4 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#002f34]"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Categories Input */}
                <div className="relative mb-4">
                    <input 
                        type="text" 
                        placeholder="Select Categories" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full sm:w-[420px] p-2 mb-4 border rounded focus:outline-none focus:ring-1 focus:ring-[#002f34]"
                    />
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                    <FontAwesomeIcon 
                        icon={faChevronDown} 
                        className="absolute right-4 sm:right-8 top-5 transform -translate-y-1/2 text-[#002f34] cursor-pointer text-lg"
                    />
                </div>

                {/* Price Input */}
                <div className="relative mb-4">
                    <input 
                        type="text" 
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}  
                        className="w-full sm:w-[420px] mb-4 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#002f34]"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                {/* Description Input */}
                <div className="relative mb-4">
                    <textarea 
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full sm:w-[420px] h-[123px] mb-4 p-2 border rounded resize-none focus:outline-none focus:ring-1 focus:ring-[#002f34]"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Image Upload */}
                <div className="relative mb-4">
                    <div 
                        onClick={handleDivClick} 
                        className="w-full sm:w-[420px] border h-[123px] rounded bg-gray-50 flex items-center justify-center"
                    style={{
                        backgroundImage: image ? `url(${image})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width : '420px',
                        height : '200px'
                    }}
                >
                        {!image && <span className="text-gray-400">Upload Image</span>}
                    </div>
                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="imageUpload"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                </div>

                {/* Submit Button */}
                <div className="button mb-6 flex justify-center sm:justify-start">
                    <button onClick={handleSubmit} className="w-full sm:w-auto px-8 py-2 border rounded-[4px] bg-slate-500 text-white hover:bg-slate-600 transition-colors duration-200">
                        Post Now
                    </button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  );
};

export default ProductSelling;