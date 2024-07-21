import { Product } from "app/entity";
import { IProductRepositry } from "interface/IProductRepositry";
import { ProductModel } from '../app/Database/Schema/ProductModel'
import { injectable } from "inversify";

@injectable()
export class ProductRepositry implements IProductRepositry {
    async CreateProduct(input: Product): Promise<Product> {
        const pro = new ProductModel(input)
        const data = await pro.save()
        return data
    }
    async GetAllProducts(): Promise<Product[]> {
        const data = await ProductModel.find()
        if (data) {
            return data
        }
    }
    async getOneProduct(input: Product): Promise<Product> {
        const data = await ProductModel.findById(input)
        return data
    }
} 