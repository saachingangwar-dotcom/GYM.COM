/* =====================================================
   IRON FORCE FITNESS – script.js
   1) EDIT CONFIG BELOW to customize for any gym client
   ===================================================== */
const CONFIG = {
  whatsapp: "919000000000",            // country code + number, no "+" or spaces
  phone: "+919000000000",
  instagram: "https://instagram.com/ironforcefitness",
  googleBusiness: "https://g.page/your-gym-profile",
  // Prices are plain numbers – edit freely
  plans: [
    { name: "Monthly", price: 999, per: "/month", feats: ["Full gym access", "Cardio & strength zones", "Locker & shower", "1 fitness assessment"] },
    { name: "Quarterly", price: 2499, per: "/3 months", feats: ["Everything in Monthly", "Group classes (Yoga, Zumba)", "Personalized workout plan", "Diet guidance"] },
    { name: "Yearly", price: 7999, per: "/year", popular: true, feats: ["Everything in Quarterly", "All classes incl. CrossFit & HIIT", "4 personal training sessions", "Free gym merchandise", "Freeze option (30 days)"] }
  ]
};

/* ---------- Images (Unsplash direct URLs; id → full URL). If any fails, a dark fallback is shown ---------- */
const U = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const IMG = {
  hero: U("1534438327276-14e5300c3a48", 1800), about1: U("1571019613454-1cb2f99b2d8b"), about2: U("1517836357463-d25dfeac3438"),
  t1: U("1567013127542-490d757e51fc", 600), t2: U("1594381898411-846e7d193883", 600), t3: U("1517838277536-f5f99be501cd", 600), t4: U("1548690312-e3b507d8c110", 600),
  p1: U("1507003211169-0a1dd7228f2d", 200), p2: U("1438761681033-6461ffad8d80", 200), p3: U("1500648767791-00dcc994a43e", 200)
};
const GALLERY = [
  ["1540497077202-7c8a3999166f", "Modern gym interior"], ["1517963879433-6ad2b056d712", "Dumbbells and weights"],
  ["1576678927484-cc907957088c", "Treadmills row"], ["1581009146145-b5ef050c2e1e", "Strength training"],
  ["1526506118085-60ce8714f8c5", "Cardio section"], ["1544367567-0f2fcb009e0b", "Yoga session"],
  ["1518611012118-696072aa579a", "Group fitness class"], ["1549060279-7e168fcee0c2", "Personal training"],
  ["1593079831268-3381b0db4a77", "Workout equipment"], ["1558611848-73f7eb4001a1", "Fitness lifestyle"],
  ["1583454110551-21f2fa2afe61", "Barbell area"], ["1605296867304-46d5465a13f1", "Free weights zone"],
  ["1521804906057-1df8fdb718b7", "Functional training"], ["1507398941214-572c25f4b1dc", "Lifting session"]
];

/* ---------- Content data ---------- */
const CLASSES = [["🧘", "Yoga", "Flexibility, balance and calm."], ["💃", "Zumba", "Dance-based cardio party."], ["🔥", "CrossFit", "Functional, high-intensity strength."],
  ["⚡", "HIIT", "Short bursts, maximum fat burn."], ["🏋️", "Strength", "Build muscle with progressive lifts."], ["🏃", "Cardio", "Boost stamina and heart health."]];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TT = [ // [time, ...6 days]
  ["6:00 AM", "Yoga", "HIIT", "Yoga", "CrossFit", "Yoga", "Zumba"],
  ["8:00 AM", "Cardio", "Strength", "Cardio", "Strength", "Cardio", "CrossFit"],
  ["5:00 PM", "CrossFit", "Zumba", "HIIT", "Zumba", "CrossFit", "Strength"],
  ["7:00 PM", "Strength", "Yoga", "Strength", "HIIT", "Zumba", "HIIT"]];
const TRAINERS = [["Rahul Sharma", "t1", "ACE Certified · Strength & Conditioning", "Muscle gain, powerlifting", "8 yrs"], ["Priya Verma", "t2", "RYT-500 Yoga · Zumba Instructor", "Yoga, weight loss", "6 yrs"],
  ["Arjun Singh", "t3", "CrossFit L2 · NASM-CPT", "CrossFit, HIIT", "7 yrs"], ["Neha Kapoor", "t4", "ISSA Nutrition & Fitness", "Fat loss, nutrition", "5 yrs"]];
