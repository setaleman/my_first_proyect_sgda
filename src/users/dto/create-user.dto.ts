import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'usuario@correo.com' })
  email: string;

  @ApiProperty({ example: 'Juan Pérez' })
  name: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ example: '+52 5555555555', required: false })
  telephone?: string;

  @ApiProperty({ example: 1 })
  tenantId: number;
}