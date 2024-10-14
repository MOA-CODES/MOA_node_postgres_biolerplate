const db = require('../models')

const SuperAdmin = async ()=>{


    const SuperAdmin = {name:'SuperAdmin', email:'Super@Admin.com', role:'SuperAdmin', phone: '+234-0000000000', password:'admin@SUPER00'}

    try{
        const checkAdmin = await db.User.findAll({where: {role:'Admin'}})

        if ((checkAdmin.length === 0)){    

            await db.User.create(SuperAdmin)
    
            console.log("Seeded SuperAdmin")
        }
    }catch(e){
        console.log("error seeding SuperAdmin")
    }
}

module.exports = SuperAdmin