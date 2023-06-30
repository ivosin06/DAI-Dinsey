import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

export class PeliService {

    getPeli = async () => {

        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT Id, Imagen, Titulo, FechaCreacion from Peli`);

        return response.recordset
    }


    getPeliByIdDetalle = async (id) => {
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT Peli.Id, Peli.Imagen, Peli.Titulo, Peli.FechaCreacion, Peli.Calificacion,
                STRING_AGG(Personaje.Nombre, ',') AS Personajes
                FROM Peli
                INNER JOIN PersonajesXPeli ON PersonajesXPeli.fkPeli = Peli.Id
                INNER JOIN Personaje ON PersonajesXPeli.fkPersonaje = Personaje.Id
                WHERE Peli.Id = @id
                GROUP BY Peli.Id, Peli.Imagen, Peli.Titulo, Peli.FechaCreacion, Peli.Calificacion
            `);
        const results = response.recordset.map((row) => {
            const personajes = row.Personajes.split(',').map((nombre) => nombre.trim());
            return { ...row, Personajes: personajes };
        });
    
    
        return results[0];
    }
    

    createPeli = async (peli) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.NChar, peli?.imagen ?? '')
            .input('Titulo',sql.NChar, peli?.titulo ?? '')
            .input('Calificacion',sql.Int, peli?.calificacion ?? 0)
            .input('FechaCreacion',sql.Date, peli?.fechaCreacion ?? '')
            .query(`INSERT INTO Peli(Imagen, Titulo, FechaCreacion, Calificacion) VALUES (@Imagen, @Titulo, @FechaCreacion, @Calificacion) `);

        return response.recordset
    }

    updatePeliaById = async (id, peli) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Imagen',sql.NChar, peli?.imagen ?? '')
            .input('Titulo',sql.NChar, peli?.titulo ?? '')
            .input('Calificacion',sql.Int, peli?.calificacion ?? 0)
            .input('FechaCreacion',sql.Date, peli?.fechaCreacion ?? '')
            .query(`UPDATE Peli SET Imagen = @Imagen, Titulo = @Titulo, FechaCreacion = @Fechacreacion, Calificacion = @Calificacion WHERE Id = @Id ` );

        return response
    }

    deletePeliById = async (id) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM Peli WHERE Id = @id`);

        return response
    }
    busquedaPeli = async (Nombre, Orden) => {
        const pool = await sql.connect(config);
        let condicionWhere = "";
        let condicionOrder = "";
        
        if(Orden){
            console.log("a");
            condicionOrder += "ORDER BY FechaCreacion " + Orden;
        } 
        if(Nombre){
        condicionWhere = "WHERE @Titulo = Peli.Titulo";
        }

        const request = "SELECT Id, Imagen, Titulo, FechaCreacion from Peli"
        const fullRequest = request + " " + condicionWhere + condicionOrder;
        console.log(fullRequest);
        let response
        response = await pool.request()
        .input('Titulo',sql.VarChar, Nombre ?? '')
        
        .query(fullRequest)
        
        return response.recordset;
    }
    
}