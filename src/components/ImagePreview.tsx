import React, { useEffect, useState } from 'react';
import './ImagePreview.css';

interface ImagePreviewProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, onClose }) => {
  const [scale, setScale] = useState(1);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // 阻止点击图片时关闭预览
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 处理滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(0.5, scale + delta), 2);
    setScale(newScale);
  };

  return (
    <div className="image-preview-overlay" onClick={onClose}>
      <div 
        className="image-preview-content" 
        onClick={handleImageClick}
        onWheel={handleWheel}
      >
        <button className="close-button" onClick={onClose}>×</button>
        <img 
          src={src} 
          alt={alt} 
          className="preview-image"
          style={{ transform: `scale(${scale})` }}
        />
        <div className="zoom-controls">
          <button onClick={() => setScale(Math.max(0.5, scale - 0.1))}>-</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(Math.min(2, scale + 0.1))}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview; 