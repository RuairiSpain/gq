const {
    GraphQLServer
} = require('graphql-yoga')


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
// 1

let idCount = links.length
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        // 2
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (root, args) => {
            const i = links.findIndex(x=> x.id === args.id);
            links[i] = {
                id: args.id,
                description: args.description || links[i].description,
                url: args.url || links[i].url,
            }
            return links[i];
        },
        deleteLink: (root, args) => {
            const found = links.find(x=> x.id === args.id);
            links = links.filter(x=> x.id !== args.id);
            return found;
        }
    },
}

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))