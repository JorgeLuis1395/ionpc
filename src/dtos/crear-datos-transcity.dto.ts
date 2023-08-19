import { ApiProperty } from '@nestjs/swagger';

export class CreateDatosTranscityDTO {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly proceso: string;
  @ApiProperty()
  readonly fecha_creacion: Date;
  @ApiProperty()
  readonly fecha_actualizacion: Date;
  @ApiProperty()
  readonly lote: string;
  @ApiProperty()
  readonly rmp_picadoleveI: string;
  @ApiProperty()
  readonly rmp_picadofuerteI: string;
  @ApiProperty()
  readonly rmp_mudaI: string;
  @ApiProperty()
  readonly rmp_melanosisI: string;
  @ApiProperty()
  readonly rmp_desidratacionleveI: string;
  @ApiProperty()
  readonly rmp_desidratacionfuerteI: string;
  @ApiProperty()
  readonly rmp_maltratoI: string;
  @ApiProperty()
  readonly rmp_rojoI: string;
  @ApiProperty()
  readonly rmp_basuraI: string;
  @ApiProperty()
  readonly rmp_saborI: string;
  @ApiProperty()
  readonly rmp_colorI: string;
  @ApiProperty()
  readonly rmp_pesopromedioI: string;
  @ApiProperty()
  readonly rmp_conteoI: string;
  @ApiProperty()
  readonly rmp_bacteriaI: string;
  @ApiProperty()
  readonly rmp_fechallegadaI: string;
  @ApiProperty()
  readonly rmp_horallegadaI: string;
  @ApiProperty()
  readonly rmp_loteI: string;
  @ApiProperty()
  readonly rmp_proveedorI: string;
  @ApiProperty()
  readonly rmp_piscinaI: string;
  @ApiProperty()
  readonly rmp_guiaI: string;
  @ApiProperty()
  readonly rmp_placacamionI: string;
  @ApiProperty()
  readonly rmp_tipocontenedorI: string;
  @ApiProperty()
  readonly rmp_cantidadcontenedoresI: string;
  @ApiProperty()
  readonly rmp_cantidadmateriaprimaI: string;
  @ApiProperty()
  readonly rmp_pesopromediocontenedorI: string;
  @ApiProperty()
  readonly rmp_flacidezI: string;
  @ApiProperty()
  readonly decisionI: string;
  @ApiProperty()
  readonly descargaenhielado_fechaI: string;
  @ApiProperty()
  readonly descargaenhielado_horaI: string;
  @ApiProperty()
  readonly descargaenhielado_loteI: string;
  @ApiProperty()
  readonly descargaenhielado_horainiciodescargaI: string;
  @ApiProperty()
  readonly descargaenhielado_horafindescargaI: string;
  @ApiProperty()
  readonly descargaenhielado_cantidadhieloI: string;
  @ApiProperty()
  readonly pesopromedio_fechaI: string;
  @ApiProperty()
  readonly pesopromedio_horaI: string;
  @ApiProperty()
  readonly pesopromedio_loteI: string;
  @ApiProperty()
  readonly pesopromedio_horainiciomuestreoI: string;
  @ApiProperty()
  readonly pesopromedio_horafinmuestreoI: string;
  @ApiProperty()
  readonly pesopromedio_cantidadcontenedoresmuestreadosI: string;
  @ApiProperty()
  readonly pesopromedio_pesocontenedor1I: string;
  @ApiProperty()
  readonly pesopromedio_pesocontenedor2I: string;
  @ApiProperty()
  readonly pesopromedio_pesopromediocontenedorI: string;
  @ApiProperty()
  readonly pesopromedio_pesoestimadoloteI: string;
  @ApiProperty()
  readonly almacenamientomp_fechaI: string;
  @ApiProperty()
  readonly almacenamientomp_horaI: string;
  @ApiProperty()
  readonly almacenamientomp_loteI: string;
  @ApiProperty()
  readonly almacenamientomp_ubicacicionI: string;
  @ApiProperty()
  readonly decision_colaI: string;
  @ApiProperty()
  readonly decisioncola_ptI: string;
  @ApiProperty()
  readonly descabezado_fechaI: string;
  @ApiProperty()
  readonly descabezado_horaI: string;
  @ApiProperty()
  readonly descabezado_loteI: string;
  @ApiProperty()
  readonly descabezado_horainicioloteI: string;
  @ApiProperty()
  readonly descabezado_horafinloteI: string;
  @ApiProperty()
  readonly descabezado_cantidadcolaI: string;
  @ApiProperty()
  readonly descabezado_cantidadcabezaI: string;
  @ApiProperty()
  readonly descabezado_cantidadbasuraI: string;
  @ApiProperty()
  readonly descabezado_cantidadpersonasI: string;
  @ApiProperty()
  readonly descabezado_rendimientoI: string;
  @ApiProperty()
  readonly descabezado_velocidaddescabezadoI: string;
  @ApiProperty()
  readonly clasificado_fechaI: string;
  @ApiProperty()
  readonly clasificado_horaI: string;
  @ApiProperty()
  readonly clasificado_loteI: string;
  @ApiProperty()
  readonly clasificado_horainicioloteI: string;
  @ApiProperty()
  readonly clasificado_horafinloteI: string;
  @ApiProperty()
  readonly clasificado_cantidadclasificadotallaI: string;
  @ApiProperty()
  readonly clasificado_cantidadpersonasI: string;
  @ApiProperty()
  readonly clasificado_horainicioparadaI: string;
  @ApiProperty()
  readonly clasificado_horafinparadaI: string;
  @ApiProperty()
  readonly clasificado_velocidadclasificadoI: string;
  @ApiProperty()
  readonly decision_mpI: string;
  @ApiProperty()
  readonly decision_vaI: string;
  @ApiProperty()
  readonly valoragregado_fechaI: string;
  @ApiProperty()
  readonly valoragregado_horaI: string;
  @ApiProperty()
  readonly valoragregado_loteI: string;
  @ApiProperty()
  readonly valoragregado_modalidadI: string;
  @ApiProperty()
  readonly valoragregado_tallaI: string;
  @ApiProperty()
  readonly valoragregado_horainicioI: string;
  @ApiProperty()
  readonly valoragregado_horafinI: string;
  @ApiProperty()
  readonly valoragregado_cantidadrecibidaI: string;
  @ApiProperty()
  readonly valoragregado_cantidadentregadaI: string;
  @ApiProperty()
  readonly valoragregado_brockenI: string;
  @ApiProperty()
  readonly valoragregado_cantidadotrasmodalidadesI: string;
  @ApiProperty()
  readonly valoragregado_cantidadpersonasI: string;
  @ApiProperty()
  readonly valoragregado_rendimientoI: string;
  @ApiProperty()
  readonly valoragregado_horainicioparadaI: string;
  @ApiProperty()
  readonly valoragregado_horafinparadaI: string;
  @ApiProperty()
  readonly valoragregado_velocidaddescabezadoI: string;
  @ApiProperty()
  readonly decision_hidratadoI: string;
  @ApiProperty()
  readonly hidratado_fechaI: string;
  @ApiProperty()
  readonly hidratado_horaI: string;
  @ApiProperty()
  readonly hidratado_loteI: string;
  @ApiProperty()
  readonly hidratado_modalidadI: string;
  @ApiProperty()
  readonly hidratado_tallaI: string;
  @ApiProperty()
  readonly hidratado_horainiciohidratacionI: string;
  @ApiProperty()
  readonly hidratado_horafinhidratacionI: string;
  @ApiProperty()
  readonly hidratado_cantidadrecibidaI: string;
  @ApiProperty()
  readonly hidratado_cantidadentregadaI: string;
  @ApiProperty()
  readonly hidratado_cantidadcarnalI: string;
  @ApiProperty()
  readonly hidratado_cantidadaguaI: string;
  @ApiProperty()
  readonly hidratado_cantidadhieloI: string;
  @ApiProperty()
  readonly hidratado_rendimientoI: string;
  @ApiProperty()
  readonly decision_decoradoI: string;
  @ApiProperty()
  readonly decorado_fechaI: string;
  @ApiProperty()
  readonly decorado_horaI: string;
  @ApiProperty()
  readonly decorado_modalidadI: string;
  @ApiProperty()
  readonly decorado_tallaI: string;
  @ApiProperty()
  readonly decorado_horainicioI: string;
  @ApiProperty()
  readonly decorado_horafinI: string;
  @ApiProperty()
  readonly decorado_cantidadrecibidaI: string;
  @ApiProperty()
  readonly decorado_cantidadentregadaI: string;
  @ApiProperty()
  readonly decorado_cantidadbrockenI: string;
  @ApiProperty()
  readonly decorado_cantidadotrasmodalidadesI: string;
  @ApiProperty()
  readonly decorado_cantidadpersonasI: string;
  @ApiProperty()
  readonly decorado_horainicioparadaI: string;
  @ApiProperty()
  readonly decorado_horafinparadaI: string;
  @ApiProperty()
  readonly decorado_velocidaddecoradoI: string;
  @ApiProperty()
  readonly congelado_fechaI: string;
  @ApiProperty()
  readonly congelado_horaI: string;
  @ApiProperty()
  readonly congelado_modalidadI: string;
  @ApiProperty()
  readonly congelado_tallaI: string;
  @ApiProperty()
  readonly congelado_horainicioI: string;
  @ApiProperty()
  readonly congelado_horafinI: string;
  @ApiProperty()
  readonly congelado_cantidadI: string;
  @ApiProperty()
  readonly congelado_tunelI: string;
  @ApiProperty()
  readonly tumbadoengavetado_fechaI: string;
  @ApiProperty()
  readonly tumbadoengavetado_horaI: string;
  @ApiProperty()
  readonly tumbadoengavetado_loteI: string;
  @ApiProperty()
  readonly tumbadoengavetado_modalidadI: string;
  @ApiProperty()
  readonly tumbadoengavetado_tallaI: string;
  @ApiProperty()
  readonly tumbadoengavetado_horainicioI: string;
  @ApiProperty()
  readonly tumbadoengavetado_horafinI: string;
  @ApiProperty()
  readonly tumbadoengavetado_cantidadpersonasI: string;
  @ApiProperty()
  readonly tumbadoengavetado_horainicioparadaI: string;
  @ApiProperty()
  readonly tumbadoengavetado_horafinparadaI: string;
  @ApiProperty()
  readonly tumbadoengavetado_velocidaddecoradoI: string;
  @ApiProperty()
  readonly decision_ptotraslapadoI: string;
  @ApiProperty()
  readonly pesado_fechaI: string;
  @ApiProperty()
  readonly pesado_horaI: string;
  @ApiProperty()
  readonly pesado_loteI: string;
  @ApiProperty()
  readonly pesado_horainiciomuestreoI: string;
  @ApiProperty()
  readonly pesado_horafinmuestreoI: string;
  @ApiProperty()
  readonly pesado_cantidadcontenedoresmuestreadosI: string;
  @ApiProperty()
  readonly pesado_pesocontenedor1I: string;
  @ApiProperty()
  readonly pesado_pesocontenedor2I: string;
  @ApiProperty()
  readonly pesado_pesopromediocontenedorI: string;
  @ApiProperty()
  readonly pesado_pesoestimadoloteI: string;
  @ApiProperty()
  readonly decision_glaseoI: string;
  @ApiProperty()
  readonly empacado_fechaI: string;
  @ApiProperty()
  readonly empacado_horaI: string;
  @ApiProperty()
  readonly empacado_loteI: string;
  @ApiProperty()
  readonly empacado_modalidadI: string;
  @ApiProperty()
  readonly empacado_tallaI: string;
  @ApiProperty()
  readonly empacado_clienteI: string;
  @ApiProperty()
  readonly empacado_horainicioI: string;
  @ApiProperty()
  readonly empacado_horafinI: string;
  @ApiProperty()
  readonly empacado_cantidadrecibidaI: string;
  @ApiProperty()
  readonly empacado_cantidadentregadaI: string;
  @ApiProperty()
  readonly empacado_mermaI: string;
  @ApiProperty()
  readonly empacado_cantidadotrasmodalidadesI: string;
  @ApiProperty()
  readonly empacado_cantidadpersonasI: string;
  @ApiProperty()
  readonly empacado_horainicioparadaI: string;
  @ApiProperty()
  readonly empacado_horafinparadaI: string;
  @ApiProperty()
  readonly empacado_velocidadempacadoI: string;
  @ApiProperty()
  readonly empacado_pesofundaI: string;
  @ApiProperty()
  readonly empacado_fundaspormasterI: string;
  @ApiProperty()
  readonly empacado_cantidadfundaI: string;
  @ApiProperty()
  readonly empacado_cantidadmasterI: string;
  @ApiProperty()
  readonly empacado_cantidadotrosmaterialesempaqueI: string;
  @ApiProperty()
  readonly masterizado_fechaI: string;
  @ApiProperty()
  readonly masterizado_horaI: string;
  @ApiProperty()
  readonly masterizado_loteI: string;
  @ApiProperty()
  readonly masterizado_modalidadI: string;
  @ApiProperty()
  readonly masterizado_tallaI: string;
  @ApiProperty()
  readonly masterizado_horainicioI: string;
  @ApiProperty()
  readonly masterizado_horafinI: string;
  @ApiProperty()
  readonly masterizado_cantidadpersonasI: string;
  @ApiProperty()
  readonly masterizado_horainicioparadaI: string;
  @ApiProperty()
  readonly masterizado_horafinparadaI: string;
  @ApiProperty()
  readonly masterizado_velocidaddecoradoI: string;
  @ApiProperty()
  readonly almacenamiento_fechaI: string;
  @ApiProperty()
  readonly almacenamiento_horaI: string;
  @ApiProperty()
  readonly almacenamiento_loteI: string;
  @ApiProperty()
  readonly almacenamiento_modalidadI: string;
  @ApiProperty()
  readonly almacenamiento_tallaI: string;
  @ApiProperty()
  readonly almacenamiento_clienteI: string;
  @ApiProperty()
  readonly almacenamiento_camaraI: string;
  @ApiProperty()
  readonly almacenamiento_corridaI: string;
  @ApiProperty()
  readonly almacenamiento_cantidadmastersI: string;
  @ApiProperty()
  readonly decision_despachoempaquedescongeladoI: string;
  @ApiProperty()
  readonly despacho_temperaturacontenedorI: string;
  @ApiProperty()
  readonly despacho_fechaI: string;
  @ApiProperty()
  readonly despacho_horaI: string;
  @ApiProperty()
  readonly despacho_loteI: string;
  @ApiProperty()
  readonly despacho_modalidadI: string;
  @ApiProperty()
  readonly despacho_tallaI: string;
  @ApiProperty()
  readonly despacho_clienteI: string;
  @ApiProperty()
  readonly despacho_poI: string;
  @ApiProperty()
  readonly despacho_navieraI: string;
  @ApiProperty()
  readonly despacho_filacorridaI: string;
  @ApiProperty()
  readonly despacho_numerocontenedorI: string;
  @ApiProperty()
  readonly despacho_placaI: string;
  @ApiProperty()
  readonly despacho_cantidadmasterI: string;
  @ApiProperty()
  readonly despacho_horainicioI: string;
  @ApiProperty()
  readonly despacho_horafinI: string;
  @ApiProperty()
  readonly despacho_velocidaddespachoI: string;
  @ApiProperty()
  readonly enfundado_fechaI: string;
  @ApiProperty()
  readonly enfundado_horaI: string;
  @ApiProperty()
  readonly enfundado_loteI: string;
  @ApiProperty()
  readonly enfundado_pesoI: string;
  @ApiProperty()
  readonly tumbadomasterizado_fechaI: string;
  @ApiProperty()
  readonly tumbadomasterizado_horaI: string;
  @ApiProperty()
  readonly tumbadomasterizado_loteI: string;
  @ApiProperty()
  readonly tumbadomasterizado_modalidadI: string;
  @ApiProperty()
  readonly tumbadomasterizado_tallaI: string;
  @ApiProperty()
  readonly tumbadomasterizado_horainicioI: string;
  @ApiProperty()
  readonly tumbadomasterizado_horafinI: string;
  @ApiProperty()
  readonly tumbadomasterizado_cantidadpersonasI: string;
  @ApiProperty()
  readonly tumbadomasterizado_horainicioparadaI: string;
  @ApiProperty()
  readonly tumbadomasterizado_horafinparadaI: string;
  @ApiProperty()
  readonly tumbadomasterizado_velocidaddecoradoI: string;


}
