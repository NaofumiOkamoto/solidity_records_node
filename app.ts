import * as bodyParser from "body-parser";
import * as express from "express";
import Routes from "./routes/routes";
import Mysql from "./routes/mysql";
// import cors from  "cors";

const path = require('path');

class App {

    public express: express.Application;

    // array to hold users
    public users: any[];

    constructor() {
        console.log("app.ts constructor()")
        this.express = express();
        this.middleware();
        this.routes();
        this.users = [];
    }

    // Configure Express middleware.
    private middleware(): void {
        console.log("app.ts middleware()")
        const cors = require("cors")
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(process.cwd() + "/vue/dist/"));
        this.express.use(cors());
    }

    private routes(): void {

        // user route
        this.express.use("/api", Routes);
        this.express.use("/getApi", Routes);

        this.express.get("/getApi", (req, res, next) => {
            console.log("app.ts getApi req :", req.query.sql)
            const sql: string = String(req.query.sql);
            this.getDatabaseProducts(sql).then(result =>{
                res.send(result)
                return
            })
        });
        this.express.get("/getProductsLike", (req, res, next) => {
            const sql: string = String(req.query.sql);
            this.getDatabaseProductsLike(sql).then(result =>{
                res.send(result)
                return
            })
        });
        this.express.get("/getProductsGenreLike", (req, res, next) => {
            console.log("app.ts getProductsgenreLike req :", req.query.sql)
            const sql: string = String(req.query.sql);
            this.getDatabaseProductsGenreLike(sql).then(result =>{
                res.send(result)
                return
            })
        });
        this.express.get("/getGenre", (req, res, next) => {
            console.log("/getGenre")
            const sql: string = String(req.query.sql);
            this.getDatabaseGenre(sql).then(result =>{
                res.send(result)
                return
            })
        });
        this.express.get("/getCategory", (req, res, next) => {
            const sql: string = String(req.query.sql);
            console.log("category-sql", sql)
            this.getDatabaseCategory(sql).then(result =>{
                res.send(result)
                return
            })
        });
        this.express.get("/searchProducts", (req, res, next) => {
            console.log('app.ts/searchProduxts')
            const sql: string = String(req.query.sql);
            this.searchProducts(sql).then(result =>{
                res.send(result)
                return
            })
        });

        // handle undefined routes
        // this.express.get("/api", (req, res, next) => {
        //     const sql: string = String(req.query.sql);

        //     console.log("paramssql", sql);

        //     if (sql == "undefined"){
        //         this.databaseConnect().then(result =>{
        //             // console.log("result", result)
        //             console.log("Connect")
        //             console.log(result)
        //             res.send(result)
        //             return
        //         });
        //     }else{
        //         this.databaseFind(sql).then(result =>{
        //             console.log("find-sql", sql)
        //             res.send(result)
        //             return
        //         })
        //     }


        // });
    }
    private getDatabaseProducts(sql){
        var mysql = Mysql
        return mysql.getProducts('localhost', 'root', 'N-okamoto0803', 'solidity_records', sql).then( result =>{
            return result;
        })
    }
    // sql で LIKE 使って取得する時
    private getDatabaseProductsLike(sql){
        var mysql = Mysql
        return mysql.getProductsLike('localhost', 'root', 'N-okamoto0803', 'solidity_records', sql).then( result =>{
            return result;
        })
    }
    private getDatabaseProductsGenreLike(sql){
        var mysql = Mysql
        return mysql.getProductsGenreLike('localhost', 'root', 'N-okamoto0803', 'solidity_records', sql).then( result =>{
            return result;
        })
    }
    private getDatabaseGenre(sql){
        var mysql = Mysql
        return mysql.getGenre('localhost', 'root', 'N-okamoto0803', 'solidity_records', sql).then( result =>{
            return result;
        })
    }
    private getDatabaseCategory(sql){
        console.log("getDatabeseCategory")
        var mysql = Mysql
        return mysql.getCategorys('localhost', 'root', 'N-okamoto0803', 'solidity_records', sql).then( result =>{
            return result;
        })
    }
    private searchProducts(sql){
        console.log("searchProducts")
        var mysql = Mysql
        return mysql.searchProducts('localhost', 'root', 'N-okamoto0803', 'solidity_records', sql).then( result =>{
            return result;
        })
    }
    private databaseConnect(){
        var mysql = Mysql
        return mysql.connect('localhost', 'root', 'N-okamoto0803', 'solidity_records').then( result =>{
            return result;
        })
    }
    private databaseFind(sql){
        var mysql = Mysql
        return mysql.find('localhost', 'root', 'N-okamoto0803', 'solidity_records', sql).then( result =>{
            return result;
        })
    }
}

export default new App().express;
