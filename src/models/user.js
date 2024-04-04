import { nanoid } from 'nanoid';

const neo4jDriver = require('neo4j-driver');
require('dotenv').config()

const {
    url,
    db_username,
    db_password
}=process.env
const driver = neo4jDriver.driver(url, neo4jDriver.auth.basic(db_username, db_password));
const session = driver.session();


const findAll = async () =>{
    const result = await session.run(`Match (u:User) return u`)
    return result.records.map(i=>i.get('u').properties)
}

const findById = async (id) =>{
    const result = await session.run(`MATCH (u:User {_id : '${id}'} ) return u limit 1`)
    return result.records[0].get('u').properties
}

const findByemail = async (email) =>{
    console.log(email)
    const result = await session.run(`MATCH (u:User {email : '${email}'} ) return u limit 1`)
    const x= result.records[0].get('u').properties;
    console.log(x)
    let id=x._id
    return result.records[0].get('u').properties
    //return await findById(id)
}

const create = async (user) =>{
    const unique_id = nanoid(8)
    await session.run(`CREATE (u:User {_id : '${unique_id}', name: '${user.username}', email: '${user.email}', password: '${user.password}', role: '${user.role}' }) return u`)
    return await findById(unique_id)
}
const findByIdAndUpdate = async (id, user) =>{
    const result = await session.run(`MATCH (u:User {_id : '${id}'}) SET u.name= '${user.name}', u.email= '${user.email}', u.password= '${user.password}' return u`)
    return result.records[0].get('u').properties
}
const findByIdAndDelete = async (id) =>{
    await session.run(`MATCH (u:User {_id : '${id}'}) DELETE u`)
    return await findAll()
}

export default {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete,
    findByemail
}
   