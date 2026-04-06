/* Módulo  OMDBWrapper*/
import axios from "axios";
const APIKEY = "5067da15";        // Poné tu APIKEY, esta no funciona.
const OMDBSearchByPage = async (searchText, page = 1) => {

  let returnObject = {
      respuesta     : false,
      cantidadTotal : 0,
      datos         : []
    };


  // No seas vago, acá hay que hacer el cuerpo de la función!!!
  try {

    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;

    const apiResponse = await axios.get(requestString);

    const data = apiResponse.data;

    if (data.Response === "True") {

      returnObject.respuesta = true;

      returnObject.cantidadTotal = parseInt(data.totalResults);

      returnObject.datos = data.Search;

    }

  } catch (error) {

    console.error("Error en OMDBSearchByPage:", error.message);

  }

  return returnObject;

};


const OMDBSearchComplete = async (searchText) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : []

    };


  // No seas vago, acá hay que hacer el cuerpo de la función!!!
  try {

    let page = 1;
    let totalPages = 1;

    do {

      const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;

      const apiResponse = await axios.get(requestString);

      const data = apiResponse.data;

      if (data.Response === "True") {

        if (page === 1) {
          returnObject.respuesta = true;
          returnObject.cantidadTotal = parseInt(data.totalResults);
          totalPages = Math.ceil(returnObject.cantidadTotal / 10);
        }

        returnObject.datos = returnObject.datos.concat(data.Search);

      } else {
        break;
      }

      page++;

    } while (page <= totalPages);

  } catch (error) {

    console.error("Error en OMDBSearchComplete:", error.message);

  }

  return returnObject;

};


const OMDBGetByImdbID = async (imdbID) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : {}

    };


  // No seas vago, acá hay que hacer el cuerpo de la función!!!
  try {

    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;

    const apiResponse = await axios.get(requestString);

    const data = apiResponse.data;

    if (data.Response === "True") {

      returnObject.respuesta = true;

      returnObject.cantidadTotal = 1;

      returnObject.datos = data;

    }

  } catch (error) {

    console.error("Error en OMDBGetByImdbID:", error.message);

  }

  return returnObject;

};


// Exporto todo lo que yo quiero exponer del módulo:

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};