// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbconnect';
import PetsServices from '@/services/pets';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  await dbConnect();
  const services = new PetsServices(); // 创建一个服务的实例
  if (req.method == 'POST') {
    try {
      res.statusCode = 200;
      await services.save(JSON.parse(req.body));
      res.json({ code: 1, msg: '新增成功' });
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.json(err);
    }
  } else {
    res.statusCode = 200;
    const data = await services.all();
    res.json(data);
  }
};
