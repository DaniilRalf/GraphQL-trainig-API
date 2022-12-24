import {ApolloServer} from "apollo-server";

/**
 * В этой конфигурации рассматривается связь многие ко многим
 * Ничего особенного, просто добавляется дополнительная таблица для связей между таблицами
 * Добавляются дополнительные кастомные Распознователи
 * */

let _id = 1
let users = [
    {githubLogin: 1, name: 'name1'},
    {githubLogin: 2, name: 'name2'},
    {githubLogin: 3, name: 'name3'},
]
let photos = [
    {id: 1, name: 'name1', description: 'desc1', category: 'ACTION'},
    {id: 2, name: 'name2', description: 'desc2', category: 'ACTION'},
    {id: 3, name: 'name3', description: 'desc3', category: 'ACTION'},
]
/**
 * Так-же нет необходимости добавлять в Схему tags,
 * поскольку на практике его нет необходимости передавать на клиент
 * */
let tags = [
    {photoId: 1, userId: 1},
    {photoId: 2, userId: 2},
    {photoId: 3, userId: 3},
]

const typeDefs = `
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        taggedUsers: [User]
    }
    type User {
        githubLogin: ID!
        name: String
        avatar: String
        inPhotos: [Photo]
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
        taggedUsers: parent => tags
            .filter(tag => tag.photoId === parent.id)
            .map(tag => tag.userId)
            .map(userId => users.find(u => u.githubLogin === userId))
    },
    User: {
        inPhotos: parent => tags
            .filter(tag => tag.userId === parent.id)
            .map(tag => tag.photoId)
            .map(photoId => photos.find(p => p.id === photoId))
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