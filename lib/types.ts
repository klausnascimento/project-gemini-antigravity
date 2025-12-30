import { Product } from '@prisma/client'

export type SerializedProduct = Omit<Product, 'price'> & {
  price: number
}
