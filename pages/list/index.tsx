import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import styles from './list.module.css';

function List({ name, list }) {
  return (
    <div className={styles.list}>
      <h1 className={styles.title}>列表页</h1>
      <p>{name}</p>
      {list.map((book) => (
        <Link href={'/list/' + book.id}>
          <a>{book.name}</a>
        </Link>
      ))}
    </div>
  );
}

// 是在页面build构建的时候为组件注入一些属性信息
export const getStaticProps: GetStaticProps = async (ctx) => {
  // 此处我们可能需要获取服务器接口的数据
  // const res = await fetch('.....')
  return {
    props: {
      name: '我的名字',
      list: [
        {
          id: 1,
          name: '三体',
        },
        {
          id: 2,
          name: '球状闪电',
        },
      ],
    },
  };
};

export default List;
