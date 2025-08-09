// src/product/product.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private readonly products = [
    {
      id: 1,
      name: 'Iphone 13',
      price: 480,
      img: 'https://rossellimac.es/cdn/shop/files/iPhone_13_Green_PDP_Image_Position-1A__ESES_e67dc465-f394-4b34-8f0e-cc0cfb0a2241.jpg?v=1689076091&width=1445',
    },
    {
      id: 2,
      name: 'Smart TV',
      price: 600,
      img: 'https://tiendadiggit.com.ar/web/image/product.template/248678/image_1920?unique=f1d61d8',
    },
    {
      id: 3,
      name: 'Tablet',
      price: 300,
      img: 'https://aws-obg-image-lb-2.tcl.com/content/dam/brandsite/region/global/products/tablets/tcl-nxtpaper-11/id/new/03.jpg',
    },
    {
      id: 4,
      name: 'Headphones',
      price: 40,
      img: 'https://assets.bosecreative.com/transform/775c3e9a-fcd1-489f-a2f7-a57ac66464e1/SF_QCUH_deepplum_gallery_1_816x612_x2?quality=90',
    },
    {
      id: 5,
      name: 'Mouse',
      price: 30,
      img: 'https://row.hyperx.com/cdn/shop/files/hyperx_pulsefire_core_white_pink_2_back_angled.jpg?v=1732516884&width=1946',
    },
    {
      id: 6,
      name: 'Notebook',
      price: 400,
      img: 'https://acdn-us.mitiendanube.com/stores/001/156/703/products/notebook-gamer-asus-rog-strix-g17-g713pv-ws94-17-ryzen-9-7845hx-1tb-ssd-16gb-rtx-4060-copia-4a3f8882e47fbcca8317314309110054-1024-1024.png',
    },
    {
      id: 7,
      name: 'Electric skateboard',
      price: 700,
      img: 'https://dcdn-us.mitiendanube.com/stores/006/012/118/products/dsc01082-a28c86989dc3589b1917473778564434-1024-1024.jpg',
    },
    {
      id: 8,
      name: 'Virtual reality glasses',
      price: 200,
      img: 'https://media.takealot.com/covers_images/4b2cd2e7f76b46339ecda395e9a8ede0/s-zoom.file',
    },
    {
      id: 9,
      name: 'Airpods',
      price: 10,
      img: 'https://gsmpro.com/cdn/shop/files/airpods-2_a-generacion.jpg?v=1747340504',
    },
    {
      id: 10,
      name: 'Iphone 15',
      price: 800,
      img: 'https://m.media-amazon.com/images/I/71d7rfSl0wL._UF1000,1000_QL80_.jpg',
    },
    {
      id: 11,
      name: 'Camera',
      price: 150,
      img: 'https://www.natcam.com/wp-content/uploads/2022/10/103265569_1.jpg',
    },
    {
      id: 12,
      name: 'Computer Gamer',
      price: 600,
      img: 'https://www.cordobadigital.net/wp-content/uploads/2023/02/X500Rokie.png',
    },
    {
      id: 13,
      name: 'Bicycle',
      price: 200,
      img: 'https://corrientesbikes.com.ar/wp-content/uploads/2022/12/11-velocidades-3.png',
    },
    {
      id: 14,
      name: 'Speakers',
      price: 30,
      img: 'https://acdn-us.mitiendanube.com/stores/001/474/949/products/sin-titulo-1-psd88-recuperado21-5985353425ebcda4d916548232898197-1024-1024.jpg',
    },
    {
      id: 15,
      name: 'Light Ring',
      price: 20,
      img: 'https://tienda.ohmyshop.com.ar/wp-content/uploads/2020/01/1625-modificado.jpg',
    },
  ];

  findAll() {
    return this.products;
  }

  findById(id: number) {
    return this.products.find((p) => p.id === id);
  }
}
