const sky = document.querySelector('.sky');
const cloudCount = 15; // 生成10朵动态云

for (let i = 0; i < cloudCount; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'dynamic-cloud'; // 使用新的类名
    // 随机大小
    const size = Math.random() * 100 + 50;
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size}px`;
    // 随机位置
    cloud.style.left = `${Math.random() * 100}vw`;
    cloud.style.top = `${Math.random() * 80}vh`;
    // 随机动画延迟
    cloud.style.animationDelay = `${Math.random() * 5}s`;
    // 随机层叠顺序
    cloud.style.zIndex = Math.floor(Math.random() * 10);
    sky.appendChild(cloud);
}