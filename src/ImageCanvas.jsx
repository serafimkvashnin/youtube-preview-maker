import React, { forwardRef } from 'react';

const ImageCanvas = forwardRef((props, ref) => (
  <canvas ref={ref} className='fluid' />
));

export default ImageCanvas;
