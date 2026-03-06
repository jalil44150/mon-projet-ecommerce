import React, { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // 1. Récupérer les produits de l'API au chargement
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // 2. Ajouter au panier
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // 3. Calculer le total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Mon E-commerce 🛒</h1>

      <div
        style={{
          backgroundColor: "#f4f4f4",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>Panier : {cart.length} articles</h3>
        <p>
          Total : <strong>{total.toFixed(2)} €</strong>
        </p>
        <button onClick={() => setCart([])}>Vider le panier</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ height: "100px" }}
            />
            <h4
              style={{ fontSize: "14px", height: "40px", overflow: "hidden" }}
            >
              {product.title}
            </h4>
            <p>{product.price} €</p>
            <button
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
