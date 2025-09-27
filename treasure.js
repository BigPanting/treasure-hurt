// treasure.js (更新后)
class TreasureMap {
    // 游戏状态和数据
    static gameState = {
        score: 0,
        progress: 0,
        hintsUsed: 0,
        currentLocation: null,
        foundItems: []
    };

    // 地点信息
    static locations = {
        library: { name: '图书馆', description: '充满古老书籍的神秘图书馆' },
        temple: { name: '神庙', description: '宏伟而古老的神圣建筑' },
        ruins: { name: '废墟', description: '被遗忘的古代文明遗迹' },
        cave: { name: '洞穴', description: '深不可测的神秘洞穴' },
        treasure: { name: '宝藏', description: '传说中的财富所在地' }
    };

    // 物品数据库
    static items = [
        { id: 'ancient_map', name: '古老地图', location: 'library', value: 10 },
        { id: 'holy_symbol', name: '神圣符号', location: 'temple', value: 15 },
        { id: 'old_key', name: '生锈钥匙', location: 'ruins', value: 12 },
        { id: 'torch', name: '火把', location: 'cave', value: 8 }
    ];

    // 获取初始线索
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.updateScore(5);
                resolve("在古老的图书馆里找到了第一个线索...");
            }, 1000);
        });
    }
  
    // 解码古老文字
    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                this.updateScore(10);
                resolve("解码成功!宝藏线索指向一座古老的神庙和一片神秘废墟...");
            }, 1500);
        });
    }
  
    // 搜索神庙
    static searchTemple() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) { // 30%概率遇到守卫
                    this.updateScore(-10);
                    reject("糟糕!遇到了神庙守卫，被迫撤退!");
                }
                
                // 有机会找到物品
                const item = this.findItem('temple');
                let message = "在神庙中发现了一些有用的信息...";
                if (item) {
                    message += ` 还找到了${item.name}!`;
                }
                
                this.updateScore(15);
                resolve(message);
            }, 2000);
        });
    }

    // 探索废墟（新增地点）
    static exploreRuins() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.25) { // 25%概率发生坍塌
                    this.updateScore(-15);
                    reject("不好!废墟发生了局部坍塌，必须尽快离开!");
                }
                
                // 有机会找到物品
                const item = this.findItem('ruins');
                let message = "在废墟中发现了指向洞穴的标记...";
                if (item) {
                    message += ` 还找到了${item.name}!`;
                }
                
                this.updateScore(12);
                resolve(message);
            }, 2200);
        });
    }

    // 探索洞穴
    static exploreCave() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.2) { // 20%概率遇到陷阱
                    this.updateScore(-12);
                    reject("小心!触发了洞穴陷阱!幸运的是你逃脱了，但浪费了很多时间...");
                }
                
                // 有机会找到物品
                const item = this.findItem('cave');
                let message = "成功穿过洞穴，发现了宝藏箱的位置...";
                if (item) {
                    message += ` 还找到了${item.name}!`;
                }
                
                this.updateScore(18);
                resolve(message);
            }, 2500);
        });
    }

    // 解开谜题
    static solvePuzzle() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 如果有古老地图，降低失败概率
                const hasMap = this.gameState.foundItems.includes('ancient_map');
                const failProbability = hasMap ? 0.1 : 0.25;
                
                if (Math.random() < failProbability) {
                    this.updateScore(-8);
                    reject("谜题太难了，无法解开...");
                }
                
                this.updateScore(20);
                resolve("成功解开谜题，获得了宝箱钥匙!");
            }, 2000);
        });
    }
  
    // 打开宝藏箱
    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // 根据找到的物品数量增加最终得分
                const bonus = this.gameState.foundItems.length * 10;
                this.updateScore(50 + bonus);
                
                let message = `恭喜!你找到了传说中的宝藏!里面装满了黄金和宝石!`;
                if (bonus > 0) {
                    message += ` 额外获得了${bonus}分的物品奖励!`;
                }
                
                resolve(message);
            }, 1000);
        });
    }

    // 查找地点物品
    static findItem(locationId) {
        const locationItems = this.items.filter(item => item.location === locationId);
        if (!locationItems.length) return null;
        
        // 30%概率找到物品
        if (Math.random() < 0.3) {
            const item = locationItems[Math.floor(Math.random() * locationItems.length)];
            if (!this.gameState.foundItems.includes(item.id)) {
                this.gameState.foundItems.push(item.id);
                this.updateScore(item.value);
                return item;
            }
        }
        return null;
    }

    // 获取提示
    static getHint(currentStep) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.gameState.hintsUsed++;
                this.updateScore(-5); // 使用提示扣分
                
                const hints = [
                    "图书馆里的书籍可能藏着第一个秘密...",
                    "古老的文字通常需要特殊的知识才能解读...",
                    "神庙里的壁画可能隐藏着线索...",
                    "废墟中可能残留着前人的遗物...",
                    "洞穴里很暗，也许需要照明工具...",
                    "谜题往往与周围环境有关联..."
                ];
                
                resolve(`提示: ${hints[currentStep % hints.length]}`);
            }, 800);
        });
    }

    // 更新分数
    static updateScore(points) {
        this.gameState.score = Math.max(0, this.gameState.score + points);
        document.getElementById('score').textContent = `得分: ${this.gameState.score}`;
    }

    // 更新进度
    static updateProgress(percentage) {
        this.gameState.progress = percentage;
        document.getElementById('progress').textContent = `进度: ${percentage}%`;
    }
}

