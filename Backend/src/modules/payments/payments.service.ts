// import { Injectable } from '@nestjs/common';
// import mercadopago from 'mercadopago';

// @Injectable()
// export class PaymentsService {
//   constructor() {
//     mercadopago.configure({
//       access_token: process.env.MP_ACCESS_TOKEN as string,
//     });
//   }

//   async createPreference(items: any[]) {
//     const preference = {
//       items: items.map(item => ({
//         title: item.name,
//         quantity: item.quantity,
//         unit_price: item.price,
//       })),
//       back_urls: {
//         success: 'http://localhost:5173/success',
//         failure: 'http://localhost:5173/error',
//         pending: 'http://localhost:5173/pending',
//       },
//       auto_return: 'approved',
//     };

//     const response = await mercadopago.preferences.create(preference);
//     return response.body;
//   }
// }