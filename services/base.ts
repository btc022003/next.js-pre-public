import { Model, Document } from 'mongoose';
import moment from 'moment';

class BaseService {
  model: typeof Model;
  populate: string;

  /**
   * 创建一个查询服务的基础类
   * @param model     模型名字
   * @param populate  关联字段
   */
  constructor(model: typeof Model, populate: string = '') {
    this.model = model;
    this.populate = populate;
  }

  /**
   * 对数据做格式化处理
   * @param item
   * @returns
   */
  formatData(item) {
    const result = {
      ...item.toObject(),
      id: item._id.toString(),
      createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    };
    delete result._id; // 删除_id属性
    return result;
  }

  /**
   * 获取所有的数据
   * @param query 查询条件
   * @param limit 数量限制
   * @returns
   */
  async all(query = {}, limit = 0) {
    let q = this.model.find(query);
    if (limit > 0) {
      q = q.limit(limit);
    }
    const data = await q.sort({
      _id: -1,
    });
    return data.map((item) => this.formatData(item));
  }

  /**
   * 分页获取数据
   * @param query 查询条件
   * @param page  页码
   * @param per   每页显示的数量
   * @param selects 返回的字段
   * @returns
   */
  async list(query = {}, page = 1, per = 10, selects = '') {
    let q = this.model
      .find(query) // 根据条件查询
      .limit(per) // 返回的数量
      .skip((page - 1) * per) // 跳过的记录数
      .sort({ _id: -1 }); // 排序

    // 关联查询
    if (this.populate) {
      q = q.populate(this.populate);
    }
    // 查询指定的字段
    if (selects) {
      q = q.select(selects);
    }
    const data = await q;
    const totalCount = await this.model.countDocuments(query);
    return {
      totalCount,
      pages: Math.ceil(totalCount / per),
      data: data.map((item) => this.formatData(item)),
    };
  }

  /**
   * 查询单条记录
   * @param id
   * @returns
   */
  async one(id) {
    let q = this.model.findById(id);
    if (this.populate) {
      q = q.populate(this.populate);
    }
    const data = await q;
    return this.formatData(data);
  }

  /**
   * 新增一条记录
   * @param data
   * @returns
   */
  async save(data) {
    const model = new this.model(data);
    await model.save();
    return this.formatData(model);
  }

  /**
   * 新增多条数据
   * @param models
   * @returns
   */
  async saveMany(models) {
    const result = await this.model.insertMany(models);
    return result;
  }

  /**
   * 删除一条记录
   * @param id
   * @returns
   */
  async delOne(id) {
    const result = await this.model.findByIdAndRemove(id);
    return result;
  }

  /**
   * 删除多个数据
   * @param ids
   */
  async delMany(ids) {
    const result = await this.model.deleteMany({
      _id: {
        $in: ids,
      },
    });
  }

  /**
   * 更新一条记录
   * @param id
   * @param data
   * @returns
   */
  async updateOne(id, data) {
    const result = await this.model.findByIdAndUpdate(id, data);
    return result;
  }
}

export default BaseService;
