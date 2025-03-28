import { Platform } from "react-native";

let baseUrl = "";

{
    Platform.OS == "android"
        ? (baseUrl = "http://localhost:6003")
        : (baseUrl = "http://localhost:6003");

}

export default baseUrl;