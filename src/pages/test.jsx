import React, { useEffect } from 'react';

export default function Test() {
  useEffect(() => {
    let a = undefined;
    console.log(a.value);
  }, []);

  return <iframe src="/" />;
}
