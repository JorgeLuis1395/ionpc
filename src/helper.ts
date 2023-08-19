export class Helper {
  static customFileName(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    /*if (file.mimetype.indexOf('pdf') > -1) {
      fileExtension = 'pdf';
    } else if (file.mimetype.indexOf('.doc') > -1) {
      fileExtension = 'doc';
    }*/
    let fileExtension = '';
    if (file.mimetype.indexOf('pdf') > -1) {
      fileExtension = 'pdf';
    } else if (file.mimetype.indexOf('.doc') > -1) {
      fileExtension = 'doc';
    }
    const originalName = file.originalname.split('.')[0];
    cb(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
  }

  static destinationPath(req, file, cb) {
    cb(null, './archivos/');
  }

  static customFileNameVacunas(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension = '';
    if (file.mimetype.indexOf('pdf') > -1) {
      fileExtension = 'pdf';
    } else if (file.mimetype.indexOf('.png') > -1) {
      fileExtension = 'png';
    }
    const originalName = file.originalname.split('.')[0];
    cb(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
  }

  static destinationPathVacunas(req, file, cb) {
    cb(null, './archivos/');
    cb(null, './archivos/vacunas/');
  }
}
