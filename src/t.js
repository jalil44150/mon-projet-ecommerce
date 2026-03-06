import React, { useState } from "react";

// 1. IL FAUT BIEN DÉFINIR LE COMPOSANT BOX ICI
const Box = ({ size, backgroundColor, children }) => {
  const dimensions = {
    petit: "50px",
    moyen: "100px",
    grand: "150px"
  };

  const style = {
    width: dimensions[size],
    height: dimensions[size],
    backgroundColor: backgroundColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    margin: "10px",
    fontWeight: "bold",
    borderRadius: "8px"
  };

  return <div style={style}>{children}</div>;
};

// 2. TON COMPOSANT PRINCIPAL
export default function App() {
  const [selectedSize, setSelectedSize] = useState("petit");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [boxes, setBoxes] = useState([]);

  const addBox = () => {
    const newBox = {
      id: Date.now(),
      size: selectedSize,
      color: selectedColor
    };
    setBoxes([...boxes, newBox]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Générateur de carrés</h1>

      <label>Taille : </label>
      <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
        <option value="petit">Petit</option>
        <option value="moyen">Moyen</option>
        <option value="grand">Grand</option>
      </select>

      <label style={{ marginLeft: "10px" }}>Couleur : </label>
      <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
        <option value="blue">Bleu</option>
        <option value="green">Vert</option>
        <option value="gray">Gris</option>
      </select>

      <button onClick={addBox} style={{ marginLeft: "10px" }}>OK</button>

      <hr />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {boxes.map((box) => (
          /* C'est ici que Box est appelé, il doit être défini en haut ! */
          <Box key={box.id} size={box.size} backgroundColor={box.color}>
            {box.size} {box.color}
          </Box>
        ))}
      </div>
    </div>
  );
}