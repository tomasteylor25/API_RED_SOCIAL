import { PartialType } from "@nestjs/swagger";
import { CreateRoleDto } from "./create-role.dto";

/**
 * Dto para actualizar un rol
 * PartialType convierte todas las propiedades
 * CreateRoleDto campos opcionales
 */

export class UpdateRoleDto extends PartialType(
    CreateRoleDto,
){}
