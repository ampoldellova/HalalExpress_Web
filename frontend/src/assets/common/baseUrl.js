import { Platform } from "react-native";

let baseUrl = "";

{
    Platform.OS == "android"
        ? (baseUrl = "https://halalexpress-web.onrender.com")
        : (baseUrl = "https://halalexpress-web.onrender.com");

}

export default baseUrl;