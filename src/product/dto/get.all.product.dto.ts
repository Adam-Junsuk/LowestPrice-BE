import { PickType } from "@nestjs/swagger";
import { ProductEntity } from "../entities/product.entity";
import { IsArray, IsString } from "class-validator";
import { create } from "domain";


export class GetProductDTO extends PickType( ProductEntity, [
    'productId',
    'coupangItemId',
    'coupangVendorId',
    'productName',
    'productImage',
    'isOutOfStock',
    'originalPrice',
    'currentPrice',
    'discountRate',
    'cardDiscount',
    'createdAt',
    'updatedAt',
]) {}


