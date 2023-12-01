import React from 'react';
import '../../css/loader.css';

function Loader() {
  return (
    <div className='h-screen flex justify-center items-center '>
      <span className="loader dark:after:border-white dark:before:border-white after:border-black before:border-black"></span>
    </div>
  );
}

export default Loader