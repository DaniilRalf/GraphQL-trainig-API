export const typeDefs = `
    scalar DateTime
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        taggedUsers: [User]
        created: DateTime!
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