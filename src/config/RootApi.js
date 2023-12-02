import axios from "axios";
import { RealServerUrl, dbLoginUrl, jsonServerProduct } from "./BaseUrl";

export const RootLoginApi = axios.create({
    baseURL: dbLoginUrl
})
export const RootEcomDummyAPI = axios.create({
    baseURL: jsonServerProduct
})
export const RootBaseServer = axios.create({
    baseURL: RealServerUrl
})