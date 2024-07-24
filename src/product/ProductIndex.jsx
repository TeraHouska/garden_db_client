import ProductTable from "./ProductTable";

export default function ProductIndex({type}) {
    //type: sow_vegetables, herbs, reap, souls
    
    function translateType() {
        switch (type) {
            case "sow_vegetables":
                return "Sadba zeleniny";
            case "herbs":
                return "Bylinky";
            case "reap":
                return "Zelenina";
            case "souls":
                return "Dušičkové zboží";
            default: return "";
        }
    }

    return (
        <div className="container">
            <h1>{translateType()}</h1>
            <ProductTable type={type} />
        </div>
    )
}