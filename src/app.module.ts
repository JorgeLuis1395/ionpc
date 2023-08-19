import {UsuarioEntity} from './entities/usuario.entity';
import {JwtService} from './services/jwt.service';
import {ExportadorRepository} from './repositories/exportador.repository';
import {SolicitudPreviaEntity} from './entities/solicitud-previa.entity';
import {TarjaRecepcionVehiculoEntity} from './entities/tarja-recepcion-vehiculo.entity';
import {RutaEntity} from './entities/ruta.entity';
import {TipoPermisoEntity} from './entities/tipo-permiso.entity';
import {ControlFisicoRepository} from './repositories/control-fisico.repository';
import {PermisoEntity} from './entities/permiso.entity';
import {PermisoRepository} from './repositories/permiso.repository';
import {ProductoController} from './controllers/producto.controller';
import {CatalogoControlVehiculoRepository} from './repositories/catalogo-control-vehiculo.repository';
import {CatalogoControlFisicoController} from './controllers/catalogo-control-fisico.controller';
import {ProductoRepository} from './repositories/producto.repository';
import {FacturaInformativaEntity} from './entities/factura-informativa.entity';
import {MatriculaAfianzadaRepository} from './repositories/matricula-afianzada.repository';
import {ClienteEntity} from './entities/cliente.entity';
import {MatriculaAfianzadaEntity} from './entities/matricula-afianzada.entity';
import {AutenticacionController} from './controllers/autenticacion.controller';
import {DetalleItemProductoEntity} from './entities/detalle-item-producto.entity';
import {MatriculaAfianzadaController} from './controllers/matricula-afianzada.controller';
import {DetalleItemProductoController} from './controllers/detalle-item-producto.controller';
import {ParametroReferenciaEntity} from './entities/parametro-referencia.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {UsuarioController} from './controllers/usuario.controller';
import {NotificacionEgresoVehiculoController} from './controllers/notificacion-egreso-vehiculo.controller';
import {ControlVehiculoRepository} from './repositories/control-vehiculo.repository';
import {NotificacionRetiroEntity} from './entities/notificacion-retiro.entity';
import {FacturaInformativaController} from './controllers/factura-informativa.controller';
import {RackRepository} from './repositories/rack.repository';
import {FotoEntity} from './entities/foto.entity';
import {CatalogoControlVehiculoEntity} from './entities/catalogo-control-vehiculo.entity';
import {RackController} from './controllers/rack.controller';
import {CatalogoControlVehiculoController} from './controllers/catalogo-control-vehiculo.controller';
import {PermisoController} from './controllers/permiso.controller';
import {EmailService} from './services/email.service';
import {BodegaRepository} from './repositories/bodega.repository';
import {FacturaInformativaRepository} from './repositories/factura-informativa.repository';
import {BodegaController} from './controllers/bodega.controller';
import {ClienteController} from './controllers/cliente.controller';
import {RolEntity} from './entities/rol.entity';
import {ControlVehiculoController} from './controllers/control-vehiculo.controller';
import {ControlFisicoEntity} from './entities/control-fisico.entity';
import {RolRepository} from './repositories/rol.repository';
import {ParametroReferenciaController} from './controllers/parametro-referencia.controller';
import {UsuarioRepository} from './repositories/usuario.repository';
import {SolicitudPreviaController} from './controllers/solicitud-previa.controller';
import {AutenticacionService} from './services/autenticacion.service';
import {PersonaAutorizadaClienteEntity} from './entities/persona_autorizada_cliente.entity';
import {NotificacionEgresoVehiculoRepository} from './repositories/notificacion-egreso-vehiculo.repository';
import {RutaRepository} from './repositories/ruta.repository';
import {CatalogoControlFisicoEntity} from './entities/catalogo-control-fisico.entity';
import {ClienteRepository} from './repositories/cliente.repository';
import {DetalleItemProductoRepository} from './repositories/detalle-item-producto.repository';
import {RolController} from './controllers/rol.controller';
import {AppService} from './app.service';
import {ControlFisicoController} from './controllers/control-fisico.controller';
import {CatalogoControlFisicoRepository} from './repositories/catalogo-control-fisico.repository';
import {ParametroReferenciaRepository} from './repositories/parametro-referencia.repository';
import {ExportadorEntity} from './entities/exportador.entity';
import {ExportadorController} from './controllers/exportador.controller';
import {NotificacionRetiroController} from './controllers/notificacion-retiro.controller';
import {RolGuard} from './common/guards/rol.guard';
import {ProductoEntity} from './entities/producto.entity';
import {SolicitudPreviaDetalleEntity} from './entities/solicitud-previa-detalle.entity';
import {ServeStaticModule} from '@nestjs/serve-static';
import {ControlVehiculoEntity} from './entities/control-vehiculo.entity';
import {SolicitudPreviaDetalleRepository} from './repositories/solicitud-previa-detalle.repository';
import {TarjaRecepcionVehiculoRepository} from './repositories/tarja-recepcion-vehiculo.repository';
import {BodegaEntity} from './entities/bodega.entity';
import {SolicitudPreviaRepository} from './repositories/solicitud-previa.repository';
import {NotificacionRetiroRepository} from './repositories/notificacion-retiro.repository';
import {NotificacionEgresoVehiculoEntity} from './entities/notificacion-egreso-vehiculo.entity';
import {RackEntity} from './entities/rack.entity';
import {TarjaRecepcionVehiculoController} from './controllers/tarja-recepcion-vehiculo.controller';
import {SolicitudPreviaDetalleController} from './controllers/solicitud-previa-detalle.controller';
import {HttpModule, HttpService, Module} from '@nestjs/common';
import {join} from 'path';
import {PuertoDespachoEntity} from './entities/puerto-despacho.entity';
import {PuertoEmbarqueEntity} from './entities/puerto-embarque.entity';
import {PuertoDespachoRepository} from './repositories/puerto-despacho.repository';
import {PuertoEmbarqueRepository} from './repositories/puerto-embarque.repository';
import {PuertoDespachoController} from './controllers/puerto-despacho.controller';
import {PuertoEmbarqueController} from './controllers/puerto-embarque.controller';
import {PersonaAutorizadaController} from './controllers/persona-autorizada.controller';
import {PersonaAutorizadaRepository} from './repositories/persona-autorizada.repository';
import {PlantillaService} from './services/plantilla.service';
import {FotoRepository} from './repositories/foto.repository';
import {CorreoEntity} from './entities/correo.entity';
import {CorreoRepository} from './repositories/correo.repository';
import {CorreoController} from './controllers/correo.controller';

