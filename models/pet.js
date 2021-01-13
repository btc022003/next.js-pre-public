import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      // required: true,
      default: '',
    },
    price: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// 此处需要在导出的时候做判断，当前model是否已经注册，如果不判断会引起模型重复注册的问题
export default mongoose.models.Pet || mongoose.model('Pet', modelSchema);
