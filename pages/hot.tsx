import React from 'react';
import Main from '../components/Main';

function Hot() {
  return (
    <Main>
      <input
        placeholder='请输入内容'
        type='text'
        className='px-2 py-1 rounded m-2 w-1/3 placeholder-red-300 text-gray-700'
      />
      <h1>商品热卖</h1>
    </Main>
  );
}

export default Hot;
