import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { mergeSchemas } from "@graphql-tools/schema";
import { IResolvers } from "@graphql-tools/utils";
import { DocumentNode, GraphQLSchema } from "graphql";

const loadedTypes: any[] = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers: any[] = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

const typeDefs: DocumentNode = mergeTypeDefs(loadedTypes);
const resolvers: IResolvers = mergeResolvers(loadedResolvers);

const schema: GraphQLSchema = mergeSchemas({ typeDefs, resolvers });

export default schema;
