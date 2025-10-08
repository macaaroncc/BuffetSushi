// Variables globales
let currentMesa = null;
let currentMesaCode = null;
let currentPersonas = 0;
let currentCart = [];
let orderHistory = [];
let currentOrderNumber = 1;
let platosLimit = 5;

// Códigos únicos para cada mesa (complicados para seguridad)
const MESA_CODES = {
    1: 'QR7X9M2K8L5N',
    2: 'P3W8R6Y1T4U9',
    3: 'A5S7D2F9G6H1',
    4: 'Z8X3C4V7B2N6',
    5: 'M9K2L5Q8W3E1',
    6: 'R7T4Y6U8I1O3',
    7: 'P2A9S5D8F3G7',
    8: 'H6J1K4L9Z7X2',
    9: 'C8V3B6N1M5Q4',
    10: 'W2E7R9T5Y3U8',
    11: 'I4O6P1A8S2D7',
    12: 'F5G9H3J6K2L4',
    13: 'Z1X8C7V4B9N3',
    14: 'M6Q2W5E8R1T7',
    15: 'Y4U9I3O6P2A5',
    16: 'S8D1F7G4H9J3',
    17: 'K6L2Z5X8C1V7',
    18: 'B4N9M3Q6W2E8',
    19: 'R5T1Y7U4I9O3',
    20: 'P6A2S8D5F1G9'
};

// Base de datos de platos (50 platos diferentes)
const menuDatabase = [
    // Nigiri (10 platos)
    { id: 1, name: "Nigiri de Salmón", description: "Arroz sushi con salmón fresco", category: "nigiri" },
    { id: 2, name: "Nigiri de Atún", description: "Arroz sushi con atún rojo", category: "nigiri" },
    { id: 3, name: "Nigiri de Pulpo", description: "Arroz sushi con pulpo cocido", category: "nigiri" },
    { id: 4, name: "Nigiri de Anguila", description: "Arroz sushi con anguila teriyaki", category: "nigiri" },
    { id: 5, name: "Nigiri de Gamba", description: "Arroz sushi with gamba cocida", category: "nigiri" },
    { id: 6, name: "Nigiri de Vieira", description: "Arroz sushi con vieira fresca", category: "nigiri" },
    { id: 7, name: "Nigiri de Lubina", description: "Arroz sushi con lubina", category: "nigiri" },
    { id: 8, name: "Nigiri de Caballa", description: "Arroz sushi con caballa marinada", category: "nigiri" },
    { id: 9, name: "Nigiri de Hueva de Salmón", description: "Arroz sushi con ikura", category: "nigiri" },
    { id: 10, name: "Nigiri de Pez Mantequilla", description: "Arroz sushi con hamachi", category: "nigiri" },

    // Maki (15 platos)
    { id: 11, name: "California Roll", description: "Cangrejo, aguacate y pepino", category: "maki" },
    { id: 12, name: "Maki de Salmón", description: "Salmón fresco con arroz y nori", category: "maki" },
    { id: 13, name: "Maki de Atún", description: "Atún rojo con arroz y alga nori", category: "maki" },
    { id: 14, name: "Maki de Pepino", description: "Pepino fresco, ligero y crujiente", category: "maki" },
    { id: 15, name: "Philadelphia Roll", description: "Salmón, queso crema y cebollino", category: "maki" },
    { id: 16, name: "Spicy Tuna Roll", description: "Atún picante con mayonesa especial", category: "maki" },
    { id: 17, name: "Dragon Roll", description: "Anguila, aguacate y tempura", category: "maki" },
    { id: 18, name: "Rainbow Roll", description: "Varios pescados sobre california", category: "maki" },
    { id: 19, name: "Tempura Roll", description: "Langostino en tempura y aguacate", category: "maki" },
    { id: 20, name: "Volcano Roll", description: "Roll gratinado con salsa picante", category: "maki" },
    { id: 21, name: "Alaska Roll", description: "Salmón, aguacate y pepino", category: "maki" },
    { id: 22, name: "Boston Roll", description: "Langostino cocido y mayonesa", category: "maki" },
    { id: 23, name: "Maki de Aguacate", description: "Aguacate cremoso con arroz", category: "maki" },
    { id: 24, name: "Spider Roll", description: "Cangrejo de caparazón blando frito", category: "maki" },
    { id: 25, name: "Tiger Roll", description: "Langostino tigre y salsa unagi", category: "maki" },

    // Sashimi (10 platos)
    { id: 26, name: "Sashimi de Salmón", description: "Salmón fresco cortado fino", category: "sashimi" },
    { id: 27, name: "Sashimi de Atún", description: "Atún rojo de primera calidad", category: "sashimi" },
    { id: 28, name: "Sashimi de Lubina", description: "Lubina fresca del día", category: "sashimi" },
    { id: 29, name: "Sashimi de Pulpo", description: "Pulpo cocido en su punto", category: "sashimi" },
    { id: 30, name: "Sashimi de Hamachi", description: "Pez mantequilla premium", category: "sashimi" },
    { id: 31, name: "Sashimi de Caballa", description: "Caballa marinada tradicional", category: "sashimi" },
    { id: 32, name: "Sashimi de Vieira", description: "Vieira fresca del océano", category: "sashimi" },
    { id: 33, name: "Sashimi de Anguila", description: "Anguila con glaseado teriyaki", category: "sashimi" },
    { id: 34, name: "Sashimi Mix", description: "Selección del chef de 5 pescados", category: "sashimi" },
    { id: 35, name: "Sashimi de Dorada", description: "Dorada fresca mediterránea", category: "sashimi" },

    // Especiales (10 platos)
    { id: 36, name: "Chirashi Bowl", description: "Bowl de sashimi variado sobre arroz", category: "especiales" },
    { id: 37, name: "Poke de Salmón", description: "Salmón marinado estilo hawaiano", category: "especiales" },
    { id: 38, name: "Tataki de Atún", description: "Atún sellado con semillas de sésamo", category: "especiales" },
    { id: 39, name: "Carpaccio de Salmón", description: "Salmón en láminas con salsa ponzu", category: "especiales" },
    { id: 40, name: "Gyoza de Gambas", description: "Empanadillas japonesas de gambas", category: "especiales" },
    { id: 41, name: "Tempura de Verduras", description: "Verduras en tempura crujiente", category: "especiales" },
    { id: 42, name: "Yakitori de Pollo", description: "Brochetas de pollo teriyaki", category: "especiales" },
    { id: 43, name: "Edamame", description: "Vainas de soja al vapor con sal", category: "especiales" },
    { id: 44, name: "Agedashi Tofu", description: "Tofu frito con caldo dashi", category: "especiales" },
    { id: 45, name: "Sunomono", description: "Ensalada de pepino agridulce", category: "especiales" },

    // Postres (5 platos)
    { id: 46, name: "Mochi de Té Verde", description: "Postre tradicional japonés", category: "postres" },
    { id: 47, name: "Dorayaki", description: "Pancakes rellenos de crema dulce", category: "postres" },
    { id: 48, name: "Helado de Sésamo Negro", description: "Helado cremoso oriental", category: "postres" },
    { id: 49, name: "Daifuku", description: "Mochi relleno de pasta de judía", category: "postres" },
    { id: 50, name: "Castella", description: "Bizcocho esponjoso japonés", category: "postres" }
];

