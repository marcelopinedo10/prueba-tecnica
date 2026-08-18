import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @ApiOperation({ summary: 'List all equipment' })
  @ApiOkResponse({ description: 'Equipment list retrieved successfully' })
  @Get()
  findAll() {
    return this.equipmentService.findAll();
  }

  @ApiOperation({ summary: 'Get an equipment by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Equipment found' })
  @ApiNotFoundResponse({ description: 'Equipment not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new equipment' })
  @ApiBody({ type: CreateEquipmentDto })
  @ApiCreatedResponse({ description: 'Equipment created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiConflictResponse({ description: 'Serial number already exists' })
  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @ApiOperation({ summary: 'Update an equipment completely' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateEquipmentDto })
  @ApiOkResponse({ description: 'Equipment updated successfully' })
  @ApiNotFoundResponse({ description: 'Equipment not found' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.update(id, updateEquipmentDto);
  }

  @ApiOperation({ summary: 'Update an equipment partially' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateEquipmentDto })
  @ApiOkResponse({ description: 'Equipment updated successfully' })
  @ApiNotFoundResponse({ description: 'Equipment not found' })
  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.update(id, updateEquipmentDto);
  }

  @ApiOperation({ summary: 'Delete an equipment by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Equipment deleted successfully' })
  @ApiNotFoundResponse({ description: 'Equipment not found' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.remove(id);
  }
}
