import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Connect, ConnectDocument} from "./models/connect.model";
import {Model, Types} from "mongoose";
import {PaginationArgs} from "./dto/pagination.args";
import {PaginatedConnects} from "./models/paginated-connects.model";
import {CreateConnectInput} from "./dto/create-connect.input";
import {UpdateConnectInput} from "./dto/update-connect.input";
import {FilterConnectsInput} from "./dto/filter-connects.input";

@Injectable()
export class ConnectsService {
    constructor(@InjectModel(Connect.name) private connectModel: Model<ConnectDocument>) {
    }

    public async getConnects(filters: FilterConnectsInput, args: PaginationArgs): Promise<PaginatedConnects> {
        const total = await this.connectModel.count({...filters})
        if ((args.page - 1) * args.limit <= total) {
            const connects = await this.connectModel
                .find({...filters})
                .sort({date: - 1})
                .skip(args.page > 0 ? ((args.page - 1) * args.limit) : 0)
                .limit(args.limit)
            return {connects, total}
        }
    }

    public async getConnect(_id: Types.ObjectId): Promise<Connect> {
        return this.connectModel.findById(_id).exec()
    }

    public async createConnect(createConnectData: CreateConnectInput): Promise<Connect> {
        const data = {
            ...createConnectData,
            date: Date.now(),
            isViewed: false,
            isConnected: false,
            isSold: false
        }
        const connect = new this.connectModel(data)
        return connect.save()
    }

    public async updateConnect(updateConnectData: UpdateConnectInput): Promise<Connect> {
        return this.connectModel.findByIdAndUpdate(updateConnectData._id, updateConnectData, {new: true}).exec()
    }

    public async deleteConnect(_id: Types.ObjectId): Promise<Connect> {
        return this.connectModel.findByIdAndRemove(_id).exec()
    }
}
