import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Pet from '../models/pet';

// 在页面编译的时候执行，可以获取一下服务器的数据
// 这段代码的意思是在每一次发送请求的时候执行，页面初始化或者刷新的时候
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const list = await Pet.find();
  return {
    props: {
      list: (list as any[]).map((item) => ({
        ...item.toObject(),
        _id: item._id.toString(),
        createdAt: item.createdAt.toString(),
        updatedAt: item.updatedAt.toString(),
      })),
    },
  };
};

export default function Home(props) {
  // console.log(props.list);
  return (
    <div>
      <h1>我是首页</h1>
      <Link href='/list'>
        <a>列表页</a>
      </Link>
      {props.list.map((item) => (
        <p>
          {item.name}-{item._id}
        </p>
      ))}
      {/* <p>{props.list.length}</p> */}
    </div>
  );
}
