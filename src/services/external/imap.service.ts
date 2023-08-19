import { Injectable } from '@nestjs/common';
import { EmailMongoRepository } from 'src/repositories/mongo/email.repository';
import { UsuarioRepository } from '../../repositories/usuario.repository';

const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');

@Injectable()
export class ImapService {

  private clienteImap: any;

  constructor(private email: EmailMongoRepository) {
    this.clienteImap = require('imap-simple');
  }

  ejectutar(email): any {
    console.log(email)
    this.load(email);
  }

  private async load(email) {
    try {
      // await this.connectServerImapEmail()
      await this.connectPrueba(email);
    } catch (e) {
      console.log('error');
    }
  }

  private async connectPrueba(email) {

    const ClasePadre = this;
    const paramteros = {
      user: email.email,
      password: email.password,
      /*user: 'jbedon@lmi-int.com',
      password: 'JBEDON123.',*/
      host: 'imap.secureserver.net',
      port: 993,
      tls: true,
      authTimeout: 10000,
    };

    await this.clienteImap.connect({ imap: paramteros }).then(function(connection) {

      /*Obtener Carpetas */
      connection.getBoxes().then(function(boxes) {
        console.log('Buzones', boxes);
      });
      /*FIn Carpetas */

      connection.openBox('INBOX').then(function(r) {
        console.log('Total', r.messages.total);
        var total = r.messages.total;
        var searchCriteria = [`${1}:${total + 100}`];
        // var searchCriteria = ['1:10'];
        var fetchOptions = {
          bodies: ['HEADER', 'TEXT', ''],
        };
        connection.search(searchCriteria, fetchOptions).then(function(messages) {
          var objeto = new Object();
          console.log(messages.length);

          messages.forEach(function(item) {
            let flags = item.attributes.flags[0];
            if (flags === undefined) {
              console.log('correo no vito');
            } else if (flags.includes('Seen')) {
              console.log('correo Visto');
            }
            var all = _.find(item.parts, { 'which': '' });
            var id = item.attributes.uid;
            var idHeader = 'Imap-Id: ' + id + '\r\n';
            if (id === 1226 || id === 1225 || id === 1227 || id === 1228 || id === 1224) {
              console.log('mesajes ya registrados');
            } else {
              simpleParser(idHeader + all.body, (err, mail) => {
                // access to the whole mail object
                objeto['idmensaje'] = id;
                objeto['Fecha'] = mail.date;
                objeto['Asunto'] = mail.subject;
                objeto['De'] = mail.from.text;
                objeto['Para'] = mail.to.text;
                objeto['Body'] = mail.html;
                //console.log("Maillllll", mail)
                console.log('Maillllll', objeto);
                //console.log(mail.subject)
                //console.log(mail.html)
                ClasePadre.saveObject(objeto);
              });
            }

          });
        });
      });
    });
  }


  /*private async conectPrueba() {
    console.log('--------------------------------  IMAP EMAIL  -------------------------------------------');
    const ClasePadre = this;
    const paramteros = {
      user: 'ebedon@lmi-int.com',
      password: 'Ebedon44',
      host: 'imap.secureserver.net',
      port: 993,
      tls: true,
      authTimeout: 10000,
    };
    console.log(paramteros.user);
    console.log(paramteros.password);

    const conexion = await this.clienteImap.connect({ imap: paramteros }).then(connection => connection)
    console.log('conectado');
    const openBox = await conexion.openBox('INBOX').then(r => r);
    console.log("Total", openBox.messages.total);
    var searchCriteria = ['1:100'];
    var fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
    };
    const mensajes = await conexion.search(searchCriteria, fetchOptions).then((messages) => {
      //return results;
      messages.forEach(function (item) {
        var all = _.find(item.parts, { "which": "TEXT" })
        var html = (Buffer.from(all.body, 'utf-8').toString('ascii'));
        console.log(html)
        ClasePadre.saveObject(html);
      });
    });
    console.log("Mesanaj", mensajes);

  }*/