// Sistema de almacenamiento local
const Storage = {
    save: (key, data) => {
        localStorage.setItem(`buffetsushi_${key}`, JSON.stringify(data));
    },
    
    load: (key) => {
        const data = localStorage.getItem(`buffetsushi_${key}`);
        return data ? JSON.parse(data) : null;
    },
    
    clear: (key) => {
        localStorage.removeItem(`buffetsushi_${key}`);
    }
};

// Utilidades
const Utils = {
    showView: (viewId) => {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(viewId).classList.add('active');
    },
    
    showModal: (modalId) => {
        document.getElementById(modalId).classList.add('active');
    },
    
    hideModal: (modalId) => {
        document.getElementById(modalId).classList.remove('active');
    },
    
    formatTime: (date) => {
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    generateOrderId: () => {
        return `ORD-${currentMesa}-${currentOrderNumber++}-${Date.now()}`;
    },
    
    getMesaNumberByCode: (code) => {
        for (const [mesaNum, mesaCode] of Object.entries(MESA_CODES)) {
            if (mesaCode === code) {
                return parseInt(mesaNum);
            }
        }
        return null;
    },
    
    validateMesaAccess: (mesaNumber, code) => {
        return MESA_CODES[mesaNumber] === code;
    }
};

// Gestión de mesas
const MesaManager = {
    currentPersonasCount: 1,
    
    init: () => {
        // Ya no hay selector manual - solo acceso por QR
        
        // Cargar estado de mesa si existe
        const savedMesa = Storage.load('currentMesa');
        const savedMesaCode = Storage.load('currentMesaCode');
        const savedPersonas = Storage.load('currentPersonas');
        
        if (savedMesa && savedMesaCode && savedPersonas && Utils.validateMesaAccess(savedMesa, savedMesaCode)) {
            currentMesa = savedMesa;
            currentMesaCode = savedMesaCode;
            currentPersonas = savedPersonas;
            platosLimit = currentPersonas * 5;
            this.loadOrderHistory();
            Utils.showView('menu-view');
            this.updateMesaInfo();
        }
    },
    
    initPersonCounter: () => {
        this.currentPersonasCount = 1;
        document.getElementById('personas-counter').textContent = this.currentPersonasCount;
        this.updateCounterButtons();
    },
    
    increasePersonas: () => {
        if (this.currentPersonasCount < 8) {
            this.currentPersonasCount++;
            document.getElementById('personas-counter').textContent = this.currentPersonasCount;
            this.updateCounterButtons();
        }
    },
    
    decreasePersonas: () => {
        if (this.currentPersonasCount > 1) {
            this.currentPersonasCount--;
            document.getElementById('personas-counter').textContent = this.currentPersonasCount;
            this.updateCounterButtons();
        }
    },
    
    updateCounterButtons: () => {
        const decreaseBtn = document.getElementById('decrease-personas');
        const increaseBtn = document.getElementById('increase-personas');
        
        decreaseBtn.disabled = this.currentPersonasCount <= 1;
        increaseBtn.disabled = this.currentPersonasCount >= 8;
    },
    
    confirmPersonas: () => {
        this.setPersonas(this.currentPersonasCount);
    },
    
    selectMesa: (mesaCode) => {
        const mesaNumber = Utils.getMesaNumberByCode(mesaCode);
        
        if (!mesaNumber || !Utils.validateMesaAccess(mesaNumber, mesaCode)) {
            alert('Código de mesa inválido. Por favor, escanee el código QR correcto de su mesa.');
            return;
        }
        
        currentMesa = mesaNumber;
        currentMesaCode = mesaCode;
        Storage.save('currentMesa', currentMesa);
        Storage.save('currentMesaCode', currentMesaCode);
        
        // Verificar si la mesa ya está activa
        const mesaData = Storage.load(`mesa_${currentMesa}`);
        if (mesaData && mesaData.active) {
            currentPersonas = mesaData.personas;
            platosLimit = currentPersonas * 5;
            Storage.save('currentPersonas', currentPersonas);
            this.loadOrderHistory();
            Utils.showView('menu-view');
        } else {
            this.initPersonCounter();
            Utils.showView('mesa-config-view');
        }
        
        this.updateMesaInfo();
    },
    
    setPersonas: (personas) => {
        currentPersonas = personas;
        platosLimit = personas * 5;
        
        // Guardar configuración de mesa
        Storage.save('currentPersonas', currentPersonas);
        Storage.save(`mesa_${currentMesa}`, {
            active: true,
            personas: currentPersonas,
            timestamp: new Date().toISOString()
        });
        
        this.loadOrderHistory();
        Utils.showView('menu-view');
        this.updateMesaInfo();
        MenuManager.updateUI();
    },
    
    updateMesaInfo: () => {
        document.querySelectorAll('[id$="-mesa-number"]').forEach(el => {
            el.textContent = currentMesa || '';
        });
        document.getElementById('personas-count').textContent = currentPersonas || '';
    },
    
    loadOrderHistory: () => {
        orderHistory = Storage.load(`history_${currentMesa}`) || [];
        const lastOrder = orderHistory[orderHistory.length - 1];
        if (lastOrder) {
            currentOrderNumber = parseInt(lastOrder.id.split('-')[2]) + 1;
        }
        HistoryManager.render();
    },
    
    finalizeMesa: () => {
        Storage.clear('currentMesa');
        Storage.clear('currentMesaCode');
        Storage.clear('currentPersonas');
        Storage.clear(`mesa_${currentMesa}`);
        Storage.clear(`cart_${currentMesa}`);
        currentMesa = null;
        currentMesaCode = null;
        currentPersonas = 0;
        currentCart = [];
        orderHistory = [];
        Utils.showView('qr-scan-view');
    }
};

// Gestión del menú
const MenuManager = {
    currentCategory: 'all',
    
    init: () => {
        this.render();
        this.loadCart();
    },
    
    render: () => {
        const container = document.getElementById('menu-items');
        container.innerHTML = '';
        
        const filteredItems = this.currentCategory === 'all' 
            ? menuDatabase 
            : menuDatabase.filter(item => item.category === this.currentCategory);
        
        filteredItems.forEach(item => {
            const cartItem = currentCart.find(ci => ci.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            
            const itemElement = document.createElement('div');
            itemElement.className = `menu-item ${quantity > 0 ? 'selected' : ''}`;
            itemElement.innerHTML = `
                <div class="menu-item-header">
                    <div>
                        <h3>${item.name}</h3>
                    </div>
                    <span class="menu-item-category">${item.category}</span>
                </div>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    ${quantity === 0 ? `
                        <button class="add-btn" onclick="MenuManager.addToCart(${item.id})" ${this.getTotalCartItems() >= platosLimit ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i> Añadir
                        </button>
                    ` : `
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="MenuManager.decreaseQuantity(${item.id})">-</button>
                            <span class="quantity">${quantity}</span>
                            <button class="quantity-btn" onclick="MenuManager.increaseQuantity(${item.id})" ${this.getTotalCartItems() >= platosLimit ? 'disabled' : ''}>+</button>
                        </div>
                    `}
                </div>
            `;
            container.appendChild(itemElement);
        });
    },
    
    filterByCategory: (category) => {
        this.currentCategory = category;
        
        // Actualizar botones de categoría
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.render();
    },
    
    addToCart: (itemId) => {
        if (this.getTotalCartItems() >= platosLimit) return;
        
        const item = menuDatabase.find(i => i.id === itemId);
        const existingItem = currentCart.find(ci => ci.id === itemId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            currentCart.push({
                ...item,
                quantity: 1,
                timestamp: new Date().toISOString()
            });
        }
        
        this.saveCart();
        this.updateUI();
        this.render();
    },
    
    increaseQuantity: (itemId) => {
        if (this.getTotalCartItems() >= platosLimit) return;
        
        const existingItem = currentCart.find(ci => ci.id === itemId);
        if (existingItem) {
            existingItem.quantity++;
            this.saveCart();
            this.updateUI();
            this.render();
        }
    },
    
    decreaseQuantity: (itemId) => {
        const existingItem = currentCart.find(ci => ci.id === itemId);
        if (existingItem) {
            existingItem.quantity--;
            if (existingItem.quantity <= 0) {
                currentCart = currentCart.filter(ci => ci.id !== itemId);
            }
            this.saveCart();
            this.updateUI();
            this.render();
        }
    },
    
    removeFromCart: (itemId) => {
        currentCart = currentCart.filter(ci => ci.id !== itemId);
        this.saveCart();
        this.updateUI();
        this.render();
        CartManager.render();
    },
    
    getTotalCartItems: () => {
        return currentCart.reduce((total, item) => total + item.quantity, 0);
    },
    
    updateUI: () => {
        const totalItems = this.getTotalCartItems();
        document.getElementById('platos-selected').textContent = totalItems;
        document.getElementById('platos-limit').textContent = platosLimit;
        document.getElementById('cart-count').textContent = totalItems;
        
        // El botón "Ver Pedido" siempre está habilitado (sin contador ni disabled)
        
        // Actualizar colores del contador
        const counter = document.getElementById('platos-selected');
        counter.style.color = totalItems >= platosLimit ? '#F44336' : '#D4AF37';
    },
    
    loadCart: () => {
        currentCart = Storage.load(`cart_${currentMesa}`) || [];
        this.updateUI();
    },
    
    saveCart: () => {
        Storage.save(`cart_${currentMesa}`, currentCart);
    },
    
    clearCart: () => {
        currentCart = [];
        this.saveCart();
        this.updateUI();
        this.render();
        CartManager.render();
    }
};

// Gestión del carrito
const CartManager = {
    render: () => {
        const container = document.getElementById('cart-items');
        container.innerHTML = '';
        
        if (currentCart.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #999;">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 20px;"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
        } else {
            currentCart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="MenuManager.decreaseQuantity(${item.id})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="MenuManager.increaseQuantity(${item.id})" ${MenuManager.getTotalCartItems() >= platosLimit ? 'disabled' : ''}>+</button>
                        <button class="btn-secondary" onclick="MenuManager.removeFromCart(${item.id})" style="margin-left: 15px; padding: 5px 10px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                container.appendChild(itemElement);
            });
        }
        
        // Actualizar resumen
        document.getElementById('total-plates').textContent = MenuManager.getTotalCartItems();
    }
};

// Gestión de pedidos
const OrderManager = {
    makeOrder: async () => {
        if (currentCart.length === 0) return;
        
        Utils.showModal('loading-modal');
        
        // Simular procesamiento
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const order = {
            id: Utils.generateOrderId(),
            mesa: currentMesa,
            items: [...currentCart],
            timestamp: new Date().toISOString(),
            status: 'pending',
            totalItems: MenuManager.getTotalCartItems()
        };
        
        // Guardar pedido en historial
        orderHistory.push(order);
        Storage.save(`history_${currentMesa}`, orderHistory);
        
        // Guardar para admin
        const allOrders = Storage.load('allOrders') || [];
        allOrders.push(order);
        Storage.save('allOrders', allOrders);
        
        // Limpiar carrito
        MenuManager.clearCart();
        
        Utils.hideModal('loading-modal');
        Utils.showView('history-view');
        HistoryManager.render();
    }
};

// Gestión del historial
const HistoryManager = {
    render: () => {
        const container = document.getElementById('order-history');
        container.innerHTML = '';
        
        if (orderHistory.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #999;">
                    <i class="fas fa-receipt" style="font-size: 3rem; margin-bottom: 20px;"></i>
                    <p>No hay pedidos realizados aún</p>
                </div>
            `;
        } else {
            // Mostrar pedidos más recientes primero
            const sortedHistory = [...orderHistory].reverse();
            
            sortedHistory.forEach((order, index) => {
                const orderElement = document.createElement('div');
                orderElement.className = 'order-card';
                orderElement.innerHTML = `
                    <div class="order-header">
                        <div class="order-number">Pedido #${orderHistory.length - index}</div>
                        <div class="order-time">${Utils.formatTime(new Date(order.timestamp))}</div>
                        <div class="order-status ${order.status}">${order.status === 'pending' ? 'Pendiente' : 'Completado'}</div>
                    </div>
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <span class="order-item-name">${item.name}</span>
                                <span class="order-item-quantity">x${item.quantity}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                container.appendChild(orderElement);
                
                // Añadir línea separadora excepto para el último elemento
                if (index < sortedHistory.length - 1) {
                    const separator = document.createElement('div');
                    separator.style.cssText = `
                        height: 2px;
                        background: linear-gradient(90deg, transparent, #D4AF37, transparent);
                        margin: 20px 0;
                    `;
                    container.appendChild(separator);
                }
            });
        }
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar managers
    MesaManager.init();
    MenuManager.init();
    
    // Event listeners para configuración de mesa (contador)
    document.getElementById('decrease-personas').addEventListener('click', () => {
        MesaManager.decreasePersonas();
    });
    
    document.getElementById('increase-personas').addEventListener('click', () => {
        MesaManager.increasePersonas();
    });
    
    document.getElementById('confirm-personas-btn').addEventListener('click', () => {
        MesaManager.confirmPersonas();
    });
    
    // Event listeners para menú
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            MenuManager.filterByCategory(e.target.dataset.category);
        });
    });
    
    // Botón Ver Pedido - SOLO muestra el carrito (NO procesa pedido)
    var unifiedViewOrderBtn = document.getElementById('unified-view-order-btn');
    if (unifiedViewOrderBtn) {
        unifiedViewOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            viewOrder();
        });
    }
    
    document.getElementById('back-to-menu-btn').addEventListener('click', () => {
        Utils.showView('menu-view');
    });
    
    // ✅ Único botón que procesa el pedido - "Confirmar Pedido" en el carrito
    document.getElementById('confirm-order-btn').addEventListener('click', () => {
        OrderManager.makeOrder();
    });
    
    document.getElementById('clear-cart-btn').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres limpiar el carrito?')) {
            MenuManager.clearCart();
        }
    });
    
    document.getElementById('new-order-btn').addEventListener('click', () => {
        Utils.showView('menu-view');
    });
    
    // Actualizar información de mesa en todas las vistas
    MesaManager.updateMesaInfo();
});

