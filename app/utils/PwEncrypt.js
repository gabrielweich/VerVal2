const bcrypt = require('bcryptjs');

module.exports = {

    encryptPw: function(pwString){
        try{
            const salt = bcrypt.genSaltSync(10);
            const hashedPw = bcrypt.hashSync(pwString, salt);
            return hashedPw;
        }catch(e){
            throw new Error(e); 
        }

    },

    checkStringHash: function(pwString, hashedPw){
        try{
            return(bcrypt.compareSync(pwString,hashedPw));
        }catch(e){
            throw new Error(e);
        }
    }
}