import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiGet } from "../utils/api";
import { dateToString } from "../utils/dateConverter";
import { sitesToString } from "../utils/sitesConverter";

export default function FlowerDetail() {
    const {id} = useParams();
    const [flower, setFlower] = useState({
        name: "",
        breed: "",
        decsription: "",
        price: "",
        availableFrom: "",
        availableTo: "",
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
            <p>Běžně dostupné od: {dateToString(flower.availableFrom)}</p>
            <p>Běžně dostupné do: {dateToString(flower.availableTo)}</p>
            {flower.sites ? <p>Stanoviště: {sitesToString(flower.sites)}</p> : <></>}
        </article>
    )
}