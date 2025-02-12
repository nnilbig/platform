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

    // 點擊外部關閉彈窗
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 設定完成按鈕，檢查選擇人數是否足夠
    settingCompleteBtn.addEventListener("click", function () {
    if (selectedPlayers.length < playerCount) {
        openTextModal("選擇人數不足");
    } else {
        // 保存數據
    	  localStorage.setItem("players", JSON.stringify(selectedPlayers));
        openTextModal("設定已完成，您可以開始比賽！");
        // 跳轉到新頁面
        setTimeout(function() {
            window.location.href = "area.html"; // 請將此處替換為您希望跳轉的頁面地址
        }, 1000); // 等待1秒鐘再跳轉
    }
});

// 更新 openModal 函數
function openModal(title, message) {
    selectedSetting = null;  // 清除設定
    modalTitle.textContent = title;
    modalInput.style.display = "none";
    playerListDiv.style.display = "none";
    
    const modalMessage = document.createElement('div');
    modalMessage.textContent = message;
    modal.appendChild(modalMessage);

    modal.style.display = "flex";

    // 可以在此加入延遲關閉彈窗的邏輯
    setTimeout(() => {
        closeModal();
    }, 2000); // 等待2秒後關閉
}


    // 開啟數值設定彈窗
    function openModal(title, settingId) {
        selectedSetting = settingId;
        modalTitle.textContent = title;
        modalInput.style.display = "block";
        playerListDiv.style.display = "none";

        if (settingId === "court-count") {
            modalInput.value = courtCount;
        } else {
            modalInput.value = playerCount;
        }

        modal.style.display = "flex";

        // 監聽數值變更
        modalInput.addEventListener("input", function () {
            let value = parseInt(modalInput.value);
            if (settingId === "court-count") {
                if (value < 1) value = 1;
                if (value > 3) value = 3;
                courtCount = value;
                document.getElementById(settingId).textContent = `場地數量：${courtCount}`;

                // 自動調整人數上限
                playerCount = courtCount * 8;
                document.getElementById("player-setting").textContent = `參加人數：${playerCount}`;
            } else if (settingId === "player-count") {
                if (value < courtCount * 8) value = courtCount * 8;
                if (value > 24) value = 24;
                playerCount = value;
                document.getElementById(settingId).textContent = `參加人數：${playerCount}`;
            }
        });
    }

    // 開啟選擇人員彈窗
    function openPlayerModal() {
        modalTitle.textContent = `選擇參加人員（已選 ${selectedPlayers.length} / ${playerCount}）`;
        modalInput.style.display = "none";
        playerListDiv.style.display = "flex";
        modal.style.display = "flex";

        renderPlayerList();
    }
    
    // 顯示文字內容的彈窗
    function openTextModal(title, message) {
        selectedSetting = null;  // 清除設定
        modalTitle.textContent = title;
        modalInput.style.display = "none";
        playerListDiv.style.display = "none";

        // 创建消息區域
        const modalMessage = document.createElement('div');
        modalMessage.textContent = message;
        modal.appendChild(modalMessage);

        modal.style.display = "flex";

        // 關閉彈窗後清除消息
        setTimeout(() => {
            closeModal();
        }, 2000); // 等待2秒後關閉
		}


    // 生成可選擇的人員列表
    function renderPlayerList() {
        playerListDiv.innerHTML = "";
        playerList.forEach(name => {
            const div = document.createElement("div");
            div.classList.add("player");
            div.textContent = name;
            div.addEventListener("click", function () {
                togglePlayerSelection(name, div);
            });

            // 標記已選擇
            if (selectedPlayers.includes(name)) {
                div.classList.add("selected");
            }

            playerListDiv.appendChild(div);
        });
    }

    // 切換人員選取狀態
    function togglePlayerSelection(name, element) {
        if (selectedPlayers.includes(name)) {
            selectedPlayers = selectedPlayers.filter(p => p !== name);
            element.classList.remove("selected");
        } else {
            if (selectedPlayers.length < playerCount) {
                selectedPlayers.push(name);
                element.classList.add("selected");
            }
        }

        // 更新已選人數
        modalTitle.textContent = `選擇參加人員（已選 ${selectedPlayers.length} / ${playerCount}）`;
    }

    // 關閉彈窗
    function closeModal() {
        modal.style.display = "none";
    }
});
