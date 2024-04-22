//inport model
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError , UnauthenticatedError} = require('../errors')


const register = async (req, res) => {
     
        //create User 
        const user = await User.create({ ...req.body })

        const token = user.createJWT() //createJWT is method in User Schema

        res
        .status(StatusCodes.CREATED)
        .json({ user:{name:user.name}, token })
        

        
};



const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password || email==='' || password==='') {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email }) //email is unique
    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials')
    }

    // compare password

    const isPasswordCorrect = await user.comparePassword(password) //comparePassword is method in the User Schema
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
  

    //if user exists , create Token
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })


};

module.exports ={
    register,
    login
}