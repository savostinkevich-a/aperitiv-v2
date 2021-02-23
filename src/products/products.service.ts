import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "./models/product.model";
import {Model, Types} from "mongoose";
import {FilterProductsInput} from "./dto/filter-products.input";
import {PaginationArgs} from "./dto/pagination.args";
import {PaginatedProducts} from "./models/paginated-products.model";
import {CreateProductInput} from "./dto/create-product.input";
import {UpdateProductInput} from "./dto/update-product.input";

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    }

    public async getProducts(filters: FilterProductsInput, args: PaginationArgs): Promise<PaginatedProducts> {
        const total = await this.productModel.count({...filters})
        if ((args.page - 1) * args.limit <= total) {
            const products = await this.productModel
                .find({...filters})
                .sort({_id: -1})
                .skip(args.page > 0 ? ((args.page - 1) * args.limit) : 0)
                .limit(args.limit)
            return {products, total};
        }
        throw new Error('Больше ничего нет')
    }

    public getProductById(_id: Types.ObjectId): Promise<Product> {
        return this.productModel.findById(_id).exec()
    }

    public getProductByPrettyId(prettyId: string): Promise<Product> {
        return this.productModel.findOne({prettyId}).exec()
    }

    public async createProduct(createProductData: CreateProductInput): Promise<Product> {
        function rus_to_latin ( str ) {
            let ru = {
                'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
                'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
                'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
                'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
                'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
                'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
            }, n_str = [];

            str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');



            for ( let i = 0; i < str.length; ++i ) {
                n_str.push(
                    ru[ str[i] ]
                    || ru[ str[i].toLowerCase() ] == undefined && str[i]
                    || ru[ str[i].toLowerCase() ]
                );
            }
            return n_str.join('');
        }
        const prettyId = rus_to_latin(createProductData.title).split(' ').join('_')
        const product = new this.productModel({...createProductData, prettyId})
        return product.save()
    }

    public updateProduct(updateProductData: UpdateProductInput): Promise<Product> {
        return this.productModel.findByIdAndUpdate(updateProductData._id, updateProductData, {new:true}).exec()
    }

    public deleteProduct(_id: Types.ObjectId): Promise<Product> {
        return this.productModel.findByIdAndRemove(_id).exec()
    }
}
