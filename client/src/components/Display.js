import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
    const [data, setData] = useState([]);

    const getData = async () => {
        let dataArray;
        const OtherAddress = document.querySelector(".address").value;
        try {
            if (OtherAddress) {
                dataArray = await contract.display(OtherAddress);
                console.log(dataArray);
            } else {
                dataArray = await contract.display(account);
            }
        } catch (e) {
            console.error("Error fetching data from contract:", e);
            alert("You don't have access");
            return;
        }

        if (dataArray && dataArray.length > 0) {
            const images = dataArray.map((item, i) => (
                <a href={`https://gateway.pinata.cloud/ipfs/${item.substring(7)}`} key={i} target="_blank" rel="noopener noreferrer">
                    <img
                        src={`https://gateway.pinata.cloud/ipfs/${item.substring(7)}`}
                        alt="Uploaded"
                        className="image-list"
                    />
                </a>
            ));
            setData(images);
        } else {
            alert("No image to display");
        }
    };

    return (
        <>
            <div className="image-list">{data}</div>
            <input
                type="text"
                placeholder="Enter Address"
                className="address"
            />
            <button className="center button" onClick={getData}>
                Get Data
            </button>
        </>
    );
};

export default Display;
