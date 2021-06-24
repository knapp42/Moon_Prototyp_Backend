import * as express from "express";
import pgPromise from "pg-promise";

export const register = ( app: express.Application ) => {
    const port = parseInt( process.env.PGPORT || "5432", 10 );
    const config = {
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        port,
        user: process.env.PGUSER
    };

    const pgpromise = pgPromise();
    const db = pgpromise( config );

    app.get( `/api/users/all`, async ( req: any, res ) => {
        try {
            const guitars = await db.any( `
                SELECT *
                FROM    public.user`);
            return res.json( guitars );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.get( `/api/users/:search`, async ( req: any, res ) => {
        try {

            const total = await db.one( `
            SELECT  *
            FROM    public.user
            WHERE   id = $[search ]`, { search: req.params.search  });
            return res.json( total );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.post( `/api/notices`, async ( req: any, res ) => {
        try {
            const id = await db.one( `
                INSERT INTO public.notice( content, last_modified )
                VALUES( $[content], to_timestamp(${Date.now()} / 1000.0)] )
                RETURNING id;`,
                { ...req.body  } );
            return res.json( { id } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );
};
