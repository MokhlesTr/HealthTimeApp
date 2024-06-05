import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send_email')
  async sendRecoveryEmail(
    @Body() data,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    await this.emailService.sendEmail(data, req, res);
  }
}
