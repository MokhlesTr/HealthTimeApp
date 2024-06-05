import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendEmail(data, req, res): Promise<void> {
    try {
      // Create transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.configService.get('MY_EMAIL'),
          pass: this.configService.get('MY_PASSWORD'),
        },
      });

      // Log before sending the email
      console.log('OTP GENERATE=======>>', data.otp);

      console.log('====>', data.otp);
      console.log('====>', transporter);

      // Configure the email
      const mailConfig = {
        from: this.configService.get('MY_EMAIL'),
        to: data.recipientEmail,
        subject: 'PASSWORD RECOVERY',
        html: `<!DOCTYPE html>
        <html lang="en" >
        <head>
          <meta charset="UTF-8">
          <title>CodePen - OTP Email Template</title>

        </head>
        <body>
        <!-- partial:index.partial.html -->

        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0; background-color: #f9f9f9; border: 3px solid #ccc; border-radius: 5px; padding:20px">
        
            <p style="font-size:1.9em">Hi ${data.recipientName} </p>
            <p>Thank you for choosing us. Use the following OTP to complete your Password Recovery Procedure.</p>
            <p> Do not share this code with others.</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${data.otp}</h2>
            <hr style="border:none;border-top:4px solid #eee ; pading:20px" />
            <div style="float:right;padding-top:15px 0;color:#aaa;font-size:1.5em;line-height:1;font-weight:300">
              <p>HealthTime Team.</p>
            </div>
          </div>
        </div>
        <!-- partial -->

        </body>
        </html>
        `,
      };

      // Send the email
      await transporter.sendMail(mailConfig);

      // Log after sending the email
      this.logger.log(`Email sent successfully to ${data.recipientEmail}`);
      // console.log(mailConfig);

      res.status(HttpStatus.OK).send('Email sent successfully');
    } catch (error) {
      console.log('Data from backend ====>', data);
      console.log('Res ====>', res);
      console.log('Error   ====>', error);
      // req.setHeader('Content-Type', 'application/json');
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(`An error occurred while sending email: ${error.message}`);
    }
  }
}
