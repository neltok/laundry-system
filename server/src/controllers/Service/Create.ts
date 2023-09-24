import { ValidateCreateService, Service } from "../../schemas/Service/ValidateCreateService"
import { connectToMongo, DBO } from "../../db/db"
import FilePath from "../../functions/FilePath";

export const Create = async (service: Service) => {
  try {
    const validate = ValidateCreateService(service)

    if (!validate.isValid) throw JSON.stringify(validate.error)

    const dbo:DBO = await connectToMongo()
    
    if("error" in dbo)
      throw new Error(dbo.error)

    await dbo.db.collection('services').insertOne(service)
    await dbo.client.close()

    return { success: true }
  } catch (e) {
    console.log(`${FilePath()} error `, JSON.stringify(e));
    
    return { success: false, error: e }
  }
}