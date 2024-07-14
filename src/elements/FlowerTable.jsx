import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";

export default function FlowerTable() {

    const [flowers, setFlowers] = useState([]);

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
                    <th>Cena</th>
                    <th>Odolnost</th>
                    <th>Stanoviště</th>
                </tr>
            </thead>
            <tbody>
                {
                    flowers.map((flower, index) => 
                        <tr key={index}>
                            <td><b><Link to={"/sadba/kvetiny/" + flower.id}>
                                {flower.name}
                            </Link></b></td>
                            <td className="text-success"><b>{flower.price} Kč</b></td>
                            <td>{flower.resilient ? "ANO" : "NE"}</td>
                            <td>{flower.sites}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}