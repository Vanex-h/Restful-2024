const swaggerAutogen = require("swagger-autogen")
const doc = {
    info: {
        version: '1.0.0',
        title: 'NE Book Management System API',
        description: ''
    },
    host: 'localhost:1500',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        schemas: {
            LoginDto: {
                email: "",
                password: ""
            },
            CreateUserDto: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                
            },
            RegisterBookDto: {
                name: "",
                author: "",
                publisher: "",
                publicationYear: "",
                subject: "",
                
            }
            
        }
    }
    ,
    tags: [
        {
            name: 'User',
            description: 'User endpoints'
        },
        
        {
            name: 'Book',
            description: 'Book endpoints'
        },
        
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    definitions: {}
}
const outputFile = './swagger/doc/swagger.json';
const routes = ['../routes/index.js'];
swaggerAutogen({ openapi: '3.0.0', autoQuery: false ,autoHeaders:false})(outputFile, routes, doc).then(async () => {
    await import('../index.js');
});