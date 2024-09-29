import axios from "axios"

const API_URL = "http://localhost:3000/api/"

export class API {
    static async post(url : string, data : any) {
        try {
            const req = await axios.post(API_URL+url, data)
            return req.data;
        }catch(e) {
            return e;
        }
    }
}