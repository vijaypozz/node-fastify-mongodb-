const bcrypt = require("bcrypt");
const user = require("../models/user");

async function routes(fastify, options) { 

// const signUp = async (request, reply) => {
    fastify.post('/api', async (request, reply) => { 
        const { firstName, lastName, email, password } = request.body;
    try {
        if (request.body == undefined || !request.body) {
            return reply.send({
                message: "Please Provide Required Information",
            });
        }
        const hash_password = await bcrypt.hash(password, 10);

        const userData = {
            firstName,
            lastName,
            email,
            hash_password,
        };
        // const list = await user.create(userData)

        const data = await new Promise((resolve, reject)=> {
            user.create(userData, (err, res)=>{

                if (err) {
                    console.log("err");
                    reply.send({message:"Im Errors"})
                    reject(err)
                    return;
                  }
                  resolve(res );
                  return
            })
          })
            return reply.code(201).send({
                message: "User created Successfully",
                data: data
            });
        

    } catch (error) {
        console.log("error==", error);
        // return reply.code(400).send({
        //     message: "Email Already Exists",
        // });

    }

})


} 

module.exports= routes
