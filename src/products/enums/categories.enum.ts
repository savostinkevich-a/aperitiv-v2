import {registerEnumType} from "@nestjs/graphql";

export enum Categories {
    A = "A",
    B = "B",
}

registerEnumType(Categories, {name: 'Categories'})