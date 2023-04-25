import React, { useState, useEffect } from "react";
import "./countryinfo.css"; // Import the CSS file for styling

const Countryinfo = ({ countryName }) => {
    const [countryInfo, setCountryInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountryInfo = async () => {
            try {
                const response = await fetch(
                    `https://restcountries.com/v3.1/name/${countryName}`
                );
                const data = await response.json();
                if (response.ok) {
                    if (data && data.length > 0) {
                        setCountryInfo(data[0]);
                        setError(null);
                    } else {
                        setError("Country not found");
                    }
                } else {
                    setError("Country not found");
                }
                setIsLoading(false);
            } catch (error) {
                setError("Error fetching country information");
                setIsLoading(false);
            }
        };
        fetchCountryInfo();
    }, [countryName]);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!countryInfo) {
        return null;
    }

    return (
        <div className="container">
            <h2 className="heading">{countryInfo.name.common}</h2>
            <ul className="info-list">
                <li className="info-item">
                    <span className="info-label">Capital:</span>{" "}
                    {countryInfo.capital}
                </li>
                <li className="info-item">
                    <span className="info-label">Population:</span>{" "}
                    {countryInfo.population}
                </li>
                <li className="info-item">
                    <span className="info-label">Region:</span> {countryInfo.region}
                </li>
                <li className="info-item">
                    <span className="info-label">Subregion:</span>{" "}
                    {countryInfo.subregion}
                </li>
                <li className="info-item">
                    <span className="info-label">Area:</span> {countryInfo.area} km²
                </li>
                <li className="info-item">
                    <span className="info-label">Languages:</span>{" "}
                    {Object.values(countryInfo.languages).join(", ")}
                </li>
                <li className="info-item">
                    <span className="info-label">Currencies:</span>{" "}
                    {Object.values(countryInfo.currencies).map(currency => currency.name).join(", ")}
                </li>
                <li className="info-item">
                    <span className="info-label">Country Code:</span>{" "}
                    {countryInfo.cca2}
                </li>
                <li className="info-item">
                    <span className="info-label">Top-level Domains:</span>{" "}
                    {countryInfo.tld.join(", ")}
                </li>
                <li className="info-item">
                    <span className="info-label">Timezones:</span>{" "}
                    {countryInfo.timezones.join(", ")}
                </li>
                <li className="info-item">
                    <span className="info-label">Latitude/Longitude:</span>{" "}
                    {countryInfo.latlng.join(", ")}
                </li>
            </ul>
        </div>
    );
};

export default Countryinfo;
