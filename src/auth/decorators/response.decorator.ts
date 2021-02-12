import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import { Response } from 'express';
import {GqlExecutionContext} from "@nestjs/graphql";

export const ResGql = createParamDecorator(
    (data: unknown, context: ExecutionContext): Response =>
        GqlExecutionContext.create(context).getContext().res,
);
