const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Call = db.Call;

module.exports = {
  register,
  login,
  profile,
  teste,
  getById
}

// FUNÇÕES DO USER SERVICE
async function register(body){
        // validate
        if(await User.findOne({username: body.username})){
            throw 'Já existe um usuário com esse nome no sistema';
        }

        const user = new User(body);
        user.role = 'user'; // Lembrar de configurar isso futuramente

        // hash password
        if(body.password){
            user.hash = bcrypt.hashSync(body.password, 10);
        }

        //save user
        await user.save();
}

async function login({username, password}){
    const user = await User.findOne({username});
    if(user && bcrypt.compareSync(password, user.hash)){
        const {hash, ...userWithoutHash} = user.toObject();
        const token = jwt.sign({sub: user.id}, config.secret);

        return {
            ...userWithoutHash,
            token
        };
    }
}

async function profile({id}){
    return await User.findById(id).select('-hash');
}

async function teste(body){
  return body;
}

async function getById(id){
    return await User.findById(id).select('-hash');
}
