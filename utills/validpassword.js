let bcrypt = require('bcrypt-nodejs');

// checking if password is valid
const validPassword= (dbpass,newpass)=>{
 return bcrypt.compareSync(newpass, dbpass);
};

module.exports = {
validPassword
}