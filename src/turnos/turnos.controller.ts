import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto) {
    // Acepto solo fechas DD/MM/YYYY
    let fecha = createTurnoDto.fecha.toString();
    let partes = fecha.split('/');
    let dia = parseInt(partes[0]); // Día
    let mes = parseInt(partes[1]); // Mes
    let anio = parseInt(partes[2]); // Año
    if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || anio < 2025) {
      throw new HttpException(
        'Fecha inválida. Formato correcto: DD/MM/YYYY',
        HttpStatus.OK,
      );
    }
    createTurnoDto.fecha = new Date('' + anio + '-' + mes + '-' + dia);
    return this.turnosService.create(createTurnoDto);
  }

  @Get()
  findAll() {
    return this.turnosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnosService.update(+id, updateTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnosService.remove(+id);
  }
}
