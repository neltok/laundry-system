import { connectToMongo, DBO } from "../../db/db"
import { ValidateGetServices, GetServices } from "../../schemas/Service/ValidateGetServices"

const log = '[server-service-get]: '

export const Get = async (props: GetServices) => {
  try {
    const validate = ValidateGetServices(props)

    if (!validate.isValid) throw JSON.stringify(validate.error)

    const dbo: DBO = await connectToMongo()

    if ("error" in dbo) throw new Error(dbo.error)
    // return { success: false, error: dbo.error }

    const skip = ((props.page || 1) - 1) * (props.limit || 10)
    const totalDocuments = await dbo.db.collection('sevices').countDocuments();
    const totalPages = Math.ceil(totalDocuments / (props.limit || 10));


    const services = await dbo.db.collection('services')
      .find({})
      .skip(skip)
      .limit(props.limit || 10)
      .toArray()

    await dbo.client.close()

    return {
      success: true,
      services,
      totalPages,
      totalDocuments
    }
  } catch (e) {
    console.log(`${log} ${JSON.stringify(e)}`);
    return { success: false, error: e }
  }
}