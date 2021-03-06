import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { mergeSchemas } from "@graphql-tools/schema";

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

const typeDefs = mergeTypeDefs(loadedTypeDefs);
const resolvers = mergeResolvers(loadedResolvers);

const schema = mergeSchemas({ typeDefs, resolvers });

export default schema;
