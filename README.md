# GraphQL Scalars

Import directly into your resolver function and declare each scalar in your schema. See below for an example.

```
import { merge } from 'lodash';
import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import CustomScalars from '@MikeIbberson/gql-scalars';

export default makeExecutableSchema({
    resolvers: merge({}, CustomScalars),
    typeDefs: gql`
        scalar Time 

        ## Likely this should be abstracted into another file.
        ## And there would be a lot more for Query and Mutation
    `
});

```

## Time

Accepts strings formatted as "HH:MM" like the standard HTML5 input element. This scalar automatically prepends leading zeros and validates time values (i.e. 24-hour maximum).