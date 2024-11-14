import bcrypt from 'bcrypt';
import User, { IUser } from "../modules/userMoudle"
import Organizations, { IOrganizations } from "../modules/organizationMoudle"

export const registerUser = async (user: IUser): Promise<IUser | void> => {
  try {
    const passwordHash = await bcrypt.hash(user.password.toString(), 10);
    user.password = passwordHash
      if(user.area){
        const newOrganizations: IOrganizations | null= await Organizations.findOne({name: `${user.organization} - ${user.area}`})
        user.nameOrg = newOrganizations?.name
        user.organization = newOrganizations?._id
      }else{
        const newOrganizations: IOrganizations | null= await Organizations.findOne({name: user.organization})
        user.nameOrg = newOrganizations?.name
        user.organization = newOrganizations?._id
      }
    await User.create(user);
    return user;
  } catch (error) {
    throw error;
  };
};

export const authenticateUser = async (username: string, password: string): Promise<IUser | null> => {
 try {
   const user: IUser | null = await User.findOne({name: username})
   if (user && await bcrypt.compare(password.toString(), user.password)) {
     return user;
   }
   throw new Error("user not found");
 } catch (error) {
   throw error;
 }
};