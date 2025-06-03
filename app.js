// ตัวอย่างข้อมูล mock ของเมนูอาหาร
const menus = [
  { id: 1, name: "ข้าวมันไก่", price: 120 },
  { id: 2, name: "ผัดไทย", price: 180 },
  { id: 3, name: "ต้มยำกุ้ง", price: 90 },
  { id: 4, name: "ส้มตำ", price: 60 },
  { id: 5, name: "ข้าวซอย", price: 110 }
];

// ตัวอย่างข้อมูล mock ของลูกค้า
const customers = [
  { id: 101, name: "สมชาย" },
  { id: 102, name: "สมศรี" },
  { id: 103, name: "จิราภรณ์" },
  { id: 104, name: "ประยุทธ" },
  { id: 105, name: "นิดา" }
];

// ตัวอย่างข้อมูล mock ของออเดอร์
const orders = [
  { id: 1, date: '2025-06-03', customerId: 101, items: [{ menuId: 1, qty: 2 }, { menuId: 2, qty: 1 }], total: 320 },
  { id: 2, date: '2025-06-03', customerId: 102, items: [{ menuId: 1, qty: 1 }], total: 120 },
  { id: 3, date: '2025-06-03', customerId: 103, items: [{ menuId: 3, qty: 1 }], total: 90 },
  { id: 4, date: '2025-06-02', customerId: 104, items: [{ menuId: 2, qty: 3 }], total: 360 },
  { id: 5, date: '2025-06-01', customerId: 105, items: [{ menuId: 1, qty: 1 }, { menuId: 3, qty: 2 }], total: 300 }
];

// ฟังก์ชันแสดงยอดขายวันนี้, ออเดอร์วันนี้, ลูกค้าใหม่วันนี้ (mock data)
function updateDashboard() {
  const today = '2025-06-03'; // สมมติวันนี้
  const ordersToday = orders.filter(o => o.date === today);
  const totalSalesToday = ordersToday.reduce((sum, o) => sum + o.total, 0);
  const orderCountToday = ordersToday.length;
  
  // สมมติว่าลูกค้าใหม่วันนี้คือคนที่มีออเดอร์วันนี้ แต่ยังไม่เคยสั่งก่อนหน้านี้
  const customerIdsToday = ordersToday.map(o => o.customerId);
  const customerIdsBefore = orders.filter(o => o.date < today).map(o => o.customerId);
  const newCustomersToday = customerIdsToday.filter(id => !customerIdsBefore.includes(id));
  
  document.querySelector('#total-sales-card p').textContent = `฿${totalSalesToday}`;
  document.querySelector('#total-orders-card p').textContent = `${orderCountToday} รายการ`;
  document.querySelector('#new-customers-card p').textContent = `${newCustomersToday.length} คน`;
  
  // แสดงเมนูยอดนิยม 5 อันดับ (นับจำนวนรวมของเมนูที่สั่งวันนี้)
  const menuCount = {};
  ordersToday.forEach(o => {
    o.items.forEach(i => {
      menuCount[i.menuId] = (menuCount[i.menuId] || 0) + i.qty;
    });
  });
  const topMenus = Object.entries(menuCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([menuId, qty]) => {
      const menu = menus.find(m => m.id == menuId);
      return `<li>${menu ? menu.name : 'ไม่ทราบชื่อเมนู'} - ${qty} จาน</li>`;
    });
  document.querySelector('#top-menu-list').innerHTML = topMenus.join('');
}

// เรียกฟังก์ชันตอนโหลดหน้า
updateDashboard();

// ตัวอย่างฟังก์ชันล็อกเอาท์
function logout() {
  alert('ออกจากระบบเรียบร้อย!');
  // ที่นี่สามารถเพิ่มโค้ดล็อกเอาท์จริง เช่น เคลียร์ session, redirect หน้า login
}