import {FormularioEntity} from './entities/formularios.entity';
import {FormularioController} from './controllers/formulario.controller';
import {FormularioRepository} from './repositories/formulario.repository';
import {MongooseModule} from '@nestjs/mongoose';

import {IncidenteEntity} from './entities/incidente.entity';
import {IncidenteController} from './controllers/incidente.controller';
import {IncidenteRepository} from './repositories/incidente.repository';

import {IncidenteFormularioEntity} from './entities/incidente-formulario.entity';
import {IncidenteFormularioController} from './controllers/incidente-formulario.controller';
import {IncidenteFormularioRepository} from './repositories/incidente-formulario.repository';
import {IncidenteSubtareaEntity} from './entities/incidente-subtarea.entity';
import {IncidenteSubtareaController} from './controllers/incidente-subtarea.controller';
import {IncidenteSubtareaRepository} from './repositories/incidente-subtarea.repository';
import {IncidenteDataModule} from './module/IncidenteData.module';
import {TurnosEntity} from './entities/turnos.entity';
import {TurnosRepository} from './repositories/turnos.repository';
import {TurnosController} from './controllers/turnos.controller';
import {lugarVacunacionController} from './controllers/external/lugar-vacunacion.controller';
import {VacunacionService} from './services/external/vacunacion.service';
import {EventosEntity} from './entities/eventos.entity';
import {Fecha_eventosEntity} from './entities/fecha_eventos.entity';
import {FechaEventosController} from './controllers/fecha-eventos.controller';
import {EventosController} from './controllers/eventos.controller';
import {EventosRepository} from './repositories/eventos.repository';
import {NotificacionEventosRepository} from './repositories/notificacion-eventos.repository';
import {ProcesoRepository} from './repositories/proceso.repository';
import {ProcesoController} from './controllers/proceso.controller';
import {ProcesoEntity} from './entities/proceso.entity';
import {ScheduleModule} from '@nestjs/schedule';
import {CatalogoService} from './services/catalogo.service';
import {MapaService} from './services/mapa.service';
import {MapaEntity} from './entities/mapa.entity';
import {CatalogoEntity} from './entities/catalogo.entity';
import {NowForceController} from './controllers/now-force.controller';
import {NowForceService} from './services/external/now-force.service';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {RoomsModule} from './rooms/rooms.module';
import {MaterialesEntity} from './entities/materiales.entity';
import {TiposPescadoEntity} from './entities/tipos-pescado.entity';
import {TipoCamaronEntity} from './entities/tipo-camaron.entity';
import {TallasCamaronColaEntity} from './entities/tallas-camaron-cola.entity';
import {TallasCamaronEnteroRepository} from './repositories/tallas-camaron-entero.repository';
import {TallasCamaronEnteroEntity} from './entities/tallas-camaron-entero.entity';
import {ModalidadCamaronRepository} from './repositories/modalidad-camaron.repository';
import {EspeciePescadoFrescoEntity} from './entities/especie-pescado-fresco.entity';
import {EspeciePescadoCongeladoEntity} from './entities/especie-pescado-congelado.entity';
import {ModalidadPescadoEntity} from './entities/modalidad-pescado.entity';
import {OtrasEspeciesEntity} from './entities/otras-especies.entity';
import {ClienteTrancityEntity} from './entities/cliente-trancity.entity';
import {MarcaEntity} from './entities/marca.entity';
import {TratamientosEntity} from './entities/tratamientos.entity';
import {TipoCongelacionEntity} from './entities/tipo-congelacion.entity';
import {DestinoEntity} from './entities/destino.entity';
import {MaterialesController} from './controllers/camaron/materiales.controller';
import {TiposPescadoController} from './controllers/camaron/tipos-pescado.controller';
import {TiposCamaronController} from './controllers/camaron/tipos-camaron.controller';
import {TallasCamaronColaController} from './controllers/camaron/tallas-camaron-cola.controller';
import {TallasCamaronEnteroController} from './controllers/camaron/tallas-camaron-entero.controller';
import {ModalidadCamaronController} from './controllers/camaron/modalidad-camaron.controller';
import {TallasPescadoFrescoController} from './controllers/camaron/tallas-pescado-fresco.controller';
import {TallasPescadoCongeladoController} from './controllers/camaron/tallas-pescado-congelado.controller';
import {ModalidadPescadoController} from './controllers/camaron/modalidad-pescado.controller';
import {OtrasespeciesController} from './controllers/camaron/otrasespecies.controller';
import {ClienteTranscityController} from './controllers/camaron/cliente.controller';
import {MarcaController} from './controllers/camaron/marca.controller';
import {TratamientoController} from './controllers/camaron/tratamiento.controller';
import {TipoCongelacionController} from './controllers/camaron/tipo-congelacion.controller';
import {DestinoController} from './controllers/camaron/destino.controller';
import {MaterialesRepository} from './repositories/materiales.repository';
import {TiposPescadoRepository} from './repositories/tipos-pescado.repository';
import {TiposCamaronRepository} from './repositories/tipos-camaron.repository';
import {TallasCamaronColaRepository} from './repositories/tallas-camaron-cola.repository';
import {TallasPescadoFrescoRepository} from './repositories/tallas-pescado-fresco.repository';
import {TallasPescadoCongeladoRepository} from './repositories/tallas-pescado-congelado.repository';
import {ModalidadPescadoRepository} from './repositories/modalidad-pescado.repository';
import {OtrasEspeciesRepository} from './repositories/otras-especies.repository';
import {ClienteTranscityRepository} from './repositories/cliente-transcity.repository';
import {MarcaRepository} from './repositories/marca.repository';
import {TratamientosRepository} from './repositories/tratamientos.repository';
import {TipoCongelacionRepository} from './repositories/tipo-congelacion.repository';
import {DestinoRepository} from './repositories/destino.repository';
import {ModalidadCamaronEntity} from './entities/modalidad-camaron.entity';
import {ProductosTranscityEntity} from './entities/productos-transcity.entity';
import {ProductoTranscityController} from './controllers/camaron/producto-transcity.controller';
import {ProductoTranscityRepository} from './repositories/producto-transcity.repository';
import {CapacitacionEntity} from './entities/capacitacion.entity';
import {CargasFamiliaresEntity} from './entities/cargas-familiares.entity';
import {DatosFamiliaresEntity} from './entities/datos-familiares.entity';
import {DocumentosFamiliaresEntity} from './entities/documentos-familiares.entity';
import {EmpresaRepository} from './repositories/empresa.repository';
import {EmpresaEntity} from './entities/empresa.entity';
import {GeneroEntity} from './entities/genero.entity';
import {InstitucionLaboralRepository} from './repositories/institucion-laboral.repository';
import {InstitucionLaboralEntity} from './entities/institucion-laboral.entity';
import {InstruccionEntity} from './entities/instruccion.entity';
import {TipoSangreEntity} from './entities/tipo-sangre.entity';
import {CapacitacionController} from './controllers/capacitacion.controller';
import {CargasFamiliaresController} from './controllers/cargas-familiares.controller';
import {DatosFamiliaresController} from './controllers/datos-familiares.controller';
import {DocumentosFamiliaresController} from './controllers/documentos-familiares.controller';
import {EmpresaController} from './controllers/empresa.controller';
import {GeneroController} from './controllers/genero.controller';
import {InstitucionLaboralController} from './controllers/institucion-laboral.controller';
import {InstruccionController} from './controllers/intruccion.controller';
import {TipoSangreController} from './controllers/tipo-sangre.controller';
import {CapacitacionRepository} from './repositories/capacitacion.repository';
import {CargasFamiliaresRepository} from './repositories/cargas-familiares.repository';
import {DatosFamiliaresRepository} from './repositories/datos-familiares.repository';
import {DocumentosFamiliaresRepository} from './repositories/documentos-familiares.repository';
import {GeneroRepository} from './repositories/genero.repository';
import {InstruccionRepository} from './repositories/instruccion.repository';
import {TipoSangreRepository} from './repositories/tipo-sangre.repository';
import {BusinessIntelligenceEntity} from './entities/business-intelligence.entity';
import {FilterEntity} from './entities/filter.entity';
import {DatabaseEntity} from './entities/database.entity';
import {BusinessIntelligenceController} from './controllers/bi/business-intelligence.controller';
import {DatabaseController} from './controllers/bi/database.controller';
import {BusinessIntelligenceService} from './services/business-intelligence.service';
import {DatabaseRepository} from './repositories/database.repository';
import {ConnectionDatabaseService} from './services/connection-database.service';
import {TipoDatabaseEntity} from './entities/tipo-database.entity';
import {RecoveryPasswordService} from './services/recovery-password.service';
import {RecoveryPasswordController} from './controllers/recovery-password.controller';
import {LoginUsuarioController} from './controllers/login-usuario.controller';
import {ImapService} from './services/external/imap.service';
import {ImapController} from './controllers/external/imap.controller';

