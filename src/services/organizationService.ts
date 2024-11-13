import { IMissile } from "../modules/missileMoudle";
import { IOrganizations } from "../modules/organizationMoudle";
import Organizations from "../modules/organizationMoudle"
import Missile from "../modules/missileMoudle"


export const GetOrganization = async (nameOrg: string): Promise<IOrganizations | void>=>{
    try {
        const newOrganizations: IOrganizations | null= await Organizations.findOne({name: nameOrg}) 
        if (newOrganizations) {
            return newOrganizations
        }
    } catch (error) {
        throw error
    }
}

export const GetMissile = async (nameMis: string): Promise<IMissile | void>=>{
    try {
        const newMissile: IMissile | null= await Missile.findOne({name: nameMis}) 
        if (newMissile) {
            return newMissile
        }
    } catch (error) {
        throw error
    }
}