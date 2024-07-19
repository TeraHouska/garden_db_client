import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";
import { toString } from "../utils/dateConverter";

export default function ProductTable() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const data = await apiGet("/api/product/vegetables")
            setProducts(data);
        };
        fetchProducts();
    }, [])

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Název</th>
                    <th>Cena</th>
                    <th>Dostupné od</th>
                    <th>Dostupné do</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product, index) => 
                        <tr key={index}>
                            <td><b><Link to={"/sadba/kvetiny/" + product.id}>
                                {product.name}
                            </Link></b></td>
                            <td className="text-success"><b>{product.price} Kč</b></td>
                            <td>{toString(product.availableFrom)}</td>
                            <td>{toString(product.availableTo)}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}