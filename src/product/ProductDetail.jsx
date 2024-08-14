import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { apiGet } from "../utils/api";
import { dateToString } from "../utils/dateConverter";
import { apiToPath } from "../utils/productTypeConverter";

export default function ProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState({
        name: "",
        type: "",
        breed: "",
        decsription: "",
        price: "",
        pricePerKilo: "",
        availableFrom: "",
        availableTo: ""
    })

    useEffect(() => {
        async function fetchProduct() {
            const data = await apiGet("/api/product/" + id);
            setProduct(data);
        };
        fetchProduct();
    }, [id])

    return (
        <article className="container">
            <h2>{product.name}</h2>
            {product.breed ? <p>Odrůda: {product.breed}</p> : <></>}
            {product.decsription ? <p>Popis: {product.decsription}</p> : <></>}
            <p>Cena: {product.price + " Kč / " + (product.pricePerKilo ? "kg" : "ks")}</p>
            <p>Běžně dostupné od: {dateToString(product.availableFrom)}</p>
            <p>Běžně dostupné do: {dateToString(product.availableTo)}</p>
            <Link className="btn btn-secondary" to={apiToPath(product.type)}>Zpět</Link>
        </article>
    )
}