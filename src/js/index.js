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
    alert("OK, ENVIADO COM SUCESSO");
  }
  validarCampos() {
    let valido = true;
    const erros = [
      { msg: "Nome Vazio", name: "name" },
      { msg: "Sobrenome Vazio", name: "Sobrenome" },
      { msg: "CPF Vazio", name: "CPF" },
      { msg: "USUÁRIO Vazio", name: "user" },
      { msg: "SENHA Vazio", name: "password" },
      { msg: "CONFIRMAÇÃO DE SENHA Vazio", name: "password-2" },
    ];
    let showErrors = [];
    let campos = document.querySelectorAll(".validar");
    campos.forEach((e, i) => {
      if (!e.value) {
        showErrors.push(erros[i]);
      }
    });
    if (showErrors.length) {
      this.criarErros(showErrors, campos);
    }
  }
  criarErros(erros, campos) {
    campos.forEach((el, i) => {
      let error = erros.find((err) => el.id === err.name);
      if (error) {
        let span = document.querySelector(`#${el.id}`).previousElementSibling;
        span.innerHTML = error.msg;
        span.classList.add("error-text");
      } else {
        return;
      }
    });
  }
}
const valid = new ValidarFormulario();
