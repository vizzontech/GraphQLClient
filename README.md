# GraphQLClient 

Setup
```
npx create-react-app graphql-client 
cd graphql-client 
npm start

```
Install dependencies 
```
npm install @apollo/client graphql
```

Initialize ApolloClient 
```
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
```
Query 
``` 
import { useQuery, gql, useMutation } from '@apollo/client';

const GET_SPEAKERS = gql`
  query getSpeakers {
    speakers {
      id
      name
      bio
      webSite
    }
  }`;
```

Mutations 
``` 
import { useQuery, gql, useMutation } from '@apollo/client';
  const [deleteSpeaker] = useMutation(DELETE_SPEAKER,{
    refetchQueries: [{ query: GET_SPEAKERS }]
  });

```

Caching
``` 
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
  uri: 'https://localhost:44318/graphql/', 
  cache: new InMemoryCache(),
});

  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>

```

Simple fetch
``` 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://localhost:44318/graphql/', 
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
        query getSpeakers {
    speakers {
      id
      name
      bio
      webSite
      }
    }`,
  })
  .then((result) => console.log(result));

```
