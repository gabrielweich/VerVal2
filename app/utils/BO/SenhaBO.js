import Senha from '../DB/DAO/SenhaDAO.js';

let SenhaLoginBO = {

    validarSenhaLogin: inputSenha => {
        return Senha.getSenha().then((result) => {
            if(result == inputSenha) {
                return true;
            }else {
                return false;
            }
        });
    }
}
export default SenhaLoginBO;