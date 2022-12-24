import {ApolloServer} from "apollo-server";

let _id = 1
let photos = [{id: 1, name: 'dfgsd', description: 'dfsfd'}]

/**
 * В данной конфигурацииприменяем ЕНАМ, который бкдет определять категорию нашего фото
 * И для нашей мутации выносим тип входящих данных в отдельный тип
 * */
const typeDefs = `
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
    }
    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }
    type Mutation {
        postPhoto(input: PhotoCategoryInput!): Photo!
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
    /**
     * ПОскольку мы оперделититип входящих данный конкретной схемой
     * наши данные переместились на уровень ниже в теле args, а именно в input
     * */
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