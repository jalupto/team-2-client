import React, {useState} from "react";


const City = () => {
    const [results, setResults] = useState([])

    const getCity = async () => {
        const res = await fetch(
            "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=indianapolis&lang=en_US&units=mi",
            {
                method: "GET",
                headers: new Headers ({
                    "x-rapidapi-key":
                        "253f860dccmsh5a8313c5abb0c80p1ea8c4jsnd54b97e2bab2",
                    "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
                }),
            }
        )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    getCity();
}

export default City;