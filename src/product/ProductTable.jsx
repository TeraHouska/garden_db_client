import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../utils/api";
import { Link } from "react-router-dom";
import { dateToString } from "../utils/dateConverter";
import { useSession } from "../contexts/session";
import FlashMessage from "../components/FlashMessage";

export default function ProductTable({type}) {

    const [products, setProducts] = useState([]);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const {session} = useSession();
    const isAdmin = session.data?.admin;

    useEffect(() => {
        async function fetchProducts() {
            const data = await apiGet("/api/product/" + type.toLowerCase())
            setProducts(data);
        };
        fetchProducts();
    }, [type]);

    async function handleDelete(id) {
        try {
            await apiDelete("/api/product/delete/" + id);
            setProducts(products.filter((product) => product.id !== id));
            setShowDeleteMessage(true);
            const sleep = ms => new Promise(r => setTimeout(r, ms));
            await sleep(2500);
            setShowDeleteMessage(false);
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }
    }

    return (
        <>  
            {showDeleteMessage ? 
                <FlashMessage theme="success" text="Záznam byl úspěšně odstraněn."/>
                : null}
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
                                    <button className="btn btn-sm btn-danger me-1" onClick={() => handleDelete(product.id)}>Smazat</button>
                                </td> : <></>}
                                <td className="text-success"><b>{product.price} Kč</b></td>
                                <td>{dateToString(product.availableFrom)}</td>
                                <td>{dateToString(product.availableTo)}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}