const RESULTS = [["Sample Member A", "Lost 14 kg in 5 months", "Structured plan and consistency changed everything."], ["Sample Member B", "Gained 6 kg lean muscle", "My trainer's guidance made lifting safe and fun."], ["Sample Member C", "Lost 9 kg in 4 months", "Group classes kept me motivated every week."]];
const OFFERS = [["20% OFF", "New Year Membership", "Flat 20% off on yearly plans."], ["NEW", "Morning Batch", "6 AM batch starting soon – limited seats."], ["30 DAYS", "Iron Challenge", "Transformation challenge with prizes."], ["48 HRS", "Join Today Deal", "Zero joining fee this weekend only."]];
const REVIEWS = [["Amit K.", "p1", 5, "Best trainers and equipment in town. Lost 10 kg in 4 months!"], ["Sneha R.", "p2", 5, "Clean gym, friendly staff and amazing Zumba classes."], ["Vikram S.", "p3", 4, "Great value for money. The yearly plan is totally worth it."]];

/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const waLink = (text = "Hi Iron Force Fitness! I'd like to know more.") => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
const rupee = n => "₹" + n.toLocaleString("en-IN");

/* Image fallback so no broken image ever shows */
document.addEventListener("error", e => {
  if (e.target.tagName === "IMG" && !e.target.dataset.fb) {
    e.target.dataset.fb = 1;
    e.target.src = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#222"/><text x="50%" y="50%" fill="#FF5A1F" font-size="28" text-anchor="middle">IRON FORCE</text></svg>');
  }
}, true);
$$("img[data-img]").forEach(i => i.src = IMG[i.dataset.img]);

/* Wire up configurable links */
$$("[data-wa]").forEach(a => a.href = waLink());
$$("[data-call]").forEach(a => a.href = "tel:" + CONFIG.phone);
$$("[data-ig]").forEach(a => a.href = CONFIG.instagram);
$$("[data-gbp]").forEach(a => a.href = CONFIG.googleBusiness);
$("#yr").textContent = new Date().getFullYear();

/* ---------- Render sections ---------- */
$("#planGrid").innerHTML = CONFIG.plans.map(p => `
  <div class="plan reveal ${p.popular ? "pop" : ""}">${p.popular ? '<span class="badge">MOST POPULAR</span>' : ""}
    <h3>${p.name}</h3><div class="price">${rupee(p.price)}<small> ${p.per}</small></div>
    <ul>${p.feats.map(f => `<li>${f}</li>`).join("")}</ul>
    <button class="btn" onclick="startPayment('${p.name}',${p.price})">JOIN NOW</button></div>`).join("");

$("#classGrid").innerHTML = CLASSES.map(c => `<div class="cls reveal"><div class="ic">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p></div>`).join("");
$("#timetable").innerHTML = `<tr><th>Time</th>${DAYS.map(d => `<th>${d}</th>`).join("")}</tr>` + TT.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("");
$("#trainerGrid").innerHTML = TRAINERS.map(t => `<article class="trainer reveal"><img src="${IMG[t[1]]}" alt="${t[0]}, fitness trainer" loading="lazy"><div><h3>${t[0]}</h3><p>🎓 ${t[2]}</p><p>💪 ${t[3]} · ${t[4]}</p><a href="${CONFIG.instagram}" target="_blank" rel="noopener">Instagram →</a></div></article>`).join("");
$("#resultGrid").innerHTML = RESULTS.map(r => `<div class="result-card reveal"><div class="ba"><div>BEFORE</div><div>AFTER</div></div><span class="tag">SAMPLE PROFILE</span><h3>${r[1]}</h3><p>"${r[2]}"</p><p><b>– ${r[0]}</b></p></div>`).join("");
$("#galleryGrid").innerHTML = GALLERY.map((g, i) => `<figure data-i="${i}"><img src="${U(g[0], 700)}" alt="${g[1]}" loading="lazy"><figcaption>${g[1]}</figcaption></figure>`).join("");
$("#offerGrid").innerHTML = OFFERS.map(o => `<div class="offer reveal"><div class="pc">${o[0]}</div><h3>${o[1]}</h3><p>${o[2]}</p></div>`).join("");
$("#igGrid").innerHTML = GALLERY.slice(0, 8).map((g, i) => `<a class="${i % 3 == 2 ? "reel" : ""}" href="${CONFIG.instagram}" target="_blank" rel="noopener"><img src="${U(g[0], 400)}" alt="Instagram: ${g[1]}" loading="lazy"></a>`).join("");
$("#slides").innerHTML = REVIEWS.map(r => `<div class="slide"><img src="${IMG[r[1]]}" alt="${r[0]}" loading="lazy"><div class="stars">${"★".repeat(r[2])}${"☆".repeat(5 - r[2])}</div><p>"${r[3]}"</p><b>${r[0]}</b></div>`).join("");