  private async connectServerImapEmail() {
    console.log('--------------------------------  IMAP EMAIL  -------------------------------------------');
    try {
      let numCorreos = 0;
      const ClasePadre = this;
      const paramteros = {
        user: 'ebedon@lmi-int.com',
        password: 'Ebedon44',
        host: 'imap.secureserver.net',
        port: 993,
        tls: true,
        authTimeout: 10000,
      };
      console.log(paramteros.user);
      console.log(paramteros.password);

      const conexion = await this.clienteImap.connect({ imap: paramteros }).then(conn => conn);
      try {
        console.log('conectado');
        const openBox = await conexion.openBox('INBOX').then(r => r);
        let actual = 0;
        //console.log("Total", openBox.messages.total);

        if (numCorreos < openBox.messages.total) {
          while (actual < openBox.messages.total) {
            let diferencia = openBox.messages.total - actual;
            if (actual > 0) actual += 1;
            else actual = 1;
            var searchCriteria = [`${actual}:${actual + 100}`];
            console.log('criterios: ', searchCriteria);
            var fetchOptions = {
              bodies: ['HEADER', 'TEXT'],
              struct: true,
            };
            const mensajes = await conexion.search(searchCriteria, fetchOptions).then((results) => {
              return results;
            });

            for (const message1 of mensajes) {
              const message = message1.parts;
              let attatchment = '';
              try {
                var objeto = new Object();
                /*  Obtener fecha Mensaje */
                if (message[0] && message[0].body && message[0].body.date[0]) {
                  let date = message[0].body.date[0].split(': ');
                  console.log('date', date);
                  if (date.length > 0) {
                    objeto['Fecha'] = date[0];
                  }
                }
                /*FIn Obtener fechaMensaje */
                /*  Obtener Quien envio Mensaje */
                if (message[0] && message[0].body && message[0].body.from[0]) {
                  let from = message[0].body.from[0].split(': ');
                  console.log('from', from);
                  if (from.length > 0) {
                    objeto['De'] = from[0];
                  }
                }
                /*FIn Obtener Quien envio Mensaje */
                /*  Obtener Asunto Mensaje */
                console.log('Mensaje', message[0]);
                if (message[0] && message[0].body && message[0].body.subject[0]) {
                  let subj = message[0].body.subject[0].split(': ');
                  console.log('subj', subj);
                  if (subj.length > 0) {
                    objeto['Asunto'] = subj[0];
                  }
                }
                /*FIn Obtener Asunto Mensaje */

                var parts = this.clienteImap.getParts(message1.attributes.struct);

                const partsMes = parts.filter(function(part) {
                  return part.disposition && part.disposition.type.toUpperCase() === 'ATTACHMENT';
                });
                for (const parts of partsMes) {
                  attatchment = await conexion.getPartData(message1, parts)
                    .then(function(partData) {
                      try {
                        console.log(partData.toString('utf-8'));

                        return partData.toString('utf-8');
                      } catch (e) {
                        return '';
                      }
                    });
                }

                if (attatchment != '') {
                  try {
                    let valueFile = attatchment;
                    let valueFileAux = '';
                    for (let l = 0; l < valueFile.length; l = l + 2) {
                      let transf = parseInt(valueFile.substring(l, l + 2), 16);
                      valueFileAux = transf.toString() + valueFileAux;
                    }
                    objeto['hexa'] = valueFile;
                    valueFile = valueFileAux;
                    objeto['cantidad'] = valueFile.toString().replace(/ /g, '');
                  } catch (e) {
                    objeto['hexa'] = '0';
                    objeto['cantidad'] = 0;
                  }
                } else {
                  objeto['cantidad'] = 0;
                  objeto['hexa'] = '0';
                }

                if (message[1].body) {
                  let valorJSON = JSON.parse(JSON.stringify(message[1].body.replace(/(?:\r\n|\r|\n)/g, ',').replace(/(,,|,,,|,,,,)/g, ',')));
                  var htmlString = valorJSON;
                  var stripedHtml = htmlString.replace(/<[^>]+>/g, '');
                  stripedHtml = stripedHtml.replace(/,/g, '');
                  stripedHtml = stripedHtml.replace(/ /g, ',');
                  stripedHtml = stripedHtml.replace(/,,,/g, '');
                  stripedHtml = stripedHtml.replace(/,,/g, ' ');
                  stripedHtml = stripedHtml.replace(/,/g, ' ');
                  objeto['Body'] = stripedHtml.toString();
                  ClasePadre.saveObject(objeto);
                }
              } catch (e) {
                console.log('error1', e.toString());
              }
            }

            /*if (diferencia >= 100) actual += 100;
            else actual += diferencia - 1;

            try {
              numCorreos = actual;
            } catch (e) {
              // console.log(e)
            }*/
          }
        }
      } catch (e) {
        conexion.end();
        console.log('error al obtener mensajes del INBOX - openbox', e.toString());
      }
      conexion.end();
    } catch (e) {
      console.error('Error de conexion');
      console.log(e);
    }
  }

  private async saveObject(object) {
    try {
      let envio = {
        parsed: object,
      };
      this.email.create(envio);
    } catch (e) {
      console.log('error lectura objeto');
    }
  }

}
