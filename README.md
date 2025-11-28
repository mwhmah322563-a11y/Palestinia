<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>سوق فلسطيني</title>
<style>
body {
    font-family: Arial;
    margin: 0;
    background:#f3f3f3;
}

/* الهيدر */
header {
    background:#222;
    padding:15px;
    color:white;
    text-align:center;
    font-size:22px;
    font-weight:bold;
}

/* الأقسام */
#categories {
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap:12px;
    padding:15px;
}

.cat {
    background:white;
    padding:20px 10px;
    border-radius:12px;
    text-align:center;
    font-size:18px;
    cursor:pointer;
    font-weight:bold;
    border:1px solid #ddd;
    transition:0.2s;
}
.cat:hover { background:#e2e2e2; }

/* steps */
.step {
    display:none;
    padding:15px;
}

input, select, textarea {
    width:100%;
    padding:12px;
    margin-top:10px;
    border-radius:10px;
    border:1px solid #aaa;
    font-size:16px;
}

textarea { height:120px; resize:none; }

/* زر */
button {
    width:100%;
    padding:15px;
    border:none;
    margin-top:15px;
    background:#222;
    color:white;
    border-radius:10px;
    font-size:18px;
    cursor:pointer;
}
button:hover { opacity:0.8; }

/* صور المعاينة */
#preview img {
    width:90px;
    height:90px;
    object-fit:cover;
    border-radius:10px;
    border:1px solid #bbb;
}

.preview-box {
    position:relative;
    display:inline-block;
    margin:5px;
}

.preview-box button {
    position:absolute;
    top:-5px; right:-5px;
    background:red;
    width:22px; height:22px;
    font-size:14px;
    border-radius:50%;
    padding:0;
}
</style>
</head>

<body>

<header>سوق فلسطيني</header>

<!-- -------------------- الأقسام -------------------- -->
<div id="categories">
    <div class="cat" onclick="chooseCategory('سيارات')">🚗 سيارات</div>
    <div class="cat" onclick="chooseCategory('عقارات')">🏠 عقارات</div>
    <div class="cat" onclick="chooseCategory('جوالات')">📱 جوالات</div>
    <div class="cat" onclick="chooseCategory('وظائف')">💼 وظائف</div>
    <div class="cat" onclick="chooseCategory('الكترونيات')">💻 الكترونيات</div>
    <div class="cat" onclick="chooseCategory('أثاث')">🪑 أثاث</div>
</div>


<!-- -------------------- الخطوة 1: القسم -------------------- -->
<div id="step1" class="step">
    <h2>القسم المختار: <span id="selectedCat" style="color:green"></span></h2>
    <button onclick="goToStep(2)">التالي</button>
</div>


<!-- -------------------- الخطوة 2: تفاصيل الإعلان -------------------- -->
<div id="step2" class="step">

    <h2>تفاصيل الإعلان</h2>

    <label>عنوان الإعلان</label>
    <input type="text" id="title">

    <label>السعر</label>
    <input type="number" id="price">

    <label>الوصف</label>
    <textarea id="desc"></textarea>

    <label>الصور</label>
    <input type="file" id="images" multiple accept="image/*">
    <div id="preview"></div>

    <button onclick="goToStep(3)">التالي</button>
</div>


<!-- -------------------- الخطوة 3: معلومات المعلن -------------------- -->
<div id="step3" class="step">

    <h2>معلومات المعلن</h2>

    <label>الاسم</label>
    <input type="text" id="name">

    <label>رقم الهاتف</label>
    <input type="text" id="phone">

    <label>المدينة</label>
    <select id="city">
        <option>غزة</option>
        <option>خان يونس</option>
        <option>رفح</option>
        <option>النصيرات</option>
        <option>جباليا</option>
    </select>

    <button onclick="publishAd()">نشر الإعلان</button>
</div>



<!-- -------------------- السكربت -------------------- -->
<script>

function chooseCategory(cat){
    document.getElementById("selectedCat").textContent = cat;
    document.getElementById("categories").style.display="none";
    goToStep(1);
}

function goToStep(num){
    document.querySelectorAll(".step").forEach(s => s.style.display="none");
    document.getElementById("step"+num).style.display="block";
}



/* -------------------- رفع ومعاينة الصور -------------------- */
const inputImages = document.getElementById("images");
const preview = document.getElementById("preview");

inputImages.onchange = () => {
    preview.innerHTML = "";

    [...inputImages.files].forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = e => {
            const box = document.createElement("div");
            box.className = "preview-box";

            box.innerHTML = `
                <img src="${e.target.result}">
                <button onclick="removeImage(${index})">×</button>
            `;
            preview.appendChild(box);
        };

        reader.readAsDataURL(file);
    });
};


function removeImage(index){
    let dt = new DataTransfer();

    [...inputImages.files]
    .filter((file, i) => i !== index)
    .forEach(file => dt.items.add(file));

    inputImages.files = dt.files;
    inputImages.onchange();
}



/* -------------------- نشر الإعلان -------------------- */
function publishAd(){
    alert("تم نشر إعلانك بنجاح 🎉");
}

