// 定义三个转轮的内容
const wheelAOptions = ['JK', '女仆装', '水手服', 'COS服', 'OL装', '连衣裙','1'];
const wheelBOptions = ['宿舍', '图书馆', '咖啡馆', '办公室', '家里'];
const wheelCOptions = ['Rust', 'Java', 'Python', 'C++', 'PHP', 'C', 'Ruby', 'Javascript', 'Vibe Coding'];

// 获取DOM元素
const wheelA = document.getElementById('itemsA');
const wheelB = document.getElementById('itemsB');
const wheelC = document.getElementById('itemsC');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');

// 初始化转轮内容
function initializeWheels() {
  // 清空现有内容
  wheelA.innerHTML = '';
  wheelB.innerHTML = '';
  wheelC.innerHTML = '';

  // 添加选项到转轮A
  wheelAOptions.forEach((option, index) => {
    const item = document.createElement('div');
    item.className = 'slot-item';
    item.textContent = option;
    item.style.position = 'absolute';
    item.style.top = `${index * 70}px`;
    wheelA.appendChild(item);
  });

  // 添加选项到转轮B
  wheelBOptions.forEach((option, index) => {
    const item = document.createElement('div');
    item.className = 'slot-item';
    item.textContent = option;
    item.style.position = 'absolute';
    item.style.top = `${index * 70}px`;
    wheelB.appendChild(item);
  });

  // 添加选项到转轮C
  wheelCOptions.forEach((option, index) => {
    const item = document.createElement('div');
    item.className = 'slot-item';
    item.textContent = option;
    item.style.position = 'absolute';
    item.style.top = `${index * 70}px`;
    wheelC.appendChild(item);
  });
  
  // 设置内部容器的总高度，这样它们才能通过transform移动
  const totalHeightA = wheelAOptions.length * 70;
  const totalHeightB = wheelBOptions.length * 70;
  const totalHeightC = wheelCOptions.length * 70;
  
  document.getElementById('wheelA').style.height = totalHeightA + 'px';
  document.getElementById('wheelB').style.height = totalHeightB + 'px';
  document.getElementById('wheelC').style.height = totalHeightC + 'px';
}

// 生成随机结果
function getRandomOption(options) {
  return options[Math.floor(Math.random() * options.length)];
}

// 启动转轮
async function spinWheels() {
  // 禁用按钮，防止重复点击
  spinButton.disabled = true;
  
  // 清除结果
  resultDiv.textContent = '转轮正在转动...';
  
  // 随机选择结果
  const resultA = getRandomOption(wheelAOptions);
  const resultB = getRandomOption(wheelBOptions);
  const resultC = getRandomOption(wheelCOptions);
  
  // 按照 A -> C -> B 的顺序停止转轮
  // 启动转轮A，持续2秒
  await spinWheel(wheelA, wheelAOptions, 2000);
  updateWheelToItem(wheelA, wheelAOptions, resultA);

  // 延迟1秒后启动转轮C，持续1秒
  setTimeout(async () => {
    await spinWheel(wheelC, wheelCOptions, 1000);
    updateWheelToItem(wheelC, wheelCOptions, resultC);

    // 再延迟1秒后启动转轮B，持续1秒
    setTimeout(async () => {
      await spinWheel(wheelB, wheelBOptions, 1000);
      updateWheelToItem(wheelB, wheelBOptions, resultB);

      // 所有转轮都停止后，显示最终结果
      const finalText = `今天穿${resultA}在${resultB}写${resultC}`;
      resultDiv.textContent = finalText;
      
      // 重新启用按钮
      spinButton.disabled = false;
    }, 1000);
  }, 1000);
}

// 启动单个转轮动画
function spinWheel(wheelElement, items, duration = 2000) {
  return new Promise(resolve => {
    // 获取实际的转轮容器（wheel）
    const wheelContainer = wheelElement.parentElement;

    // 添加旋转动画
    wheelContainer.classList.add('spinning');

    // 在指定时间后停止
    setTimeout(() => {
      wheelContainer.classList.remove('spinning');
      resolve();
    }, duration);
  });
}

// 更新转轮到指定项目
function updateWheelToItem(wheelElement, items, targetItem) {
  const targetIndex = items.indexOf(targetItem);
  const offset = targetIndex * 70; // 每个项目高度70px

  // 获取实际的转轮容器（不是items，而是wheel）
  const wheelContainer = wheelElement.parentElement; // 获取wheel元素

  // 设置转轮的位置，使目标项目居中显示
  wheelContainer.classList.remove('spinning');
  wheelContainer.style.transition = 'transform 0.5s ease-out';
  wheelContainer.style.transform = `translateY(${-offset}px)`;

  // 添加高亮效果
  setTimeout(() => {
    const itemsElements = wheelElement.querySelectorAll('.slot-item');
    itemsElements.forEach(item => {
      if (item.textContent === targetItem) {
        item.classList.add('highlight');
        setTimeout(() => {
          item.classList.remove('highlight');
        }, 1000);
      }
    });
  }, 100);
}

// 绑定按钮事件
spinButton.addEventListener('click', spinWheels);

// 初始化页面
document.addEventListener('DOMContentLoaded', initializeWheels);
