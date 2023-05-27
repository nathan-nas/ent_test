import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BOMView() {
    const [formData, setFormData] = useState({ materials: [] });
    const id = window.location.pathname.split('/')[2];

    useEffect(() => {
        const fetchBOMData = axios.get(`http://localhost:8080/api/bom/${id}`);
        const fetchProductData = axios.get(`http://localhost:8080/api/products/${id}`);
        const fetchMaterialOptions = axios.get('http://localhost:8080/api/products');

        Promise.all([fetchBOMData, fetchProductData, fetchMaterialOptions])
            .then(responses => {
                const bomResponse = responses[0];
                const productResponse = responses[1];
                const materialOptionsResponse = responses[2];

                const { name } = productResponse.data;
                setFormData(prevData => ({
                    ...prevData,
                    finishedProduct: name,
                    materials: bomResponse.data.materials || []
                }));

                const options = materialOptionsResponse.data.map(product => ({
                    value: product.id,
                    label: product.name
                }));
                setFormData(prevData => ({
                    ...prevData,
                    materialOptions: options
                }));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedMaterials = [...formData.materials];
        updatedMaterials[index][name] = value;
        setFormData({ ...formData, materials: updatedMaterials });
    };

    const handleAddMaterial = () => {
        setFormData(prevData => ({
            ...prevData,
            materials: [...prevData.materials, { product: '', quantity: '' }]
        }));
    };


    const handleRemoveMaterial = (index) => {
        const updatedMaterials = [...formData.materials];
        updatedMaterials.splice(index, 1);
        setFormData({ ...formData, materials: updatedMaterials });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form:', formData);

        const formattedData = {
            productId: id,
            materials: formData.materials.map(material => ({
                id: typeof material.product === 'object' ? parseInt(material.product.id) : parseInt(material.product),
                quantity: parseInt(material.quantity)
            }))
        };

        console.log('Formatted data:', formattedData);

        // Send the updated bill of materials data to the backend
        axios.post('http://localhost:8080/api/bom', formattedData)
            .then(response => {
                console.log('BOM updated successfully:', response);
                // Refresh the view or perform any additional actions as needed
            })
            .catch(error => {
                console.error('Error updating BOM:', error);
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '500px' }}>
                <h1 style={{ textAlign: 'center' }}>Bill of Materials</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label>
                            Finished Product:
                            <input
                                type="text"
                                name="finishedProduct"
                                value={formData.finishedProduct}
                                onChange={handleInputChange}
                                disabled
                                style={{ marginLeft: '10px' }}
                            />
                        </label>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Material</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {formData.materials &&
                            formData.materials.map((material, index) => (
                                <tr key={index}>
                                    <td>
                                        <select
                                            name="product"
                                            value={material.id}
                                            onChange={(e) => handleInputChange(e, index)}
                                            style={{ marginRight: '10px' }}
                                        >
                                            <option value="">Select a material</option>
                                            {formData.materialOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={material.quantity}
                                            onChange={(e) => handleInputChange(e, index)}
                                            style={{ marginRight: '10px' }}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMaterial(index)}
                                            style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 10px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        type="button"
                        onClick={handleAddMaterial}
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            marginTop: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        Add Material
                    </button>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            marginTop: '20px',
                            cursor: 'pointer'
                        }}
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BOMView;
