import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";
import { isoToArray } from "../utils/dateConverter";
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import InputCheck from "../components/InputCheck";
import InputSelect from "../components/InputSelect";
import { apiToPath } from "../utils/productTypeConverter";

export default function ProductForm() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState({
        name: "",
        type: "",
        breed: "",
        description: "",
        price: "",
        pricePerKilo: false,
        availableFrom: "",
        availableTo: ""
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        if (id) {
            apiGet("/api/product/" + id).then((data) => setProduct(data));
        }
    }, [id]);

    useEffect(() => {
        async function fetchTypes() {
            const data = await apiGet("/api/product/types");
            setTypes(data);
            setProduct({...product, type: data[0]});
        }
        fetchTypes();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        //const productDTO = {...product, availableFrom: isoToArray(product.availableFrom), availableTo: isoToArray(product.availableTo)}
        console.log(product);

        (id ? apiPut("/api/product/edit/" + id, {...product, availableFrom: isoToArray(product.availableFrom), availableTo: isoToArray(product.availableTo)}) : apiPost("/api/product/add", {...product, availableFrom: isoToArray(product.availableFrom), availableTo: isoToArray(product.availableTo)}))
            .then(() => {
                setSent(true);
                setSuccess(true);
                const sleep = ms => new Promise(r => setTimeout(r, ms));
                sleep(2500).then(
                    () => {navigate(apiToPath(product.type));}
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
            <h1>{id ? "Upravit" : "Přidat"} produkt</h1>
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
                    name="productName"
                    min="2"
                    label="Název"
                    prompt="Zadejte název produktu"
                    value={product.name}
                    handleChange={(e) => {
                        setProduct({...product, name: e.target.value});
                    }}
                />

                <InputSelect 
                    required={true}
                    name="type"
                    label="Typ produktu"
                    prompt="Vyberte typ produktu"
                    items={types}
                    value={product.type}
                    handleChange={(e) => {
                        setProduct({...product, type: e.target.value});
                    }}
                />
                
                <InputField
                    type="text"
                    name="breed"
                    min="2"
                    label="Odrůda"
                    prompt="Zadejte odrůdu"
                    value={product.breed}
                    handleChange={(e) => {
                        setProduct({...product, breed: e.target.value});
                    }}
                />

                <InputField
                    type="text"
                    name="description"
                    min="2"
                    label="Popis"
                    prompt="Zadejte popis produktu"
                    value={product.description}
                    handleChange={(e) => {
                        setProduct({...product, description: e.target.value});
                    }}
                />

                <InputCheck
                    type="checkbox"
                    name="perKilo"
                    label="Cena za kg"
                    value={product.pricePerKilo}
                    handleChange={(e) => {
                        setProduct({...product, pricePerKilo: !product.pricePerKilo});
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena"
                    value={product.price}
                    handleChange={(e) => {
                        setProduct({...product, price: +e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="availableFrom"
                    label="Běžně dostupné od"
                    value={product.availableFrom}
                    handleChange={(e) => {
                        setProduct({...product, availableFrom: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="availableTo"
                    label="Běžně dostupné do"
                    value={product.availableTo}
                    handleChange={(e) => {
                        setProduct({...product, availableTo: e.target.value});
                    }}
                />

                <input type="submit" className="btn btn-success" value="Uložit"/>
            </form>
        </div>
    );
};
