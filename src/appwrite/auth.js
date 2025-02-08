import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}) {
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if(userAccount){
                // call login method
                return this.login({email, password})
            }else{
                return userAccount;
            }
        }catch(err){
            throw err;
        }
    } 

    async login(email, password){
        try{
           return await this.account.createEmailPasswordSession(email, password)
        }catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try{
            const user = await this.account.get()
            return user;
        }catch(err){
            throw err;
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions()
        }catch(err){
            throw err;
        }
    }

  
}

const authservice =  new AuthService()
export default AuthService;
