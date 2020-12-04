export function validateEmail(email) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return 'Digite um endereço de e-mail válido!';
    } else return null;
  }
  
  export function validatePassword(password) {
    if (
      !/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i.test(
        password,
      )
    ) {
      return 'A senha deve ter 1 letra minúscula, 1 letra maiúscula, 1 número e ter pelo menos 8 caracteres';
    } else return null;
  }
  
  export function validateUsername(username) {
    if (!/^[a-z0-9_-]{3,16}$/i.test(username)) {
      return 'Insira um nome de usuário de 3 a 16 caracteres';
    } else return null;
  }
  
  export function validateCode(code) {
    if (!code) {
      return 'Insira um código válido';
    } else return null;
  }