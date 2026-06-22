import {User, UserDocument} from './schemas/user.schema';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {CreateUserDto} from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ResponseHelper} from "src/common/helpers/response.helper";
import {SearchUserDto} from "./dto/search-user.dto";
import { NotFoundError } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel:
        Model<UserDocument>
    ){}

    /**
     * Metodo para crear un nuevo usuario
     */
    async create(dto: CreateUserDto){
        // Verificacion de correo
        const exists = await this.userModel.findOne({correo: dto.correo});

        // si existe el correo
        if(exists){
            throw new BadRequestException('El correo ya existe');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.userModel.create({...dto, password: hashedPassword});

        return ResponseHelper.succes(user,201);
    }

    /**
     * Consulta usuario
     */
    async findAll(search: SearchUserDto){
        // Crear filtro
        const filter: any={activo: true};

        // Filtro por nombre
        if(search.nombre){
            filter.nombre= {
                $regex: search.nombre,
                $options: 'i'};
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        // Consulta
        const data = await this.userModel.find(filter).populate('rol_id').skip((page - 1) * limit).limit(limit);
        const total = await this.userModel.countDocuments(filter);

        return ResponseHelper.succes({total, page, limit, data})
    }

    /**
     * consulta por id de usuario
     */
    async findOne(id:string){
        const user = await this.userModel.findById(id).populate('rol_id');

        if(!user){
            throw new NotFoundException ('Usuario no encontrado')
        }
    
        return ResponseHelper.succes(user)  
    }

    /**
     * Actualizacion de usuario
     */
    async update(id:string, dto:UpdateUserDto){
        const user = await this.userModel.findById(id)

        if(!user){
            throw new NotFoundException('No se encontro el usuario')
        }

        if(dto.password){
            dto.password= await bcrypt.hash(dto.password,10)
        }

        const updateuser = await this.userModel.findByIdAndUpdate(id, dto,{new: true})

        return ResponseHelper.succes(updateuser)
    }

    /**
     * Soft Delete
     */

    async remove(id:string){
        const user = await this.userModel.findById(id)

        if(!user){
            throw new NotFoundException('Usuario no encontrado')
        }
        const deleteUser = await this.userModel.findByIdAndUpdate(id,{activo: false},{new: true});

        return ResponseHelper.succes(deleteUser)
    }
}
    
