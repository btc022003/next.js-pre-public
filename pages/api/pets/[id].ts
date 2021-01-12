import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/dbconnect'
import Pet from '../../../models/pet'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  await dbConnect()
  // if(req.method == 'POST' ) {
  //   const pet = new Pet(JSON.parse(req.body))
  //   await pet.save()
  //   res.json({code: 1,msg: '新增成功'})
  // } else {
  //   const data = await Pet.find()
  //   res.json(data)
  // }
  if(req.method == 'GET') {
    try {
      const pet = await Pet.findById(req.query.id)
      res.json(pet)
    } catch(err) {
      res.json({code: -1, err})
    }
  } else if(req.method == 'PUT') {
    try {
      // @ts-ignore
      await Pet.findByIdAndUpdate(req.query.id, JSON.parse(req.body))
      res.json({
        code: 1,
        msg: '修改成功'
      })
    } catch(err) {
      res.json({code: -1, err})
    }
  } else if(req.method == 'DELETE') {
    await Pet.findByIdAndDelete(req.query.id)
    res.json({
      code: 1,
      msg: '删除成功'
    })
  }else {
    res.json({code: -1})
  }
  // res.json({query: req.query})
}
