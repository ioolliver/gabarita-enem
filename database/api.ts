import axios from "axios"

export const API_URL = process.env.NODE_ENV == "production" ? "https://gabarita-linguagens.vercel.app/api/" : "http://localhost:3000/api/";

export class API {
    static async fetch(url : string, after?: number) {
        try {
            const req = await fetch(API_URL+url, { next: { revalidate: after || 0 } });
            const res = await req.json();
            return res;
        }catch(e) {
            return e;
        }
    }
    static async get(url : string) {
        try {
            const req = await axios.get(API_URL+url) 
            return req.data;
        }catch(e) {
            return e;
        }
    }
    static async post(url : string, data : any) {
        try {
            const req = await axios.post(API_URL+url, data) 
            return req.data;
        }catch(e) {
            return e;
        }
    }
}