// Detectar parámetros QR en la URL
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mesaCodeParam = urlParams.get('code');
    
    if (mesaCodeParam) {
        MesaManager.selectMesa(mesaCodeParam);
    }
});

// Delegación global: garantiza que Ver Pedido funcione siempre
document.addEventListener('click', function(e) {
    var btn = e.target && (e.target.id === 'unified-view-order-btn' ? e.target : e.target.closest && e.target.closest('#unified-view-order-btn'));
    if (btn) {
        e.preventDefault();
        try { viewOrder(); } catch (_) {}
    }
});

// Función global para el botón Ver Pedido
window.viewOrder = function() {
    try { if (window.CartManager && typeof CartManager.render === 'function') { CartManager.render(); } } catch (e) {}
    try {
        if (window.Utils && typeof Utils.showView === 'function') {
            Utils.showView('cart-view');
        } else {
            var views = document.querySelectorAll('.view');
            for (var i = 0; i < views.length; i++) views[i].classList.remove('active');
            var cart = document.getElementById('cart-view');
            if (cart) cart.classList.add('active');
        }
    } catch (e) {}
};

// Funciones globales para acceso desde HTML
window.MenuManager = MenuManager;
window.MesaManager = MesaManager;
window.CartManager = CartManager;
window.OrderManager = OrderManager;
