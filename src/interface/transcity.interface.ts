import { Document } from 'mongoose';
export interface TranscityInterface extends Document {

  readonly id: string;
  readonly proceso: string;
  readonly fecha_creacion: Date;
  readonly fecha_actualizacion: Date;
  readonly lote: string;

  readonly rmp_picadoleveI: string;

  readonly rmp_picadofuerteI: string;

  readonly rmp_mudaI: string;

  readonly rmp_melanosisI: string;

  readonly rmp_desidratacionleveI: string;

  readonly rmp_desidratacionfuerteI: string;

  readonly rmp_maltratoI: string;

  readonly rmp_rojoI: string;

  readonly rmp_basuraI: string;

  readonly rmp_saborI: string;

  readonly rmp_colorI: string;

  readonly rmp_pesopromedioI: string;

  readonly rmp_conteoI: string;

  readonly rmp_bacteriaI: string;

  readonly rmp_fechallegadaI: string;

  readonly rmp_horallegadaI: string;

  readonly rmp_loteI: string;

  readonly rmp_proveedorI: string;

  readonly rmp_piscinaI: string;

  readonly rmp_guiaI: string;

  readonly rmp_placacamionI: string;

  readonly rmp_tipocontenedorI: string;

  readonly rmp_cantidadcontenedoresI: string;

  readonly rmp_cantidadmateriaprimaI: string;

  readonly rmp_pesopromediocontenedorI: string;

  readonly rmp_flacidezI: string;

  readonly decisionI: string;

  readonly descargaenhielado_fechaI: string;

  readonly descargaenhielado_horaI: string;

  readonly descargaenhielado_loteI: string;
  readonly descargaenhielado_horainiciodescargaI: string;

  readonly descargaenhielado_horafindescargaI: string;

  readonly descargaenhielado_cantidadhieloI: string;

  readonly pesopromedio_fechaI: string;

  readonly pesopromedio_horaI: string;

  readonly pesopromedio_loteI: string;

  readonly pesopromedio_horainiciomuestreoI: string;

  readonly pesopromedio_horafinmuestreoI: string;

  readonly pesopromedio_cantidadcontenedoresmuestreadosI: string;

  readonly pesopromedio_pesocontenedor1I: string;

  readonly pesopromedio_pesocontenedor2I: string;

  readonly pesopromedio_pesopromediocontenedorI: string;

  readonly pesopromedio_pesoestimadoloteI: string;

  readonly almacenamientomp_fechaI: string;

  readonly almacenamientomp_horaI: string;

  readonly almacenamientomp_loteI: string;

  readonly almacenamientomp_ubicacicionI: string;

  readonly decision_colaI: string;

  readonly decisioncola_ptI: string;

  readonly descabezado_fechaI: string;

  readonly descabezado_horaI: string;

  readonly descabezado_loteI: string;

  readonly descabezado_horainicioloteI: string;

  readonly descabezado_horafinloteI: string;

  readonly descabezado_cantidadcolaI: string;

  readonly descabezado_cantidadcabezaI: string;

  readonly descabezado_cantidadbasuraI: string;

  readonly descabezado_cantidadpersonasI: string;

  readonly descabezado_rendimientoI: string;

  readonly descabezado_velocidaddescabezadoI: string;

  readonly clasificado_fechaI: string;

  readonly clasificado_horaI: string;

  readonly clasificado_loteI: string;

  readonly clasificado_horainicioloteI: string;

  readonly clasificado_horafinloteI: string;

  readonly clasificado_cantidadclasificadotallaI: string;

  readonly clasificado_cantidadpersonasI: string;

  readonly clasificado_horainicioparadaI: string;

  readonly clasificado_horafinparadaI: string;

  readonly clasificado_velocidadclasificadoI: string;
  readonly decision_mpI: string;

  readonly decision_vaI: string;

  readonly valoragregado_fechaI: string;

  readonly valoragregado_horaI: string;

  readonly valoragregado_loteI: string;

  readonly valoragregado_modalidadI: string;

  readonly valoragregado_tallaI: string;

  readonly valoragregado_horainicioI: string;

  readonly valoragregado_horafinI: string;

  readonly valoragregado_cantidadrecibidaI: string;

  readonly valoragregado_cantidadentregadaI: string;

  readonly valoragregado_brockenI: string;

  readonly valoragregado_cantidadotrasmodalidadesI: string;

  readonly valoragregado_cantidadpersonasI: string;

  readonly valoragregado_rendimientoI: string;

  readonly valoragregado_horainicioparadaI: string;

  readonly valoragregado_horafinparadaI: string;

  readonly valoragregado_velocidaddescabezadoI: string;

  readonly decision_hidratadoI: string;

  readonly hidratado_fechaI: string;

  readonly hidratado_horaI: string;

  readonly hidratado_loteI: string;

  readonly hidratado_modalidadI: string;

  readonly hidratado_tallaI: string;

  readonly hidratado_horainiciohidratacionI: string;

  readonly hidratado_horafinhidratacionI: string;

  readonly hidratado_cantidadrecibidaI: string;

  readonly hidratado_cantidadentregadaI: string;

  readonly hidratado_cantidadcarnalI: string;

  readonly hidratado_cantidadaguaI: string;

  readonly hidratado_cantidadhieloI: string;

  readonly hidratado_rendimientoI: string;

  readonly decision_decoradoI: string;

  readonly decorado_fechaI: string;

  readonly decorado_horaI: string;

  readonly decorado_modalidadI: string;

  readonly decorado_tallaI: string;

  readonly decorado_horainicioI: string;

