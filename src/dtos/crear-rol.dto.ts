export class CrearRolDto {
  public constructor(init?: Partial<CrearRolDto>) {
    Object.assign(this, init);
  }

  readonly nombre: string;
  readonly descripcion: string;
  readonly idsPermisos: number[];
}
