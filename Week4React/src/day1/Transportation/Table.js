import React, {useState} from "react";
import Data from "./Data.json";
import {useNavigate} from "react-router-dom";


export const Table = () => {

    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(true);
    const [Type, setType] = useState("Convertible");
    const [Convertibles] = useState(
        {
            Cars: Data.Convertibles.Cars,
            Trucks: Data.Convertibles.Trucks
        }
    )
    const [Roadsters] = useState(
        {
            Cars: Data.Roadster.Cars,
            Trucks: Data.Roadster.Trucks
        }
    )
    const [Display, setDisplay] = useState(
        {
            Cars: Data.Convertibles.Cars,
            Trucks: Data.Convertibles.Trucks
        }
    )

    const navigateTo = (Type, year, model, price) => {
        navigate("/BuyNow?type=" + Type + "&year=" + year + "&model=" + model + "&price=" + price);
    }

    const getType = () => {
        let value = document.getElementById("typeSelect").value;
        if (value === "Convertible") {
            setDisplay(Convertibles)
            setType("Convertible");
        } else if (value === "Roadster") {
            setDisplay(Roadsters)
            setType("Roadster");
        }
    }

    const getNews = (year) => {
        if (isChecked) {

            let Cars = Display.Cars.filter(car => car.Year >= year)
            let Trucks = Display.Trucks.filter(truck => truck.Year >= year)
            console.log(Cars)
            console.log(Trucks)
            setDisplay({Cars: Cars, Trucks: Trucks})
            console.log(Display)

        } else {
            if (Type === "Convertible") {
                setDisplay(Convertibles)
            } else {
                setDisplay(Roadsters)
            }

        }
        setIsChecked(current => !current);
    }

    return (
        <>

            <input type="checkbox"
                   value={isChecked}
                   onChange={() => getNews(2015)}
            />
            New Only
            <br/><br/>
            Select Type
            <select id="typeSelect" onChange={getType}>
                <option value="Convertible">Convertibles</option>
                <option value="Roadster">Roadsters</option>
            </select>
            <h2>Cars</h2>
            <div>
                <table border="1" cellPadding="10">
                    <thead>
                    <tr>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Price</th>
                        <th>Buy</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Display.Cars.map((car) => (
                        <tr>
                            <td>{car.Year}</td>
                            <td>{car.Model}</td>
                            <td>{car.Price}</td>
                            <td>
                                <button onClick={() => navigateTo(Type, car.Year, car.Model, car.Price)}>Buy Now
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
            </div>
            <h2>Trucks</h2>

            <div>
                <table border="1" cellPadding="10">
                    <thead>
                    <tr>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Price</th>
                        <th>Buy</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Display.Trucks.map((truck) => (
                        <tr>
                            <td>{truck.Year}</td>
                            <td>{truck.Model}</td>
                            <td>{truck.Price}</td>
                            <td>
                                <button onClick={() => navigateTo(Type, truck.Year, truck.Model, truck.Price)}>Buy Now
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
