import React, { Component } from 'react';

import { withApollo, graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';


const GETUSER = gql`
query users {
  allUsers {
    totalCount
    nodes{
      name
      age
    }
  }
}`;

const STOREUSER = gql`
mutation users($name: String!, $age: BigFloat){
    createUser(input: {clientMutationId: "add", user: {name: $name, age: $age} }) {
      clientMutationId
      userEdge{
        node {
          name
          age
        }
      }
    }
  }
  
`

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: ''
        };
        console.log(this.props);
    }

    onchangeinput(event) {
        const { name, value } = event.target;
        console.log(name, value);
        this.setState({ [name]: value });
    }

    store = () => {
        this.props.storeUser(this.state.name, this.state.age);
    }

    render() {
        const { loading, allUsers } = this.props;
        if (loading) {
            return (<div>
                <input type='text' name='name' onChange={this.onchangeinput.bind(this)} />
                <input type='text' name='age' onChange={this.onchangeinput.bind(this)} />
                <button onClick={this.store.bind(this)}>Store</button>

                <p>Loading....</p>
            </div>);
        }
        else {
            console.log(allUsers);
            
            return (
                <div>
                    <input type='text' name='name' onChange={this.onchangeinput.bind(this)} />
                    <input type='text' name='age' onChange={this.onchangeinput.bind(this)} />
                    <button onClick={this.store.bind(this)}>Store</button>

                    <ul>
                        {
                            allUsers.nodes.map((item, i) => {
                                return <li key={i}>{item.name}</li>
                            })

                        }
                    </ul>
                </div>)
        }
    }
}

/* 
function Demo({ data: { loading, error, allUsers, storeUser } }) {
    console.log(loading, error, allUsers, storeUser);

    var state = {};

    const onchangeinput = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        state[name] = value;
    }

    const store = () => {
        storeUser(state.name, state.age);
    }


    if (loading) {
        return (<div>
            <input type='text' name='name' onChange={onchangeinput.bind(this)} />
            <input type='text' name='age' onChange={onchangeinput.bind(this)} />
            <button onClick={store.bind(this)}>Store</button>

            <p>Loading....</p>
        </div>);
    }
    else {
        return (
            <div>
                <input type='text' name='name' onChange={onchangeinput.bind(this)} />
                <input type='text' name='age' />
                <button onClick={store.bind(this)}>Store</button>

                <ul>
                    {
                        allUsers.nodes.map((item, i) => {
                            return <li key={i}>{item.name}</li>
                        })

                    }
                </ul>
            </div>)
    }
}
 */

const x = compose(
    graphql(STOREUSER, {
        props: ({ mutate }) => {
            return {
                storeUser: (name, age) => {
                    return mutate({
                        variables: {
                            name,
                            age
                        }
                    })
                }
            }
        }
    }),
    graphql(GETUSER, {
        props: ({ data: { loading, allUsers } }) => {

            return {
                allUsers: allUsers,
                loading
            }
        }
    })
)(Demo);


export default withApollo(x);