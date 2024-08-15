import ProductTable from "./ProductTable";
import { apiToHeading } from "../utils/productTypeConverter";

export default function ProductIndex({type}) {
    //type: SOW_VEGETABLE, SOW_HERB, REAP, SOULS

    return (
        <>
            <h1>{apiToHeading(type)}</h1>
            <ProductTable type={type} />
        </>
    )
}