</script>

</body>
</html>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>سوق فلسطيني</title>
<style>
body {
    font-family: Arial;
    margin: 0;
    background:#f3f3f3;
}

/* الهيدر */
header {
    background:#222;
    padding:15px;
    color:white;
    text-align:center;
    font-size:22px;
    font-weight:bold;
}

/* الأقسام */
#categories {
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap:12px;
    padding:15px;
}

.cat {
    background:white;
    padding:20px 10px;
    border-radius:12px;
    text-align:center;
    font-size:18px;
    cursor:pointer;
    font-weight:bold;
    border:1px solid #ddd;
    transition:0.2s;
}
.cat:hover { background:#e2e2e2; }

/* steps */
.step {
    display:none;
    padding:15px;
}

input, select, textarea {
    width:100%;
    padding:12px;
    margin-top:10px;
    border-radius:10px;
    border:1px solid #aaa;
    font-size:16px;
}

textarea { height:120px; resize:none; }

/* زر */
button {
    width:100%;
    padding:15px;
    border:none;
    margin-top:15px;
    background:#222;
    color:white;
    border-radius:10px;
    font-size:18px;
    cursor:pointer;
}
button:hover { opacity:0.8; }

/* صور المعاينة */
#preview img {
    width:90px;
    height:90px;
    object-fit:cover;
    border-radius:10px;
    border:1px solid #bbb;
}

.preview-box {
    position:relative;
    display:inline-block;
    margin:5px;
}

.preview-box button {
    position:absolute;
    top:-5px; right:-5px;
    background:red;
    width:22px; height:22px;
    font-size:14px;
    border-radius:50%;
    padding:0;
}
</style>
</head>

<body>

<header>سوق فلسطيني</header>

<!-- -------------------- الأقسام -------------------- -->
<div id="categories">
    <div class="cat" onclick="chooseCategory('سيارات')">🚗 سيارات</div>
    <div class="cat" onclick="chooseCategory('عقارات')">🏠 عقارات</div>
    <div class="cat" onclick="chooseCategory('جوالات')">📱 جوالات</div>
    <div class="cat" onclick="chooseCategory('وظائف')">💼 وظائف</div>
    <div class="cat" onclick="chooseCategory('الكترونيات')">💻 الكترونيات</div>
    <div class="cat" onclick="chooseCategory('أثاث')">🪑 أثاث</div>
</div>


<!-- -------------------- الخطوة 1: القسم -------------------- -->
<div id="step1" class="step">
    <h2>القسم المختار: <span id="selectedCat" style="color:green"></span></h2>
    <button onclick="goToStep(2)">التالي</button>
</div>


<!-- -------------------- الخطوة 2: تفاصيل الإعلان -------------------- -->
<div id="step2" class="step">

    <h2>تفاصيل الإعلان</h2>

    <label>عنوان الإعلان</label>
    <input type="text" id="title">

    <label>السعر</label>
    <input type="number" id="price">

    <label>الوصف</label>
    <textarea id="desc"></textarea>

    <label>الصور</label>
    <input type="file" id="images" multiple accept="image/*">
    <div id="preview"></div>

    <button onclick="goToStep(3)">التالي</button>
</div>


<!-- -------------------- الخطوة 3: معلومات المعلن -------------------- -->
<div id="step3" class="step">

    <h2>معلومات المعلن</h2>

    <label>الاسم</label>
    <input type="text" id="name">

    <label>رقم الهاتف</label>
    <input type="text" id="phone">

    <label>المدينة</label>
    <select id="city">
        <option>غزة</option>
        <option>خان يونس</option>
        <option>رفح</option>
        <option>النصيرات</option>
        <option>جباليا</option>
    </select>

    <button onclick="publishAd()">نشر الإعلان</button>
</div>



<!-- -------------------- السكربت -------------------- -->
<script>

function chooseCategory(cat){
    document.getElementById("selectedCat").textContent = cat;
    document.getElementById("categories").style.display="none";
    goToStep(1);
}

function goToStep(num){
    document.querySelectorAll(".step").forEach(s => s.style.display="none");
    document.getElementById("step"+num).style.display="block";
}



/* -------------------- رفع ومعاينة الصور -------------------- */
const inputImages = document.getElementById("images");
const preview = document.getElementById("preview");

inputImages.onchange = () => {
    preview.innerHTML = "";

    [...inputImages.files].forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = e => {
            const box = document.createElement("div");
            box.className = "preview-box";

            box.innerHTML = `
                <img src="${e.target.result}">
                <button onclick="removeImage(${index})">×</button>
            `;
            preview.appendChild(box);
        };

        reader.readAsDataURL(file);
    });
};


function removeImage(index){
    let dt = new DataTransfer();

    [...inputImages.files]
    .filter((file, i) => i !== index)
    .forEach(file => dt.items.add(file));

    inputImages.files = dt.files;
    inputImages.onchange();
}



/* -------------------- نشر الإعلان -------------------- */
function publishAd(){
    alert("تم نشر إعلانك بنجاح 🎉");
}

</script>

</body>
</html>
