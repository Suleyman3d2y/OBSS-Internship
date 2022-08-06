import {useSearchParams} from "react-router-dom";

export const BuyNow = () => {

    const [searchParams] = useSearchParams();

    return (
        <div>
            <h1>Thank you for buying.</h1>
            <h2>Your {searchParams.get("type")}: </h2>
            <h3>Year: {searchParams.get("year")}</h3>
            <h3>Model: {searchParams.get("model")}</h3>
            <h3>Price: {searchParams.get("price")}</h3>
        </div>


    )


}
