import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from './CountryCard';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(50);
    const [totalPages] = useState(5);
    const [populationRange, setPopulationRange] = useState('');
    const [sortType, setSortType] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const populationRangeOptions = [
        { value: '', label: 'All' },
        { value: '0-5', label: '0-5 million' },
        { value: '5-10', label: '5-10 million' },
        { value: '10-50', label: '10-50 million' },
        { value: '50-100', label: '50-100 million' },
        { value: '>100', label: 'Greater than 100 million' },
    ];

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

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const handlePopulationRangeChange = (event) => {
        const range = event.target.value;
        setPopulationRange(range);
    };

    const handleSort = (type) => {
        if (type === sortType) {
            // Toggle the sort order if the same type is selected
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set the sort type and default to ascending order
            setSortType(type);
            setSortOrder('asc');
        }
    };

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
                        return population >= 0 && population <= 5;
                    } else if (populationRange === '5-10') {
                        return population > 5 && population <= 10;
                    } else if (populationRange === '10-50') {
                        return population > 10 && population <= 50;
                    } else if (populationRange === '50-100') {
                        return population > 50 && population <= 100;
                    } else if (populationRange === '>100') {
                        return population > 100;
                    }

                    return true;
                });
            }

            // Apply sorting
            if (sortType === 'population') {
                filtered.sort((a, b) => {
                    const populationA = a.population || 0;
                    const populationB = b.population || 0;

                    if (sortOrder === 'asc') {
                        return populationA - populationB;
                    } else {
                        return populationB - populationA;
                    }
                });
            } else if (sortType === 'name') {
                filtered.sort((a, b) => {
                    const nameA = a.name?.common?.toLowerCase() || '';
                    const nameB = b.name?.common?.toLowerCase() || '';

                    if (sortOrder === 'asc') {
                        return nameA.localeCompare(nameB);
                    } else {
                        return nameB.localeCompare(nameA);
                    }
                });
            }

            setFilteredCountries(filtered);
            setCurrentPage(1);
        };

        applyFiltersAndSort();
    }, [countries, searchQuery, populationRange, sortType, sortOrder]);

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '16px',
        boxSizing: 'border-box',
    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
    };

    const cardContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
        maxWidth: '100%',
    };

    const inputStyle = {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '16px',
        width: '100%',
        maxWidth: '300px',
        boxSizing: 'border-box',
    };

    const paginationStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px',
    };

    const pageItemStyle = {
        padding: '4px 8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        margin: '0 4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    };

    const pageItemActiveStyle = {
        ...pageItemStyle,
        backgroundColor: '#ccc',
    };

    const buttonStyle = {
        padding: '8px 16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        margin: '0 4px',
        cursor: 'pointer',
        fontWeight: 'normal',
    };

    const activeButtonStyle = {
        ...buttonStyle,
        fontWeight: 'bold',
    };

    const pageNumbers = totalPages;

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Country List</h1>
            <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={handleSearch}
                style={inputStyle}
            />
            <select value={populationRange} onChange={handlePopulationRangeChange} style={inputStyle}>
                {populationRangeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div>
                <button
                    onClick={() => handleSort('population')}
                    style={sortType === 'population' ? activeButtonStyle : buttonStyle}
                >
                    Sort by Population
                </button>
                <button
                    onClick={() => handleSort('name')}
                    style={sortType === 'name' ? activeButtonStyle : buttonStyle}
                >
                    Sort by Name
                </button>
            </div>
            <div style={cardContainerStyle}>
                {currentCountries.map((country) => (
                    <CountryCard key={country.name.official} country={country} />
                ))}
            </div>
            <div style={paginationStyle}>
                {Array.from({ length: pageNumbers }).map((_, index) => (
                    <div
                        key={index}
                        style={index + 1 === currentPage ? pageItemActiveStyle : pageItemStyle}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;