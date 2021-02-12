import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ConnectsService} from "./connects.service";
import {PaginatedConnects} from "./models/paginated-connects.model";
import {PaginationArgs} from "./dto/pagination.args";
import {Types} from "mongoose";
import {Connect} from "./models/connect.model";
import {CreateConnectInput} from "./dto/create-connect.input";
import {UpdateConnectInput} from "./dto/update-connect.input";
import {FilterConnectsInput} from "./dto/filter-connects.input";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/guards/gql-auth-guard";

@Resolver()
export class ConnectsResolver {
    constructor(private connectsService: ConnectsService) {
    }

    @Query(() => PaginatedConnects)
    @UseGuards(GqlAuthGuard)
    async getConnects(
        @Args(`filters`, {nullable: true}) filters: FilterConnectsInput,
        @Args() args: PaginationArgs
    ): Promise<PaginatedConnects> {
        return this.connectsService.getConnects(filters, args)
    }

    @Query(() => Connect)
    @UseGuards(GqlAuthGuard)
    async getConnect(
        @Args(`_id`, {type: () => String}) _id: Types.ObjectId
    ): Promise<Connect> {
        return this.connectsService.getConnect(_id)
    }

    @Mutation(() => Connect)
    async createConnect(
        @Args(`createConnectData`) createConnectData: CreateConnectInput
    ): Promise<Connect> {
        return this.connectsService.createConnect(createConnectData)
    }

    @Mutation(() => Connect)
    @UseGuards(GqlAuthGuard)
    async updateConnect(
        @Args(`updateConnectData`) updateConnectData: UpdateConnectInput
    ): Promise<Connect> {
        return this.connectsService.updateConnect(updateConnectData)
    }

    @Mutation(() => Connect)
    @UseGuards(GqlAuthGuard)
    async deleteConnect(
        @Args(`_id`, {type: () => String}) _id: Types.ObjectId
    ): Promise<Connect> {
        return this.connectsService.deleteConnect(_id)
    }
}
