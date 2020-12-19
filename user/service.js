const { validate } = require('./entity.js')
const repository = require('./repository.js')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
 
  async addUser(user) {       
    const validationResult = validate(user)
    let userFound = await repository.findByEmail(user.email)
    
    if(userFound.length > 0) {
      throw {message: "Essa porra ja foi cadastrada meu irmão", error: "User already exists"};
    }
    
    if (validationResult.error) {
      throw validationResult.error
    }
    
    validationResult.value.password = await this.cyrptPassword(user.password)
    
    const savedUser = await repository.save({
       ...validationResult.value      
    })
    
  },

  async login(user) {
    if(!(user.email && user.password)) {
      throw {message: "Informe email e senha seu arrombado", error: "Email or password not found"};
    }

    let usersFound = await repository.findByEmailAndPassword(user.email, user.password);
    if(usersFound.length == 0) {
      throw {message: "Usuário não cadastrado", error: "Incorrect credentials make signup"};
    }
    const userFound = usersFound[0];
    const isMatch = await bcrypt.compare(user.password, userFound.password);

    if(!isMatch) {
      throw {message: "Credenciais incorretas meu parceiro", error: "Incorrect credentials"};
    }
    const token = await this.generateTokenJWT(userFound);
    return {token: token}
  },

  async cyrptPassword(rawPassword) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(rawPassword, salt);
  },

  async generateTokenJWT(user) {
    
    if(!user._id) {
      throw {message: "Usuário invalido para geração de token", error: "Incorrect user payload"};
    }
    const payload = {
      user: {
        id: user._id
      }
    }
    const token = await jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: 3600
      }
    );

    return token;
  }
}