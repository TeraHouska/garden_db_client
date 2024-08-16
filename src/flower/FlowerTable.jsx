import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../utils/api";
import { Link } from "react-router-dom";
import { dateToString } from "../utils/dateConverter";
import { useSession } from "../contexts/session";
import FlashMessage from "../components/FlashMessage";

export default function FlowerTable() {

    const [flowers, setFlowers] = useState([]);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const {session} = useSession();
    const isAdmin = session.data?.admin;

    useEffect(() => {
        async function fetchFlowers() {
            const data = await apiGet("/api/flower/all")
            setFlowers(data);
        };
        fetchFlowers();
    }, [])

    async function handleDelete(id) {
        try {
            await apiDelete("/api/flower/delete/" + id);
            setFlowers(flowers.filter((flower) => flower.id !== id));
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
                        <th>Odolnost</th>
                        <th>Dostupné od</th>
                        <th>Dostupné do</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        flowers.map((flower, index) => 
                            <tr key={index}>
                                <td><b><Link to={"/sadba/kvetiny/" + flower.id}>
                                    {flower.name}
                                </Link></b></td>
                                {isAdmin ? 
                                <td>
                                    <Link className="btn btn-sm btn-warning me-1" to={"/sadba/kvetiny/upravit/" + flower.id}>Upravit</Link>
                                    <button className="btn btn-sm btn-danger me-1" onClick={() => handleDelete(flower.id)}>Smazat</button>
                                </td> : <></>}
                                <td className="text-success"><b>{flower.price} Kč</b></td>
                                <td>{flower.resilient ? "ANO" : "NE"}</td>
                                <td>{dateToString(flower.availableFrom)}</td>
                                <td>{dateToString(flower.availableTo)}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}