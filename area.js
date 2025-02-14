// 全局變量
let selectedPlayers = {};
const games = [];

// 修改清空比賽區功能
window.clearGamePlayers = function(gameId) {
    // 只清空比賽區
    selectedPlayers[gameId] = [];
    renderPlayers();
}

// 新增排隊上場功能
window.queueToGame = function(gameId) {
    // 只有比賽區為空時才能將排隊區的玩家移至比賽區
    if (selectedPlayers[gameId].length === 0) {
        const queueId = gameId.replace('game', 'queue');
        
        // 將排隊區的玩家移到比賽區
        while (selectedPlayers[queueId].length > 0 && selectedPlayers[gameId].length < 4) {
            const player = selectedPlayers[queueId].shift();
            selectedPlayers[gameId].push(player);
        }
        
        renderPlayers();
    }
}

function renderPlayers() {
    // 遍歷所有場地和排隊區
    games.forEach(({gameId, queueId}) => {
        const gameZone = document.getElementById(`${gameId}Zone`);
        const queueZone = document.getElementById(`${queueId}Zone`);
        
        // 清空區域的顯示
        gameZone.innerHTML = "";
        queueZone.innerHTML = "";

        // 渲染場地區玩家
        selectedPlayers[gameId].forEach(playerName => {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player', 'selected');
            playerDiv.textContent = playerName;
            gameZone.appendChild(playerDiv);
        });

        // 渲染排隊區玩家
        selectedPlayers[queueId].forEach(playerName => {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player', 'queueSelected');
            playerDiv.textContent = playerName;
            queueZone.appendChild(playerDiv);
        });
    });
}

function togglePlayerSelection(areaId, playerName, playerDiv) {
    const index = selectedPlayers[areaId].indexOf(playerName);
    if (index > -1) {
        // 如果玩家已被選中,則移除
        selectedPlayers[areaId].splice(index, 1);
        playerDiv.classList.remove('selected');
    } else {
        // 如果玩家未被選中且該區域人數未滿4人,則新增
        if (selectedPlayers[areaId].length < 4) {
            selectedPlayers[areaId].push(playerName);
            playerDiv.classList.add('selected');
        }
    }
    renderPlayers(); // 更新顯示
}

function openPlayerModal(areaId) {
    const modal = document.getElementById('playerModal');
    const playerListDiv = document.getElementById('playerList');
    playerListDiv.innerHTML = "";

    players.forEach(playerName => {
        const div = document.createElement('div');
        div.classList.add('player');
        div.textContent = playerName;

        // 檢查玩家是否已在任何區域中
        let isOnGame = false;
        let isInQueue = false;
        
        for(const game of games) {
            if(selectedPlayers[game.gameId].includes(playerName)) {
                isOnGame = true;
            } else if(selectedPlayers[game.queueId].includes(playerName)) {
                isInQueue = true;
            }
        }

        if(isOnGame) {
            div.classList.add('onGame');
        } else if(isInQueue) {
            div.classList.add('inQueue');
        }

        if(selectedPlayers[areaId].includes(playerName)) {
            div.classList.add('selected');
        }

        div.addEventListener('click', () => togglePlayerSelection(areaId, playerName, div));
        playerListDiv.appendChild(div);
    });

    modal.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
    // 初始玩家資料
    const defaultPlayers = ["安", "儒", "Angel", "Eden", "靖博", "黑皮林", "扯翔", "小明", "可樂", "小毛", "楊承", "容潔", "融", "甘", "Jessica", "仁"];
    // 從 localStorage 讀取玩家資料和場地數量
    const storedPlayers = JSON.parse(localStorage.getItem('storedPlayers'));
    const storedCourtCount = parseInt(localStorage.getItem('courtCount')) || 2;
    window.players = storedPlayers ? storedPlayers : defaultPlayers;

    // 根據場地數量建立場地區域
    for(let i = 0; i < storedCourtCount; i++) {
        const gameLetter = String.fromCharCode(65 + i); // A, B, C...
        const gameId = `game${gameLetter}`;
        const queueId = `queue${gameLetter}`;
        
        // 初始化場地和排隊區域的玩家名單
        selectedPlayers[gameId] = [];
        selectedPlayers[queueId] = [];
        
        games.push({gameId, queueId});

        // 建立場地區域 DOM
        const areaContainer = document.createElement('div');
        areaContainer.className = 'area-container';

        // 建立比賽區
        const gameArea = document.createElement('div');
        gameArea.className = 'area';
        gameArea.id = gameId;
        gameArea.innerHTML = `
            <div class="area-header">
                比賽區 ${gameLetter}
            </div>
            <div class="drop-zone" id="${gameId}Zone"></div>
            <div class="button-container">
                <button class="finish-button" onclick="clearGamePlayers('${gameId}')">比賽結束</button>
                <button class="queue-button" onclick="queueToGame('${gameId}')">排隊上場</button>
            </div>
        `;

        // 建立排隊區
        const queueArea = document.createElement('div');
        queueArea.className = 'area';
        queueArea.id = queueId;
        queueArea.innerHTML = `
            <div class="area-header">排隊區 ${gameLetter}</div>
            <div class="drop-zone" id="${queueId}Zone"></div>
        `;

        // 修改點擊事件，改為綁定在 drop-zone 上
        gameArea.querySelector('.drop-zone').addEventListener('click', () => openPlayerModal(gameId));
        queueArea.querySelector('.drop-zone').addEventListener('click', () => openPlayerModal(queueId));

        areaContainer.appendChild(gameArea);
        areaContainer.appendChild(queueArea);
        document.querySelector('.main-container').appendChild(areaContainer);
    }

    // 點擊 modal 以外的區域關閉彈窗
    const modal = document.getElementById('playerModal');
    modal.addEventListener("click", function(event) {
        if(event.target === modal) {
            modal.style.display = "none";
        }
    });
});
