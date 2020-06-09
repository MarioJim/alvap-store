import express from 'express';
import * as yup from 'yup';
import * as db from '../database';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM Producto');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const row = await db.get(
      'SELECT * FROM Producto WHERE id = (?)',
      req.params.id,
    );
    if (row === undefined) res.sendStatus(404);
    else res.json(row);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

const insertProductSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('Inserta un nombre')
    .min(5, 'Inserta un nombre de al menos 5 caracteres'),
  precio: yup
    .number()
    .required('Inserta un precio')
    .positive('Inserta un precio positivo'),
  descripcion: yup
    .string()
    .required('Inserta una descripción')
    .min(10, 'Inserta una descripción de al menos 10 caracteres'),
});

router.post('/', async (req, res) => {
  try {
    insertProductSchema.validateSync(req.body);
  } catch (error) {
    res.json({ error: error.errors });
    return;
  }
  try {
    await db.run(
      'INSERT INTO Producto (nombre, precio, descripcion) VALUES (?, ?, ?)',
      req.body.nombre,
      req.body.precio,
      req.body.descripcion,
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

const updateProductSchema = yup.object().shape({
  id: yup.number().positive().required(),
  nombre: yup.string().min(5, 'Inserta un nombre de al menos 5 caracteres'),
  precio: yup.number().positive('Inserta un precio positivo'),
  descripcion: yup
    .string()
    .min(10, 'Inserta una descripción de al menos 10 caracteres'),
});

router.put('/', async (req, res) => {
  try {
    updateProductSchema.validateSync(req.body);
  } catch (error) {
    res.json({ error: error.errors });
    return;
  }
  try {
    const row = await db.get(
      'SELECT * FROM Producto WHERE id = (?)',
      req.body.id,
    );
    if (row === undefined) {
      res.sendStatus(404);
      return;
    }
    await db.run(
      'UPDATE Producto SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?',
      req.body.nombre ?? row.nombre,
      req.body.precio ?? row.precio,
      req.body.descripcion ?? row.descripcion,
      req.body.id,
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
