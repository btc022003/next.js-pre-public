import mongoose from 'mongoose'

// 创建一个数据库连接方法
async function dbConnect() {
  if(mongoose.connection.readyState >= 1) {
    return
  }
  return mongoose.connect('mongodb://localhost:27017/cat-shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
}

export default dbConnect
