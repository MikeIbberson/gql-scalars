# GraphQL Scalars

Import directly into your resolver function and declare each scalar in your schema. See below for an example.

```
import { merge } from 'lodash';
import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import CustomScalars from 'gql-scalars';

export default makeExecutableSchema({
    resolvers: merge({}, CustomScalars),
    typeDefs: gql`
    
        scalar Time 
        scalar Date

    `
});

```

## Time

Accepts strings formatted as "HH:MM" like the standard HTML5 input element. This scalar automatically prepends leading zeros and validates time values (i.e. 24-hour maximum).

## Date 

Accepts strings that follow ISO Date formatting standards. This scalar will output YYYY-MM-DD regardless the input formatting. It strips timestamps and converts the date object to a simple string.