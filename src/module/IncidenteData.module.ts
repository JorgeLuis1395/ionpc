import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {IncidenteDataSchema} from '../schema/incidente-datos.schema';
import {IncidenteDataController} from '../controllers/mongo/incidente-data.controller';
import {IncidenteDataRepository} from '../repositories/mongo/incidente-data.repository';
import {ReporteService} from '../services/reporte.service';
import {ReporteController} from '../controllers/reporte.controller';
import {UbicacionUsuarioSchema} from '../schema/ubicación_usuario.schema';
import {UsuarioUbicacionController} from '../controllers/mongo/usuario-ubicacion.controller';
import {UsuarioUbicacionRepository} from '../repositories/mongo/usuario-ubicacion.repository';
import {DatosIncidenteSchema} from '../schema/datosincidente.schema';
import {DatosProcesadosTranscityRepository} from '../repositories/mongo/datos-procesados-transcity.repository';
import {AnalisisCalidadSchema} from '../schema/analisisCalidad.schema';
import {AnalisisCalidadRepository} from '../repositories/mongo/analisis-calidad.repository';
import {AnalisisCalidadController} from '../controllers/mongo/analisis-calidad.controller';
import {EmailSchema} from '../schema/email.schema';
import {EmailMongoRepository} from '../repositories/mongo/email.repository';
import {EmailController} from '../controllers/mongo/email.controller';
import {ImapService} from '../services/external/imap.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'IncidenteData',
        schema: IncidenteDataSchema,
    }, {name: 'UbicacionUsuario', schema: UbicacionUsuarioSchema},
        {name: 'Emails', schema: EmailSchema},
        {name: 'AnalisisCalidad', schema: AnalisisCalidadSchema},
        {name: 'DatosIncidente', schema: DatosIncidenteSchema}])],
    controllers: [IncidenteDataController, UsuarioUbicacionController, ReporteController, AnalisisCalidadController, EmailController],
    providers: [IncidenteDataRepository, UsuarioUbicacionRepository,
        ReporteService, DatosProcesadosTranscityRepository, AnalisisCalidadRepository, EmailMongoRepository, ImapService],
    exports: [IncidenteDataRepository, DatosProcesadosTranscityRepository, EmailMongoRepository],

})
export class IncidenteDataModule {

}
