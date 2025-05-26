import React, { useState } from 'react';
import './App.css';
import ColorPreview from './components/ColorPreview';

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
      availableColors: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    { 
      id: 2, 
      name: '单边凹槽阻水台面', 
      isActive: false,
      availableColors: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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
      availableColors: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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

  // 获取当前选中的产品
  const getActiveProduct = () => {
    return products.find(product => product.isActive) || products[0];
  };

  // 获取当前选中的颜色
  const getActiveColor = () => {
    return colors.find(color => color.isActive) || colors[0];
  };

  // 获取当前产品可用的颜色
  const getAvailableColors = () => {
    const activeProduct = getActiveProduct();
    return colors.map(color => ({
      ...color,
      isDisabled: !activeProduct.availableColors.includes(color.id)
    }));
  };

  const handleProductClick = (id: number) => {
    // 更新选中的产品
    setProducts(products.map(product => ({
      ...product,
      isActive: product.id === id
    })));

    // 无论当前选择的是什么颜色，都切换到亚马逊蓝（ID为1）
    setColors(colors.map(color => ({
      ...color,
      isActive: color.id === 1  // 亚马逊蓝的ID为1
    })));
  };

  const handleColorClick = (id: number) => {
    // 只有当颜色可用时才允许选择
    const activeProduct = getActiveProduct();
    if (activeProduct.availableColors.includes(id)) {
      setColors(colors.map(color => ({
        ...color,
        isActive: color.id === id
      })));
    }
  };

  return (
    <div className="app">
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
              {getAvailableColors().map(color => (
                <div
                  key={color.id}
                  className={`option ${color.isActive ? 'active' : ''} ${color.isDisabled ? 'disabled' : ''}`}
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
