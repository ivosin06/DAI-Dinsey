import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { PeliService } from '../services/peliService.js';


const routerP = Router();
const peliService = new PeliService();

routerP.get('/', Authenticate, async (req, res) => {
    if (req.query.orden != "ASC" || req.query.orden != "DESC") {
        return res.status(400).json({ error: 'Metodo de orden no válido' }).send();
    }
    const peli = await peliService.busquedaPeli(req.query.nombre, req.query.orden);
    return res.status(200).json(peli);
});

routerP.get('/:id', Authenticate, async (req, res) => {

    const id = req.params.id
    if (id <= 0) {
        res.status(400).json({ error: 'tenes que ingresar un id mas grande que 0 :(' }).send();
        return
    }
    const peli = await peliService.getPeliByIdDetalle(id)

    if (peli.rowsAffected == 0) {

        res.status(404).json({ error: ' La peli que queres mostrar no existe :(' }).send();
        return
    }
    else {
        res.status(200).json(peli);
    }

})



routerP.post('/', Authenticate, async (req, res) => {



    if (req.body.calificacion < 1 || req.body.calificacion > 5) {
        return res.status(400).json({ error: ' la calificacion de la pelicula debe estar entre 1 y 5' }).send();
    }
    const peli = await peliService.createPeli(req.body);
    return res.status(201).json(peli);
});


routerP.put('/:id', Authenticate, async (req, res) => {
    const id = req.params.id

    if (id <= 0) {
        res.status(400).json({ error: 'tenes que ingresar un id mas grande que 0 :(' }).send();
        return
    }
    if (req.body.calificacion < 1 || req.body.calificacion > 5) {
        return res.status(400).json({ error: ' la calificacion de la pelicula debe estar entre 1 y 5' }).send();
    }

    const Update = await peliService.updatePeliaById(id, req.body)
    if
        (Update.rowsAffected == 0) {
        res.status(404).json({ error: ' La pelicula que queres acutualizar no existe :(' }).send();
        return
    } else {
        res.status(200).json(Update);
        return
    }
})
routerP.delete('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;

    if (id < 1) {
        res.status(400).json({ error: 'tenes que ingresar un id mas grande que 0 :(' }).send();
        return;
    }
    const borrar = await peliService.deletePeliById(id);
    if (borrar.rowsAffected == 0) {
        res.status(404).json({ error: ' La peli que queres borrar no existe :(' }).send();
        return;
    }
    res.status(200).json(borrar);
})

export default routerP;