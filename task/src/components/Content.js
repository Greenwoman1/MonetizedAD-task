import { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { getProduct } from "../api/api";
import { all } from "axios";
import ProductTable from "./ProductTable";
import Pagination from "./Pagination";
import Header from "./Header";
import "./content.css"
const Content = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState("");
  const [filteredProducts, setFilteredProducts] = useState("");

  const [filterName, setFilterName] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const [filteredData, setFilteredData] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);

  const [indexOfLastRecord, setIndexOfLastRecord] = useState(
    currentPage * recordsPerPage
  );
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(
    indexOfLastRecord - recordsPerPage
  );

  const [currentRecords, setCurrentRecords] = useState(
    filteredData.slice(indexOfFirstRecord, indexOfLastRecord)
  );
  const [nPages, setNPages] = useState(
    Math.ceil(filteredData.length / recordsPerPage)
  );

  useEffect(() => {
    setCurrentRecords([]);

    console.log(indexOfFirstRecord, indexOfLastRecord);
    setCurrentRecords(
      filteredData.slice(indexOfFirstRecord, indexOfLastRecord)
    );
    console.log(currentRecords.length);
    console.log(
      "current records = ",
      filteredData.slice(indexOfFirstRecord, indexOfLastRecord)
    );
    setNPages(Math.ceil(filteredData.length / recordsPerPage));
  }, [
    filteredData,
    filterName,
    filterPrice,
    indexOfFirstRecord,
    indexOfLastRecord,
  ]);

  useEffect(() => {
    changeNumbers();
  }, [currentPage, currentRecords]);

  const changeNumbers = async () => {
    const newIndexOfLastRecord = currentPage * recordsPerPage;

    
    setIndexOfFirstRecord(newIndexOfLastRecord - recordsPerPage);

    
    setIndexOfLastRecord(newIndexOfLastRecord);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      const fromPathname = location.pathname;
      navigate("/login", { state: { from: fromPathname } });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct();
        console.log(response);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (products) {
      try {
        filterData(products);
      } catch (error) {
        console.error("Error parsing JSON:", error.message);
      }
    }
  }, [products]);

  const filterData = (products) => {
    const allProducts = [];

    if (products && products.products) {
      Object.keys(products.products).forEach((productId) => {
        collectProducts(productId, allProducts, 0);
      });

      setFilteredProducts(allProducts);
      setFilteredData(allProducts);
      console.log(allProducts);
    }
  };

  const collectProducts = (productId, allProducts, parentId) => {
    console.log(productId + "id");

    let product = {};

    if (parentId == 0) {
      product = products.products[productId];
    } else {
      product = products.products[parentId].linkedProducts[productId];
    }
    if (product && !allProducts.some((p) => p.id === productId)) {
      console.log(`Adding product to allProducts: ${JSON.stringify(product)}`);

      console.log(product);

      if (product) {
        allProducts.push({
          id: productId,
          name: product.name,
          price: product.price,
        });
      }
    }

    if (product.linkedProducts) {
      console.log("ima ");
      Object.keys(product.linkedProducts).forEach((linkedProductId) => {
        console.log(1);
        collectProducts(linkedProductId, allProducts, productId);
      });
    }
  };

  const handleRemoveFilter = () => {
    setFilteredData(filteredProducts);
    
    setFilterName("");
    setFilterPrice("");
  };

  const handleFilter = async () => {
    if (!filteredData || !setFilteredData.length) {
      
      return;
    }

    let filteredResults = [...filteredData];

    
    if (filterName) {
      filteredResults = filteredResults.filter((product) =>
        product.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    
    if (filterPrice) {
      filteredResults = filteredResults.filter(
        (product) => parseFloat(product.price) === parseFloat(filterPrice)
      );
    }

    await setFilteredData(filteredResults);
  };

  return (
    <div >
        <Header></Header>
        <div className="content">
      <div>
        <label>
          Filter by Name:
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>
      <div>
        <label>
          Filter by Price:
          <input
            type="text"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          />
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>

      <div>
        <button onClick={handleRemoveFilter}>Remove Filter</button>
      </div>

      {filteredProducts && (
        <div>
          <ProductTable products={currentRecords}></ProductTable>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default Content;