  readonly decorado_horafinI: string;

  readonly decorado_cantidadrecibidaI: string;

  readonly decorado_cantidadentregadaI: string;

  readonly decorado_cantidadbrockenI: string;

  readonly decorado_cantidadotrasmodalidadesI: string;

  readonly decorado_cantidadpersonasI: string;

  readonly decorado_horainicioparadaI: string;

  readonly decorado_horafinparadaI: string;

  readonly decorado_velocidaddecoradoI: string;

  readonly congelado_fechaI: string;

  readonly congelado_horaI: string;

  readonly congelado_modalidadI: string;

  readonly congelado_tallaI: string;

  readonly congelado_horainicioI: string;

  readonly congelado_horafinI: string;

  readonly congelado_cantidadI: string;

  readonly congelado_tunelI: string;

  readonly tumbadoengavetado_fechaI: string;

  readonly tumbadoengavetado_horaI: string;

  readonly tumbadoengavetado_loteI: string;

  readonly tumbadoengavetado_modalidadI: string;

  readonly tumbadoengavetado_tallaI: string;

  readonly tumbadoengavetado_horainicioI: string;

  readonly tumbadoengavetado_horafinI: string;

  readonly tumbadoengavetado_cantidadpersonasI: string;

  readonly tumbadoengavetado_horainicioparadaI: string;

  readonly tumbadoengavetado_horafinparadaI: string;

  readonly tumbadoengavetado_velocidaddecoradoI: string;

  readonly decision_ptotraslapadoI: string;

  readonly pesado_fechaI: string;

  readonly pesado_horaI: string;

  readonly pesado_loteI: string;

  readonly pesado_horainiciomuestreoI: string;

  readonly pesado_horafinmuestreoI: string;

  readonly pesado_cantidadcontenedoresmuestreadosI: string;

  readonly pesado_pesocontenedor1I: string;

  readonly pesado_pesocontenedor2I: string;

  readonly pesado_pesopromediocontenedorI: string;

  readonly pesado_pesoestimadoloteI: string;

  readonly decision_glaseoI: string;

  readonly empacado_fechaI: string;

  readonly empacado_horaI: string;

  readonly empacado_loteI: string;

  readonly empacado_modalidadI: string;

  readonly empacado_tallaI: string;

  readonly empacado_clienteI: string;

  readonly empacado_horainicioI: string;

  readonly empacado_horafinI: string;

  readonly empacado_cantidadrecibidaI: string;

  readonly empacado_cantidadentregadaI: string;

  readonly empacado_mermaI: string;

  readonly empacado_cantidadotrasmodalidadesI: string;

  readonly empacado_cantidadpersonasI: string;

  readonly empacado_horainicioparadaI: string;

  readonly empacado_horafinparadaI: string;

  readonly empacado_velocidadempacadoI: string;

  readonly empacado_pesofundaI: string;

  readonly empacado_fundaspormasterI: string;

  readonly empacado_cantidadfundaI: string;

  readonly empacado_cantidadmasterI: string;

  readonly empacado_cantidadotrosmaterialesempaqueI: string;

  readonly masterizado_fechaI: string;

  readonly masterizado_horaI: string;

  readonly masterizado_loteI: string;

  readonly masterizado_modalidadI: string;

  readonly masterizado_tallaI: string;

  readonly masterizado_horainicioI: string;

  readonly masterizado_horafinI: string;

  readonly masterizado_cantidadpersonasI: string;

  readonly masterizado_horainicioparadaI: string;

  readonly masterizado_horafinparadaI: string;

  readonly masterizado_velocidaddecoradoI: string;

  readonly almacenamiento_fechaI: string;

  readonly almacenamiento_horaI: string;

  readonly almacenamiento_loteI: string;

  readonly almacenamiento_modalidadI: string;

  readonly almacenamiento_tallaI: string;

  readonly almacenamiento_clienteI: string;

  readonly almacenamiento_camaraI: string;

  readonly almacenamiento_corridaI: string;

  readonly almacenamiento_cantidadmastersI: string;

  readonly decision_despachoempaquedescongeladoI: string;

  readonly despacho_temperaturacontenedorI: string;

  readonly despacho_fechaI: string;

  readonly despacho_horaI: string;

  readonly despacho_loteI: string;

  readonly despacho_modalidadI: string;

  readonly despacho_tallaI: string;

  readonly despacho_clienteI: string;

  readonly despacho_poI: string;

  readonly despacho_navieraI: string;

  readonly despacho_filacorridaI: string;

  readonly despacho_numerocontenedorI: string;

  readonly despacho_placaI: string;

  readonly despacho_cantidadmasterI: string;

  readonly despacho_horainicioI: string;

  readonly despacho_horafinI: string;

  readonly despacho_velocidaddespachoI: string;

  readonly enfundado_fechaI: string;

  readonly enfundado_horaI: string;

  readonly enfundado_loteI: string;

  readonly enfundado_pesoI: string;

  readonly tumbadomasterizado_fechaI: string;

  readonly tumbadomasterizado_horaI: string;

  readonly tumbadomasterizado_loteI: string;

  readonly tumbadomasterizado_modalidadI: string;

  readonly tumbadomasterizado_tallaI: string;

  readonly tumbadomasterizado_horainicioI: string;

  readonly tumbadomasterizado_horafinI: string;

  readonly tumbadomasterizado_cantidadpersonasI: string;

  readonly tumbadomasterizado_horainicioparadaI: string;

  readonly tumbadomasterizado_horafinparadaI: string;

  readonly tumbadomasterizado_velocidaddecoradoI: string;

}
