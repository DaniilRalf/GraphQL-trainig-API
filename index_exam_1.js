import {ApolloServer} from "apollo-server";

let photos = []

/**
 * typeDefs - список типов схем
 * resolvers - список функций которые должны соответствовать своими названиями типам,
 * которые приведены в typeDefs, и возвращать данные в соответсвии этим типам
 * Такие ф-ции называются 'Распознавателями'
 * */
const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
    type Mutation {
        postPhoto(name: String! description: String): Boolean!
    }
`
const resolvers = {
    Query: {
        totalPhotos: () => photos.length
    },
    /**
     * Первый аргумент(parent) содержит сведения о родителе(Mutation)
     * Второй аргумет(args) содержит теданные которые мф передали в запросе
     * */
    Mutation: {
        postPhoto(parent, args) {
            photos.push(args)
            return true
        }
    }
}

/**
 * Создаем экземпляр сервера ApolloServer
 * Запускаем сервер
 * По дефолту запускается на 4000 порту (http://localhost:4000)
 * */
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})
server.listen().then(data => {
    console.log(`GraphGQ start on ${data.url}`)
})