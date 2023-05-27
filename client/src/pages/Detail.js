import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import CountryCard from "./CountryCard";

const Detail = () => {
    const location = useLocation();
    const country = location.state?.country;
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState(country.region);
    const [populationRange, setPopulationRange] = useState(getPopulationRange(country.population));

    function getPopulationRange(population) {
        if (population >= 0 && population <= 5000000) {
            return '0-5';
        } else if (population > 5000000 && population <= 10000000) {
            return '5-10';
        } else if (population > 10000000 && population <= 50000000) {
            return '10-50';
        } else if (population > 50000000 && population <= 100000000) {
            return '50-100';
        } else if (population > 100000000) {
            return '>100';
        }
    }

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
                setFilteredCountries(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const applyFiltersAndSort = () => {
            let filtered = countries;

            if (searchQuery) {
                filtered = filtered.filter((country) => {
                    const name = country.name?.common?.toLowerCase() || '';
                    const region = country.region?.toLowerCase() || '';
                    const subregion = country.subregion?.toLowerCase() || '';

                    return name.includes(searchQuery) || region.includes(searchQuery) || subregion.includes(searchQuery);
                });
            }

            if (populationRange) {
                filtered = filtered.filter((country) => {
                    const population = country.population || 0;

                    if (populationRange === '0-5') {
                        return population >= 0 && population <= 5000000;
                    } else if (populationRange === '5-10') {
                        return population > 5000000 && population <= 10000000;
                    } else if (populationRange === '10-50') {
                        return population > 10000000 && population <= 50000000;
                    } else if (populationRange === '50-100') {
                        return population > 50000000 && population <= 100000000;
                    } else if (populationRange === '>100') {
                        return population > 100000000;
                    }

                    return true;
                });
            }

            setFilteredCountries(filtered);
        };
    }, [countries, searchQuery, populationRange]);
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'justify',
            border: '1px solid #ccc',
            padding: '20px',
        },
        content: {
            marginRight: '20px',
            border: '2px solid #ccc',
            borderRadius:  '5px',
            padding: '20px',
        },
        image: {
            maxWidth: '400px'
        },
        heading: {
            fontSize: '24px',
            marginBottom: '10px',
        },
        label: {
            fontWeight: 'bold',
        },
        relatedCountries: {
            flex: '1',
            right: 0
        },
        relatedCountriesHeading: {
            fontSize: '24px',
            marginBottom: '10px',
        },
    };

    return (
        <div className="container" style={styles.container}>
            <div style={styles.content}>
                <h2 style={styles.heading}>{country.name.common}</h2>
                <p>
                    <strong style={styles.label}>Independent: </strong>
                    {country.independent ? 'Yes' : 'No'}
                </p>
                <p>
                    <strong style={styles.label}>Status: </strong>
                    {country.status}
                </p>
                <p>
                    <strong style={styles.label}>UN Member: </strong>
                    {country.unMember ? 'Yes' : 'No'}
                </p>
                <p>
                    <strong style={styles.label}>Capital: </strong>
                    {country.capital}
                </p>
                <p>
                    <strong style={styles.label}>Alt Spellings: </strong>
                    {country.altSpellings}
                </p>
                <p>
                    <strong style={styles.label}>Region: </strong>
                    {country.region}
                </p>
                <p>
                    <strong style={styles.label}>Subregion: </strong>
                    {country.subregion}
                </p>
                <p>
                    <strong style={styles.label}>Languages: </strong>
                    {Object.values(country.languages)}
                </p>
                <p>
                    <strong style={styles.label}>Latlng: </strong>
                    {country.latlng}
                </p>
                <p>
                    <strong style={styles.label}>Landlocked: </strong>
                    {country.landlocked ? 'Yes' : 'No'}
                </p>
                <p>
                    <strong style={styles.label}>Area: </strong>
                    {country.area}
                </p>
                <p>
                    <strong style={styles.label}>Demonyms: </strong>
                    {Object.values(country.demonyms).join(', ')}
                </p>
                <p>
                    <strong style={styles.label}>Flag: </strong>
                    {country.flag}
                </p>
                <p>
                    <strong style={styles.label}>Maps: </strong>
                    <a href={country.maps.googleMaps}>Google Maps</a>,{' '}
                    <a href={country.maps.openStreetMaps}>OpenStreetMaps</a>
                </p>
                <p>
                    <strong style={styles.label}>Population: </strong>
                    {country.population}
                </p>
                <p>
                    <strong style={styles.label}>Car: </strong>
                    {country.car.signs.join(', ')} (Driving on the {country.car.side} side)
                </p>
                <p>
                    <strong style={styles.label}>Timezones: </strong>
                    {country.timezones}
                </p>
                <p>
                    <strong style={styles.label}>Continents: </strong>
                    {country.continents}
                </p>
                <p>
                    <strong style={styles.label}>Flags: </strong>
                    <img style={styles.image} src={country.flags.png} alt="Flag" />
                </p>
                <p>
                    <strong style={styles.label}>Coat of Arms: </strong>
                    <img style={styles.image} src={country.coatOfArms.png} alt="Coat of Arms" />
                </p>
                <p>
                    <strong style={styles.label}>Start of Week: </strong>
                    {country.startOfWeek}
                </p>
                <p>
                    <strong style={styles.label}>Capital Info: </strong>
                    Latitude: {country.capitalInfo.latlng[0]}, Longitude: {country.capitalInfo.latlng[1]}
                </p>
            </div>
            <div style={styles.relatedCountries}>
                <h1 style={styles.relatedCountriesHeading}>Related Countries</h1>
                {filteredCountries.slice(0, 5).map((country) => (
                    <CountryCard key={country.name.official} country={country} />
                ))}
            </div>
        </div>
    );
};

export default Detail;
