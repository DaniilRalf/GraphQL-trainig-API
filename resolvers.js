import {GraphQLScalarType} from "graphql/index.js"

let users = [
    {githubLogin: 1, name: 'name1'},
    {githubLogin: 2, name: 'name2'},
    {githubLogin: 3, name: 'name3'},
]
let photos = [
    {id: 1, name: 'name1', description: 'desc1', category: 'ACTION', created: '3-28-1977'},
    {id: 2, name: 'name2', description: 'desc2', category: 'ACTION', created: '1-2-1977'},
    {id: 3, name: 'name3', description: 'desc3', category: 'ACTION', created: '2018-04-14T19:09:57.308Z'},
]
let tags = [
    {photoId: 1, userId: 1},
    {photoId: 2, userId: 2},
    {photoId: 3, userId: 3},
]


export const resolvers = {
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

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A valid date time value',
        parseValue: value => new Date(value),
        serialize: value => new Date(value).toISOString(),
        parseLiteral: ast => ast.value
    }),


    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
    },
    Mutation: {
        postPhoto(parent, args) {
            let newPhoto = {
                id: _id++,
                ...args.input,
                created: new Date()
            }
            photos.push(newPhoto)
            return newPhoto
        }
    }
}