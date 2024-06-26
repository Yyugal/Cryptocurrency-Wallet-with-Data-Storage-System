import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No Image Selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `d7ed5e6a9215c819cb8b`,
                        pinata_secret_api_key: `de3ea628f117fc1c05632b9a424c2abc8778a4122185f24cdb3120f7925e4af5`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                const signer = contract.connect(provider.getSigner());
                signer.add(account, ImgHash);
            } catch (e) {
                alert("Unable to Upload image to Pinata")
            }
        }
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
    };

    const retrieveFile = (e) => {
        const data = e.target.files[0];

        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };

    return (
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">
                    Choose Image
                </label>
                <input
                    disabled={!account}
                    type="file"
                    id="file-upload"
                    name="data"
                    onChange={retrieveFile}
                />

                <span className="textArea">Image:{fileName}</span>
                <button type="submit" className="upload" disabled={!file}>
                    Upload File
                </button>
            </form>
        </div>
    );
};
export default FileUpload;