class ValidarFormulario {
  constructor() {
    this.form = document.getElementById("form");
    this.eventos();
  }
  eventos() {
    this.form.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const validarCampos = this.validarCampos();
    const validarSenhas = this.validarSenhas();

    if (validarCampos && validarSenhas) {
      this.limparCampos();
      alert("USUÁRIO CADASTRADO COM SUCESSO");
    }
  }
  limparCampos() {
    let campos = document.querySelectorAll(".validar");
    campos.forEach((el) => {
      this.removeMsgError(el.id);
      el.value = "";
    });
  }
  validarCampos() {
    let valido = true;
    let campos = document.querySelectorAll(".validar");
    campos.forEach((e, i) => {
      let label=e.previousElementSibling.previousElementSibling.innerHTML
      if (!e.value && e.id!=='password') {
        valido = false;
        this.criarError(`O ${label} não pode estar vazio`,e)
      }else{
        this.removeMsgError(e.id)
      }
      if (e.id === "user") {
        if (!this.validarUsuario(e)) valido = false;
      }
      if (e.id === "CPF") {
        if (!this.validarCPF(e)) valido = false;
      }
    });

    return valido;
  }
  validarCPF(user) {
    let valido = true;
    const cpf = new CPFValidator(user.value);
    if (!cpf.validade) {
      valido = false;
      this.criarError("CPF inválido.", user);
      return valido;
    }
    this.removeMsgError(user.id);
    return valido;
  }
  validarUsuario(user) {
    let valido = true;
    if (user.value.length < 3 || user.value.length > 12) {
      valido = false;
      this.criarError("Usuário precisa ter entre 3 e 12 caracteres.", user);
      return valido;
    }
    if (!user.value.match(/^[a-zA-Z0-9]+$/g)) {
      valido = false;
      this.criarError(
        "Nome de usuário precisar conter apenas letras e/ou números.",
        user
      );
      return valido;
    }
    this.removeMsgError(user.id);
    return valido;
  }
  validarSenhas() {
    let valido = true;
    let senha1 = document.getElementById("password");
    let senha2 = document.getElementById("password-2");
    if (senha1.value !== senha2.value) {
      valido = false;
      this.criarError(
        "Campos senha e confirmação de senha precisam ser iguais.",
        senha1
      );
      this.criarError(
        "Campos senha e confirmação de senha precisam ser iguais.",
        senha2
      );
      return valido;
    }
    if (senha1.value.length < 6 || senha1.value.length > 12) {
      valido = false;
      this.criarError("Senha precisa estar entre 6 e 12 caracteres.", senha1);
      return valido;
    }
    this.removeMsgError(senha1.id);
    this.removeMsgError(senha2.id);
    return valido;
  }
  criarError(error, campo) {
    this.showMsgError(campo.id, error);
  }
  showMsgError(campo, msg) {
    let span = document.querySelector(`#${campo}`).previousElementSibling;
    span.innerHTML=msg
    span.classList.add("error-text");
  }
  removeMsgError(campo) {
    let span = document.querySelector(`#${campo}`).previousElementSibling;
    span.innerHTML = "";
    span.classList.remove("error-text");
  }
}
const valid = new ValidarFormulario();
