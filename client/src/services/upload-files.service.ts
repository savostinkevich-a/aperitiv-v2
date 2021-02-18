import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-type": "application/json"
    }
});


class UploadFilesService {

    uploadPortfolio(file: any) {
        return http.post("/upload/products", file)
    }
    // uploadPortfolio(file: any, onUploadProgress: any) {
    //     let formData = new FormData();
    //     formData.append("image", file);
    //     return http.post("/upload/products", formData, {
    //         onUploadProgress,
    //     });
    // }

    uploadClient(file: any) {
        let formData = new FormData()
        formData.append("image", file);
        return http.post("/upload/client", formData, {
            headers: {
                "Content-Type": "image/png"
            }
        })
    }

    deleteClient(imageName: string) {
        return http.post(`/upload/client/delete/${imageName}`)
    }
}

export default new UploadFilesService();