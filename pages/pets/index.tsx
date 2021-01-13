import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';

function Index() {
  const ipt = useRef();
  const [list, setList] = useState([]); // 定义数据
  const [curId, setCurId] = useState('');
  useEffect(() => {
    // 调接口取数据
    loadData(); // 初始化的时候获取数据
  }, []);
  // 调接口取数据
  const loadData = async () => {
    const data = await fetch('/api/pets').then((res) => res.json());
    setList(data);
  };
  const saveHandle = (e) => {
    if (e.keyCode === 13) {
      if (e.currentTarget.value) {
        // 判断当前id是否存在
        if (curId) {
          fetch('/api/pets/' + curId, {
            method: 'PUT',
            body: JSON.stringify({
              name: e.currentTarget.value,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setCurId('');
              loadData();
            });
        } else {
          fetch('/api/pets', {
            method: 'POST',
            body: JSON.stringify({
              name: e.currentTarget.value,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              loadData();
            });
        }
      } else {
        alert('请输入内容');
      }
    }
  };
  const delOne = (id) => {
    fetch('/api/pets/' + id, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        loadData();
      });
  };
  const editOne = (id, name) => {
    setCurId(id);
    // @ts-ignore
    ipt.current.value = name;
  };
  return (
    <>
      <Head>
        <title>宠物列表</title>
      </Head>
      <ul>
        <li>
          <input placeholder='请输入内容' ref={ipt} onKeyUp={saveHandle} />
        </li>
      </ul>
      <hr />
      <h1>宠物列表</h1>
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => delOne(item._id)}>删除</button>
            <button onClick={() => editOne(item._id, item.name)}>修改</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Index;
