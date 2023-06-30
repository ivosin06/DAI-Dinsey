import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'
import res from 'express/lib/response.js';


export class PersonajeService {

    getPersonajeByIdDetalle = async (id) => {

        const pool = await sql.connect(config);
        const responseDelPersonaje = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT Personaje.Id AS PersonajeId, Personaje.Imagen, Personaje.Nombre, Personaje.Edad, Personaje.Peso, Personaje.Historia
            FROM Personaje
            WHERE Personaje.Id = @id
            `);
            const responsePeliculas = await pool.request()
            .input('idPersonaje',sql.Int, id)
            .query(`SELECT Peli.Id, Peli.Titulo, Peli.FechaCreacion, Peli.Calificacion
            FROM PersonajesXPeli
            INNER JOIN Peli ON PersonajesXPeli.fkPeli = Peli.Id
            WHERE PersonajesXPeli.fkPersonaje = @idPersonaje
            `)
            let personaje = responseDelPersonaje.recordset[0]
            personaje.peliculas = responsePeliculas.recordset
            return  personaje
       
    }

    createPersonaje = async (personaje) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.NChar, personaje?.imagen ?? '')
            .input('Nombre',sql.VarChar, personaje?.nombre ?? '')
            .input('Edad',sql.Int, personaje?.edad ?? 0)
            .input('Peso',sql.Int, personaje?.peso ?? 0)
            .input('Historia',sql.VarChar, personaje?.historia ?? '')
            .query(`INSERT INTO Personaje(Imagen, Nombre, Edad, Peso, Historia) VALUES (@Imagen, @Nombre, @Edad, @Peso, @Historia)`);
    
        return response.recordset
    }

    updatePersonajeaById = async (id, personaje) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('id',sql.Int, id)
        .input('Imagen',sql.NChar, personaje?.imagen ?? '')
        .input('Nombre',sql.Bit, personaje?.nombre ?? '')
        .input('Edad',sql.Int, personaje?.edad ?? 0)
        .input('Peso',sql.Int, personaje?.peso ?? 0)
        .input('Historia',sql.VarChar, personaje?.historia ?? '')
        .query(`UPDATE Personaje SET Imagen = @Imagen, Nombre = @Nombre, Edad = @Edad, Peso = @Peso, Historia = @Historia WHERE Id = @id`);

        return response.rowsAffected
    }

    deletePersonajeById = async (id) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM Personaje WHERE Id = @id`);

        return response
    }

    busquedaPersonaje = async (Nombre, Edad, Peso, IdPeli) => {
        const pool = await sql.connect(config);
        let condicion = "WHERE ";
        let usado = false;
        if(Nombre){
            if(usado){
                condicion += " AND "
            }
        condicion += "@nombre = Personaje.Nombre";
        usado = true;
        }
        
        if(Edad){
            if(usado){
                condicion += " AND "
            }
        condicion += "@edad = Personaje.Edad";
        usado = true;
        }

        if(Peso){
            if(usado){
                condicion += " AND "
            }
        condicion += "@peso = Personaje.Peso";
        usado = true;
        }

        if(IdPeli){
            if(usado){
                condicion += " AND "
            }
        condicion += "Personaje.Id IN (SELECT FkPersonaje FROM PersonajesXPeli WHERE FkPeli = @IdPeli)";
        usado = true;
        }
        
        const request = "SELECT Imagen, Nombre, Id from Personaje "
        let response
        if(!usado){
            response = await pool.request().query(request)
        }else{
            response = await pool.request()
            .input('Nombre',sql.VarChar, Nombre ?? '')
            .input('Edad',sql.Int, Edad ?? 0)
            .input('Peso',sql.Int, Peso ?? 0)
            .input("IdPeli",sql.Int, IdPeli?? 0)
            .query(request + " " + condicion)
        }

        return response.recordset;
    }

}
