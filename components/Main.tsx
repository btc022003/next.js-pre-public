import React, { useState, useEffect } from 'react';

function Main({ children }) {
  const [isDark, setIsDark] = useState(false); // 当前是否是黑色主题
  useEffect(() => {
    // 在tailwindcss中如果要设置黑色主题，只要设置一下html标签的class='dark'
    if (isDark) {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [isDark]);
  return (
    // 主题设置
    <div className='px-6 py-3 md:bg-red-200 md:dark:bg-green-700 dark:bg-gray-800 dark:text-gray-200'>
      <button onClick={() => setIsDark(!isDark)}>
        {isDark ? (
          <svg
            className='w-8'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
              clipRule='evenodd'
            />
          </svg>
        ) : (
          <svg
            className='w-8'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
          </svg>
        )}
      </button>
      <a href='/'>【首页】</a>
      <a href='/hot'>【热卖】</a>
      <a href='/pets'>【商品】</a>
      <hr />
      {children}
    </div>
  );
}

export default Main;
