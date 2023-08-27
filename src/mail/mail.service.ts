import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { dirname } from 'path';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendCustomEmail(params: {
    user: string;
    pass: string;
    to: string;
    subject: string;
    message: string;
  }) {
    //add new transporter
    this.mailService.addTransporter('gmail', {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: params.user,
        pass: params.pass,
      },
    });

    //send email
    await this.mailService.sendMail({
      to: params.to,
      subject: params.subject,
      transporterName: 'gmail',
      template: './custom',
      attachments: [
        {
          filename: 'bmo-white-variant.png',
          path: __dirname + '/templates/resources/images/bmo-white-variant.png',
          cid: 'bmo-logo',
        },
      ],
      context: {
        message: params.message,
      },
    });
  }
}
