import React, { useState, useEffect } from 'react';
import './App.css';
import ColorPreview from './components/ColorPreview';
import MobileView from './components/MobileView';
import OrientationMask from './components/OrientationMask';
import './styles/orientation.css';

interface Product {
  id: number;
  name: string;
  isActive: boolean;
  availableColors: number[]; // 每个产品可用的颜色ID数组
}

interface Color {
  id: number;
  name: string;
  isActive: boolean;
}

function App() {
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      name: '平板台面', 
      isActive: true,
      availableColors: [1, 2, 3, 4, 5, 7, 8, 9]
    },
    { 
      id: 2, 
      name: '单边凹槽阻水台面', 
      isActive: false,
      availableColors: [1, 2, 3, 4, 5, 7, 8]
    },
    { 
      id: 3, 
      name: '碟型台面', 
      isActive: false,
      availableColors: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    { 
      id: 4, 
      name: '碟型沥水槽台面', 
      isActive: false,
      availableColors: [1, 2, 3, 4, 5, 7, 8, 9]
    },
  ]);

  const [colors, setColors] = useState<Color[]>([
    { id: 1, name: '亚马逊蓝', isActive: true },
    { id: 2, name: '睿智经典黑', isActive: false },
    { id: 3, name: '博雅斑点灰', isActive: false },
    { id: 4, name: '皇家紫罗兰', isActive: false },
    { id: 5, name: '德国玛瑙灰', isActive: false },
    { id: 6, name: '爱马仕橙', isActive: false },
    { id: 7, name: '罗马青瓷绿', isActive: false },
    { id: 8, name: '希腊沙滩白', isActive: false },
    { id: 9, name: '冬日暖意黄', isActive: false },
  ]);

  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    // 检测设备方向
    const checkOrientation = () => {
      const isPortraitMode = window.matchMedia("(orientation: portrait)").matches;
      setIsPortrait(isPortraitMode);
    };

    // 检测是否为移动设备
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth <= 1024;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    // 初始检查
    checkMobile();
    checkOrientation();

    // 添加事件监听
    const orientationMediaQuery = window.matchMedia("(orientation: portrait)");
    orientationMediaQuery.addListener(checkOrientation);
    window.addEventListener('resize', checkMobile);

    // 清理监听器
    return () => {
      orientationMediaQuery.removeListener(checkOrientation);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 获取当前选中的产品
  const getActiveProduct = () => {
    return products.find(p => p.isActive) || products[0];
  };

  // 获取当前选中的颜色
  const getActiveColor = () => {
    return colors.find(c => c.isActive) || colors[0];
  };

  const handleProductClick = (id: number) => {
    setProducts(products.map(product => ({
      ...product,
      isActive: product.id === id
    })));

    setColors(colors.map(color => ({
      ...color,
      isActive: color.id === 1
    })));
  };

  const handleColorClick = (id: number) => {
    const activeProduct = getActiveProduct();
    if (activeProduct.availableColors.includes(id)) {
      setColors(colors.map(color => ({
        ...color,
        isActive: color.id === id
      })));
    }
  };

  if (isMobile) {
    return (
      <div className="app">
        {isPortrait && <OrientationMask />}
        <MobileView
          products={products}
          colors={colors}
          onProductClick={handleProductClick}
          onColorClick={handleColorClick}
          activeProduct={getActiveProduct()}
          activeColor={getActiveColor()}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {isPortrait && <OrientationMask />}
      <div className="content">
        <div className="left-panel">
          <div className="selection-box">
            <h2 className="section-title">产品选择</h2>
            <div className="divider" />
            <div className="options-container">
              {products.map(product => (
                <div
                  key={product.id}
                  className={`option ${product.isActive ? 'active' : ''}`}
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.name}
                </div>
              ))}
            </div>
          </div>
          
          <div className="selection-box">
            <h2 className="section-title">颜色选择</h2>
            <div className="divider" />
            <div className="color-grid">
              {colors.filter(color => getActiveProduct().availableColors.includes(color.id))
                .map(color => (
                <div
                  key={color.id}
                    className={`option ${color.isActive ? 'active' : ''}`}
                  onClick={() => handleColorClick(color.id)}
                >
                  {color.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="right-panel">
          <div className="image-container">
            <ColorPreview 
              colorName={getActiveColor().name} 
              productName={getActiveProduct().name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
