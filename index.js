import {ApolloServer} from "apollo-server";

/**
 * В этой конфигурации рассматривается связь многие ко многим
 * */

let _id = 1
let users = [
    {githubLogin: "login1", name: 'name1'},
    {githubLogin: "login2", name: 'name2'},
    {githubLogin: "login3", name: 'name3'},
]
let photos = [
    {id: 1, name: 'name1', description: 'desc1', category: 'ACTION', githubUser: 'login2'},
    {id: 1, name: 'name1', description: 'desc1', category: 'ACTION', githubUser: 'login2'},
    {id: 1, name: 'name1', description: 'desc1', category: 'ACTION', githubUser: 'login3'},
]


const typeDefs = `
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        postedBy: User!
    }
    type User {
        githubLogin: ID!
        name: String
        avatar: String
        postedPhotos: [Photo!]!
    }
    
 
    input PhotoCategoryInput {
        name: String!
        description: String
        category: PhotoCategory=PORTRAIT
    }
    
    
    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }
    
    
    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }
    type Mutation {
        postPhoto(input: PhotoCategoryInput!): Photo!
    }
`

const resolvers = {
    Photo: {
        url: parent => `http://sadfasdf/${parent.id}.com`,
        postedBy: parent => {
            return users.find(u => u.githubLogin === parent.githubUser)
        }
    },
    User: {
        postedPhotos: parent => {
            return photos.find(p => p.githubUser === parent.githubLogin)
        }
    },


    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
    },
    Mutation: {
        postPhoto(parent, args) {
            let newPhoto = {
                id: _id++,
                ...args.input
            }
            photos.push(newPhoto)
            return newPhoto
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})
server.listen().then(data => {
    console.log(`GraphGQ start on ${data.url}`)
})