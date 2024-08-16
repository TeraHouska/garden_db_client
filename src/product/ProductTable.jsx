import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";
import { dateToString } from "../utils/dateConverter";
import { useSession } from "../contexts/session";

export default function ProductTable({type}) {

    const [products, setProducts] = useState([]);
    const {session} = useSession();
    const isAdmin = session.data?.admin;

    useEffect(() => {
        async function fetchProducts() {
            const data = await apiGet("/api/product/" + type.toLowerCase())
            setProducts(data);
        };
        fetchProducts();
    }, [type])

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Název</th>
                    {isAdmin ? 
                    <th>Možnosti</th> : <></>}
                    <th>Cena</th>
                    <th>Dostupné od</th>
                    <th>Dostupné do</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product, index) => 
                        <tr key={index}>
                            <td><b><Link to={"/produkty/" + product.id}>
                                {product.name}
                            </Link></b></td>
                            {isAdmin ? 
                            <td>
                                <Link className="btn btn-sm btn-warning me-1" to={"/produkty/upravit/" + product.id}>Upravit</Link>
                                <button className="btn btn-sm btn-danger me-1">Smazat</button>
                            </td> : <></>}
                            <td className="text-success"><b>{product.price} Kč</b></td>
                            <td>{dateToString(product.availableFrom)}</td>
                            <td>{dateToString(product.availableTo)}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}