import {registerEnumType} from "@nestjs/graphql";

export enum Steps {
    notViewed,
    Viewed,
    Connected,
    Sold
}

registerEnumType(Steps, {name: 'Steps'})