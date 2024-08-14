import { Link } from "react-router-dom";

export default function SowProducts() {

    return (
        <div className="col-sm-6">
            <p className="h5">V této sekci naleznete veškeré zboží prodávané jako sadba. Sadbu prodáváme od března do července v závislosti na druhu.</p>
            <h3><Link to={"/sadba/kvetiny"}>Květiny</Link></h3>
            <h3><Link to={"/sadba/zelenina"}>Zelenina</Link></h3>
            <h3><Link to={"/sadba/bylinky"}>Bylinky</Link></h3>
        </div>
    )
}