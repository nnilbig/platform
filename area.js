// 初始玩家資料
const defaultPlayers = [
    { name: '安' },
    { name: '儒' },
    { name: 'Eden' },
    { name: '靖博' },
    { name: '黑皮林' },
    { name: '仁' },
    { name: '小明' },
    { name: '可樂' },
    { name: '小毛' },
    { name: 'Liu' },
    { name: '楊承' },
    { name: '容潔' },
    { name: 'Jessica' },
    { name: '融' },
    { name: '甘' },
    { name: 'Angel' }
];

// 將資料存入 localStorage，若尚未儲存
if (!localStorage.getItem('players')) {
    localStorage.setItem('players', JSON.stringify(defaultPlayers));
}

// 讀取 localStorage 中的玩家資料
let players = JSON.parse(localStorage.getItem('players'));

// 顯示玩家列表於休息區
const restZone = document.getElementById('restZone');

// 生成圓形玩家圖像
function createPlayerElement(player) {
    const playerElement = document.createElement('div');
    playerElement.classList.add('player');
    playerElement.textContent = player.name;
    playerElement.draggable = true;
    playerElement.addEventListener('dragstart', dragStart);
    return playerElement;
}

// 初始化所有玩家顯示於休息區
function initializePlayers() {
    players.forEach(player => {
        const playerElement = createPlayerElement(player);
        restZone.appendChild(playerElement);
    });
}

// 拖曳開始
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.textContent); // 儲存被拖曳元素的名稱
}

// 允許放置
function allowDrop(e) {
    e.preventDefault();
}

// 處理放置
function drop(e) {
    e.preventDefault();
    const playerName = e.dataTransfer.getData('text'); // 取得拖曳的玩家名稱
    const droppedPlayer = players.find(player => player.name === playerName);
    const targetZone = e.target;

    if (droppedPlayer) {
        const currentPlayers = targetZone.getElementsByClassName('player');
        
        // 檢查該區域是否已經有 4 位玩家
        if (currentPlayers.length < 4) {
            const playerElement = createPlayerElement(droppedPlayer); // 重新生成玩家元素
            targetZone.appendChild(playerElement); // 將玩家元素放入目標區域
            
            // 更新 localStorage
            players = players.filter(player => player.name !== playerName); // 移除已經拖曳過的玩家
            localStorage.setItem('players', JSON.stringify(players));

            // 重新載入玩家名單
            loadPlayers();
        }
    }
}

// 重新初始化玩家顯示
function loadPlayers() {
    restZone.innerHTML = ""; // 清空休息區
    players.forEach(player => {
        const playerElement = createPlayerElement(player);
        restZone.appendChild(playerElement);
    });
}

// 初始化所有玩家
initializePlayers();
