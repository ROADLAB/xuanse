import React, { useState } from 'react';
import './ColorPreview.css';

interface ColorPreviewProps {
  colorName: string;
  productName: string;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({ colorName, productName }) => {
  const [isLoading, setIsLoading] = useState(true);

  const getImagePath = (productName: string, colorName: string): string => {
    try {
      // 使用动态导入图片
      const imagePath = `${productName}-${colorName}.jpg`;
      // 确保路径中的空格被替换为实际的文件名格式
      const normalizedPath = imagePath.replace(/\s+/g, '');
      return require(`../assets/${normalizedPath}`);
    } catch (error) {
      console.error(`无法加载图片: ${productName}-${colorName}.jpg`, error);
      // 加载默认图片
      return require('../assets/平板台面-亚马逊蓝.jpg');
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('图片加载失败');
    setIsLoading(false);
  };

  return (
    <div className={`preview-container ${isLoading ? 'loading' : ''}`}>
      <div className="image-wrapper">
        <img 
          src={getImagePath(productName, colorName)} 
          alt={`${productName}-${colorName}`}
          className="product-image"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default ColorPreview;