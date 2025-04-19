import mongoose from "mongoose";

export default async () => {
  try {
    const con = await mongoose.connect(process.env.DBADMIN, {});

    if (con != null) console.log(`MongoDB connected :${con.connection.name}`);
    else {
      console.log(`MongoDB not connected`);
    }
  } catch (err) {
    console.log(`Connect to database failed. Error: ${err}`);
  }
};
