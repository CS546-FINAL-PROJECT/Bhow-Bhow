async function addUser(user_id, user_name, user_password, user_email, user_gender, user_city, user_state, user_age, favoriteList){
    if (!user_name) throw 'You must provide a username';

   
    const userCollection = await back_users();

    let newUser = {
      user_id: user_id,
      user_name: user_name,
      user_password: user_password,
      user_email: user_email,
      user_gender: user_gender,
      user_city: user_city,
      user_state: user_state,
      user_age: user_age,
      favoriteList: []
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'Could not add user';

    const newId = insertInfo.insertedId;

    const  user = await this.getUser(newId);
    return user;
  }



async function getAllUsers(){
    const userCollection = await back_users();

    const userlist = await userCollection.find({}).toArray();

    return userlist;

}

async function getUser(id){
    const userCollection = await back_users();
    const user = await userCollection.findOne({_id: id});
    if (user === null) throw 'No user with that id';

    return user;

}

async function updateUser(user_id, user_name, user_password, user_email, user_gender, user_city, user_state, user_age, favoriteList){
    if (!user_id) throw 'You must provide an id to search for';

    if (!user_name) throw 'You must provide a name';

 

    const userCollection = await back_users();
    const updatedUser = {
        user_id: user_id,
        user_name: user_name,
        user_password: user_password,
        user_email: user_email,
        user_gender: user_gender,
        user_city: user_city,
        user_state: user_state,
        user_age: user_age,
        favoriteList: []
      };

    const updatedInfo = await userCollection.updateOne({_id: user_id}, {$set: updatedUser});
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update user successfully';
    }

    return await this.getUser(user_id);
  }



async function removeUser(user_id){
    if (!user_id) throw 'You must provide an id to search for';

    const userCollection = await back_users();
    const deletionInfo = await userCollection.removeOne({_id: user_id});

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${id}`;
    }
  }