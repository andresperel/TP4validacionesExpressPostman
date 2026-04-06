import Alumno from "./models/alumno.js"

import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"

import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"
import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors
const app  = express();

const port = 3000;              // El puerto 3000 (http://localhost:3000)


// Agrego los Middlewares

app.use(cors());         // Middleware de CORS

app.use(express.json()); // Middleware para parsear y comprender JSON


//

// Aca pongo todos los EndPoints
app.get('/matematica/sumar', (req, res) => {
    const { n1, n2 } = req.query;

    const resultado = sumar(Number(n1), Number(n2));
    res.status(200).json({ resultado });
});

app.get('/matematica/restar', (req, res) => {
    const { n1, n2 } = req.query;

    const resultado = restar(Number(n1), Number(n2));
    res.status(200).json({ resultado });
});

app.get('/matematica/multiplicar', (req, res) => {
    const { n1, n2 } = req.query;

    const resultado = multiplicar(Number(n1), Number(n2));
    res.status(200).json({ resultado });
});

app.get('/matematica/dividir', (req, res) => {
    const { n1, n2 } = req.query;

    if (Number(n2) === 0) {
        return res.status(400).send("El divisor no puede ser cero");
    }

    const resultado = dividir(Number(n1), Number(n2));
    res.status(200).json({ resultado });
});
const alumnosArray = [];

alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));
//

app.get('/', (req, res) => {                // EndPoint "/"

    res.send('Ya estoy respondiendo!');

})


app.get('/saludar/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.status(200).send(`Hola ${nombre}`);
});
app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    const { ano, mes, dia } = req.params;

    const fecha = `${ano}-${mes}-${dia}`;
    const esValida = !isNaN(Date.parse(fecha));

    if (esValida) {
        res.status(200).send("Fecha válida");
    } else {
        res.status(400).send("Fecha inválida");
    }
});
app.get('/omdb/searchbypage', async (req, res) => {
    const { search, p } = req.query;

    const resultado = await OMDBSearchByPage(search, p);
    res.status(200).json(resultado);
});

app.get('/omdb/searchcomplete', async (req, res) => {
    const { search } = req.query;

    const resultado = await OMDBSearchComplete(search);
    res.status(200).json(resultado);
});

app.get('/omdb/getbyomdbid', async (req, res) => {
    const { imdbID } = req.query;

    const resultado = await OMDBGetByImdbID(imdbID);
    res.status(200).json(resultado);
});

 app.get('/alumnos', (req, res) => {
    res.status(200).json(alumnosArray);
});
app.get('/alumnos/:dni', (req, res) => {
    const dni = req.params.dni;

    const alumno = alumnosArray.find(a => a.dni === dni);

    if (alumno) {
        res.status(200).json(alumno);
    } else {
        res.status(404).send("Alumno no encontrado");
    }
});
app.post('/alumnos', (req, res) => {
    const { username, dni, edad } = req.body;

    const nuevoAlumno = new Alumno(username, dni, edad);
    alumnosArray.push(nuevoAlumno);

    res.status(201).send("Alumno creado");
});
app.delete('/alumnos', (req, res) => {
    const { dni } = req.body;

    const index = alumnosArray.findIndex(a => a.dni === dni);

    if (index !== -1) {
        alumnosArray.splice(index, 1);
        res.status(200).send("Alumno eliminado");
    } else {
        res.status(404).send("Alumno no encontrado");
    }
});

//

// Inicio el Server y lo pongo a escuchar.

//

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})