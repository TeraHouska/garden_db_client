import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import { useSession } from "../contexts/session";
import { useNavigate } from "react-router-dom";
import { apiPost, HttpRequestError } from "../utils/api";

export default function LoginPage() {

    const [valuesState, setValuesState] = useState({email: "", password: ""});
    const [errorMessageState, setErrorMessageState] = useState(null);
    const {session, setSession} = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (session.data) {
            navigate("/sadba")
        }
    }, [session, navigate]);

    const handleChange = (e) => {
        const fieldName = e.target.name;
        setValuesState({...valuesState, [fieldName]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiPost("/api/auth", valuesState)
            .then(data => setSession({data, status: "authenticated"}))
            .catch(e => {
                if (e instanceof HttpRequestError) {
                    e.response.text().then(message => setErrorMessageState(message));
                    return;
                }
                setErrorMessageState("Při komunikaci se serverem nastala chyba.");
            });
    }

    return (
        <div className="offset-1 col-sm-4 mt-5">
            <h1>Přihlášení</h1>
            <form onSubmit={handleSubmit}>
                {errorMessageState ? <p className="text-danger">{errorMessageState}</p> : <></>}
                <InputField type="email" name="email" label="E-mail" prompt="Zadejte Váš E-mail" value={valuesState.email}
                            handleChange={handleChange}/>
                <InputField type="password" name="password" label="Heslo" prompt="Zadejte Vaše heslo" min={6} value={valuesState.password}
                            handleChange={handleChange}/>
                <input type="submit" className="btn btn-success mt-2" value="Přihlásit se"/>
            </form>
        </div>
    )
}