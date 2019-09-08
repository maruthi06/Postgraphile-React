import React from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Demo from './Demo';

const client = new ApolloClient({
  uri: 'http://localhost:4200/api/graphql'
});


function App() {

  return (
    <ApolloProvider client={client}>
      <div>
        <Demo />
      </div>
    </ApolloProvider>
  );
}



export default App;
