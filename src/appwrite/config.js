import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,  // databse id
                conf.appwriteCollectionId, // collection id
                slug,  // document id as slug
                {  // another filed to store in database
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(err){
            console.log("Appwrite service error:: createPost:: error " + err);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service error:: updatePost:: error"+error);
            
        }
    }

    async deletePost(slug){
        try{
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }catch(err){
            console.log("Appwrite service error:: deletePost:: error " + err);
        }
    }
}

const service = new Service();
export default service;