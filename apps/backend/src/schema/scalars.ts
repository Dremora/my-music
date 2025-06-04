import { GraphQLUUID } from "graphql-scalars";
import { asNexusMethod } from "nexus";

export const UUID = asNexusMethod(GraphQLUUID, "uuid", "string");
