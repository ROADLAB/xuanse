import React, { useState } from 'react';
import './ColorPreview.css';
import ImagePreview from './ImagePreview';

interface ColorPreviewProps {
  colorName: string;
  productName: string;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({ colorName, productName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const getImagePath = (productName: string, colorName: string): string => {
    try {
      // 构建图片路径
      const imageName = `${productName}-${colorName}.jpg`;
      // 移除空格
      const normalizedName = imageName.replace(/\s+/g, '');
      // 使用相对路径
      return `/images/${normalizedName}`;
    } catch (error) {
      console.error(`无法加载图片: ${productName}-${colorName}.jpg`, error);
      // 如果加载失败，返回默认图片
      return `/images/平板台面-亚马逊蓝.jpg`;
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    setLoadError(false);
    const img = e.target as HTMLImageElement;
    console.log(`图片尺寸 - 宽度: ${img.naturalWidth}px, 高度: ${img.naturalHeight}px, 比例: ${(img.naturalWidth/img.naturalHeight).toFixed(3)}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('图片加载失败');
    setIsLoading(false);
    setLoadError(true);
  };

  const handleImageClick = () => {
    if (!loadError) {
      setShowPreview(true);
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const imagePath = getImagePath(productName, colorName);

  return (
    <>
      <div className={`preview-container ${isLoading ? 'loading' : ''}`}>
        <div className="image-wrapper">
          {loadError ? (
            <div className="error-message">
              <p>图片加载失败</p>
              <p>产品：{productName}</p>
              <p>颜色：{colorName}</p>
            </div>
          ) : (
            <img 
              src={imagePath}
              alt={`${productName}-${colorName}`}
              className="product-image"
              onLoad={handleImageLoad}
              onError={handleImageError}
              onClick={handleImageClick}
              style={{ cursor: loadError ? 'default' : 'zoom-in' }}
            />
          )}
        </div>
      </div>
      {showPreview && !loadError && (
        <ImagePreview
          src={imagePath}
          alt={`${productName}-${colorName}`}
          onClose={handleClosePreview}
        />
      )}
    </>
  );
};

export default ColorPreview;