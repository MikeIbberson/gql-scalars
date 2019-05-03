# GraphQL Scalars

__Note! This package is currently under development. Check back for updates.__

Import directly into your resolver function and declare each scalar in your schema. See below for an example.

There is one scalar type missing from this package; not every project will require it. To convert strings into MongoDB ObjectIds, please visit [this gist](https://gist.github.com/MikeIbberson/557ebdddea51d246a5cfc24557268741).

```
import { merge } from 'lodash';
import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import CustomScalars from 'gql-scalars';

export default makeExecutableSchema({
    resolvers: merge({}, CustomScalars),
    typeDefs: gql`
        scalar Date
        scalar Email
        scalar Phone
        scalar Postal
        scalar Time 
    `
});

```

## Time

Accepts strings formatted as HH:MM like the standard HTML5 input element. This scalar automatically prepends leading zeros and validates time values (i.e. 24-hour maximum).

## Date 

Accepts strings that follow ISO Date formatting standards. This scalar will output YYYY-MM-DD regardless the input formatting. It strips timestamps and converts the date object to a simple string.

## Email

Accepts all valid email formats. This includes those with multiple top-level domains. Currently, this scalar does not support domain-specific email address validation.

## Phone 

Accepts all popular North American phone number formatting, including those prefixed with a country code (ie +1). This scalar serializes a prettified string in the following format: (xxx) xxx-xxxx.

## Positive 

Accepts positive whole numbers. It will round fractions down to the lowest integer.

## Postal 
Accepts a Canadian postal code with or without spaces (ie. L1L 1L1). This scalar serializes the postal code as uppercase.