import { apiPost, HttpRequestError } from "../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

export const RegistrationPage = () => {

    const nav = useNavigate();
    const [errorMessageState, setErrorMessageState] = useState(null);
    const [valuesState, setValuesState] = useState({password: "", confirmPassword: "", email: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (valuesState.password !== valuesState.confirmPassword) {
            setErrorMessageState("Hesla se nerovnají");
            return;
        }
        const registrationData = {
            email: valuesState.email,
            password: valuesState.password,
            admin: false
        }
        apiPost("/api/user", registrationData)
            .then(() => {
                nav("/login");
            }).catch(e => {
                if(e instanceof HttpRequestError && e.response.status === 400) {
                    e.response.text().then(message => setErrorMessageState(message));
                    return;
                }
                setErrorMessageState("Při komunikaci se serverem nastala chyba.");
            });
    };

    const handleChange = (e) => {
        const fieldName = e.target.name;
        setValuesState({...valuesState, [fieldName]: e.target.value});
    };

    return (
        <div className="offset-1 col-sm-4 mt-5">
            <h1>Registrace</h1>
            <form onSubmit={handleSubmit}>
                {errorMessageState ? <p className="text-danger">{errorMessageState}</p> : <></>}
                <InputField type="email" name="email" label="E-mail" prompt="Zadejte Váš E-mail" value={valuesState.email}
                            handleChange={handleChange}/>
                <InputField type="password" name="password" label="Heslo" prompt="Zadejte Vaše heslo" min={6} value={valuesState.password}
                            handleChange={handleChange}/>
                <InputField type="password" name="confirmPassword" label="Heslo znovu" prompt="Zadejte Vaše heslo znovu" value={valuesState.confirmPassword}
                            handleChange={handleChange}/>
                <input type="submit" className="btn btn-success mt-2" value="Registrovat se"/>
            </form>
        </div>
    );
}