import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";
import { dateToString } from "../utils/dateConverter";
import { useSession } from "../contexts/session";

export default function FlowerTable() {

    const [flowers, setFlowers] = useState([]);
    const {session} = useSession();
    const isAdmin = session.data?.admin;

    useEffect(() => {
        async function fetchFlowers() {
            const data = await apiGet("/api/flower/all")
            setFlowers(data);
        };
        fetchFlowers();
    }, [])

    return (
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
                                <button className="btn btn-sm btn-warning me-1">Upravit</button>
                                <button className="btn btn-sm btn-danger me-1">Smazat</button>
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
    )
}