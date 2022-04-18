import React, { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import ProductCategory from "./components/ProductCategory";
import ProductRow from "./components/ProductRow";
import { inStockItems, searchedItems } from "./helper/utils";

const DATA_FROM_API = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

const transformedData = DATA_FROM_API.reduce((prev, curr, index) => {
  if (index === 1) {
    return [prev.category, prev, curr];
  }

  if (!!prev[index].category && prev[index].category !== curr.category) {
    return [...prev, curr.category, curr];
  }

  return [...prev, curr];
});

function App() {
  const [items, setItems] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleInStockStatusChange = (value) => {
    setInStock(value);
  };

  const handleSearchSubmit = (value) => {
    setKeyword(value);
  };

  useEffect(() => {
    setItems(transformedData);
  }, []);

  useEffect(() => {
    if (inStock && keyword) {
      const itemsInStock = inStockItems(transformedData);
      setItems(searchedItems(itemsInStock, keyword));
    } else if (keyword) {
      setItems(searchedItems(transformedData, keyword));
    } else if (inStock) {
      setItems(inStockItems(transformedData, keyword));
    } else {
      setItems(transformedData);
    }
  }, [keyword, inStock]);

  return (
    <div className="App">
      <SearchBar
        inStock={inStock}
        onToggle={handleInStockStatusChange}
        onSearch={handleSearchSubmit}
      />
      <div className="product-table">
        {items.map((item) => {
          return typeof item === "string" ? (
            <ProductCategory key={item}>{item}</ProductCategory>
          ) : (
            <ProductRow key={item.name} item={item} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
