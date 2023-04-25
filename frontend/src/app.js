import React, { useState, useEffect } from "react";
import Countryinfo from "././countryinfo"; // Import the Countryinfo component
import "./app.css"; // Import the CSS file for styling

const App = () => {
    const [countryName, setCountryName] = useState("");
    const [showCountryInfo, setShowCountryInfo] = useState(false); // Add a state to control when to show Countryinfo component

    useEffect(() => {
        // Automatically submit the form when countryName is entered
        if (countryName !== "") {
            setShowCountryInfo(true);
        }
    }, [countryName]);

    const handleChange = (event) => {
        setCountryName(event.target.value);
    };

    return (
        <div className="container">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="countryName" className="label">
                    Enter Country Name:
                </label>
                <input
                    type="text"
                    id="countryName"
                    value={countryName}
                    onChange={handleChange}
                    className="input"
                />
            </form>
            {showCountryInfo && (
                // Render Countryinfo component only when showCountryInfo is true
                <Countryinfo countryName={countryName} />
            )}
        </div>
    );
};


export default App;
