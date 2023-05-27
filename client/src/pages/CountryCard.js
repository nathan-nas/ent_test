import React from 'react';
import {useNavigate} from "react-router-dom";


const CountryCard = ({ country }) => {

    const navigate = useNavigate();
    const handleViewDetails = () => {
        navigate('/detail', { state: { country } });
    };
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        maxWidth: '300px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '8px',
    };

    const textStyle = {
        marginBottom: '4px',
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
        marginBottom: '8px',
        borderRadius: '4px',
    };

    const buttonStyle = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
    };

    return (
        <div style={cardStyle}>
            <p style={titleStyle}>{country.name.official}</p>
            <p style={textStyle}>Capital: {country.capital}</p>
            <p style={textStyle}>Population: {country.population}</p>
            <img style={imageStyle} src={country.flags.png} alt="flag" />
            <p style={textStyle}>Region: {country.region}</p>
            <p style={textStyle}>Subregion: {country.subregion}</p>
            <p style={textStyle}>Continent: {country.continents}</p>
            <p style={textStyle}>Timezones: {country.timezones}</p>
            <p style={textStyle}>Status: {country.status}</p>
            <p style={textStyle}>Car side: {country.car.side}</p>
            <button style={buttonStyle} onClick={handleViewDetails}>
                View Details
            </button>
        </div>
    );
};

export default CountryCard;
