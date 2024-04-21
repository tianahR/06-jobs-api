//inport model
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    
//   const { name, email, password } = req.body

//   const salt = await bcrypt.genSalt(10) // random bytes
//   const hashedPassword = await bcrypt.hash(password,salt)
//   const tempUser  = {name,email,password:hashedPassword}

//   if (!name || !email || !password || name === '' || password === '' || email ==='') {
//     throw new BadRequestError('Please provide name, email and password')
//   }
 
    //create User 
   const user = await User.create({ ...req.body })

   res.status( StatusCodes.CREATED).json({user})
};

const login = async (req, res) => {
    res.send('login user')
};

module.exports ={
    register,
    login
}