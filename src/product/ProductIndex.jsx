import ProductTable from "./ProductTable";
import { apiToHeading } from "../utils/productTypeConverter";
import { useSession } from "../contexts/session";
import { Link } from "react-router-dom";

export default function ProductIndex({type}) {
    //type: SOW_VEGETABLE, SOW_HERB, REAP, SOULS

    const {session} = useSession();
    const isAdmin = session.data?.admin;

    return (
        <>
            <h1>{apiToHeading(type)}</h1>
            <ProductTable type={type} />
            {isAdmin ? <Link to={"/produkty/pridat"} className="btn btn-success">Přidat</Link> : <></>}
        </>
    )
}