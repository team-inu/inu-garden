import html2canvas from 'html2canvas';
import { useState } from 'react';

type X = {
  type?: string;
  quality?: any;
};

const useScreenshot = ({ type, quality }: X) => {
  const [image, setImage] = useState<string>();
  const [error, setError] = useState(null);

  const takeScreenShot = (node: any, options = {}) => {
    if (!node) {
      throw new Error('You should provide correct html node.');
    }
    return html2canvas(node, options)
      .then((canvas) => {
        const croppedCanvas = document.createElement('canvas');
        const croppedCanvasContext = croppedCanvas.getContext('2d');
        // init data
        const cropPositionTop = 0;
        const cropPositionLeft = 0;
        const cropWidth = canvas.width;
        const cropHeight = canvas.height;

        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;

        croppedCanvasContext?.drawImage(
          canvas,
          cropPositionLeft,
          cropPositionTop,
        );

        const base64Image = croppedCanvas.toDataURL(type, quality);

        setImage(base64Image);
        return base64Image;
      })
      .catch(setError);
  };

  return [
    image,
    takeScreenShot,
    {
      error,
    },
  ] as const;
};

const createFileName = (extension = '', ...names: string[]) => {
  if (!extension) {
    return '';
  }

  return `${names.join('')}.${extension}`;
};

export { createFileName, useScreenshot };