const ENTIDADES = [
    UsuarioEntity,
    RolEntity,
    PermisoEntity,
    TipoPermisoEntity,
    ClienteEntity,
    ProductoEntity,
    SolicitudPreviaEntity,
    SolicitudPreviaDetalleEntity,
    MatriculaAfianzadaEntity,
    TarjaRecepcionVehiculoEntity,
    CatalogoControlFisicoEntity,
    CatalogoControlVehiculoEntity,
    ControlFisicoEntity,
    ControlVehiculoEntity,
    ExportadorEntity,
    FotoEntity,
    RackEntity,
    DetalleItemProductoEntity,
    ParametroReferenciaEntity,
    BodegaEntity,
    RutaEntity,
    PersonaAutorizadaClienteEntity,
    NotificacionRetiroEntity,
    NotificacionEgresoVehiculoEntity,
    FacturaInformativaEntity,
    PuertoDespachoEntity,
    PuertoEmbarqueEntity,
    CorreoEntity,
    FormularioEntity,
    IncidenteEntity,
    IncidenteFormularioEntity,
    IncidenteSubtareaEntity,
    TurnosEntity,
    EventosEntity,
    Fecha_eventosEntity,
    ProcesoEntity,
    MapaEntity,
    CatalogoEntity,
    MaterialesEntity,
    TiposPescadoEntity,
    TipoCamaronEntity,
    TallasCamaronColaEntity,
    TallasCamaronEnteroEntity,
    ModalidadCamaronEntity,
    EspeciePescadoFrescoEntity,
    EspeciePescadoCongeladoEntity,
    ModalidadPescadoEntity,
    OtrasEspeciesEntity,
    ClienteTrancityEntity,
    MarcaEntity,
    TratamientosEntity,
    TipoCongelacionEntity,
    DestinoEntity,
    ProductosTranscityEntity,

    CapacitacionEntity,
    CargasFamiliaresEntity,
    DatosFamiliaresEntity,
    DocumentosFamiliaresEntity,
    EmpresaEntity,
    GeneroEntity,
    InstitucionLaboralEntity,
    InstruccionEntity,
    TipoSangreEntity,

    BusinessIntelligenceEntity,
    FilterEntity,
    DatabaseEntity,
    TipoDatabaseEntity,

];

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.DB_HOST || '34.27.250.78',
                port: +process.env.DB_PORT || 5432,
                username: process.env.DB_USER || 'bd-strapi',
                password: process.env.DB_PASS || 'ixoH#|uKcNJfh-HD',
                database: process.env.DB_DATABASE || 'ionpc',
                entities: ENTIDADES,
                synchronize: true,
            }),
        }),

        UsersModule,
        RoomsModule,
        AuthModule,

        TypeOrmModule.forFeature(ENTIDADES),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),


        ScheduleModule.forRoot()

    ],
    controllers: [
        AppController,
        AutenticacionController,
        UsuarioController,
        ClienteController,
        ProductoController,
        MatriculaAfianzadaController,
        SolicitudPreviaController,
        SolicitudPreviaDetalleController,
        TarjaRecepcionVehiculoController,
        DetalleItemProductoController,
        CatalogoControlVehiculoController,
        CatalogoControlFisicoController,
        ControlFisicoController,
        ControlVehiculoController,
        ExportadorController,
        ParametroReferenciaController,
        BodegaController,
        RackController,
        RolController,
        NotificacionRetiroController,
        PermisoController,
        NotificacionEgresoVehiculoController,
        FacturaInformativaController,
        PuertoDespachoController,
        PuertoEmbarqueController,
        PersonaAutorizadaController,
        CorreoController,
        FormularioController,
        IncidenteController,
        IncidenteFormularioController,
        IncidenteSubtareaController,
        TurnosController,
        lugarVacunacionController,
        FechaEventosController,
        EventosController,
        ProcesoController,
       // NowForceController,
        MaterialesController,
        TiposPescadoController,
        TiposCamaronController,
        TallasCamaronColaController,
        TallasCamaronEnteroController,
        ModalidadCamaronController,
        TallasPescadoFrescoController,
        TallasPescadoCongeladoController,
        ModalidadPescadoController,
        OtrasespeciesController,
        ClienteTranscityController,
        MarcaController,
        TratamientoController,
        TipoCongelacionController,
        DestinoController,
        ProductoTranscityController,

        CapacitacionController,
        CargasFamiliaresController,
        DatosFamiliaresController,
        DocumentosFamiliaresController,
        EmpresaController,
        GeneroController,
        InstitucionLaboralController,
        InstruccionController,
        TipoSangreController,
        //BusinessIntelligenceController,
        DatabaseController,

        RecoveryPasswordController,
        LoginUsuarioController,
        //ImapController
    ],

    providers: [
        AppService,
        RolGuard,
        AutenticacionService,
        JwtService,
        PermisoRepository,
        RolRepository,
        UsuarioRepository,
        ClienteRepository,
        ProductoRepository,
        MatriculaAfianzadaRepository,
        SolicitudPreviaRepository,
        SolicitudPreviaDetalleRepository,
        TarjaRecepcionVehiculoRepository,
        DetalleItemProductoRepository,
        CatalogoControlVehiculoRepository,
        CatalogoControlFisicoRepository,
        ControlFisicoRepository,
        ControlVehiculoRepository,
        ExportadorRepository,
        EmailService,
        ParametroReferenciaRepository,
        BodegaRepository,
        RackRepository,
        RutaRepository,
        NotificacionRetiroRepository,
        NotificacionEgresoVehiculoRepository,
        FacturaInformativaRepository,
        PuertoDespachoRepository,
        PuertoEmbarqueRepository,
        PersonaAutorizadaRepository,
        FotoRepository,
        PlantillaService,
        CorreoRepository,
        FormularioRepository,
        IncidenteRepository,
        IncidenteFormularioRepository,
        IncidenteSubtareaRepository,
        TurnosRepository,
        VacunacionService,
        EventosRepository,
        NotificacionEventosRepository,
        ProcesoRepository,
        CatalogoService,
        MapaService,
        //NowForceService,
        MaterialesRepository,
        TiposPescadoRepository,
        TiposCamaronRepository,
        TallasCamaronColaRepository,
        TallasCamaronEnteroRepository,
        ModalidadCamaronRepository,
        TallasPescadoFrescoRepository,
        TallasPescadoCongeladoRepository,
        ModalidadPescadoRepository,
        OtrasEspeciesRepository,
        ClienteTranscityRepository,
        MarcaRepository,
        TratamientosRepository,
        TipoCongelacionRepository,
        DestinoRepository,
        ProductoTranscityRepository,

        CapacitacionRepository,
        CargasFamiliaresRepository,
        DatosFamiliaresRepository,
        DocumentosFamiliaresRepository,
        EmpresaRepository,
        GeneroRepository,
        InstitucionLaboralRepository,
        InstruccionRepository,
        TipoSangreRepository,
       // BusinessIntelligenceService,
        DatabaseRepository,
        ConnectionDatabaseService,
        RecoveryPasswordService,
        //ImapService,
    ],
})
export class AppModule {
}
