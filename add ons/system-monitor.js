// System Monitor and Logger
// Displays system usage and activity logs

class SystemMonitor {
    constructor() {
        this.logs = [];
        this.maxLogs = 50;
        this.startTime = Date.now();
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.createMonitorUI();
        this.startMonitoring();
        this.log('System initialized', 'success');
        this.setupEventListeners();
    }

    createMonitorUI() {
        // Create system monitor bar
        const monitorBar = document.createElement('div');
        monitorBar.className = 'system-monitor';
        monitorBar.id = 'system-monitor';
        monitorBar.innerHTML = `
            <div class="monitor-section">
                <div class="monitor-item">
                    <span class="monitor-icon">⏱️</span>
                    <span class="monitor-label">Uptime:</span>
                    <span class="monitor-value" id="uptime-value">00:00:00</span>
                </div>
                <div class="monitor-item">
                    <span class="monitor-icon">🔄</span>
                    <span class="monitor-label">FPS:</span>
                    <span class="monitor-value" id="fps-value">60</span>
                </div>
                <div class="monitor-item">
                    <span class="monitor-icon">💾</span>
                    <span class="monitor-label">RAM:</span>
                    <span class="monitor-value" id="memory-value">--</span>
                </div>
                <div class="monitor-item">
                    <span class="monitor-icon">💽</span>
                    <span class="monitor-label">Heap:</span>
                    <span class="monitor-value" id="heap-value">--</span>
                </div>
                <div class="monitor-item">
                    <span class="monitor-icon">📊</span>
                    <span class="monitor-label">CPU:</span>
                    <span class="monitor-value" id="cpu-value">--</span>
                </div>
                <div class="monitor-item">
                    <span class="monitor-icon">🌐</span>
                    <span class="monitor-label">Network:</span>
                    <span class="monitor-value" id="network-value">Online</span>
                </div>
                <div class="monitor-item">
                    <span class="monitor-icon">🌡️</span>
                    <span class="monitor-label">Temp:</span>
                    <span class="monitor-value" id="current-temp-value">34°F</span>
                </div>
            </div>
            <div class="monitor-section">
                <button class="log-toggle-btn" id="log-toggle-btn">📋 View Logs</button>
                <button class="system-monitor-toggle" id="minimize-monitor">▲ Minimize</button>
            </div>
        `;
        document.body.insertBefore(monitorBar, document.body.firstChild);

        // Create system log panel
        const logPanel = document.createElement('div');
        logPanel.className = 'system-log';
        logPanel.id = 'system-log';
        logPanel.innerHTML = `
            <div class="log-header">
                <span class="log-title">System Logs</span>
                <button class="log-clear-btn" id="clear-logs-btn">Clear</button>
            </div>
            <div class="log-content" id="log-content"></div>
        `;
        document.body.insertBefore(logPanel, document.body.firstChild);

        // Create toggle button for minimized state
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'system-monitor-toggle';
        toggleBtn.id = 'show-monitor';
        toggleBtn.textContent = '▼ Show Monitor';
        toggleBtn.style.display = 'none';
        document.body.appendChild(toggleBtn);
    }

    setupEventListeners() {
        // Toggle log panel
        const logToggleBtn = document.getElementById('log-toggle-btn');
        const logPanel = document.getElementById('system-log');
        if (logToggleBtn && logPanel) {
            logToggleBtn.addEventListener('click', () => {
                logPanel.classList.toggle('visible');
            });
        }

        // Clear logs
        const clearLogsBtn = document.getElementById('clear-logs-btn');
        if (clearLogsBtn) {
            clearLogsBtn.addEventListener('click', () => {
                this.clearLogs();
            });
        }

        // Minimize/Show monitor
        const minimizeBtn = document.getElementById('minimize-monitor');
        const showBtn = document.getElementById('show-monitor');
        const monitor = document.getElementById('system-monitor');
        
        if (minimizeBtn && showBtn && monitor) {
            minimizeBtn.addEventListener('click', () => {
                monitor.classList.add('minimized');
                showBtn.style.display = 'block';
                logPanel.classList.remove('visible');
            });

            showBtn.addEventListener('click', () => {
                monitor.classList.remove('minimized');
                showBtn.style.display = 'none';
            });
        }

        // Track temperature changes
        this.observeTemperatureChanges();
        
        // Track scene changes
        this.observeSceneChanges();
        
        // Track network status changes
        window.addEventListener('online', () => {
            this.log('Network connection restored', 'success');
            this.updateNetwork();
        });
        
        window.addEventListener('offline', () => {
            this.log('Network connection lost', 'error');
            this.updateNetwork();
        });
    }

