import React from 'react';
import { GetServerSideProps } from 'next';

function Detail({ id }) {
  return (
    <div>
      <h1>这是详情页-{id}</h1>
    </div>
  );
}

// 是在每一次发起请求的时候执行
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  return {
    props: {
      id: params.id,
    },
  };
};

export default Detail;
