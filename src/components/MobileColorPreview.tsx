import React, { useState, useEffect } from 'react';
import './MobileColorPreview.css';

interface MobileColorPreviewProps {
  colorName: string;
  productName: string;
}

const MobileColorPreview: React.FC<MobileColorPreviewProps> = ({ colorName, productName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    setError('');
    
    const imageName = `${productName}-${colorName}.jpg`;
    const imagePath = `${process.env.PUBLIC_URL}/images/${imageName}`;
    
    const img = new Image();
    img.src = imagePath;
    
    img.onload = () => {
      setImageSrc(imagePath);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      console.error(`图片加载失败: ${imagePath}`);
      setError('图片加载失败，请稍后重试');
      const defaultImage = `${process.env.PUBLIC_URL}/images/平板台面-亚马逊蓝.jpg`;
      setImageSrc(defaultImage);
      setIsLoading(false);
    };

    // 清理函数
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [productName, colorName]);

  if (error) {
    return (
      <div className="preview-container error">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`preview-container ${isLoading ? 'loading' : ''}`}>
      {!isLoading && (
        <div className="image-wrapper">
          <img 
            src={imageSrc}
            alt={`${productName}-${colorName}`}
            className="product-image"
            loading="lazy"
          />
        </div>
      )}
      {isLoading && (
        <div className="loading-indicator">
          加载中...
        </div>
      )}
    </div>
  );
};

export default MobileColorPreview; 