import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>我是首页</h1>
      <Link href='/list'>
        <a>列表页</a>
      </Link>
    </div>
  );
}
