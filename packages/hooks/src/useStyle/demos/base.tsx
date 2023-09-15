import { useStyle } from 'let-hooks';
import React from 'react';

export default () => {
  useStyle(`
    .container {
      border: 1px solid red;
      padding: 12px;
    }
    .content {
      color: blue;
      font-size: 20px;
      cursor: pointer;
    }
    .content:hover {
      color: red;
    }
  `);

  return (
    <div className="container">
      <div className="content">Hello world</div>
    </div>
  );
};
