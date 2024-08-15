import { Link } from "react-router-dom";
import FlowerTable from "./FlowerTable";
import { useSession } from "../contexts/session";

export default function FlowerIndex() {
    const {session} = useSession();
    const isAdmin = session.data?.admin;

    return (
        <>
            <h1>Květiny</h1>
            <FlowerTable />
            {isAdmin ? <Link to={"/sadba/kvetiny/pridat"} className="btn btn-success">Přidat</Link> : <></>}
        </>
    )
}