const password = (value, helpers) =>{
    if(value.length < 6){
        return helpers.message('Password minimum length is 6 characters')
    }
    if(!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/)){
        return helpers.message('Password length should be >6 & have at least one lowercase, uppercase & special character')
    }
    return value;
}

module.exports = {password}