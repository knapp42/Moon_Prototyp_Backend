import express from "express";
import dotenv from "dotenv";
import path from "path";
import * as routes from "./routes";

// initialize configuration
dotenv.config();

const port : number = parseInt(process.env.SERVER_PORT, 10);
const host : string = '0.0.0.0';

const app = express();

// Configure Express to parse incoming JSON data
app.use( express.json() );

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );


routes.register( app );

// start the express server
app.listen( port,() => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://${ host }:${ port }` );
} );
