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

const create_guide = async (user) =>{
    const unique_id = nanoid(8)
    await session.run(`CREATE (u:User {_id : '${unique_id}', name: '${user.username}', email: '${user.email}', password: '${user.password}', role: '${user.role}',fee:'${user.fee}',languagesKnown:'${user.languagesKnown}' }) return u`)
    return await findById(unique_id)
}

const create_taxi_driver = async (driverData) => {
    const { username, email, password, fee, vehicleType, seatingAvailability, taxiNumber, location, languagesKnown, isGuide, startTime, endTime } = driverData;
  
    const unique_id = nanoid(8); // Generate a unique ID
  
    const query = `
      CREATE (driver:TaxiDriver {
        _id: '${unique_id}',
        username: '${username}',
        email: '${email}',
        password: '${password}',
        fee: ${fee},  // Assuming fee is a number
        vehicleType: '${vehicleType}',
        seatingAvailability: ${seatingAvailability},  // Assuming seatingAvailability is a number
        taxiNumber: '${taxiNumber}',
        location: '${location}',
        languagesKnown: '${languagesKnown}',
        isGuide: '${isGuide}',
        role: '${role}'
      })
      RETURN driver
    `;
  
    try {
      const result = await session.run(query);
      const driver = result.records[0].get('driver');  // Get the created driver node
      return driver;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating taxi driver');  // Re-throw for handling in the calling code
    }
  };
  

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
    findByemail,
    create_guide,
    create_taxi_driver
}
   