<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>سوق فلسطيني</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body { margin:0; font-family:Tahoma; background:#f4f4f4; }

/* هيدر */
header {
  background:#000;
  padding:15px;
  color:#d4af37;
  text-align:center;
  font-size:22px;
  font-weight:bold;
  border-bottom:3px solid #d4af37;
}

.container { padding:15px; }

/* أزرار */
.btn {
  background:#d4af37;
  border:none;
  padding:12px;
  border-radius:10px;
  font-size:16px;
  cursor:pointer;
  width:100%;
  margin-top:10px;
}
.btn:hover { opacity:0.85; }

/* كروت */
.card {
  background:white;
  padding:15px;
  border-radius:12px;
  border:1px solid #ddd;
  margin-bottom:15px;
}

/* مدخلات */
input, select, textarea {
  width:100%;
  padding:12px;
  border-radius:8px;
  border:1px solid #aaa;
  margin-top:10px;
  font-size:15px;
}
textarea { height:120px; }

/* شبكة الأقسام والإعلانات */
.grid {
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(160px,1fr));
  gap:15px;
}

.cat {
  background:white;
  padding:25px 10px;
  text-align:center;
  font-size:19px;
  border-radius:12px;
  border:1px solid #ddd;
  cursor:pointer;
  font-weight:bold;
}
.cat:hover { background:#eee; }

/* إعلان */
.ad-box {
  background:white;
  border:1px solid #ccc;
  padding:12px;
  border-radius:12px;
  cursor:pointer;
}
.ad-box img{
  width:100%;
  height:160px;
  border-radius:10px;
  object-fit:cover;
}

/* صفحة التفاصيل */
.big-img {
  width:100%;
  height:260px;
  border-radius:12px;
  object-fit:cover;
  margin-bottom:10px;
}

/* إخفاء الصفحات */
.page { display:none; }
</style>
</head>
<body>

<header>سوق فلسطيني</header>

<div class="container">

<!-- ---------------- الصفحة الرئيسية ---------------- -->
<div id="home" class="page">

  <div class="card">
    <input id="searchText" placeholder="ابحث عن إعلان...">
    <button class="btn" onclick="searchAds()">بحث 🔍</button>
    <button class="btn" onclick="openPage('addAd')">➕ أضف إعلان</button>
    <button class="btn" onclick="openPage('ads')">📢 كل الإعلانات</button>
  </div>

  <h3 style="color:#d4af37">الأقسام</h3>
  <div class="grid">
    <div class="cat" onclick="filterCategory('سيارات')">🚗 سيارات</div>
    <div class="cat" onclick="filterCategory('عقارات')">🏠 عقارات</div>
    <div class="cat" onclick="filterCategory('جوالات')">📱 جوالات</div>
    <div class="cat" onclick="filterCategory('وظائف')">💼 وظائف</div>
    <div class="cat" onclick="filterCategory('الكترونيات')">💻 إلكترونيات</div>
    <div class="cat" onclick="filterCategory('أثاث')">🪑 أثاث</div>
  </div>

</div>


<!-- ---------------- صفحة الإعلانات ---------------- -->
<div id="ads" class="page">
  <button class="btn" onclick="openPage('home')">⬅ رجوع</button>
  <h2 style="color:#d4af37">الإعلانات</h2>
  <div id="adsContainer"></div>
</div>


<!-- ---------------- صفحة تفاصيل إعلان ---------------- -->
<div id="details" class="page">
  <button class="btn" onclick="openPage('ads')">⬅ رجوع</button>
  <img id="d_img" class="big-img">
  <h2 id="d_title"></h2>
  <h3 style="color:#d4af37" id="d_price"></h3>
  <p id="d_desc"></p>
  <p><b>المدينة:</b> <span id="d_city"></span></p>
  <p><b>الهاتف:</b> <span id="d_phone"></span></p>

  <button id="waBtn" class="btn">📲 واتساب</button>
  <button id="mailBtn" class="btn">📧 بريد إلكتروني</button>
</div>


<!-- ---------------- صفحة إضافة إعلان ---------------- -->
<div id="addAd" class="page">

  <button class="btn" onclick="openPage('home')">⬅ رجوع</button>

  <h2 style="color:#d4af37">إضافة إعلان</h2>

  <label>عنوان الإعلان</label>
  <input id="title">

  <label>القسم</label>
  <select id="category">
    <option>سيارات</option>
    <option>عقارات</option>
    <option>جوالات</option>
    <option>وظائف</option>
    <option>الكترونيات</option>
    <option>أثاث</option>
  </select>

  <label>السعر</label>
  <input type="number" id="price">

  <label>الوصف</label>
  <textarea id="desc"></textarea>

  <label>الصورة</label>
  <input type="file" id="imgInput" accept="image/*">

  <label>المدينة</label>
  <select id="city">
    <option>غزة</option>
    <option>رفح</option>
    <option>خان يونس</option>
    <option>جباليا</option>
    <option>النصيرات</option>
  </select>

  <label>الهاتف</label>
  <input id="phone">

  <label>البريد الإلكتروني</label>
  <input id="email">

  <button class="btn" onclick="publishAd()">📢 نشر الإعلان</button>

</div>

</div>

<script>

function openPage(id){
  document.querySelectorAll(".page").forEach(p => p.style.display="none");
  document.getElementById(id).style.display="block";
}
openPage("home");

let selectedImgBase64 = "";

/* قراءة الصورة */
document.getElementById("imgInput").onchange = e =>{
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = () => selectedImgBase64 = reader.result;
  reader.readAsDataURL(file);
};

/* نشر الإعلان */
function publishAd(){
  let ad = {
    id: Date.now(),
    title: title.value,
    category: category.value,
    price: price.value,
    desc: desc.value,
    city: city.value,
    phone: phone.value,
    email: email.value,
    img: selectedImgBase64
  };

  let ads = JSON.parse(localStorage.getItem("ads") || "[]");
  ads.push(ad);
  localStorage.setItem("ads", JSON.stringify(ads));

  alert("تم نشر الإعلان ✔");
  openPage("home");
}

/* عرض الإعلانات */
function loadAds(filter=null, search=null){
  let ads = JSON.parse(localStorage.getItem("ads") || "[]");
  let box = document.getElementById("adsContainer");

  if(filter) ads = ads.filter(a => a.category === filter);
  if(search) ads = ads.filter(a => a.title.includes(search) || a.desc.includes(search));

  box.innerHTML = "";

  ads.forEach(a=>{
    box.innerHTML += `
    <div class="ad-box" onclick="openDetails(${a.id})">
      <img src="${a.img}">
      <h3>${a.title}</h3>
      <div style="color:#d4af37;font-weight:bold">${a.price} شيكل</div>
      <small>${a.city}</small>
    </div>`;
  });

  openPage("ads");
}

/* تفاصيل إعلان */
function openDetails(id){
  let ads = JSON.parse(localStorage.getItem("ads") || "[]");
  let a = ads.find(x=>x.id==id);

  d_img.src = a.img;
  d_title.textContent = a.title;
  d_price.textContent = a.price + " شيكل";
  d_desc.textContent = a.desc;
  d_city.textContent = a.city;
  d_phone.textContent = a.phone;

  waBtn.onclick = () => open("https://wa.me/" + a.phone);
  mailBtn.onclick = () => open("mailto:" + a.email);

  openPage("details");
}

/* البحث */
function searchAds(){ loadAds(null, searchText.value); }

/* من الرئيسية */
function filterCategory(c){ loadAds(c); }

</script>

</body>
</html>
