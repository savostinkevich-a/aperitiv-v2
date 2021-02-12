import {Field, ObjectType} from "@nestjs/graphql";
import {Connect} from "./connect.model";

@ObjectType()
export class PaginatedConnects {
    @Field(() => [Connect])
    connects: Connect[]

    @Field()
    total: number
}