// DOM元素
const startButton = document.getElementById('startButton');
const hintButton = document.getElementById('hintButton');
const adventureLog = document.getElementById('adventureLog');
const gameStatus = document.querySelector('.game-status');
const gameMap = document.getElementById('gameMap');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalButton = document.getElementById('modalButton');
const logTimestamp = document.getElementById('logTimestamp');

// 更新日志时间戳
function updateLogTimestamp() {
    const now = new Date();
    logTimestamp.textContent = now.toLocaleTimeString();
}

// 初始化地图
function initMap() {
    // 清除现有内容
    gameMap.innerHTML = '';
    
    // 创建地点标记
    const locations = [
        { id: 'library', name: '图', icon: '📚' },
        { id: 'temple', name: '庙', icon: '🏛️' },
        { id: 'ruins', name: '墟', icon: '🗿' },
        { id: 'cave', name: '洞', icon: '⛰️' },
        { id: 'treasure', name: '宝', icon: '💰' }
    ];
    
    locations.forEach(loc => {
        const div = document.createElement('div');
        div.id = loc.id;
        div.className = `location ${loc.id}`;
        div.innerHTML = `${loc.icon}<br>${loc.name}`;
        div.title = TreasureMap.locations[loc.id].description;
        gameMap.appendChild(div);
    });
    
    // 创建探险家
    const explorer = document.createElement('div');
    explorer.id = 'explorer';
    explorer.className = 'explorer';
    gameMap.appendChild(explorer);
    
    // 更新时间戳
    updateLogTimestamp();
    setInterval(updateLogTimestamp, 60000); // 每分钟更新一次
}

