import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";
import { isoToArray } from "../utils/dateConverter";
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import InputCheck from "../components/InputCheck";
import InputSelect from "../components/InputSelect";

export default function FlowerForm() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [flower, setFlower] = useState({
        name: "",
        breed: "",
        description: "",
        price: 0,
        availableFrom: "",
        availableTo: "",
        overhanging: false,
        resilient: false,
        sites: [],
        colors: []
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);
    const [colors, setColors] = useState([]);
    const [sites, setSites] = useState([]);

    useEffect(() => {
        if (id) {
            apiGet("/api/flower/" + id).then((data) => setFlower(data));
        }
    }, [id]);

    useEffect(() => {
        async function fetchColors() {
            const data = await apiGet("/api/flower/colors");
            setColors(data);
        }
        async function fetchSites() {
            const data = await apiGet("/api/flower/sites");
            setSites(data);
        }
        fetchColors();
        fetchSites();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const flowerDTO = {
            ...flower,
            availableFrom: isoToArray(flower.availableFrom),
            availableTo: isoToArray(flower.availableTo)
        }

        (id ? apiPut("/api/flower/edit/" + id, flowerDTO) : apiPost("/api/flower/add", flowerDTO))
            .then(() => {
                setSent(true);
                setSuccess(true);
                const sleep = ms => new Promise(r => setTimeout(r, ms));
                sleep(2500).then(
                    () => {navigate("/sadba/kvetiny");}
                )
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    return (
        <div className="offset-1 col-sm-6">
            <h1>{id ? "Upravit" : "Přidat"} květinu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sentState && (
                <FlashMessage
                    theme={successState ? "success" : ""}
                    text={successState ? "Uložení proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="flowerName"
                    min="2"
                    label="Název"
                    prompt="Zadejte název květiny"
                    value={flower.name}
                    handleChange={(e) => {
                        setFlower({...flower, name: e.target.value});
                    }}
                />
                
                <InputField
                    type="text"
                    name="breed"
                    min="2"
                    label="Odrůda"
                    prompt="Zadejte odrůdu"
                    value={flower.breed}
                    handleChange={(e) => {
                        setFlower({...flower, breed: e.target.value});
                    }}
                />

                <InputField
                    type="text"
                    name="description"
                    min="2"
                    label="Popis"
                    prompt="Zadejte popis květiny"
                    value={flower.description}
                    handleChange={(e) => {
                        setFlower({...flower, description: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena za kus"
                    value={flower.price}
                    handleChange={(e) => {
                        setFlower({...flower, price: +e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="availableFrom"
                    label="Běžně dostupné od"
                    prompt=""
                    value={flower.availableFrom}
                    handleChange={(e) => {
                        setFlower({...flower, availableFrom: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="availableTo"
                    label="Běžně dostupné do"
                    prompt=""
                    value={flower.availableTo}
                    handleChange={(e) => {
                        setFlower({...flower, availableTo: e.target.value});
                    }}
                />

                <InputSelect 
                    name="colors"
                    multiple={true}
                    label="Barvy"
                    prompt="Vyberte barvy"
                    items={colors}
                    value={flower.colors}
                    handleChange={(e) => {
                        let value = Array.from(e.target.selectedOptions, (item) => item.value);
                        setFlower({...flower, colors: value});
                    }}
                />

                <InputSelect 
                    name="sites"
                    multiple={true}
                    label="Stanoviště"
                    prompt="Vyberte vhodná stanoviště"
                    items={sites}
                    value={flower.sites}
                    handleChange={(e) => {
                        let value = Array.from(e.target.selectedOptions, (item) => item.value);
                        setFlower({...flower, sites: value});
                    }}
                />

                <InputCheck
                    type="checkbox"
                    name="overhanging"
                    label="Převislé"
                    value={flower.overhanging}
                    handleChange={(e) => {
                        setFlower({...flower, overhanging: !flower.overhanging});
                    }}
                />

                <InputCheck
                    type="checkbox"
                    name="resilient"
                    label="Odolné"
                    value={flower.resilient}
                    handleChange={(e) => {
                        setFlower({...flower, resilient: !flower.resilient});
                    }}
                />

                <input type="submit" className="btn btn-success" value="Uložit"/>
            </form>
        </div>
    );
};
