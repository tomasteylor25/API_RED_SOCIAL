import {IsEmail, IsNotEmpty, IsString, minLength, MaxLength, maxLength, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class CreateUserDto{
    @ApiProperty({
        description: 'Nombre del usuario',
        minLength: 3,
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3, {message: 'El nombre debe de tener minimo 3 caracteres'})
    @MaxLength(50,{message: 'El nombre no puede de superar 50 caracteres'})
    nombre!: string;

    @ApiProperty({
        description: 'Correo del usuario',
        maxLength: 100
    })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100,{message:'El correo no puede superar 100 caracteres'})
    correo!: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        minLength: 8,
        maxLength: 20
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8,{message:'La contraseña debe de tener 8 caracteres minimo'})
    @MaxLength(20,{message:'La contraseña no puede superar 20 caracteres'})
    password!: string;

    @ApiProperty()
    @IsNotEmpty()
    rol_id!: string;
}
