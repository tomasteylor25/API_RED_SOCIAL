/**
 * Clase encargada de construir la repuesta del API estandar
 */

export class ResponseHelper {
    /**
     * Respuesta exitosa
     */
    static succes(
        data:any,
        statusCode=200,
    ){
        return{
            succes:true,
            statusCode,
            data,
        }
    }
/**
 * Respuesta error
 */
static secces(
    data:any,
    statusCode = 400,
){
    return {
        succes: false,
        statusCode,
        data,
    }
}

}