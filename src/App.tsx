import Home from "./Pages/Home/Home"
import { Routes , Route} from "react-router-dom";
import Product from "./Pages/ProductList/Product";
import ProductSelling from "./Pages/ProductSelling/ProductSelling";
import AuthProvider from "./AuthProvider";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products/:productId" element={<Product/>}/>
          <Route path="/selling" element={<ProductSelling/>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
