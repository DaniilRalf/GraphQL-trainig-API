import {ApolloServer} from "apollo-server";

let _id = 1
let photos = [{id: 1, name: 'dfgsd', description: 'dfsfd'}]

const typeDefs = `
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
    }
    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }
    type Mutation {
        postPhoto(name: String! description: String): Photo!
    }
    
`
/**
 * Расмотрим пример когда у нас в обьекте отсутствует метод который должен быть не нулевым(url)
 * Для того чтоы определать его динамически пожем создать РАспознователь напрямую в резолвере
 * Тогда при каждом запросе где фигурирует данный тип мы будем обращатся к этому индивидуальному распознователю
 * и проверять наличие этого метода
 * */
const resolvers = {
    Photo: {
        url: parent => `http://sadfasdf/${parent.id}.com`
    },
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
    },
    Mutation: {
        postPhoto(parent, args) {
            let newPhoto = {
                id: _id++,
                ...args
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