export const Capitalize=(string)=>{
    if(!string || string.length==0)    return string;    
    return string[0].toUpperCase() + string.slice(1);
}

export const lowerize=(string)=>{
    return string.toLowerCase()

}