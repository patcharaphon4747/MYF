const firebaseConfig = {
  apiKey: "AIzaSyCQBPZVr0L2UHt6Zdl9EtgYEvB5iaSQTbE",
  authDomain: "myfood-f0e5e.firebaseapp.com",
  projectId: "myfood-f0e5e",
  storageBucket: "myfood-f0e5e.firebasestorage.app",
  messagingSenderId: "104314436425",
  appId: "1:104314436425:web:bc8beddaa34f42b62b7898",
  measurementId: "G-M7RSSKY1ZE"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function addMenu(menu) {
  db.collection('menus').add(menu)
    .then(() => {
      console.log('เพิ่มเมนูสำเร็จ');
      loadMenus();  // เรียกโหลดเมนูใหม่หลังเพิ่มข้อมูล
    })
    .catch(error => {
      console.error('เพิ่มเมนูไม่สำเร็จ:', error);
    });
}

function loadMenus() {
  db.collection('menus').get()
    .then(snapshot => {
      const menuList = document.getElementById('menu-list');
      menuList.innerHTML = ''; // เคลียร์รายการเก่า
      snapshot.forEach(doc => {
        const menu = doc.data();
        const li = document.createElement('li');
        li.textContent = `${menu.name} - ฿${menu.price}`;
        menuList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('โหลดเมนูไม่สำเร็จ:', error);
    });
}