    startMonitoring() {
        this.updateInterval = setInterval(() => {
            this.updateUptime();
            this.updateFPS();
            this.updateMemory();
            this.updateCPU();
            this.updateNetwork();
        }, 1000);
        
        // Update storage info less frequently
        this.updateStorage();
        setInterval(() => this.updateStorage(), 10000);
    }

    updateUptime() {
        const uptime = Date.now() - this.startTime;
        const hours = Math.floor(uptime / 3600000);
        const minutes = Math.floor((uptime % 3600000) / 60000);
        const seconds = Math.floor((uptime % 60000) / 1000);
        
        const uptimeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        const uptimeElement = document.getElementById('uptime-value');
        if (uptimeElement) {
            uptimeElement.textContent = uptimeStr;
        }
    }

    updateFPS() {
        // Simple FPS counter
        let lastTime = performance.now();
        let frames = 0;
        
        const countFPS = () => {
            frames++;
            const currentTime = performance.now();
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round(frames * 1000 / (currentTime - lastTime));
                const fpsElement = document.getElementById('fps-value');
                if (fpsElement) {
                    fpsElement.textContent = fps;
                    
                    // Color code based on performance
                    if (fps >= 50) {
                        fpsElement.className = 'monitor-value';
                    } else if (fps >= 30) {
                        fpsElement.className = 'monitor-value warning';
                    } else {
                        fpsElement.className = 'monitor-value critical';
                    }
                }
                frames = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(countFPS);
        };
        
        requestAnimationFrame(countFPS);
    }

