import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // Import CSS file for styling

const Home = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        unit: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const searchAndFilterProducts = async () => {
        try {
            let url = `http://localhost:8080/api/products`;

            if (searchTerm) {
                url += `?name=${searchTerm}`;
            }

            if (categoryFilter) {
                url += searchTerm ? `&category=${categoryFilter}` : `?category=${categoryFilter}`;
            }

            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error('Error searching and filtering products:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${productId}`);
            fetchProducts(); // Fetch the updated list of products after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleInputChange = (event) => {
        setNewProduct({
            ...newProduct,
            [event.target.name]: event.target.value
        });
    };

    const addProduct = async () => {
        try {
            await axios.post('http://localhost:8080/api/products', newProduct);
            fetchProducts(); // Fetch the updated list of products after addition
            setNewProduct({
                name: '',
                price: '',
                category: '',
                unit: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Product Page</h1>

            <div className="form-container">
                <h2 className="subtitle">Product Form</h2>
                <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Name" />
                <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" />
                <select name="category" value={newProduct.category} onChange={handleInputChange}>
                    <option value="Finished Product">Finished Product</option>
                    <option value="Components">Components</option>
                    <option value="Raw Materials">Raw Materials</option>
                </select>
                <input type="text" name="unit" value={newProduct.unit} onChange={handleInputChange} placeholder="Unit" />
                <button className="btn" onClick={addProduct}>Add / Update</button>
            </div>

            <div className="search-filter-container">
                <h2 className="subtitle">Search and Filter</h2>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Name"
                />
                <input
                    type="text"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    placeholder="Filter by Category"
                />
                <button className="btn" onClick={searchAndFilterProducts}>Search / Filter</button>
            </div>

            <table className="product-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Unit</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.unit}</td>
                        <td>
                            <button className="btn btn-delete" onClick={() => deleteProduct(product.id)}>Delete</button>
                            <button className="btn btn-edit" onClick={() => setNewProduct(product)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
