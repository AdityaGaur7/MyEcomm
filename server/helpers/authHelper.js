import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {

  try{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
    catch(err){
        console.log(err);
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try{
        return await bcrypt.compare(password, hashedPassword);
    }
    catch(err){
        console.log(err);
    }
}
