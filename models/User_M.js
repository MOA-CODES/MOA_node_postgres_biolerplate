const {v4:uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelizeInstance, DataTypes)=>{
    const User = sequelizeInstance.define('User', {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue:() => uuidv4()
        },
        name:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
            validate:{
                is:{args: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    msg: 'Please provide a valid email address'}
            } 
        },
        role:{
            type:DataTypes.ENUM('SuperAdmin','Admin','Client'),
            defaultValue:'Client',
            validate:{
                isIn:{
                    args:[['SuperAdmin','Admin','Client']],
                    msg:'{VALUE} is not supported'
                }
            },
        },
        phone:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                is: {
                    args: /^(\+?\d{1,4}[-.\s]?)?((\d{10})|(\d{3}[-.\s]\d{3}[-.\s]\d{4}))$/,
                    msg: 'Please provide a valid phone number'
                }
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                is:{args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                    msg: 'Password length should be >6 & have at least one lowercase, uppercase & special character'}
            }
        },
    },{
        freezeTableName: true
    });
    
    User.beforeCreate(async(user)=>{
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    })
    
    User.prototype.createJWT = async function(){
        const token = await jwt.sign({email:this.email, role:this.role},process.env.AUTH_KEY,{expiresIn:process.env.TOKEN_TIME})

        return token
    } 
    
    User.prototype.comparePSW = async function(userPSW,options){ //you can't use arrow fucntions for prototype
        const compare = await bcrypt.compare(userPSW, this.password)
        console.log(compare)
        return compare
    }
    
    User.prototype.updatePSW = async function(){
        const salt = await bcrypt.genSalt(9)
        this.password = await bcrypt.hash(this.password, salt)
    }

    return User;
}