// 添加日志条目
function addLogEntry(text, type = 'default') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type} fade-in`;
    entry.textContent = `> ${text}`;
    adventureLog.appendChild(entry);
    adventureLog.scrollTop = adventureLog.scrollHeight; // 滚动到底部
}

// 创建路径线
function createPath(fromId, toId) {
    return new Promise(resolve => {
        const from = document.getElementById(fromId);
        const to = document.getElementById(toId);
        const fromRect = from.getBoundingClientRect();
        const toRect = to.getBoundingClientRect();
        const mapRect = gameMap.getBoundingClientRect();
        
        // 计算中心点
        const fromX = fromRect.left - mapRect.left + fromRect.width / 2;
        const fromY = fromRect.top - mapRect.top + fromRect.height / 2;
        const toX = toRect.left - mapRect.left + toRect.width / 2;
        const toY = toRect.top - mapRect.top + toRect.height / 2;
        
        // 计算距离和角度
        const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
        const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
        
        // 创建路径元素
        const path = document.createElement('div');
        path.className = 'path';
        path.style.width = '0px';
        path.style.left = `${fromX}px`;
        path.style.top = `${fromY}px`;
        path.style.transform = `rotate(${angle}deg)`;
        
        gameMap.appendChild(path);
        
        // 触发动画
        setTimeout(() => {
            path.style.width = `${length}px`;
            // 动画完成后解析
            setTimeout(resolve, 1000);
        }, 10);
    });
}

// 移动探险家到指定位置
function moveExplorerTo(locationId) {
    return new Promise(resolve => {
        const explorer = document.getElementById('explorer');
        const location = document.getElementById(locationId);
        
        // 显示位置
        location.classList.add('visible');
        
        // 获取目标位置坐标
        const rect = location.getBoundingClientRect();
        const mapRect = gameMap.getBoundingClientRect();
        
        // 设置探险家位置（居中）
        explorer.style.left = `${rect.left - mapRect.left + 12}px`;
        explorer.style.top = `${rect.top - mapRect.top + 12}px`;
        
        // 更新当前位置
        TreasureMap.gameState.currentLocation = locationId;
        
        // 移动完成后 resolve
        setTimeout(resolve, 1200);
    });
}

// 显示模态框
function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

// 隐藏模态框
function hideModal() {
    modal.style.display = 'none';
}

// 使用async/await实现寻宝过程
async function findTreasureWithAsyncAwait() {
    // 重置游戏状态
    TreasureMap.gameState = {
        score: 0,
        progress: 0,
        hintsUsed: 0,
        currentLocation: null,
        foundItems: []
    };
    
    // 更新UI状态
    startButton.disabled = true;
    hintButton.disabled = false;
    startButton.textContent = "探险中...";
    adventureLog.innerHTML = '';
    TreasureMap.updateScore(0);
    TreasureMap.updateProgress(0);
    
    try {
        let step = 0;
        
        // 1. 前往图书馆获取初始线索
        gameStatus.textContent = `前往${TreasureMap.locations.library.name}...`;
        await moveExplorerTo('library');
        const clue = await TreasureMap.getInitialClue();
        addLogEntry(clue, 'success');
        gameStatus.textContent = `在${TreasureMap.locations.library.name}找到了线索`;
        TreasureMap.updateProgress(15);
        step++;
        
        // 2. 解码线索
        gameStatus.textContent = "尝试解码古老文字...";
        const locationInfo = await TreasureMap.decodeAncientScript(clue);
        addLogEntry(locationInfo, 'success');
        TreasureMap.updateProgress(25);
        step++;
        
        // 3. 前往神庙
        gameStatus.textContent = `前往${TreasureMap.locations.temple.name}...`;
        await createPath('library', 'temple');
        await moveExplorerTo('temple');
        gameStatus.textContent = `到达${TreasureMap.locations.temple.name}`;
        step++;
        
        // 4. 搜索神庙
        gameStatus.textContent = `在${TreasureMap.locations.temple.name}中搜索...`;
        const templeInfo = await TreasureMap.searchTemple();
        addLogEntry(templeInfo, 'success');
        TreasureMap.updateProgress(35);
        step++;
        
        // 5. 前往废墟
        gameStatus.textContent = `前往${TreasureMap.locations.ruins.name}...`;
        await createPath('temple', 'ruins');
        await moveExplorerTo('ruins');
        gameStatus.textContent = `到达${TreasureMap.locations.ruins.name}`;
        step++;
        
        // 6. 探索废墟
        gameStatus.textContent = `探索${TreasureMap.locations.ruins.name}...`;
        const ruinsInfo = await TreasureMap.exploreRuins();
        addLogEntry(ruinsInfo, 'success');
        TreasureMap.updateProgress(50);
        step++;
        
        // 7. 前往洞穴
        gameStatus.textContent = `前往${TreasureMap.locations.cave.name}...`;
        await createPath('ruins', 'cave');
        await moveExplorerTo('cave');
        gameStatus.textContent = `到达${TreasureMap.locations.cave.name}`;
        step++;
        
        // 8. 探索洞穴
        gameStatus.textContent = `探索${TreasureMap.locations.cave.name}...`;
        const caveInfo = await TreasureMap.exploreCave();
        addLogEntry(caveInfo, 'success');
        TreasureMap.updateProgress(65);
        step++;
        
        // 9. 解开谜题
        gameStatus.textContent = "尝试解开古老谜题...";
        const puzzleSolution = await TreasureMap.solvePuzzle();
        addLogEntry(puzzleSolution, 'success');
        TreasureMap.updateProgress(80);
        step++;
        
        // 10. 前往宝藏所在地
        gameStatus.textContent = `前往${TreasureMap.locations.treasure.name}所在地...`;
        await createPath('cave', 'treasure');
        await moveExplorerTo('treasure');
        gameStatus.textContent = `到达${TreasureMap.locations.treasure.name}所在地`;
        step++;
        
        // 11. 打开宝藏箱
        gameStatus.textContent = "尝试打开宝藏箱...";
        const treasure = await TreasureMap.openTreasureBox();
        addLogEntry(treasure, 'success');
        TreasureMap.updateProgress(100);
        gameStatus.textContent = "恭喜！找到宝藏了！";
        
        // 给宝藏添加动画效果
        document.getElementById('treasure').classList.add('pulse');
        
        // 显示成功模态框
        showModal(
            "🎉 探险成功！", 
            `你成功找到了传说中的宝藏！\n最终得分: ${TreasureMap.gameState.score}\n找到物品: ${TreasureMap.gameState.foundItems.length}\n使用提示: ${TreasureMap.gameState.hintsUsed}`
        );
        
    } catch (error) {
        // 处理错误
        addLogEntry(error, 'error');
        gameStatus.textContent = "探险失败！";
        
        // 显示失败模态框
        showModal(
            "⚠️ 探险失败", 
            `很遗憾，你的探险失败了...\n当前得分: ${TreasureMap.gameState.score}\n可以点击"重新开始"再试一次！`
        );
    } finally {
        // 恢复按钮状态
        startButton.disabled = false;
        startButton.textContent = "重新开始";
        hintButton.disabled = true;
    }
}

// 提示功能
async function getHint() {
    const currentLocation = TreasureMap.gameState.currentLocation;
    if (!currentLocation) return;
    
    const step = [
        'library', 'temple', 'ruins', 'cave', 'treasure'
    ].indexOf(currentLocation);
    
    const hint = await TreasureMap.getHint(step);
    addLogEntry(hint, 'hint');
}

// 初始化
window.onload = () => {
    initMap();
    startButton.addEventListener('click', findTreasureWithAsyncAwait);
    hintButton.addEventListener('click', getHint);
    modalButton.addEventListener('click', hideModal);
};