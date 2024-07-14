import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiGet } from "../utils/api";

export default function FlowerDetail() {
    const {id} = useParams();
    const [flower, setFlower] = useState({
        name: "",
        breed: "",
        decsription: "",
        price: "",
        availableFrom: "",
        availableTO: "",
        overhanging: "",
        resilient: "",
        sites: "",
        colors: ""
    })

    useEffect(() => {
        async function fetchFlower() {
            const data = await apiGet("/api/flower/" + id);
            setFlower(data);
        };
        fetchFlower();
    }, [id])

    return (
        <article className="container">
            <h2>{flower.name}</h2>
            {flower.breed ? <p>Odrůda: {flower.breed}</p> : <></>}
        </article>
    )
}