import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleDocument, Role } from './schemas/roles.schema';
import { Model } from 'mongoose';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private roleModel:
        Model<RoleDocument>,
    ){}
    /**
     * Metodo para crear un rol
     */
    async create(
        dto: CreateRoleDto,
    ){
        const role= 
        await this.roleModel.create(dto);

        return ResponseHelper.succes(
            role,
            201,
        );
    }
    
    /**
     * Metodo para consultar roles
     */
    async findAll(){
        const roles=
        await this.roleModel.find({activo:true,});

        return ResponseHelper.succes(roles);
    }

    /**
     * consulta roles eliminados logicamente
     */
    async findInactive(){
        const roles= await this.roleModel.find({activo: false});
        return ResponseHelper.succes(roles);
    }

    /**
     * Buscar un rol por id
     */
    async findOne(id:string){
        const role= await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }

        return ResponseHelper.succes(role,);
    }

    /**
     * Actualizar completamente un rol
     */
    async update(id:string, dto:UpdateRoleDto){
        const role= await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }
        const updateRole= await this.roleModel.findByIdAndUpdate(id, dto,{new: true});
        return ResponseHelper.succes(updateRole);
    }

    /**
     * Actualizacion parcial
     */
    async partialUpdate(id:string, dto:UpdateRoleDto){
        const role= await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }

        const updatedRole= await this.roleModel.findByIdAndUpdate(id,{$set:dto,},{new: true})
        return ResponseHelper.succes(updatedRole,);
    }

    /**
     * Eliminacion logica
     */
    async remove(id:string){
        const role= await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }

        const deletedRole= await this.roleModel.findByIdAndUpdate(id,{activo:false,},{new:true});
        return ResponseHelper.succes(deletedRole);
    }

    /**
     * Restaurar rol eliminado
     */
    async restore(id:string){
        const role= await this.roleModel.findById(id);

        if (!role){
            throw new NotFoundException('Rol no encontrado')
        }
        const restoreRole= await this.roleModel.findByIdAndUpdate(id,{activo: true},{new:true});
        return ResponseHelper.succes(restoreRole);
    }
}
