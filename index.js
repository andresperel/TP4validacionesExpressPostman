import ValidacionesHelper from './modules/validaciones-helper.js';
import DateTimeHelper     from './modules/datetime-helper.js';
import Alumno from "./models/alumno.js";

import { sumar, restar, multiplicar, dividir } from "./modules/matematica.js";
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./modules/omdb-wrapper.js";

import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ya estoy respondiendo!');
});

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

app.get('/matematica/sumar', (req, res) => {
  const { n1, n2 } = req.query;
  res.status(200).json({ resultado: sumar(Number(n1), Number(n2)) });
});

app.get('/matematica/restar', (req, res) => {
  const { n1, n2 } = req.query;
  res.status(200).json({ resultado: restar(Number(n1), Number(n2)) });
});

app.get('/matematica/multiplicar', (req, res) => {
  const { n1, n2 } = req.query;
  res.status(200).json({ resultado: multiplicar(Number(n1), Number(n2)) });
});

app.get('/matematica/dividir', (req, res) => {
  const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
  const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);

  if (n1 === null || n2 === null) {
    return res.status(400).send('n1 y n2 deben ser números enteros');
  }
  if (n2 === 0) {
    return res.status(400).send('El divisor no puede ser cero');
  }

  res.status(200).send(String(dividir(n1, n2)));
});

const alumnosArray = [];

alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

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

app.get('/fechas/isDate', (req, res) => {
  const raw = req.query.fecha;
  const fecha = ValidacionesHelper.getDateOrDefault(raw, null);

  console.log("RAW:", raw);
  console.log("PARSEADA:", fecha);
  console.log("ISDATE:", DateTimeHelper.isDate(fecha));

  if (!DateTimeHelper.isDate(fecha)) {
    return res.status(400).send('Fecha inválida');
  }

  res.status(200).json({ valido: true });
});

app.get('/fechas/getEdadActual', (req, res) => {
  const fechaNac = ValidacionesHelper.getDateOrDefault(req.query.fechaNacimiento, null);

  if (!DateTimeHelper.isDate(fechaNac)) {
    return res.status(400).send('Fecha inválida');
  }

  res.status(200).json({
    edad: DateTimeHelper.getEdadActual(fechaNac)
  });
});

app.get('/fechas/getDiasHastaMiCumple', (req, res) => {
  const fechaNac = ValidacionesHelper.getDateOrDefault(req.query.fechaNacimiento, null);

  if (!DateTimeHelper.isDate(fechaNac)) {
    return res.status(400).send('Fecha inválida');
  }

  res.status(200).json({
    diasRestantes: DateTimeHelper.getDiasHastaMiCumple(fechaNac)
  });
});

app.get('/fechas/getDiaTexto', (req, res) => {
  const fecha = ValidacionesHelper.getDateOrDefault(req.query.fecha, null);
  const abr = ValidacionesHelper.getBooleanOrDefault(req.query.abr, false);

  if (!DateTimeHelper.isDate(fecha)) {
    return res.status(400).send('Fecha inválida');
  }

  res.status(200).json({
    dia: DateTimeHelper.getDiaTexto(fecha, abr)
  });
});

app.get('/fechas/getMesTexto', (req, res) => {
  const fecha = ValidacionesHelper.getDateOrDefault(req.query.fecha, null);
  const abr = ValidacionesHelper.getBooleanOrDefault(req.query.abr, false);

  if (!DateTimeHelper.isDate(fecha)) {
    return res.status(400).send('Fecha inválida');
  }

  res.status(200).json({
    mes: DateTimeHelper.getMesTexto(fecha, abr)
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});