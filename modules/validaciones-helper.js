// src/modules/validaciones-helper.js
class ValidacionesHelper {

  getIntegerOrDefault = (value, defaultValue) => { /* ... */ };
  getStringOrDefault  = (value, defaultValue) => { /* ... */ };
  getDateOrDefault    = (value, defaultValue) => { /* ... */ };
  getBooleanOrDefault = (value, defaultValue) => { /* ... */ };
  isEmail             = (value) => { /* ... */ };

}

// Exporto una INSTANCIA (singleton) lista para usar.
export default new ValidacionesHelper();