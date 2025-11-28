/* script.js — نظام إدارة الإعلانات (localStorage) لجميع الصفحات */

/* مفاتيح التخزين */
const STORAGE_KEY = 'pf_ads_v1';

/* نموذج بيانات ابتدائي — يظهر إذا لم توجد إعلانات */
const SAMPLE_ADS = [
  {
    id: makeId(),
    title: "هيونداي النترا 2017",
    price: "28500",
    city: "غزة",
    category: "سيارات",
    desc: "سيارة بحالة جيدة، صيانة دورية، مرافق مضمونة.",
    phone: "0597000000",
    email: "seller@example.com",
    images: ["https://via.placeholder.com/900x600?text=هيونداي","https://via.placeholder.com/900x600?text=داخلية"]
  },
  {
    id: makeId(),
    title: "شقة للإيجار في رام الله",
    price: "2200",
    city: "رام الله",
    category: "عقارات",
    desc: "شقة غرفتين، قريبة من الخدمات، متاحة فوراً.",
    phone: "0597111111",
    email: "owner@example.com",
    images: ["https://via.placeholder.com/900x600?text=شقة"]
  }
];

/* — init / helpers — */
function loadAds(){
  try{
    let raw = localStorage.getItem(STORAGE_KEY);
    if(!raw){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_ADS));
      return SAMPLE_ADS.slice();
    }
    return JSON.parse(raw);
  }catch(e){
    console.error(e);
    return [];
  }
}
function saveAds(arr){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}
function makeId(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function getQuery(name){
  return new URLSearchParams(window.location.search).get(name);
}

/* format money */
function fmt(x){ return x ? x + " شيكل" : " حسب الاتفاق"; }

/* add ad programmatically */
function addAd(ad){
  const ads = loadAds();
  ads.unshift(ad);
  saveAds(ads);
}

/* get ad by id */
function getAdById(id){
  const ads = loadAds();
  return ads.find(a => a.id === id);
}

/* delete ad */
function deleteAd(id){
  let ads = loadAds().filter(a => a.id !== id);
  saveAds(ads);
}

/* convert phone for wa.me (Palestine) */
function phoneToWa(phone){
  // if starts with 0 -> remove leading 0 and add 970
  phone = (phone || '').trim();
  if(phone.startsWith('+')) phone = phone.slice(1);
  if(phone.startsWith('0')) phone = '970' + phone.slice(1);
  return phone;
}

/* image file to dataURL (returns Promise) */
function fileToDataUrl(file){
  return new Promise((res,rej)=>{
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.onerror = e => rej(e);
    r.readAsDataURL(file);
  });
}

/* expose useful functions to global for HTML usage */
window.app = {
  loadAds, saveAds, addAd, getAdById, deleteAd, fmt, getQuery, phoneToWa, fileToDataUrl
};