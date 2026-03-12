// import { v4 as uuidv4 } from 'uuid';

// export function cartMiddleware(req, res, next) {
//   if (!req.cookies.cartId) {
//     const cartId = uuidv4();

//     res.cookie("cartId", cartId, {
//       httpOnly: true,
//       sameSite: "lax"
//     });

//     req.cartId = cartId;
//   } else {
//     req.cartId = req.cookies.cartId;
//   }

//   next();
// }