

const BaseUrl = "http://10.0.2.2:8080/api/";

const Endpoint = {
    baseUrl:BaseUrl,
    // Auth:
    login: "auth/signin",
    register: "auth/signup",

    // Data
    getListSales: "admin/sales/list",
    getProfile: "admin/profile"
    
}

export default Endpoint