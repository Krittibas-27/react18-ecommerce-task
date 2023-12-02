import axios from "axios";
import { RealServerUrl, dbLoginUrl, jsonServerProduct, productServerUrl } from "./BaseUrl";

export const RootLoginApi = axios.create({
    baseURL: dbLoginUrl
})
export const RootEcomDummyAPI = axios.create({
    baseURL: jsonServerProduct
})
export const RootBaseServer = axios.create({
    baseURL: RealServerUrl
})
export const RootProductServer = axios.create({
    baseURL:productServerUrl
})