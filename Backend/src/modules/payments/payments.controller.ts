import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import express from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create')
  async createPayment(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const data = await this.paymentsService.createPreference(body.items);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return { id: data.id };
  }

  // 🔔 Webhook
  @Post('webhook')
  webhook(@Req() req: express.Request, @Res() res: express.Response) {
    console.log('Webhook recibido:', req.body);

    // acá deberías validar el pago y actualizar tu DB

    return res.sendStatus(200);
  }
}
