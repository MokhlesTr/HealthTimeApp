import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { RequestService } from './request.service';
import { Request, Response } from 'express';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('/all')
  async findAll(@Req() req: Request, @Res() res: Response) {
    return this.requestService.findAll(req, res);
  }

  @Get('/pending')
  async getPendingRequests(@Req() req: Request, @Res() res: Response) {
    return this.requestService.getPendingRequests(req, res);
  }

  @Get(':id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  findOne(@Req() req: Request, @Res() res: Response, @Param('id') id: string) {
    return this.requestService.findOne(req, res, id);
  }

  @Get('/approve/:id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  approveRequest(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return this.requestService.approveRequest(req, res, id);
  }

  @Get('/refuse/:id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  refuseRequest(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return this.requestService.refuseRequest(req, res, id);
  }

  @Get('/approved')
  getApprovedRequests(@Req() req: Request, @Res() res: Response) {
    return this.requestService.getApprovedRequests(req, res);
  }

  @Get('/refused')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  getRefusedRequests(@Req() req: Request, @Res() res: Response) {
    return this.requestService.getRefusedRequests(req, res);
  }
}
