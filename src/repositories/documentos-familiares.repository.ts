import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DocumentosFamiliaresEntity } from '../entities/documentos-familiares.entity';

@Injectable()
export class DocumentosFamiliaresRepository {
  constructor(
    @InjectRepository(DocumentosFamiliaresEntity)
    private readonly repository: Repository<DocumentosFamiliaresEntity>,
  ) {
  }

  insert(entity: DocumentosFamiliaresEntity): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  selectAll(): Promise<DocumentosFamiliaresEntity[]> {
    return this.repository.find();
  }

  selectById(id: number): Promise<DocumentosFamiliaresEntity | undefined> {
    return this.repository.findOne({ id });
  }

  update(id: number, fieldEntity: object): Promise<UpdateResult> {
    return this.repository.update(id, fieldEntity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
