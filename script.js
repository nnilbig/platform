document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalInput = document.getElementById("modal-input");
    const playerListDiv = document.getElementById("player-list");
    const settingCompleteBtn = document.getElementById("setting-complete");  // 取得設定完成按鈕

    let selectedSetting = null;
    let playerList = ["安", "儒", "Eden", "靖博", "黑皮林", "扯翔", "仁", "小明", "可樂", "小毛", "Liu", "楊承", "容潔", "Jessica", "孟翰", "祈翰", "融", "甘", "喬", "Angel", "棋", "小林"];
    let selectedPlayers = ["安", "儒","Angel","Eden", "靖博", "黑皮林", "扯翔","小明", "可樂", "小毛","楊承", "容潔", "融", "甘"];
    let courtCount = 2; // 初始場地數
    let playerCount = 16; // 初始參加人數

    // 綁定點擊事件打開彈窗
    document.getElementById("court-setting").addEventListener("click", function () {
        openModal("設定場地數量", "court-count");
    });

    document.getElementById("player-setting").addEventListener("click", function () {
        openModal("設定參加人數", "player-count");
    });

    document.getElementById("playerlist-setting").addEventListener("click", function () {
        openPlayerModal();
    });
    document.getElementById("add-player").addEventListener("click", function () {
        openAddPlayerModal();
    });

    document.getElementById("remove-player").addEventListener("click", function () {
        openRemovePlayerModal();
    });

    
    // 打開設定場地數量的彈窗
    function openModal(title, targetId) {
        modalTitle.textContent = title;
        selectedSetting = targetId;
        modalInput.value = document.getElementById(targetId).textContent;
        modal.style.display = "flex";
        
        // 清空並隱藏玩家列表
        playerListDiv.innerHTML = '';
        playerListDiv.style.display = 'none';
        modalInput.style.display = 'block';
        
        // 添加確認按鈕
        const confirmButton = document.createElement('button');
        confirmButton.className = 'confirm-button';
        confirmButton.textContent = '確認';
        confirmButton.onclick = function() {
            if(targetId === 'court-count') {
                courtCount = parseInt(modalInput.value);
                playerCount = courtCount * 8;
                document.getElementById('player-count').textContent = playerCount;
            }
            document.getElementById(targetId).textContent = modalInput.value;
            closeModal();
        };
        modal.querySelector('.modal-content').appendChild(confirmButton);
    }

    // 打開選擇玩家的彈窗
    function openPlayerModal() {
        modalTitle.textContent = "選擇參加人員";
        modalInput.style.display = 'none';
        playerListDiv.style.display = 'flex';
        modal.style.display = "flex";
        
        // 顯示所有玩家
        playerListDiv.innerHTML = '';
        playerList.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.className = `player ${selectedPlayers.includes(player) ? 'selected' : ''}`;
            playerDiv.textContent = player;
            playerDiv.onclick = function() {
                if(this.classList.contains('selected')) {
                    selectedPlayers = selectedPlayers.filter(p => p !== player);
                    this.classList.remove('selected');
                } else if(selectedPlayers.length < playerCount) {
                    selectedPlayers.push(player);
                    this.classList.add('selected');
                }
            };
            playerListDiv.appendChild(playerDiv);
        });
    }

    // 打開新增玩家的彈窗
    function openAddPlayerModal() {
        modalTitle.textContent = "新增人員";
        modalInput.type = "text";
        modalInput.value = "";
        modalInput.style.display = 'block';
        playerListDiv.style.display = 'none';
        modal.style.display = "flex";
        
        // 添加確認按鈕
        const confirmButton = document.createElement('button');
        confirmButton.className = 'confirm-button';
        confirmButton.textContent = '確認';
        confirmButton.onclick = function() {
            const newPlayer = modalInput.value.trim();
            if(newPlayer && !playerList.includes(newPlayer)) {
                playerList.push(newPlayer);
                closeModal();
            }
        };
        modal.querySelector('.modal-content').appendChild(confirmButton);
    }

    // 打開移除玩家的彈窗
    function openRemovePlayerModal() {
        modalTitle.textContent = "移除人員";
        modalInput.type = "text";
        modalInput.value = "";
        modalInput.style.display = 'block';
        playerListDiv.style.display = 'none';
        modal.style.display = "flex";
        
        // 添加確認按鈕
        const confirmButton = document.createElement('button');
        confirmButton.className = 'confirm-button';
        confirmButton.textContent = '確認';
        confirmButton.onclick = function() {
            const playerToRemove = modalInput.value.trim();
            const index = playerList.indexOf(playerToRemove);
            if(index > -1) {
                playerList.splice(index, 1);
                selectedPlayers = selectedPlayers.filter(p => p !== playerToRemove);
                closeModal();
            }
        };
        modal.querySelector('.modal-content').appendChild(confirmButton);
    }

    // 關閉彈窗的函數
    function closeModal() {
        modal.style.display = "none";
        // 移除確認按鈕
        const confirmButton = modal.querySelector('.confirm-button');
        if(confirmButton) {
            confirmButton.remove();
        }
    }

    // 點擊彈窗外部關閉彈窗
    modal.addEventListener("click", function(e) {
        if(e.target === modal) {
            closeModal();
        }
    });
    // 設定完成按鈕點擊事件
    settingCompleteBtn.addEventListener("click", function() {
        if(selectedPlayers.length === playerCount) {
            modalTitle.textContent = "設定完成，開始比賽！";
            modalInput.style.display = 'none';
            playerListDiv.style.display = 'none';
            modal.style.display = "flex";
            // 將玩家列表存入 localStorage
            localStorage.setItem('storedPlayers', JSON.stringify(selectedPlayers));
            localStorage.setItem('courtCount', courtCount);
            
            // 1秒後自動跳轉
            setTimeout(function() {
                window.location.href = "area.html";
            }, 1000);
        } else {
            modalTitle.textContent = `請選擇正確的參加人數（${playerCount}人）`;
            modalInput.style.display = 'none';
            playerListDiv.style.display = 'none';
            modal.style.display = "flex";
            
            // 添加確認按鈕
            const confirmButton = document.createElement('button');
            confirmButton.className = 'confirm-button';
            confirmButton.textContent = '確認';
            confirmButton.onclick = closeModal;
            modal.querySelector('.modal-content').appendChild(confirmButton);
        }
    });
    

});
