"use client";
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // your firebase.js config
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  // Fetch products in real time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  // Delete a product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
    }
  };

  // Update product
  const handleUpdate = (id) => {
    window.location.href = `/update-product/${id}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products List</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Availability</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.availability ? "Yes" : "No"}</td>
                <td>${product.price}</td>
                <td>
                  <button onClick={() => handleUpdate(product.id)}>Update</button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
