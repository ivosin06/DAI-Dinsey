import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { PersonajeService } from '../services/personajeService.js';


const router = Router();
const personajeService = new PersonajeService();

router.get('/', Authenticate, async (req, res) => {
    const personaje = await personajeService.busquedaPersonaje(req.query.nombre, req.query.edad, req.query.peso, req.query.movies );
    return res.status(200).json(personaje);
});

router.get('/getById/:id',Authenticate, async (req,res)=>{
    
    const id = req.params.id
    if(id <=0)
    {
        res.status(400).json({ error: 'tenes que ingresar un id mas grande que 0 :(' }).send();
        return
    } 
    const personaje= await personajeService.getPersonajeByIdDetalle(id)

    if(personaje.rowsAffected == 0) {

        
        res.status(404).json({ error: ' el personaje que queres mostrar no existe :(' }).send();
        return
    } 
    else
    {  
        res.status(200).json(personaje);   
    }
   
})


router.post('/',Authenticate, async (req, res) => {

    
  const personaje = await personajeService.createPersonaje(req.body);
  return res.status(201).json(personaje);
});


router.put('/:id', Authenticate,async (req,res)=>{
    const id = req.params.id
    
     if(id <=0)
    {
        res.status(400).json({ error: 'tenes que ingresar un id mas grande que 0 :(' }).send();
        return
    } 
    const Update= await personajeService.updatePersonajeaById(id,req.body)
    if
    (Update.rowsAffected==0 ) {
        res.status(404).json({ error: ' El personaje que queres acutualizar no existe :(' }).send();
        return
      } else
    {    
        res.status(200).json(Update);   
        return
    }
})
router.delete('/:id', Authenticate,async (req,res)=>{
    const id = req.params.id;
    
    if(id < 1){
        res.status(400).json({ error: 'tenes que ingresar un id mas grande que 0 :(' }).send();
        return;
    }
    const  borrar  = await personajeService.deletePersonajeById(id);

    if(borrar.rowsAffected == 0){
        res.status(404).json({ error: ' El personaje que queres borrar no existe :(' }).send();
        return;
    }
    res.status(200).json(borrar);
   })

export default router;