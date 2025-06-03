import React from 'react';
import './MobileView.css';
import ColorPreview from './ColorPreview';

interface MobileViewProps {
  products: Array<{
    id: number;
    name: string;
    isActive: boolean;
    availableColors: number[];
  }>;
  colors: Array<{
    id: number;
    name: string;
    isActive: boolean;
  }>;
  onProductClick: (id: number) => void;
  onColorClick: (id: number) => void;
  activeProduct: any;
  activeColor: any;
}

const MobileView: React.FC<MobileViewProps> = ({
  products,
  colors,
  onProductClick,
  onColorClick,
  activeProduct,
  activeColor
}) => {
  return (
    <div className="mobile-view">
      <div className="mobile-controls">
        <div className="mobile-section">
          <h2 className="mobile-section-title">产品选择</h2>
          <div className="mobile-options">
            {products.map(product => (
              <div
                key={product.id}
                className={`mobile-option ${product.isActive ? 'active' : ''}`}
                onClick={() => onProductClick(product.id)}
              >
                {product.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mobile-section">
          <h2 className="mobile-section-title">颜色选择</h2>
          <div className="mobile-color-grid">
            {colors.filter(color => activeProduct.availableColors.includes(color.id))
              .map(color => (
                <div
                  key={color.id}
                  className={`mobile-option ${color.isActive ? 'active' : ''}`}
                  onClick={() => onColorClick(color.id)}
                >
                  {color.name}
                </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mobile-preview">
        <div className="mobile-image-container">
          <ColorPreview 
            colorName={activeColor.name} 
            productName={activeProduct.name}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileView; 