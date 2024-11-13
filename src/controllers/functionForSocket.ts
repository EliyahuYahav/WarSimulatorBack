import { IMissile } from "../modules/missileMoudle"
import Missile from "../modules/missileMoudle"


export const changeStatus = async(id: string, massage:string): Promise<void>=>{
    try {
        await Missile.findByIdAndUpdate(id, {status: massage})
    } catch (error) {
        throw error
    }
}