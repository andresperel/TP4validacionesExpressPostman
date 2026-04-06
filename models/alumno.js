export class Alumno {

  constructor(username,DNI, edad) {
    this.username =username;
    this.DNI= DNI;
    this.edad = edad
  }

  //toString() {
  //      let concatenatar = (this.username + this.DNI + this.edad);
  //      return concatenatar;
  //}

  toString() {
    return `Nombre: ${this.username}, DNI: ${this.DNI}, Edad: ${this.edad}`;
}
}