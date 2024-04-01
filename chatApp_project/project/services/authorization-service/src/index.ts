import 'reflect-metadata';
import dotenv           from 'dotenv';
import mongoose         from 'mongoose';
import express          from 'express';
import chalk            from 'chalk';
import bodyParser       from "body-parser";
import container        from "./inversity.config";
import {RoleController} from "./controllers/RoleController";
import {Types}          from "./types";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const roleController = container.get<RoleController>(Types.RoleController);

app.post('/roles', roleController.createRole);
app.get('/roles/:name', roleController.getRoleByName);


app.use((err, req, res, next) => {
    if (err.isServer) {
        console.log(err);
    }
    return res.status(err.output.statusCode).json(err.output.payload);
});

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.blue(`
    _       _   _            _         _   _          
   /_\\ _  _| |_| |_  ___ _ _(_)_____ _| |_(_)___ _ _  
  / _ \\ || |  _| ' \\/ _ \\ '_| |_ / _\` |  _| / _ \\ ' \\ 
 /_/ \\_\\_,_|\\__|_||_\\___/_| |_/__\\__,_|\\__|_\\___/_||_|               
    `));
    console.log(chalk.bold.yellow(`Authorization service started on port ${process.env.PORT}`));
});

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("MongoDB connected...");
});