/* ---------- Payment placeholder (NO fake success) ---------- */
function startPayment(plan, price) {
  // TODO: Integrate Razorpay/Stripe checkout here using the plan name & price.
  // Until then, route enquiries to WhatsApp.
  window.open(waLink(`Hi! I want to join the ${plan} plan (${rupee(price)}).`), "_blank");
}

/* ---------- Mobile menu ---------- */
const menu = $("#menu"), mb = $("#menuBtn");
mb.onclick = () => { const o = menu.classList.toggle("open"); mb.setAttribute("aria-expanded", o); };
menu.addEventListener("click", e => { if (e.target.tagName === "A") menu.classList.remove("open"); });

/* ---------- Scroll reveal + animated counters ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
$$(".reveal").forEach(el => io.observe(el));
const counters = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count; let n = 0;
  const t = setInterval(() => { n += Math.ceil(end / 50); if (n >= end) { n = end; clearInterval(t); } el.textContent = n.toLocaleString("en-IN"); }, 30);
  counters.unobserve(el);
}));
$$("[data-count]").forEach(el => counters.observe(el));

/* ---------- Lightbox ---------- */
let cur = 0; const lb = $("#lightbox"), lbImg = lb.querySelector("img");
const show = i => { cur = (i + GALLERY.length) % GALLERY.length; lbImg.src = U(GALLERY[cur][0], 1600); lbImg.alt = GALLERY[cur][1]; lb.hidden = false; };
$("#galleryGrid").addEventListener("click", e => { const f = e.target.closest("figure"); if (f) show(+f.dataset.i); });
$("#lbClose").onclick = () => lb.hidden = true; $("#lbPrev").onclick = () => show(cur - 1); $("#lbNext").onclick = () => show(cur + 1);
lb.addEventListener("click", e => { if (e.target === lb) lb.hidden = true; });
document.addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") lb.hidden = true; if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });

/* ---------- Testimonial slider ---------- */
let s = 0; const go = i => { s = (i + REVIEWS.length) % REVIEWS.length; $("#slides").style.transform = `translateX(-${s * 100}%)`; };
$("#prev").onclick = () => go(s - 1); $("#next").onclick = () => go(s + 1); setInterval(() => go(s + 1), 6000);

/* ---------- Free trial form: validation + WhatsApp ---------- */
const form = $("#trialForm"), dateInput = form.date;
dateInput.min = new Date().toISOString().split("T")[0]; // no past dates
form.addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form)); const err = {};
  if (!d.name.trim() || d.name.trim().length < 2) err.name = "Enter your full name";
  if (!/^[6-9]\d{9}$/.test(d.phone.replace(/\s/g, ""))) err.phone = "Enter a valid 10-digit mobile number";
  if (!d.goal) err.goal = "Select a goal";
  if (!d.date || d.date < dateInput.min) err.date = "Choose today or a future date";
  if (!d.time) err.time = "Select a time";
  form.querySelectorAll("label").forEach(l => { const f = l.querySelector("[name]").name; l.classList.toggle("err", !!err[f]); l.querySelector("small").textContent = err[f] || ""; });
  if (Object.keys(err).length) return;
  const msg = `🏋️ FREE TRIAL REQUEST\nName: ${d.name}\nPhone: ${d.phone}\nGoal: ${d.goal}\nDate: ${d.date}\nTime: ${d.time}`;
  window.open(waLink(msg), "_blank");
  $("#formMsg").textContent = "Opening WhatsApp – press Send to confirm your request.";
  form.reset();
});

/* ---------- BMI calculator ---------- */
$("#bmiForm").addEventListener("submit", e => {
  e.preventDefault(); const h = +$("#bh").value / 100, w = +$("#bw").value;
  if (!h || !w) return $("#bmiOut").textContent = "Please enter valid height and weight.";
  const b = w / (h * h), c = b < 18.5 ? "Underweight" : b < 25 ? "Normal weight" : b < 30 ? "Overweight" : "Obese";
  $("#bmiOut").textContent = `BMI: ${b.toFixed(1)} – ${c} (estimate only)`;
});

/* ---------- Calorie calculator (Mifflin-St Jeor) ---------- */
$("#calForm").addEventListener("submit", e => {
  e.preventDefault(); const a = +$("#ca").value, h = +$("#ch").value, w = +$("#cw").value;
  if (!a || !h || !w) return $("#calOut").textContent = "Please fill in all fields.";
  const bmr = 10 * w + 6.25 * h - 5 * a + ($("#cg").value === "m" ? 5 : -161), tdee = Math.round(bmr * $("#cact").value);
  $("#calOut").textContent = `≈ ${tdee} kcal/day to maintain · ~${tdee - 500} to lose · ~${tdee + 300} to gain (estimate only)`;
});
