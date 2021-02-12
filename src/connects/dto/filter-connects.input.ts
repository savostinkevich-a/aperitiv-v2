import {Field, InputType} from "@nestjs/graphql";
import {Steps} from "../emuns/steps.enum";

@InputType()
export class FilterConnectsInput {
    @Field(() => Steps, {nullable: true})
    step?: Steps
}