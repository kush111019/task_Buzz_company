const mongoose = require('mongoose')


const isValidDetails = (requestBody) => Object.keys(requestBody).length > 0;

const isValidValue = (value) => {
    if (typeof value === "undefined" || value === null)
        return false;
    if (typeof value === "string" && value.trim().length === 0)
        return false;
    if(typeof value!=="string") return false;
    return true;
};

const isValidIntegerValue=(value)=>{
if(typeof value==="undefined" || value===null) return false;
if(typeof value==="string" && value.trim().length===0)return false;
if(!Number.isInteger(value)) return false;
return true;
}
module.exports={isValidValue,isValidDetails,isValidIntegerValue};
