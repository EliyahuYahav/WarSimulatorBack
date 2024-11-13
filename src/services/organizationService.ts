import { IOrganizations } from "../modules/organizationMoudle";
import Organizations from "../modules/organizationMoudle"
import { IResources } from "../modules/missilesMoudle"
import Resources from "../modules/missilesMoudle"


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

export const GetMissile = async (nameMis: string): Promise<IResources | void>=>{
    try {
        const newMissile: IResources | null= await Resources.findOne({name: nameMis}) 
        if (newMissile) {
            return newMissile
        }
    } catch (error) {
        throw error
    }
}