import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom/dist/umd/react-router-dom.development";
import { getProduct } from "../api/api";
import { all } from "axios";
const Content = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [products, setProducts] = useState("")














    
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            console.log(localStorage.getItem('token'), "hgjklč")
            const fromPathname = location.pathname;
            navigate("/login", { state: { from: fromPathname } });
    
        }
        
    }, [location.pathname, navigate])

    


    useEffect( ()=>{
        const fetchData = async () => {
            try {
              const response = await getProduct();
              setProducts(response)
              console.log(response)
            } catch (error) {
              console.error("Error fetching data:", error.message);
            }
          };
        
          fetchData();

    })

    useEffect(()=>{

        filterData(products);
    }, [products])

    const filterData = (products) => {

        const allProducts = Object.values(products);
        console.log(allProducts)




    }



return(
    <div>
        

    </div>


)


}

export default Content;