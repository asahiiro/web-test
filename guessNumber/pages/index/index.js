// 游戏数据
let targetNumber = 0;
let guessCount = 0;
let guess = '';
let message = '猜一个1-100之间的数字吧！';
let theme = 'theme-light';
const lightBackgroundImage = 'https://web-test-50s8f.kinsta.page/data/image/bakery-room.jpg';
const lightCharacterImage = 'https://web-test-50s8f.kinsta.page/data/image/angeh.png';
const lightIconImage = 'https://web-test-50s8f.kinsta.page/data/icon/sunf.png';
const darkBackgroundImage = 'https://web-test-50s8f.kinsta.page/data/image/bakery-night.jpg';
const darkCharacterImage = 'https://web-test-50s8f.kinsta.page/data/image/tokoh.png';
const darkIconImage = 'https://web-test-50s8f.kinsta.page/data/icon/moonstar.png';

// DOM 元素
const container = document.getElementById('container');
const background = document.getElementById('background');
const guessCountElem = document.getElementById('guessCount');
const chatBubble = document.getElementById('chatBubble');
const characterContainer = document.getElementById('characterContainer');
const character = document.getElementById('character');
const inputGuessElem = document.getElementById('inputGuess');
const icon = document.getElementById('icon');

// 初始化
function init() {
  resetGame();
  updateTheme();
}

// 切换主题
function toggleTheme() {
  theme = theme === 'theme-light' ? 'theme-dark' : 'theme-light';
  updateTheme();
}

// 更新主题
function updateTheme() {
  container.className = `container ${theme}`;
  background.src = theme === 'theme-light' ? lightBackgroundImage : darkBackgroundImage;
  character.src = theme === 'theme-light' ? lightCharacterImage : darkCharacterImage;
  icon.src = theme === 'theme-light' ? lightIconImage : darkIconImage;
}

// 动画函数
function animateElement(element, className, times) {
  let count = 0;
  const animate = () => {
    if (count < times) {
      element.classList.add(className);
      setTimeout(() => {
        element.classList.remove(className);
        count++;
        if (count < times) {
          setTimeout(animate, 150);
        }
      }, 300);
    }
  };
  animate();
}

// 动画：人物
function animateCharacter(times) {
  animateElement(characterContainer, 'character-active', times);
}

// 动画：聊天泡泡
function animateChatBubble(times) {
  animateElement(chatBubble, 'chat-bubble-active', times);
}

// 动画：猜测次数
function animateGuessCount(times) {
  animateElement(guessCountElem, 'guessCount-active', times);
}

// 点击角色
function characterTap() {
  animateCharacter(1);
  animateChatBubble(1);
  animateGuessCount(1);
  if (guessCount === 0) {
    message = '(〃∀〃)  你还没猜呢';
  } else {
    message = 'σ`∀´)σ  哇哇！你已经猜了' + guessCount + '次了！';
  }
  updateMessage();
}

// 输入猜测
function inputGuess(value) {
  guess = value;
}

// 检查猜测
function checkGuess() {
  const guessNum = parseInt(guess);
  if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
    message = '(｢･ω･)｢  这个数只在1-100之间哦！';
    animateCharacter(2);
    animateChatBubble(1);
    animateGuessCount(1);
    updateMessage();
    return;
  }
  guessCount++;
  if (guessNum > targetNumber) {
    message = '-`д´-  哎呀，猜大了呢！再试一次吧！';
  } else if (guessNum < targetNumber) {
    message = 'o(*ﾟ▽ﾟ*)o  嘿嘿，猜小了呢！再努力一下！';
  } else {
    message = 'd(`･∀･)b  哇哇！你怎么知道是' + targetNumber + '！';
    animateCharacter(3);
    animateChatBubble(3);
  }
  animateCharacter(2);
  animateChatBubble(1);
  animateGuessCount(1);
  updateGuessCount();
  updateMessage();
}

// 重置游戏
function resetGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  guessCount = 0;
  guess = '';
  message = '猜一个1-100之间的数字吧！';
  inputGuessElem.value = '';
  updateGuessCount();
  updateMessage();
  animateCharacter(1);
  animateChatBubble(1);
}

// 更新猜测次数
function updateGuessCount() {
  guessCountElem.textContent = guessCount;
}

// 更新消息
function updateMessage() {
  chatBubble.textContent = message;
}

// 初始化页面
init();