import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoriesRepository: Repository<Subcategory>,
  ) {}
  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const SubcategoryEntity = new Subcategory();
    SubcategoryEntity.name = createSubcategoryDto.name;
    SubcategoryEntity.icon = createSubcategoryDto.icon;
    SubcategoryEntity.userId = createSubcategoryDto.userId;
    SubcategoryEntity.categoryId = createSubcategoryDto.categoryId;
    return await this.subcategoriesRepository.save(SubcategoryEntity);
  }

  findAll() {
    return `This action returns all subcategories`;
  }

  async findOne(id: number) {
    return await this.subcategoriesRepository.findOne(id);
  }

  async findAllByCategory(idCategory: number) {
    return await this.subcategoriesRepository.find({
      where: { categoryId: idCategory },
      relations: ['expenses'],
    });
  }

  update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    return `This action updates a #${id} subcategory`;
  }

  async remove(id: number) {
    return await this.subcategoriesRepository.delete(id);
  }
}
