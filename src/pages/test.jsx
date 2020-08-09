import React, { useEffect } from 'react';

export default function Test() {
  useEffect(() => {
    const a = undefined;
    console.log(a.value);
  }, []);

  return <iframe src="/" />;
}
