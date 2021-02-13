class CPFValidator {
  constructor(cpf) {
    Object.defineProperty(this, "formatCPF", {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpf.replace(/\D+/g, ""),
    });
  }
  get checkSequence() {
    if (this.formatCPF.charAt(0).repeat(11) === this.formatCPF) {
      return false;
    } else {
      return true;
    }
  }
  generateNewCPF() {
    const newCPF = this.formatCPF.slice(0, -2);
    const digito1 = CPFValidator.geraDigito(newCPF);
    const digito2 = CPFValidator.geraDigito(newCPF + digito1);
    this.NewCPFFormated = newCPF + digito1 + digito2;
  }
  static geraDigito(cpfSemDigitos) {
    let cpfArray = Array.from(cpfSemDigitos);
    let reverso = cpfArray.length + 1;

    let total = cpfArray.reduce((ac, val) => {
      ac += reverso * Number(val);
      reverso--;
      return ac;
    }, 0);
    let result = 11 - (total % 11);
    return result > 9 ? "0" : result;
  }
  get validade() {
    if (this.formatCPF.length !== 11) return false;
    if (typeof this.formatCPF !== "string") return false;
    if (!this.checkSequence) return false;
    if (!this.formatCPF) return false;
    this.generateNewCPF();
    return this.NewCPFFormated === this.formatCPF;
  }
}

// const cpf = new CPFValidator("070.987.720-03");
// if (cpf.validade) {
//   console.log("CPF válido");
// } else {
//   console.log("CPF inválido");
// }

// function CPFValidator(cpf) {
//   Object.defineProperty(this, "formatCPF", {
//     enumerable: true,
//     get: () => {
//       return cpf.replace(/\D+/g, "");
//     },
//   });
// }
// CPFValidator.prototype.checkSequence = function() {
//   if (this.formatCPF.charAt(0).repeat(11) === this.formatCPF) {
//     return false;
//   } else {
//     return true;
//   }
// };
// CPFValidator.prototype.generateNewCPF = function () {
//   const newCPF = this.formatCPF.slice(0, -2);
//   const digito1 = this.geraDigito(newCPF);
//   const digito2 = this.geraDigito(newCPF + digito1);
//   this.NewCPFFormated = newCPF + digito1 + digito2;
// };
// CPFValidator.prototype.validate = function () {
//   if (this.formatCPF.length !== 11) return false;
//   if (typeof this.formatCPF !== "string") return false;
//   if (!this.checkSequence()) return false;
//   if (!this.formatCPF) return false;
//   this.generateNewCPF();
//   return this.NewCPFFormated === this.formatCPF;
// };
// CPFValidator.prototype.geraDigito = function(cpfSemDigitos) {
//   let cpfArray = Array.from(cpfSemDigitos);
//   let reverso = cpfArray.length + 1;

//   let total = cpfArray.reduce((ac, val) => {
//     ac += reverso * Number(val);
//     reverso--;
//     return ac;
//   }, 0);
//   let result = 11 - (total % 11);
//   return result > 9 ? "0" : result;
// };
// const p1 = new CPFValidator("070.987.720-03");
// console.log(p1.validate())
