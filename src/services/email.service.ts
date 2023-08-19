import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from './jwt.service';

@Injectable()
export class EmailService {
    rivate;
    nodemailer;
    private transporter;
    private mailOptions;
    private FROM = 'jcarrillo@lmi-int.com';
    private Nexmo;
    private nexmo;
    private hbs;

    constructor(
        private readonly jwtService: JwtService,
    ) {
        this.hbs = require('nodemailer-handlebars');
        this.nodemailer = require('nodemailer');

        /*this.transporter = this.nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'admin@amautaec.education',
            clientId: '960530703301-sh6nuqtpjnfe6uuvujbov5v96hau7oek.apps.googleusercontent.com',
            clientSecret: 'lwm479RvlE8BpwC93zidjzQO',
            refreshToken: '1//04-FAA4DSPlOoCgYIARAAGAQSNwF-L9IrokDRrhjVVsBDELd8Froq1X28zovT9Z3rqlxb21CttpqYkHjs1fBXlu0uisCJmFF329Y',
            accessToken: 'ya29.a0AfH6SMDMFJdhwHJyLPxOg0v2hKUc7FBVMx4lD6V60nZV65TTS4-EhG0-PT-EqYM-Gjyg9YmDAjs2-jnfjUL1i99nhv00EAMQ_gyUy6ZNZJWiox5-MxjuU--eTfCtPdDnsHJf9Gb64s9i6sbS4lhukZbaAqHuztzSk6A'
          },
          tls: {
            rejectUnauthorized: false
          }
        });*/
        this.transporter = this.nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true, // use TLS
            auth: {
                user: 'jcarrillo@lmi-int.com',
                pass: 'Sistemas2013811',
            },
        });

        this.mailOptions = {};

        this.Nexmo = require('nexmo');
        this.nexmo = new this.Nexmo({
            apiKey: '5777e540',
            apiSecret: 'NWZCWOZgrb9vNbee',
        });
    }

    async sendEmailPassword(data, subject1, text1?) {
        console.log(data)
        try {
            const testAccount = await this.nodemailer.createTestAccount();
            let codigo = Math.floor((Math.random() * (99999)) + 999999).toString()
            /*const transporter = this.nodemailer.createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: 'admin@amautaec.education',
                clientId: '960530703301-sh6nuqtpjnfe6uuvujbov5v96hau7oek.apps.googleusercontent.com',
                clientSecret: 'lwm479RvlE8BpwC93zidjzQO',
                refreshToken: '1//04-FAA4DSPlOoCgYIARAAGAQSNwF-L9IrokDRrhjVVsBDELd8Froq1X28zovT9Z3rqlxb21CttpqYkHjs1fBXlu0uisCJmFF329Y',
                accessToken: 'ya29.a0AfH6SMDMFJdhwHJyLPxOg0v2hKUc7FBVMx4lD6V60nZV65TTS4-EhG0-PT-EqYM-Gjyg9YmDAjs2-jnfjUL1i99nhv00EAMQ_gyUy6ZNZJWiox5-MxjuU--eTfCtPdDnsHJf9Gb64s9i6sbS4lhukZbaAqHuztzSk6A'
              },
              tls: {
              rejectUnauthorized: false
            }
            });*/
            const transporter = await this.nodemailer.createTransport({
                host: 'smtpout.secureserver.net',
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: 'jcarrillo@lmi-int.com',
                    pass: 'Sistemas2013811',
                },
            });

            transporter.use('compile', this.hbs({
                viewEngine: {
                    extname: '.hbs', // handlebars extension
                    partialsDir: 'src/views',
                    layoutsDir: 'src/views/layouts',
                    defaultLayout: 'index',
                },
                viewPath: 'src/views',
                extName: '.hbs',
            }));

            const token = await this.jwtService.emitirTokenRegister({
                url: 'http://3.93.1.153:3015/#/pages/auth/login',
            });

            const mailOptions = {
                from: this.FROM,
                to: data.email,
                subject: subject1,
                template: 'index',
                context: {
                    correo: data.email,
                    codigo: codigo,
                    url: 'http://3.93.1.153:3015/reset-password?cd=' + codigo + '&id=' + data.id + '&autorizathion=' + token
                },

            };
            const info = await transporter.sendMail(mailOptions);

            return info;
        } catch (error) {
            console.log(error);
            throw new HttpException('¡Error al intentar enviar el correo de para recuperación de contraseña!', HttpStatus.FORBIDDEN);
        }
    }

    async sendEmailActivacion(data, subject1) {
        try {
            const testAccount = await this.nodemailer.createTestAccount();
            /*const transporter = await this.nodemailer.createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: 'admin@amautaec.education',
                clientId: '960530703301-sh6nuqtpjnfe6uuvujbov5v96hau7oek.apps.googleusercontent.com',
                clientSecret: 'lwm479RvlE8BpwC93zidjzQO',
                refreshToken: '1//04-FAA4DSPlOoCgYIARAAGAQSNwF-L9IrokDRrhjVVsBDELd8Froq1X28zovT9Z3rqlxb21CttpqYkHjs1fBXlu0uisCJmFF329Y',
                accessToken: 'ya29.a0AfH6SMDMFJdhwHJyLPxOg0v2hKUc7FBVMx4lD6V60nZV65TTS4-EhG0-PT-EqYM-Gjyg9YmDAjs2-jnfjUL1i99nhv00EAMQ_gyUy6ZNZJWiox5-MxjuU--eTfCtPdDnsHJf9Gb64s9i6sbS4lhukZbaAqHuztzSk6A'
              },*/
            const transporter = await this.nodemailer.createTransport({
                host: 'smtpout.secureserver.net',
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: 'jcarrillo@lmi-int.com',
                    pass: 'Sistemas2013811',
                },
            });

            await transporter.use('compile', this.hbs({
                viewEngine: {
                    extname: '.hbs', // handlebars extension
                    partialsDir: 'src/views',
                    layoutsDir: 'src/views/layouts',
                    defaultLayout: 'indexActivarCuenta',
                },
                viewPath: 'src/views',
                extName: '.hbs',
            }));

            const token = await this.jwtService.emitirTokenRegister({
                nombre_login: data.nombre_login,
                nombre_rol: data.nombre_rol,
            });

            const mailOptions = {
                from: this.FROM,
                to: data.nombre_login,
                subject: subject1,
                template: 'indexActivarCuenta',
                context: {
                    correo: data.nombre_login,
                    //url: 'http://www.amautaec.education:3000/#/pages/auth/login?id=' + data.id_usuario + '&autorizathion=' + token,
                    url: 'http://186.4.200.154:3020/#/home-vc',
                },
            };
            const info = await transporter.sendMail(mailOptions);

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', this.nodemailer.getTestMessageUrl(info));
            return info;

        } catch (error) {
            console.log(error);
            throw new HttpException('¡Error al intentar enviar el correo de activación!', HttpStatus.FORBIDDEN);
        }
    }


    async sendEmailActivacionMoodle(data) {
        try {
            const testAccount = await this.nodemailer.createTestAccount();
            /*const transporter = await this.nodemailer.createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: 'admin@amautaec.education',
                clientId: '960530703301-sh6nuqtpjnfe6uuvujbov5v96hau7oek.apps.googleusercontent.com',
                clientSecret: 'lwm479RvlE8BpwC93zidjzQO',
                refreshToken: '1//04-FAA4DSPlOoCgYIARAAGAQSNwF-L9IrokDRrhjVVsBDELd8Froq1X28zovT9Z3rqlxb21CttpqYkHjs1fBXlu0uisCJmFF329Y',
                accessToken: 'ya29.a0AfH6SMDMFJdhwHJyLPxOg0v2hKUc7FBVMx4lD6V60nZV65TTS4-EhG0-PT-EqYM-Gjyg9YmDAjs2-jnfjUL1i99nhv00EAMQ_gyUy6ZNZJWiox5-MxjuU--eTfCtPdDnsHJf9Gb64s9i6sbS4lhukZbaAqHuztzSk6A'
              },
              tls: {
                rejectUnauthorized: false
              }
            });*/
            const transporter = await this.nodemailer.createTransport({
                host: 'smtpout.secureserver.net',
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: 'jcarrillo@lmi-int.com',
                    pass: 'Sistemas2013811',
                },
            });

            await transporter.use('compile', this.hbs({
                viewEngine: {
                    extname: '.hbs', // handlebars extension
                    partialsDir: 'src/views',
                    layoutsDir: 'src/views/layouts',
                    defaultLayout: 'indexActivarCuentaMoodle',
                },
                viewPath: 'src/views',
                extName: '.hbs',
            }));

            const token = await this.jwtService.emitirTokenRegister({
                nombre_login: data.nick,
                //nombre_rol: data.nombre_rol,
            });

            const mailOptions = {
                from: this.FROM,
                to: data.email,
                subject: "Correo de activación de cuenta",
                template: 'indexActivarCuentaMoodle',
                context: {
                    correo: data.nombre + data.apellido,
                    password: data.password,
                    //url: 'http://www.amautaec.education:3000/#/pages/auth/login?id=' + data.id_usuario + '&autorizathion=' + token,
                    url: 'http://3.93.1.153:3015/sing-in',
                },
            };
            const info = await transporter.sendMail(mailOptions);

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', this.nodemailer.getTestMessageUrl(info));
            return info;

        } catch (error) {
            console.log(error);
            throw new HttpException('¡Error al intentar enviar el correo de activación!', HttpStatus.FORBIDDEN);
        }
    }


    async sendEmailInscripcionCurso(to1, enlace1, codigo1, curso1, url1) {
        try {
            const testAccount = await this.nodemailer.createTestAccount();
            /*const transporter = await this.nodemailer.createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: 'admin@amautaec.education',
                clientId: '960530703301-sh6nuqtpjnfe6uuvujbov5v96hau7oek.apps.googleusercontent.com',
                clientSecret: 'lwm479RvlE8BpwC93zidjzQO',
                refreshToken: '1//04-FAA4DSPlOoCgYIARAAGAQSNwF-L9IrokDRrhjVVsBDELd8Froq1X28zovT9Z3rqlxb21CttpqYkHjs1fBXlu0uisCJmFF329Y',
                accessToken: 'ya29.a0AfH6SMDMFJdhwHJyLPxOg0v2hKUc7FBVMx4lD6V60nZV65TTS4-EhG0-PT-EqYM-Gjyg9YmDAjs2-jnfjUL1i99nhv00EAMQ_gyUy6ZNZJWiox5-MxjuU--eTfCtPdDnsHJf9Gb64s9i6sbS4lhukZbaAqHuztzSk6A'
              },
              tls: {
                rejectUnauthorized: false
              }
            });*/
            const transporter = await this.nodemailer.createTransport({
                host: 'smtpout.secureserver.net',
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: 'jcarrillo@lmi-int.com',
                    pass: 'Sistemas2013811',
                },
            });


            await transporter.use('compile', this.hbs({
                viewEngine: {
                    extname: '.hbs', // handlebars extension
                    partialsDir: 'src/views',
                    layoutsDir: 'src/views/layouts',
                    defaultLayout: 'indexCursos',
                },
                viewPath: 'src/views',
                extName: '.hbs',
            }));


            const mailOptions = {
                from: this.FROM,
                to: to1,
                subject: 'Inscripción Curso',
                template: 'indexCursos',
                context: {
                    curso: curso1,
                    enlaceClassroom: enlace1,
                    codigo: codigo1,
                    url: url1,
                },
            };
            const info = await transporter.sendMail(mailOptions);

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', this.nodemailer.getTestMessageUrl(info));
            return info;

        } catch (error) {
            console.log(error);
            throw new HttpException('¡Error al intentar enviar el correo!', HttpStatus.FORBIDDEN);
        }
    }


    async sendNotificacionMeeting(to1, usuario, contrasena) {
        console.log(to1, usuario, contrasena);
        try {
            const testAccount = await this.nodemailer.createTestAccount();
            /*const transporter = await this.nodemailer.createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: 'admin@amautaec.education',
                clientId: '960530703301-sh6nuqtpjnfe6uuvujbov5v96hau7oek.apps.googleusercontent.com',
                clientSecret: 'lwm479RvlE8BpwC93zidjzQO',
                refreshToken: '1//04-FAA4DSPlOoCgYIARAAGAQSNwF-L9IrokDRrhjVVsBDELd8Froq1X28zovT9Z3rqlxb21CttpqYkHjs1fBXlu0uisCJmFF329Y',
                accessToken: 'ya29.a0AfH6SMDMFJdhwHJyLPxOg0v2hKUc7FBVMx4lD6V60nZV65TTS4-EhG0-PT-EqYM-Gjyg9YmDAjs2-jnfjUL1i99nhv00EAMQ_gyUy6ZNZJWiox5-MxjuU--eTfCtPdDnsHJf9Gb64s9i6sbS4lhukZbaAqHuztzSk6A'
              },
              tls: {
                rejectUnauthorized: false
              }
            });*/
            const transporter = await this.nodemailer.createTransport({
                host: 'smtpout.secureserver.net',
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: 'jcarrillo@lmi-int.com',
                    pass: 'Sistemas2013811',
                },
            });


            await transporter.use('compile', this.hbs({
                viewEngine: {
                    extname: '.hbs', // handlebars extension
                    partialsDir: 'src/views',
                    layoutsDir: 'src/views/layouts',
                    defaultLayout: 'indexNotificacionMeeting',
                },
                viewPath: 'src/views',
                extName: '.hbs',
            }));


            const mailOptions = {
                from: this.FROM,
                to: to1,
                subject: 'Notificación Meeting',
                template: 'indexNotificacionMeeting',
                context: {
                    correo: usuario,
                    password: contrasena,
                },
            };
            const info = await transporter.sendMail(mailOptions);

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', this.nodemailer.getTestMessageUrl(info));
            return info;

        } catch (error) {
            console.log(error);
            throw new HttpException('¡Error al intentar enviar el correo!', HttpStatus.FORBIDDEN);
        }
    }


    async sendEmailInscripcionMoodle(to1, curso1, url1) {
        try {
            const testAccount = await this.nodemailer.createTestAccount();
            /*const transporter = await this.nodemailer.createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: 'admin@amautaec.education',
                clientId: '960530703301-sh6nuqtpjnfe6uuvujbov5v96hau7oek.apps.googleusercontent.com',
                clientSecret: 'lwm479RvlE8BpwC93zidjzQO',
                refreshToken: '1//04-FAA4DSPlOoCgYIARAAGAQSNwF-L9IrokDRrhjVVsBDELd8Froq1X28zovT9Z3rqlxb21CttpqYkHjs1fBXlu0uisCJmFF329Y',
                accessToken: 'ya29.a0AfH6SMDMFJdhwHJyLPxOg0v2hKUc7FBVMx4lD6V60nZV65TTS4-EhG0-PT-EqYM-Gjyg9YmDAjs2-jnfjUL1i99nhv00EAMQ_gyUy6ZNZJWiox5-MxjuU--eTfCtPdDnsHJf9Gb64s9i6sbS4lhukZbaAqHuztzSk6A'
              },
              tls: {
                rejectUnauthorized: false
              }
            });*/

            const transporter = await this.nodemailer.createTransport({
                host: 'smtpout.secureserver.net',
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: 'jcarrillo@lmi-int.com',
                    pass: 'Sistemas2013811',
                },
            });


            await transporter.use('compile', this.hbs({
                viewEngine: {
                    extname: '.hbs', // handlebars extension
                    partialsDir: 'src/views',
                    layoutsDir: 'src/views/layouts',
                    defaultLayout: 'indexCursos',
                },
                viewPath: 'src/views',
                extName: '.hbs',
            }));


            const mailOptions = {
                from: this.FROM,
                to: to1,
                subject: 'Inscripción Curso',
                template: 'indexCursos',
                context: {
                    curso: curso1,
                    url: url1,
                },
            };
            const info = await transporter.sendMail(mailOptions);

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', this.nodemailer.getTestMessageUrl(info));
            return info;

        } catch (error) {
            console.log(error);
            throw new HttpException('¡Error al intentar enviar el correo!', HttpStatus.FORBIDDEN);
        }
    }

}
