import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

export default function ProductTable() {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const data = await apiGet('/api/sow/vegetables');
            setProducts(data);
        };
    
        fetchProducts();
    }, [])
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Název</th>
                    <th>Cena</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.price} Kč</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}