import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-type": "application/json"
    }
});


class UploadFilesService {
    uploadPortfolio(file: any, onUploadProgress: any) {
        let formData = new FormData();
        formData.append("image", file);
        return http.post("/upload/products", formData, {
            headers: {
                "Content-Type": "image/png"
            },
            onUploadProgress,
        });
    }

    uploadClient(file: any) {
        let formData = new FormData()
        formData.append("image", file);
        return http.post("/upload/client", formData, {
            headers: {
                "Content-Type": "image/png"
            }
        })

    }
}

export default new UploadFilesService();