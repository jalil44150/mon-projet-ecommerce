import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [saisie, setSaisie] = useState("");
  const [resultat, setResultat] = useState(null);
  const [chargement, setChargement] = useState(false);

  useEffect(function () {
    const heure = new Date().getHours();
    if (heure >= 19 || heure <= 7) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  useEffect(function () {
    const memoire = localStorage.getItem("derniere_meteo");
    if (memoire) {
      const objet = JSON.parse(memoire);
      if (objet && objet.nom) setResultat(objet);
    }
  }, []);

  function chercherMeteo(nomVoulu) {
    const villeCible = nomVoulu || saisie;
    if (villeCible === "") return alert("Ecris une ville !");

    setChargement(true);

    fetch("https://dummyjson.com/test")
      .then((reponse) => reponse.json())
      .then(() => {
        const tempHasard = Math.floor(Math.random() * 35) - 5;
        const cielPossibles = ["Soleil", "Nuageux", "Pluie", "Neige"];
        let cielHasard =
          tempHasard <= 0
            ? "Neige"
            : cielPossibles[Math.floor(Math.random() * 3)];

        const maMeteo = {
          nom: villeCible,
          temperature: tempHasard,
          ciel: cielHasard,
        };

        setResultat(maMeteo);
        localStorage.setItem("derniere_meteo", JSON.stringify(maMeteo));
        setChargement(false);
      })
      .catch(() => {
        alert("Erreur de connexion");
        setChargement(false);
      });
  }

  function localiser() {
    if (navigator.geolocation) {
      setChargement(true);
      navigator.geolocation.getCurrentPosition(function (position) {
        fetch(
          "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
            position.coords.latitude +
            "&longitude=" +
            position.coords.longitude +
            "&localityLanguage=fr"
        )
          .then((reponse) => reponse.json())
          .then((infos) => chercherMeteo(infos.city || infos.locality))
          .catch(() => chercherMeteo("Ma Position"));
      });
    }
  }

  function afficherSymbole(temps) {
    if (temps === "Soleil")
      return <span dangerouslySetInnerHTML={{ __html: "&#x263C;" }} />;
    if (temps === "Pluie")
      return <span dangerouslySetInnerHTML={{ __html: "&#x26C6;" }} />;
    if (temps === "Neige")
      return <span dangerouslySetInnerHTML={{ __html: "&#x2744;&#xFE0E;" }} />;
    return <span dangerouslySetInnerHTML={{ __html: "&#x2601;&#xFE0E;" }} />;
  }

  function donnerConseilTenue() {
    if (!resultat) return "";
    const temperature = resultat.temperature;
    const ciel = resultat.ciel;

    if (ciel === "Pluie") return "Prenez votre parapluie !";
    if (ciel === "Neige" || temperature <= 0)
      return "Doudoune et gants obligatoires";
    if (temperature < 12) return "Mettez un gros manteau";
    if (temperature >= 12 && temperature < 20) return "Une petite veste suffit";
    return "T-shirt et lunettes de soleil !";
  }

  return (
    <div className="weather-card">
      <div className="search-section">
        <span
          onClick={() => chercherMeteo()}
          style={{
            marginRight: "10px",
            fontSize: "20px",
            color: "var(--gris)",
            cursor: "pointer",
          }}
          dangerouslySetInnerHTML={{ __html: "&#x2315;" }}
          title="Rechercher"
        ></span>

        <input
          className="search-input"
          value={saisie}
          onChange={(evenement) => setSaisie(evenement.target.value)}
          onKeyPress={(evenement) =>
            evenement.key === "Enter" && chercherMeteo()
          }
          placeholder="Rechercher"
        />

        <button
          onClick={localiser}
          className="geo-btn"
          title="Me localiser"
          dangerouslySetInnerHTML={{ __html: "&#x2316;" }}
        ></button>
      </div>

      {resultat ? (
        <>
          <div className="location-section">
            <h2>
              {resultat.nom ? resultat.nom.toUpperCase() : "VILLE"} · FRANCE
            </h2>
          </div>

          <hr className="divider" />

          <div className="weather-main">
            <div>
              <h1 className="temperature">{resultat.temperature}°C</h1>
              <p style={{ color: "var(--gris)" }}>{resultat.ciel}</p>
            </div>
            <div style={{ fontSize: "65px", color: "var(--gris)" }}>
              {afficherSymbole(resultat.ciel)}
            </div>
          </div>

          <hr className="divider" />

          <div className="suggestion-section">
            <p>{donnerConseilTenue()}</p>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "10px" }}>
          {chargement ? "Chargement..." : "Entrez une ville"}
        </div>
      )}
    </div>
  );
}
