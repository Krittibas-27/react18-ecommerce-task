import axios from "axios";
import { dbLoginUrl } from "./BaseUrl";

export const RootLoginApi = axios.create({
    baseURL: dbLoginUrl
})