import React, {useState} from "react";
import Data from "./Data.json";
import {useNavigate} from "react-router-dom";


export const Table = () => {

    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(true);
    const [Type, setType] = useState("Convertible");
    const [ConvertibleCar] = useState(Data.Convertibles.Cars);
    const [ConvertibleTruck] = useState(Data.Convertibles.Trucks);
    const [DisplayCar, setDisplayCar] = useState(Data.Convertibles.Cars);
    const [DisplayTruck, setDisplayTruck] = useState(Data.Convertibles.Trucks);
    const [RoadsterCar] = useState(Data.Roadster.Cars);
    const [RoadsterTruck] = useState(Data.Roadster.Trucks);


    const navigateTo = (Type, year, model, price) => {
        navigate("/BuyNow?type=" + Type + "&year=" + year + "&model=" + model + "&price=" + price);
    }

    const getType = () => {
        let value = document.getElementById("typeSelect").value;
        if (value === "Convertible") {
            setDisplayCar(ConvertibleCar);
            setDisplayTruck(ConvertibleTruck);
            setType("Convertible");
        } else if (value === "Roadster") {
            setDisplayCar(RoadsterCar);
            setDisplayTruck(RoadsterTruck);
            setType("Roadster");
        }
    }

    const getNews = (year) => {
        if (isChecked) {
            setDisplayCar(current =>
                current.filter(car => {
                    return car.Year >= year
                }))

            setDisplayTruck(current =>
                current.filter(trucks => {
                    return trucks.Year >= year
                }))
        } else {
            if (Type === "Convertible") {
                setDisplayCar(ConvertibleCar);
                setDisplayTruck(ConvertibleTruck);
            } else {
                setDisplayCar(RoadsterCar);
                setDisplayTruck(RoadsterTruck);
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
                    {DisplayCar.map((car) => (
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
                    {DisplayTruck.map((truck) => (
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
