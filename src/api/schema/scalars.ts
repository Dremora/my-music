import { GraphQLUUID } from "graphql-scalars";

import { builder } from "./builder";

builder.addScalarType("UUID", GraphQLUUID, {});
