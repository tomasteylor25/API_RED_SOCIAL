import { PartialType } from "@nestjs/swagger";
import { CreateSeguidorDto } from "./create-seguidor.dto";

/**
 * Dto para actualizar un rol
 * PartialType convierte todas las propiedades
 * CreateRoleDto campos opcionales
 */

export class UpdateSeguidorDto extends PartialType(CreateSeguidorDto){}
