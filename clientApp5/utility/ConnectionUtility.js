const ERROR_CONNECTION = 201;
const TOKEN_EXPIRED = 202;
const FAILED_REFRESH_TOKEN = 203

let responseException = {
    status:ERROR_CONNECTION,
    message:"No internet connection.",
    data:[]
}

let responseFailedRefreshToken = {
    status:FAILED_REFRESH_TOKEN,
    message:"Failed refresh token.",
    data:[]
}

let responseTokenExpired = {
    status:TOKEN_EXPIRED,
    message:"Token Expired",
    data:[]
}

const GenerateErrorMessage = (code,message)=>{
    if(code == 500){
        // message = "Internal Server Error";
        message=message;
    }
    let res = {
        status:code,
        message:message
    }
    return res;
}

const exception = ()=>{
    return responseException;
}

const tokenExpired = ()=>{
    return responseTokenExpired;
}

const failedRefreshToken = ()=>{
    return responseFailedRefreshToken;
}

const ErrorConnectionCode = ()=>{
    return ERROR_CONNECTION;
}

const TokenExpiredCode = ()=>{
    return TOKEN_EXPIRED;
}

const FailedRefreshTokenCode = ()=>{
    return FAILED_REFRESH_TOKEN;
}

const ConnectionUtility = {
    GenerateErrorMessage,
    exception,
    tokenExpired,
    failedRefreshToken,
    ErrorConnectionCode,
    TokenExpiredCode,
    FailedRefreshTokenCode
}

export default ConnectionUtility