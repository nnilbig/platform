// 初始玩家資料
const defaultPlayers = [
    { name: '安' },
    { name: '儒' },
    { name: 'Eden' },
    { name: '靖博' },
    { name: '黑皮林' },
    { name: '小明' },
    { name: '可樂' },
    { name: '小毛' },
    { name: 'Liu' },
    { name: '楊承' },
    { name: '容潔' },
    { name: 'Jessica' },
    { name: '扯翔' },
    { name: '融' },
    { name: '甘' },
    { name: 'Angel' }
];

// 儲存每個區域的選擇名單
let selectedPlayers = {
    courtA: [],
    queueA: [],
    courtB: [],
    queueB: []
};

// 顯示所有人員圖示並放置到區域
function renderPlayers() {
    const areaIds = ['courtA', 'queueA', 'courtB', 'queueB'];
    areaIds.forEach(areaId => {
        const areaZone = document.getElementById(areaId + 'Zone');
        areaZone.innerHTML = ""; // 清空區域內容

        selectedPlayers[areaId]?.forEach(playerName => {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player');
            playerDiv.textContent = playerName;
            areaZone.appendChild(playerDiv);
        });
    });
}

renderPlayers(); // 初次渲染

// 開啟選擇人員的彈窗
function openPlayerModal(areaId) {
    const modal = document.getElementById('playerModal');
    const playerListDiv = document.getElementById('playerList');
    playerListDiv.innerHTML = ""; // 清空名單

    // 填入所有玩家名單
    defaultPlayers.forEach(player => {
        const div = document.createElement('div');
        div.classList.add('player');
        div.textContent = player.name;
        div.addEventListener('click', () => togglePlayerSelection(areaId, player.name, div));
        playerListDiv.appendChild(div);
    });

    modal.style.display = "flex"; // 顯示彈窗
}

// 關閉彈窗
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('playerModal').style.display = "none";
});

// 切換選擇的人員
function togglePlayerSelection(areaId, playerName, playerDiv) {
    const index = selectedPlayers[areaId].indexOf(playerName);
    if (index > -1) {
        selectedPlayers[areaId].splice(index, 1); // 移除選中的人員
        playerDiv.classList.remove('selected'); // 移除顏色
    } else {
        if (selectedPlayers[areaId].length < 4) {
            selectedPlayers[areaId].push(playerName); // 增加選中的人員
            playerDiv.classList.add('selected'); // 設置顏色
        }
    }
    renderPlayers();
}

// 排隊上場
function moveQueueToCourt(queueId, courtId) {
    const queue = selectedPlayers[queueId];
    if (queue.length > 0) {
        selectedPlayers[courtId] = selectedPlayers[courtId].concat(queue.splice(0, 4)); // 每次移動最多4人
    }
    renderPlayers();
}

// 點擊區域來開啟選擇人員彈窗
document.getElementById('courtA').addEventListener('click', () => openPlayerModal('courtA'));
document.getElementById('queueA').addEventListener('click', () => openPlayerModal('queueA'));
document.getElementById('courtB').addEventListener('click', () => openPlayerModal('courtB'));
document.getElementBy