    updateMemory() {
        if (performance.memory) {
            const usedMemory = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
            const totalMemory = (performance.memory.jsHeapSizeLimit / 1048576).toFixed(1);
            const memoryElement = document.getElementById('memory-value');
            const heapElement = document.getElementById('heap-value');
            
            if (memoryElement) {
                memoryElement.textContent = `${usedMemory}MB`;
                
                const percentage = (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100;
                if (percentage >= 90) {
                    memoryElement.className = 'monitor-value critical';
                } else if (percentage >= 70) {
                    memoryElement.className = 'monitor-value warning';
                } else {
                    memoryElement.className = 'monitor-value';
                }
            }
            
            if (heapElement) {
                const heapPercentage = ((performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100).toFixed(1);
                heapElement.textContent = `${heapPercentage}%`;
                
                if (heapPercentage >= 90) {
                    heapElement.className = 'monitor-value critical';
                } else if (heapPercentage >= 70) {
                    heapElement.className = 'monitor-value warning';
                } else {
                    heapElement.className = 'monitor-value';
                }
            }
        } else {
            const memoryElement = document.getElementById('memory-value');
            const heapElement = document.getElementById('heap-value');
            if (memoryElement) memoryElement.textContent = 'N/A';
            if (heapElement) heapElement.textContent = 'N/A';
        }
    }

    updateCPU() {
        // Estimate CPU usage based on frame timing
        const cpuElement = document.getElementById('cpu-value');
        if (!cpuElement) return;
        
        if (window.performance && performance.now) {
            const now = performance.now();
            if (!this.lastCPUCheck) {
                this.lastCPUCheck = now;
                this.cpuSamples = [];
                return;
            }
            
            const delta = now - this.lastCPUCheck;
            this.lastCPUCheck = now;
            
            // Estimate based on frame time (rough approximation)
            const estimatedCPU = Math.min(100, Math.max(0, (delta / 16.67) * 10));
            
            this.cpuSamples = this.cpuSamples || [];
            this.cpuSamples.push(estimatedCPU);
            if (this.cpuSamples.length > 10) this.cpuSamples.shift();
            
            const avgCPU = (this.cpuSamples.reduce((a, b) => a + b, 0) / this.cpuSamples.length).toFixed(1);
            cpuElement.textContent = `${avgCPU}%`;
            
            if (avgCPU >= 80) {
                cpuElement.className = 'monitor-value critical';
            } else if (avgCPU >= 60) {
                cpuElement.className = 'monitor-value warning';
            } else {
                cpuElement.className = 'monitor-value';
            }
        } else {
            cpuElement.textContent = 'N/A';
        }
    }

    updateNetwork() {
        const networkElement = document.getElementById('network-value');
        if (!networkElement) return;
        
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (navigator.onLine) {
            if (connection) {
                const effectiveType = connection.effectiveType || 'unknown';
                const downlink = connection.downlink ? `${connection.downlink}Mbps` : effectiveType;
                networkElement.textContent = downlink;
                networkElement.className = 'monitor-value';
            } else {
                networkElement.textContent = 'Online';
                networkElement.className = 'monitor-value';
            }
        } else {
            networkElement.textContent = 'Offline';
            networkElement.className = 'monitor-value critical';
        }
    }

    updateStorage() {
        if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(estimate => {
                const used = (estimate.usage / 1048576).toFixed(1);
                const quota = (estimate.quota / 1048576).toFixed(1);
                const percentage = ((estimate.usage / estimate.quota) * 100).toFixed(1);
                
                this.log(`Storage: ${used}MB / ${quota}MB (${percentage}%)`, 'info');
            });
        }
    }

    observeTemperatureChanges() {
        const tempElement = document.querySelector('.temp');
        if (tempElement) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        const newTemp = tempElement.textContent.trim();
                        const currentTempElement = document.getElementById('current-temp-value');
                        if (currentTempElement) {
                            currentTempElement.textContent = newTemp;
                        }
                        this.log(`Temperature changed to ${newTemp}`, 'info');
                    }
                });
            });

            observer.observe(tempElement, {
                childList: true,
                characterData: true,
                subtree: true
            });
        }
    }

    observeSceneChanges() {
        const sixthsContainer = document.getElementById('rot-icons');
        if (sixthsContainer) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const activeScene = document.querySelector('.sixths.active');
                        if (activeScene) {
                            const scenes = ['Sun', 'Sunset', 'Night', 'Clouds', 'Storm', 'Snow'];
                            const index = Array.from(document.querySelectorAll('.sixths')).indexOf(activeScene);
                            if (index >= 0 && index < scenes.length) {
                                this.log(`Scene changed to ${scenes[index]}`, 'info');
                            }
                        }
                    }
                });
            });

            const sixths = document.querySelectorAll('.sixths');
            sixths.forEach(sixth => {
                observer.observe(sixth, { attributes: true });
            });
        }
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = {
            timestamp,
            message,
            type
        };

        this.logs.unshift(logEntry);
        
        // Keep only max logs
        if (this.logs.length > this.maxLogs) {
            this.logs.pop();
        }

        this.renderLogs();
        
        // Also log to console
        const consoleMethod = type === 'error' ? 'error' : type === 'warning' ? 'warn' : 'log';
        console[consoleMethod](`[${timestamp}] ${message}`);
    }

    renderLogs() {
        const logContent = document.getElementById('log-content');
        if (!logContent) return;

        logContent.innerHTML = this.logs.map(log => `
            <div class="log-entry ${log.type}">
                <span class="log-timestamp">[${log.timestamp}]</span>
                <span class="log-message">${log.message}</span>
            </div>
        `).join('');
    }

    clearLogs() {
        this.logs = [];
        this.renderLogs();
        this.log('Logs cleared', 'info');
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Initialize system monitor when DOM is ready
let systemMonitor;

document.addEventListener('DOMContentLoaded', () => {
    systemMonitor = new SystemMonitor();
    
    // Log power button clicks
    const powerBtn = document.querySelector('.power');
    if (powerBtn) {
        powerBtn.addEventListener('click', () => {
            const outerRim = document.querySelector('.outer-rim');
            if (outerRim) {
                const isPowerOn = outerRim.classList.contains('power-on');
                systemMonitor.log(isPowerOn ? 'System powered OFF' : 'System powered ON', 'warning');
            }
        });
    }

    // Log toggle changes
    const toggles = document.querySelectorAll('.toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const unit = this.textContent;
            systemMonitor.log(`Temperature unit changed to ${unit}`, 'info');
        });
    });

    // Log rotation clicks
    const clickRot = document.getElementById('click-rot');
    if (clickRot) {
        clickRot.addEventListener('click', () => {
            systemMonitor.log('Scene rotation triggered', 'info');
        });
    }
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.SystemMonitor = SystemMonitor;
    window.systemMonitor = systemMonitor;
}
