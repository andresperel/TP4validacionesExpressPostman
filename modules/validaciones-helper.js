class ValidacionesHelper {

  getIntegerOrDefault = (value, defaultValue) => {
    const num = parseInt(value);
    return isNaN(num) ? defaultValue : num;
  };

  getStringOrDefault = (value, defaultValue) => {
    if (value === null || value === undefined) {
      return defaultValue;
    }
    return String(value);
  };

  getDateOrDefault = (value, defaultValue) => {
    if (value === null || value === undefined) {
      return defaultValue;
    }

    const fecha = new Date(value);

    if (isNaN(fecha.getTime())) {
      return defaultValue;
    }

    return fecha;
  };

  getBooleanOrDefault = (value, defaultValue) => {
    if (value === true || value === "true" || value === "TRUE") {
      return true;
    }
    if (value === false || value === "false" || value === "FALSE") {
      return false;
    }
    return defaultValue;
  };

  isEmail = (value) => {
    if (!value) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

}

export default new ValidacionesHelper();