insert into permiso (id, descripcion, id_permiso, id_tipo_permiso) values
('MTAF5', 'Anular Matricula Afianzada', 'MTAF1', 3);
insert into rol_permiso (rol_id, permiso_id) values
(1, 'MTAF5');

insert into permiso (id, descripcion, id_permiso, id_tipo_permiso) values
('NTRT6', 'Anular Notificación de Retiro', 'NTRT1', 3);
insert into rol_permiso (rol_id, permiso_id) values
(1, 'NTRT6');

insert into permiso (id, descripcion, id_permiso, id_tipo_permiso) values
('FCIN6', 'Anular Factura Informativa', 'FCIN1', 3);
insert into rol_permiso (rol_id, permiso_id) values
(1, 'FCIN6');

insert into permiso (id, descripcion, id_permiso, id_tipo_permiso) values
('NTEGVH6', 'Anular Notificación de Egreso del Vehículo', 'NTEGVH1', 3);
insert into rol_permiso (rol_id, permiso_id) values
(1, 'NTEGVH6');
