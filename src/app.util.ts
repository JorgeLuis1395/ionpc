import * as fileSytem from 'fs';
import * as moment from 'moment';

export class AppUtil {
  static appendFile(pathFile: string, content: any) {
    return new Promise((resolve, reject) => {
      fileSytem.appendFile(pathFile, content, err => {
        if (err) reject(err);
        resolve(`File ${pathFile} has been appended.`);
      });
    });
  }

  static groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  static formatearFechaHora(fechaHoraStr): string {
    return fechaHoraStr ? moment(fechaHoraStr).format('DD-MM-YYYY HH:mm:ss') : '';
  }

  static obtenerHora(fechaHoraStr) {
    return fechaHoraStr ? moment(fechaHoraStr).format('HH:mm:ss') : '';
  }
}
