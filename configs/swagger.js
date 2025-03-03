import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "ecommerce API",
            version:"1.0.0",
            description: "API para sistema de ventas en linea",
            contact:{
                name: "Derian Hernández",
                email: "dhernandez-2023346@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/eCommerce/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }