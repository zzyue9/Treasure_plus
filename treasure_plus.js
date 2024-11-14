// 在全局作用域中创建一个Audio对象，用于播放背景音乐
const backgroundMusic = new Audio('game.mp3');

// 定义一个TreasureMap类，代表宝藏地图，包含与寻找宝藏相关的静态方法
class TreasureMap {
  
  // 用于获取初始线索
  static async getInitialClue() {
    // 使用fetch API异步获取名为library.txt的文件内容
    const response = await fetch(`library.txt`);
    // 将内容转换为文本
    const text = await response.text();
    // 返回初始线索的文本内容
    return text;
  }

  // 用于解码线索
  static decodeAncientScript(clue) {
    // 模拟解码过程
    return new Promise((resolve, reject) => {
      // 使用setTimeout模拟异步操作，1秒后完成
      setTimeout(() => {
        // 如果没有提供线索，则拒绝Promise，并返回错误信息
        if (!clue) {
          reject("没有线索可以解码!");
        }
        // 如果提供了线索，则解决Promise，并返回解码成功的信息
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1000);
    });
  }

  // 用于在神庙中搜索宝藏
  static async searchTemple() {
    // 使用fetch API异步获取名为temple.txt的文件内容
    const response = await fetch(`temple.txt`);
    const text = await response.text();
    // 生成一个0到1之间的随机数，模拟是否遭遇守卫
    const random = Math.random();
    // 如果随机数小于0.2，则视为遭遇守卫
    if (random < 0.2) {
      // 异步获取名为guard.txt的文件内容，模拟守卫的回应
      const guardResponse = await fetch(`guard.txt`);
      const guardText = await guardResponse.text();
      // 拒绝Promise，并返回守卫的回应
      return Promise.reject(guardText);
    }
    // 如果没有遭遇守卫，则解决Promise，并返回神庙中的文本内容
    return Promise.resolve(text);
  }

  // 用于打开宝藏箱
  static openTreasureBox() {
    // 模拟打开宝藏箱的过程
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }

  // 用于解决数字谜题
  static solveNumberPuzzle(puzzle) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 如果输入的数字是29，则返回谜题已解开的信息
        if (puzzle === 29) {
          resolve("数字谜题已解开！");
        } else {
          // 如果输入的数字不是29，则返回谜题错误的信息
          reject("数字谜题错误！");
        }
      }, 1000);
    });
  }

  // 用于模拟通过迷宫的过程
  static navigateThroughRooms(rooms) {
    // 虽然rooms参数在此方法中未使用，但可以作为后续扩展的接口
    // 模拟通过迷宫的过程
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("成功通过迷宫！");
      }, 1500);
    });
  }

  // 用于模拟避开陷阱的过程
  static avoidTraps(reactionTime) {
    // 模拟避开陷阱的过程
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 如果用户的反应时间小于500毫秒，则返回成功避开陷阱的信息
        if (reactionTime < 500) { 
          resolve("成功避开陷阱！");
        } else {
          // 如果用户的反应时间不小于500毫秒，则返回触发陷阱的信息
          reject("触发了陷阱！");
        }
      }, 1000);
    });
  }
  
}

// 存储和检索玩家信息的函数，保存玩家信息到localStorage
function savePlayerInfo(playerId, playerNickname, gameHistory) {
  localStorage.setItem('playerId', playerId); // 存储玩家ID
  localStorage.setItem('playerNickname', playerNickname); // 存储玩家昵称
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory)); // 存储游戏历史记录，使用JSON字符串格式
}

// 从localStorage加载玩家信息
function loadPlayerInfo() {
  const playerId = localStorage.getItem('playerId') || '未知玩家'; // 获取玩家ID，如果不存在则默认为"未知玩家"
  const playerNickname = localStorage.getItem('playerNickname') || '未命名'; // 获取玩家昵称，如果不存在则默认为"未命名"
  const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || []; // 获取游戏历史记录，如果不存在则默认为空数组
  return { playerId, playerNickname, gameHistory }; // 返回一个包含玩家信息的对象
}

// 更新页面上的玩家信息
function updatePlayerInfo(playerInfo) {
  document.getElementById('player-id').textContent = playerInfo.playerId; // 更新玩家ID显示
  document.getElementById('player-nickname').textContent = playerInfo.playerNickname; // 更新玩家昵称显示
  const gameHistoryList = document.getElementById('game-history'); // 获取游戏历史列表元素
  gameHistoryList.innerHTML = ''; // 清空列表内容
  playerInfo.gameHistory.forEach(historyItem => { // 遍历游戏历史记录
      const listItem = document.createElement('li'); // 创建一个新的列表项
      const time = new Date().toLocaleString(); // 获取当前时间
      listItem.textContent = `${time} - ${historyItem}`; // 设置列表项的内容为时间和历史记录项
      gameHistoryList.appendChild(listItem); // 将列表项添加到列表中
  });
}

// 使用async/await函数来模拟寻宝过程
async function findTreasureWithAsyncAwait() {
  // 播放背景音乐
  backgroundMusic.play();
  backgroundMusic.loop = true; // 音乐循环播放

  // 加载并显示玩家信息
  const playerInfo = loadPlayerInfo();
  updatePlayerInfo(playerInfo);

  try {
    // 初始化游戏界面
    document.getElementById('status').innerText = ""; 
    document.getElementById('prompt-container').style.display = 'block';

    // 获取初始线索并显示
    const clue = await TreasureMap.getInitialClue(); // 异步获取初始线索
    document.getElementById('result').innerText = clue; // 显示线索
    document.getElementById('prompt-text').innerText = "请输入数字谜题的答案（假设答案是29）："; // 显示提示

    // 获取用户输入的数字谜题答案
    const userInput = await getUserInput(); // 异步等待用户输入
    const puzzleResult = await TreasureMap.solveNumberPuzzle(parseInt(userInput, 10)); // 异步解决数字谜题
    document.getElementById('result').innerText = puzzleResult; // 显示谜题结果

    await sleep(2000); // 等待2秒

    const decodedClue = await TreasureMap.decodeAncientScript("decoded clue"); // 异步解码古代文字
    document.getElementById('result').innerText += "\n" + decodedClue; // 显示解码后的线索

    // 隐藏输入框和按钮
    document.getElementById('prompt-container').style.display = 'none';

    // 通过迷宫并显示结果
    const roomsPassed = await TreasureMap.navigateThroughRooms([]); // 异步通过迷宫
    document.getElementById('result').innerText += "\n" + roomsPassed; // 显示通过的房间

    // 判断用户反应时间并避开陷阱
    const reactionTime = await getUserReactionTime(); // 异步获取用户反应时间（这里固定为300ms）
    let trapAvoidance;
    if (reactionTime < 500) {
        trapAvoidance = await TreasureMap.avoidTraps(reactionTime); // 如果反应时间小于500ms，则尝试避开陷阱
    } else {
        trapAvoidance = "触发陷阱！"; // 否则触发陷阱
    }
    document.getElementById('result').innerText += "\n" + trapAvoidance; // 显示陷阱结果

    // 在神庙中搜索，并显示结果
    const templeSearch = await TreasureMap.searchTemple(); // 异步在神庙中搜索
    document.getElementById('result').innerText += "\n" + (templeSearch.startsWith("糟糕！") ? `遭遇守卫: ${templeSearch}` : templeSearch); // 显示搜索结果或遭遇守卫的信息
 
    // 打开宝藏箱并显示结果
    const box = await TreasureMap.openTreasureBox(); // 异步打开宝藏箱
    document.getElementById('result').innerText += "\n" + box; // 显示宝藏箱内容

    // 添加最终的游戏历史项
    const endTime = new Date().toLocaleString(); // 获取当前时间
    const resultMessage = templeSearch.includes("找到了一个神秘的箱子...") ? "寻宝失败" : "寻宝成功"; // 判断寻宝结果
    playerInfo.gameHistory.push(`${endTime} - ${resultMessage}`); // 添加游戏历史记录
    savePlayerInfo(playerInfo.playerId, playerInfo.playerNickname, playerInfo.gameHistory); // 保存玩家信息

    // 更新页面上的游戏历史
    updatePlayerInfo(playerInfo); // 更新显示的游戏历史

  } catch (error) {
      // 如果发生错误，则显示错误信息，并添加错误历史项
      const endTime = new Date().toLocaleString();
      playerInfo.gameHistory.push(`${endTime} - 游戏失败: ${error}`);
      savePlayerInfo(playerInfo.playerId, playerInfo.playerNickname, playerInfo.gameHistory);
      document.getElementById('result').innerText = `任务失败: ${error}`;
  }
}

// 获取用户输入的函数
async function getUserInput() {
  return new Promise(resolve => {
    document.getElementById('submit-button').addEventListener('click', () => {
        const input = document.getElementById('user-input').value; // 获取用户输入
        resolve(input); // 返回用户输入
        document.getElementById('submit-button').removeEventListener('click', arguments.callee, { once: true }); // 移除事件监听器，防止多次触发
    }, { once: true }); // 确保事件监听器只触发一次
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 假设用户反应时间为300ms
async function getUserReactionTime() {
  return 300;
}

// 保存玩家信息并开始游戏
document.getElementById('save-info').addEventListener('click', async () => {
  const playerId = document.getElementById('player-id-input').value; // 获取玩家ID输入
  const playerNickname = document.getElementById('player-nickname-input').value; // 获取玩家昵称输入
  if (!playerId || !playerNickname) { // 验证输入是否有效
      alert("请输入有效的玩家ID和昵称！");
      return;
  }
  savePlayerInfo(playerId, playerNickname, []); // 保存玩家信息，游戏历史记录初始化为空数组
});

// 点击开始游戏按钮，开始寻宝游戏
document.getElementById('start-game').addEventListener('click', findTreasureWithAsyncAwait);

// 在页面加载时加载玩家信息
window.onload = () => {
  const playerInfo = loadPlayerInfo(); // 加载玩家信息
  updatePlayerInfo(playerInfo); // 更新页面上的玩家信息
};