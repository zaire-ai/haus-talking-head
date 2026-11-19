// HAUS talking-head: "Audit Call Video" v2 (cut_v2.mp4, 151.25s). Visual-led cards, no word-redundant visuals.
import * as L from "file:///C:/Users/Zaire/.claude/skills/haus-onboarding/scripts/lib.mjs";
const { W } = L;
const END = (D) => `tl.to({}, { duration: ${D} }, 0);`;
const UL = '<i class="ul"></i>';
const CSS6 = `<style>
*:not(.round):not(.cur-ring):not(#cur):not(.dev):not(.dev-scr):not(.notch):not(.ios):not(.ios *){border-radius:3px!important}
.round{border-radius:50%!important}
.wi.em{text-transform:lowercase;font-style:italic;color:#F2A579}
.ul{height:2px!important;bottom:.04em!important;background:#F2A579}
.ph{position:absolute;overflow:hidden;background:#EDE6DC}
.ph img{width:100%;height:100%;object-fit:cover;display:block}
.cap-eye{font-weight:600;font-size:17px;letter-spacing:.34em;text-transform:uppercase;color:#11120D}
.serif{font-family:Seasons;font-weight:300;letter-spacing:-.02em;line-height:1.04;white-space:nowrap;color:#11120D}
.hl{width:64px;height:1px;background:rgba(17,18,13,.55);transform-origin:left center}
.subt{font-size:27px;line-height:1.45;color:#3B3A36}
.card{background:#FAF7F2;border:1px solid rgba(17,18,13,.2)}.card .subt{white-space:normal}
svg{overflow:visible}
</style>`;
const scenes = {};
const D = 151.25;

// ======================= B-ROLL SLOTS (full-frame, opaque) =======================
const slot = (p, o) => `
  <div class="ph" id="${p}-ph" style="left:${o.px}px;top:0;width:${1920 - o.px}px;height:1080px"><img src="img/${o.img}"></div>
  ${o.logo ? `<div class="abs" id="${p}-logo" style="left:150px;top:${o.top - 96}px"><img src="logo-lilac.svg" style="width:110px;display:block"></div>` : ""}
  <div class="abs cap-eye" id="${p}-eye" style="left:${o.logo ? 150 : 130}px;top:${o.top}px">${o.eye}</div>
  <div class="abs hl" id="${p}-rule" style="left:${o.logo ? 150 : 130}px;top:${o.top + 40}px"></div>
  ${o.lines.map(([t, em], i) => `<div class="abs serif" id="${p}-t${i}" style="left:${o.logo ? 142 : 124}px;top:${o.top + 70 + i * (o.fs + 8)}px;font-size:${o.fs}px">${W([[t, em]], em ? UL : "")}</div>`).join("")}
  ${o.sub ? `<div class="abs subt" id="${p}-sub" style="left:${o.logo ? 150 : 130}px;top:${o.top + 90 + o.lines.length * (o.fs + 8)}px;width:620px">${o.sub}</div>` : ""}`;
const slotJs = (p, o, tIn = 0) => `
  tl.fromTo("#${p}-ph", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, ${tIn});
  ${o.logo ? `IN("#${p}-logo", ${tIn + .2}, { d: .8 });` : ""} IN("#${p}-eye", ${tIn + .3}, { d: .7 }); tl.from("#${p}-rule", { scaleX: 0, duration: .8, ease: "power3.inOut" }, ${tIn + .35});
  ${o.lines.map(([, em], i) => `WORDS("#${p}-t${i}", ${(tIn + .45 + i * .3).toFixed(2)}, { s: .1, d: .9 });${em ? ` tl.from("#${p}-t${i} .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, ${(tIn + 1.3 + i * .3).toFixed(2)});` : ""}`).join("\n  ")}
  ${o.sub ? `IN("#${p}-sub", ${tIn + 1.5}, { d: .9 });` : ""}`;

// slot starts (cut time): haus 75.75, audit 103.95, collective 137.4, book 147.2
const hausO = { px: 800, img: "portal_r.jpg", top: 360, fs: 96, eye: "At Evolution Haus", lines: [["we do it", 0], ["for you", 1]] };
scenes.w10_haus = { dur: 5.25, sfx: [["whoosh", 0.0, 0.05], ["mclick", 0.5, 0.1]], body: CSS6 + slot("h", hausO), js: slotJs("h", hausO) + END(5.25) };

const audO = { px: 960, img: "call_r.jpg", top: 400, fs: 112, logo: true, eye: "It starts with", lines: [["your", 0], ["evolution audit", 1]] };
scenes.w15_audit = { dur: 3.5, sfx: [["whoosh", 0.0, 0.05], ["mclick", 0.5, 0.1]], body: CSS6 + slot("a", audO), js: slotJs("a", audO) + END(3.5) };

scenes.w20_collective = {
  dur: 9.8,
  sfx: [["whoosh", 0.0, 0.05], ["mclick", 0.5, 0.1], ["mclick", 4.9, 0.1]],
  body: CSS6 + `
  <div class="ph" id="k-ph" style="left:800px;top:0;width:1120px;height:1080px"><img src="img/community_r.jpg"></div>
  <div id="g1"><div class="abs cap-eye" id="g1-e" style="left:130px;top:370px">Not sure yet?</div>
  <div class="abs hl" id="g1-r" style="left:130px;top:410px"></div>
  <div class="abs serif" id="g1-t0" style="left:124px;top:440px;font-size:96px">${W([["still working out", 0]])}</div>
  <div class="abs serif" id="g1-t1" style="left:124px;top:542px;font-size:96px">${W([["what to", 0], ["sell?", 1]], UL)}</div></div>
  <div id="g2"><div class="abs cap-eye" id="g2-e" style="left:130px;top:370px">Our free community</div>
  <div class="abs hl" id="g2-r" style="left:130px;top:410px"></div>
  <div class="abs serif" id="g2-t0" style="left:124px;top:440px;font-size:96px">${W([["join the", 0]])}</div>
  <div class="abs serif" id="g2-t1" style="left:124px;top:542px;font-size:96px">${W([["evolve", 1], ["Collective", 0]], UL)}</div></div>`,
  js: `
  tl.fromTo("#k-ph", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, 0);
  IN("#g1-e", .3, { d: .7 }); tl.from("#g1-r", { scaleX: 0, duration: .8, ease: "power3.inOut" }, .35);
  WORDS("#g1-t0", .45, { s: .1, d: .9 }); WORDS("#g1-t1", .8, { s: .1, d: .9 }); tl.from("#g1-t1 .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, 1.5);
  OUT("#g1", 4.2, .5);
  IN("#g2-e", 4.7, { d: .7 }); tl.from("#g2-r", { scaleX: 0, duration: .8, ease: "power3.inOut" }, 4.75);
  WORDS("#g2-t0", 4.85, { s: .1, d: .9 }); WORDS("#g2-t1", 5.15, { s: .1, d: .9 }); tl.from("#g2-t1 .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, 5.9);
  ` + END(9.8),
};

const bookO = { px: 960, img: "outro.jpg", top: 380, fs: 112, logo: true, eye: "Pick a time below", lines: [["booked out", 0], ["& logged off", 1]] };
scenes.w30_book = { dur: 4.05, sfx: [["whoosh", 0.0, 0.05], ["mclick", 0.5, 0.1]], body: CSS6 + slot("b", bookO), js: slotJs("b", bookO) + END(4.05) };

// ======================= OVERLAY (transparent) =======================
let html = "", js = "", sfx = [];
const click = (t, v = 0.09) => sfx.push(["mclick", +t.toFixed(2), v]);
const ping = (t, v = 0.045) => sfx.push(["ping", +t.toFixed(2), v]);

const HEAD = {
  vA: [["stop", 0], ["losing", 1], ["leads", 0]],
  vS1: [["a week", 0], ["offline", 1]], vS2: [["left on", 0], ["read", 1]],
  vC1: [["still", 1], ["working", 0]], vC2: [["ready, and", 0], ["waiting", 1]],
  vC3: [["a client you'll", 0], ["never", 1], ["help", 0]], vC4: [["hours of", 0], ["admin", 1]],
  vD1: [["tried", 0], ["everything", 1]], vD2: [["beautiful,", 0], ["but", 0], ["lost", 1]], vD3: [["left on your", 0], ["own", 1]],
  vB: [["we build it", 0], ["all", 1]], vL: [["live in", 0], ["21", 1], ["working days", 0]], vP: [["your", 0], ["superpower", 1]],
  vU: [["one call,", 0], ["with", 0], ["me", 1]], vJ: [["your business,", 0], ["mapped", 1]], vFM: [["your", 0], ["freedom", 1], ["map", 0]], vY: [["this is for", 0], ["you", 1], ["if", 0]],
};
const VC = (id, eyebrow, inner) => `<div class="abs" id="${id}" style="left:120px;top:150px;width:900px;z-index:3">
  <div class="cap-eye" id="${id}-e" style="font-size:22px">${eyebrow}</div><div class="hl" id="${id}-r" style="margin:18px 0 22px;width:90px;height:2px"></div>
  <div class="serif" id="${id}-h" style="font-size:112px;line-height:1.02;white-space:normal;max-width:900px">${W(HEAD[id], UL)}</div>
  <div style="margin-top:40px;zoom:1.6;max-width:560px">${inner}</div></div>`;
// split segments. Rule: no short gaps (they flash). Segments that touch a B-roll slot run 0.45s under it
// (slots sit ABOVE this overlay in CapCut), so split -> slot -> split never shows bare footage.
const SEGS = [[2.9, 7.2], [11.1, 23.7], [28.2, 76.65], [87.6, 104.85], [106.55, 121.9]];
SEGS.forEach(([a, b], i) => {
  html += `<div class="abs" id="sp${i}" style="left:0;top:0;width:1920px;height:1080px;z-index:1">
    <div style="position:absolute;left:0;top:0;width:1920px;height:80px;background:#FAF7F2"></div><div style="position:absolute;left:0;top:1000px;width:1920px;height:80px;background:#FAF7F2"></div><div style="position:absolute;left:0;top:80px;width:1100px;height:920px;background:#FAF7F2"></div><div style="position:absolute;left:1800px;top:80px;width:120px;height:920px;background:#FAF7F2"></div>
    <div style="position:absolute;left:1100px;top:80px;width:700px;height:920px;overflow:hidden;background:transparent;outline:1px solid rgba(17,18,13,.14)"></div>
  </div>`;
  js += `IN("#sp${i}", ${a}, { d: .4 }); OUT("#sp${i}", ${(b - .4).toFixed(2)}, .4);\n`;
  sfx.push(["whoosh", a, 0.045]);
});
const lab = (t, c = "#3B3A36") => `<div style="font-size:15px;font-weight:600;letter-spacing:.2em;color:${c};text-transform:uppercase">${t}</div>`;
const bar = (id, c) => `<div style="margin:10px 0 20px;height:10px;background:rgba(17,18,13,.13)"><div id="${id}" style="height:10px;background:${c};transform-origin:left center"></div></div>`;
const vin = (id, s, e) => { js += `IN("#${id}", ${s}, { d: .45 }); IN("#${id}-e", ${(s + .1).toFixed(2)}, { d: .6 }); WORDS("#${id}-h", ${(s + .2).toFixed(2)}, { s: .08, d: .8 }); tl.from("#${id}-h .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, ${(s + .8).toFixed(2)}); tl.from("#${id}-r", { scaleX: 0, duration: .8, ease: "power3.inOut" }, ${(s + .15).toFixed(2)}); OUT("#${id}", ${(e - .5).toFixed(2)}, .5);\n`; click(s, .07); };
const counter = (sel, from, to, t, d, suf = "") => `{ const o = { v: ${from} }; tl.to(o, { v: ${to}, duration: ${d}, ease: "power2.inOut", onUpdate: () => { document.querySelector("${sel}").textContent = Math.round(o.v) + "${suf}"; } }, ${t}); }\n`;
const draw = (sel, t, d = 1) => `tl.fromTo("${sel}", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: ${d}, ease: "power2.inOut", immediateRender: true }, ${t});\n`;
const chkIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#11120D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const row = (id, t) => `<div id="${id}" style="display:flex;align-items:center;gap:12px;margin-bottom:12px;font-size:17px;color:#11120D"><span style="flex:none;width:28px;height:28px;background:#D8C2EC;display:grid;place-items:center">${chkIcon}</span>${t}</div>`;
const ic = (p, s = 22, c = "#11120D") => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const I = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>',
  funnel: '<path d="M3 5h18l-7 8v6l-4-2v-4z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
  bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  back: '<path d="M9 7L4 12l5 5"/><path d="M4 12h11a5 5 0 0 1 0 10h-2"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="1"/><path d="M4 16V4h12"/>',
};

// ---- 1 · hook 2.9-7.2
const inq = [["st_w12.jpg", "New inquiry"], ["st_w44.jpg", "Asked about your offer"], ["st_w90.jpg", "Wants to book a call"]];
html += VC("vA", "What you really need", `${lab("Inquiries waiting")}<div style="margin-top:12px">${inq.map(([img, t], i) => `<div id="vA-i${i}" style="display:flex;align-items:center;gap:12px;margin-bottom:10px;padding:8px 12px;border:1px solid rgba(17,18,13,.2);background:#FFFDF9"><img class="round" src="img/${img}" style="width:34px;height:34px;object-fit:cover"><span style="flex:1;font-size:15px">${t}</span><span id="vA-q${i}" style="font-size:12px;font-weight:600;letter-spacing:.16em;color:#F2A579;text-transform:uppercase;opacity:0">gone quiet</span></div>`).join("")}</div>`);
vin("vA", 2.9, 7.2);
js += inq.map((_, i) => `IN("#vA-i${i}", ${(3.4 + i * .3).toFixed(2)}, { d: .4 });`).join(" ") + `
tl.to("#vA-q1", { opacity: 1, duration: .3 }, 5.4); tl.to("#vA-i1", { opacity: .4, duration: .4 }, 5.5); tl.to("#vA-q2", { opacity: 1, duration: .3 }, 6.0); tl.to("#vA-i2", { opacity: .4, duration: .4 }, 6.1);\n`;
click(5.4, .06); click(6.0, .06);

// ---- 2 · a week away 11.1-23.7
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
html += VC("vS1", "If you stepped away", `<div style="display:flex;gap:8px">${days.map((d, i) => `<div id="vsd${i}" style="flex:1;height:84px;border:1px solid rgba(17,18,13,.2);background:#FFFDF9;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:15px;color:#11120D"><span>${d}</span><span style="font-family:Seasons;font-style:italic;font-size:17px;margin-top:6px;color:#F2A579">away</span></div>`).join("")}</div>
  <div style="margin-top:16px;display:flex;align-items:baseline;gap:12px"><span class="serif" id="vS1-n" style="font-size:64px">0</span><span style="display:flex;gap:6px;align-items:center">${ic(I.mail, 22, "#3B3A36")}${ic(I.chat, 22, "#3B3A36")}</span></div>`);
vin("vS1", 11.1, 16.1);
js += days.map((_, i) => `tl.from("#vsd${i}", { opacity: 0, y: 14, duration: .35, ease: "power2.out" }, ${(11.5 + i * .25).toFixed(2)});`).join(" ") + "\n" + counter("#vS1-n", 0, 7, 14.5, 1.4);
click(14.5, .05);
html += VC("vS2", "The woman in your DMs", `<div style="display:flex;justify-content:flex-start"><div id="vS2-b" style="padding:10px 16px;background:#E9E9EB;font-size:17px;color:#000;border-radius:18px!important">let me think about it</div></div>
  <div id="vS2-s" style="margin:6px 0 0 8px;font-size:13px;color:#8E8E93">Seen</div>
  <div style="margin-top:22px;display:flex;align-items:baseline;gap:12px"><span class="serif" id="vS2-n" style="font-size:64px">0</span><span style="font-size:17px;color:#3B3A36">days, no reply</span></div>`);
vin("vS2", 16.2, 23.7);
js += `IN("#vS2-b", 17.76, { d: .5 }); IN("#vS2-s", 18.6, { d: .4 });\n` + counter("#vS2-n", 0, 7, 18.8, 1.9);
click(17.76, .06); ping(18.8);

// ---- real results 25.2-28.1 (no split) · floating glass widgets: her clients on the left, their results on the right
const avR = ["st_w65.jpg", "st_w32.jpg", "st_w79.jpg", "st_w47.jpg"];
const GW0 = (id, x, y, w, inner) => `<div class="abs" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;padding:18px 20px;background:rgba(250,247,242,.78);border:1px solid rgba(255,255,255,.9);outline:1px solid rgba(17,18,13,.08);z-index:4;color:#11120D">${inner}</div>`;
html += GW0("gR1", 150, 300, 380, `<div style="font-size:14px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#6b665f">Her clients</div><div style="display:flex;align-items:center;margin-top:12px">${avR.map((m, i) => `<img class="round" src="img/${m}" style="width:58px;height:58px;object-fit:cover;margin-left:${i ? -14 : 0}px;border:2px solid #FAF7F2">`).join("")}<span style="margin-left:14px;font-size:22px;font-weight:600">+120</span></div>`);
html += GW0("gR2", 1330, 250, 440, `<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#6b665f">Client results</span><span style="padding:5px 12px;background:#D8C2EC;font-size:15px;font-weight:600">Real results</span></div>
  <svg width="400" height="150" viewBox="0 0 400 150" style="display:block;margin-top:14px"><path d="M0 149H400" stroke="rgba(17,18,13,.2)" stroke-width="1.5"/><path id="gR-f" d="M0 132 C50 128 80 118 120 110 S200 98 235 76 S320 42 400 12 L400 149 L0 149Z" fill="#D8C2EC" opacity=".4"/><path id="gR-l" pathLength="1" stroke-dasharray="1" d="M0 132 C50 128 80 118 120 110 S200 98 235 76 S320 42 400 12" stroke="#11120D" stroke-width="2.5" fill="none"/><circle id="gR-d" cx="400" cy="12" r="7" fill="#F2A579"/></svg>`);
js += `tl.from("#gR1", { opacity: 0, y: 26, x: -20, duration: .6, ease: "power3.out" }, 25.3); OUT("#gR1", 27.65, .45); tl.from("#gR2", { opacity: 0, y: 26, x: 20, duration: .6, ease: "power3.out" }, 26.0); OUT("#gR2", 27.65, .45);\n` + draw("#gR-l", 26.3, 1.3) + `tl.from("#gR-f", { opacity: 0, duration: .7 }, 26.8); IN("#gR-d", 27.4, { d: .3 });\n`;
sfx.push(["whoosh", 25.2, 0.04]); click(25.3, .06); click(26.0, .05); ping(27.4);

// ---- 3 · behind the scenes 28.2-76.2 (one continuous split)
const notifs = [[I.mail, "New inquiry", "9:02 PM", 29.9], [I.copy, "Copy details across", "9:14 PM", 32.4], [I.chat, "Reply to DMs", "9:31 PM", 33.5]];
html += VC("vC1", "Behind the scenes", `<div style="display:flex;justify-content:flex-end;margin:-6px 0 10px" id="vC1-m">${ic(I.moon, 26, "#F2A579")}</div>
  ${notifs.map(([icn, t, tm], i) => `<div id="vC1-n${i}" class="card" style="display:flex;align-items:center;gap:14px;margin-bottom:10px;padding:12px 16px;background:#FFFDF9"><span style="flex:none;width:38px;height:38px;background:#D8C2EC;display:grid;place-items:center">${ic(icn, 20)}</span><span style="flex:1;font-size:17px;color:#11120D">${t}</span><span style="font-size:14px;color:#8E8E93">${tm}</span></div>`).join("")}`);
vin("vC1", 28.3, 35.0);
js += `IN("#vC1-m", 29.0, { d: .5 }); ` + notifs.map(([, , , t], i) => `IN("#vC1-n${i}", ${t}, { d: .4 });`).join(" ") + "\n";
notifs.forEach(([, , , t]) => ping(t, .04));
html += VC("vC2", "The course you meant to launch", `${lab("Course · ready")}${bar("vC2-b", "#D8C2EC")}
  <div style="display:flex;align-items:baseline;gap:12px"><span class="serif" id="vC2-n" style="font-size:72px">0</span><span style="font-size:17px;color:#3B3A36">months</span></div>
  <div style="margin-top:14px;display:flex;gap:8px">${[0, 1, 2, 3, 4, 5].map((i) => `<span id="vC2-m${i}" style="flex:1;height:34px;border:1px solid rgba(17,18,13,.25);background:#FFFDF9"></span>`).join("")}</div>`);
vin("vC2", 35.1, 40.5);
js += `tl.from("#vC2-b", { scaleX: 0, duration: 1.0, ease: "power2.out" }, 35.6);\n` + counter("#vC2-n", 0, 6, 37.6, 2.2) + [0, 1, 2, 3, 4, 5].map((i) => `tl.to("#vC2-m${i}", { backgroundColor: "#D8C2EC", duration: .25 }, ${(37.7 + i * .37).toFixed(2)});`).join(" ") + "\n";
click(35.6, .05); ping(37.6);
const quiet = ["st_w12.jpg", "st_w21.jpg", "st_w32.jpg", "st_w44.jpg", "st_w57.jpg", "st_w65.jpg", "st_w68.jpg", "st_w79.jpg"];
html += VC("vC3", "Every lead that goes quiet", `<div style="display:flex">${quiet.map((img, i) => `<img class="round" id="vC3-a${i}" src="img/${img}" style="width:54px;height:54px;margin-left:${i ? -10 : 0}px;border:3px solid #FAF7F2;object-fit:cover">`).join("")}</div>
  <div style="margin-top:20px;display:flex;align-items:baseline;gap:12px"><span class="serif" id="vC3-n" style="font-size:64px">0</span><span style="font-size:17px;color:#3B3A36">went quiet</span></div>`);
vin("vC3", 40.6, 44.3);
js += quiet.map((_, i) => `IN("#vC3-a${i}", ${(40.9 + i * .08).toFixed(2)}, { d: .3 });`).join(" ") + "\n" + [0, 1, 2, 3, 4].map((i) => `tl.to("#vC3-a${7 - i}", { filter: "grayscale(1)", opacity: .3, duration: .4 }, ${(41.9 + i * .4).toFixed(2)});`).join(" ") + "\n" + counter("#vC3-n", 0, 5, 41.9, 1.8);
click(41.9, .05);
html += VC("vC4", "Every hour on admin", `${lab("Your week")}
  <div style="margin:10px 0 8px;height:26px;display:flex;background:rgba(17,18,13,.1)"><div id="vC4-a" style="height:26px;width:20%;background:#F2A579"></div><div style="height:26px;flex:1;background:#D8C2EC"></div></div>
  <div style="display:flex;justify-content:space-between;font-size:15px;color:#3B3A36"><span>Admin · <b id="vC4-n" style="font-weight:600;color:#11120D">8h</b></span><span>The work you love</span></div>`);
vin("vC4", 44.4, 50.6);
js += `tl.fromTo("#vC4-a", { width: "20%" }, { width: "68%", duration: 3.0, ease: "power2.inOut", immediateRender: false }, 45.0);\n` + counter("#vC4-n", 8, 27, 45.0, 3.0, "h");
click(45.0, .05);

// ---- realistic UI kit (no cartoon shapes): browser chrome, real photos, dense small type
const SYSF = `font-family:-apple-system,'SF Pro Text','Segoe UI','Helvetica Neue',Arial,sans-serif`;
const win = (id, x, y, w, h, url, inner) => `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:#fff;border:1px solid #DCD6CC;box-shadow:0 12px 32px rgba(17,18,13,.14);overflow:hidden;${SYSF};color:#1d1d1f">
  <div style="height:20px;background:#F3F1EE;border-bottom:1px solid #E4DFD7;display:flex;align-items:center;gap:5px;padding:0 8px"><span class="round" style="width:7px;height:7px;background:#FF5F57"></span><span class="round" style="width:7px;height:7px;background:#FEBC2E"></span><span class="round" style="width:7px;height:7px;background:#28C840"></span><span style="margin-left:8px;flex:1;height:12px;background:#fff;border:1px solid #E4DFD7;font-size:7px;color:#8a8580;line-height:11px;padding-left:6px">${url}</span></div>${inner}</div>`;
const tx = (w, c = "#E6E2DC", h = 5, mt = 5) => `<div style="height:${h}px;width:${w}%;background:${c};margin-top:${mt}px"></div>`;

// tried everything: three real-looking products stacked on top of each other, then dimmed
const w1 = `<div style="display:flex;height:170px"><div style="width:70px;border-right:1px solid #EEE;padding:8px 6px;font-size:7.5px;color:#555;line-height:2.1"><b style="font-size:7px;color:#999;letter-spacing:.08em">BLOCKS</b><br>Headline<br>Image<br>Video<br>Button<br>Opt-in form<br>Countdown</div>
  <div style="flex:1;padding:8px;background:#FAFAF9"><div style="height:62px;background:url(img/woman.jpg) center/cover"></div><div style="font-size:11px;font-weight:700;margin-top:7px">Join my 6-week program</div>${tx(80)}${tx(60)}<div style="margin-top:8px;width:70px;height:16px;background:#1d1d1f;color:#fff;font-size:7px;display:grid;place-items:center">Get started</div></div></div>`;
const w2 = `<div style="display:flex;height:170px;background:#111"><div style="flex:1;position:relative;background:url(img/lunch.jpg) center/cover"><span class="round" style="position:absolute;left:50%;top:42%;width:30px;height:30px;margin:-15px 0 0 -15px;background:rgba(255,255,255,.9);display:grid;place-items:center"><svg width="10" height="12" viewBox="0 0 10 12"><path d="M0 0l10 6-10 6z" fill="#111"/></svg></span><div style="position:absolute;left:8px;right:8px;bottom:8px;height:3px;background:rgba(255,255,255,.35)"><div style="width:28%;height:3px;background:#fff"></div></div></div>
  <div style="width:96px;background:#fff;padding:7px;font-size:7px;line-height:1.5;color:#333"><b style="font-size:7.5px">Course content</b>${["Welcome · 4:12", "Find your niche · 18:40", "Build the funnel · 32:05", "Write emails · 21:17", "Launch week · 27:30"].map((m, i) => `<div style="margin-top:5px;padding-bottom:4px;border-bottom:1px solid #EEE;color:${i ? "#777" : "#111"}">${i + 1}. ${m}</div>`).join("")}</div></div>`;
const w3 = `<div style="display:flex;height:160px"><div style="width:76px;background:#1F2433;color:#C9CCD6;padding:8px 7px;font-size:7.5px;line-height:2.1">${["Dashboard", "Contacts", "Pipelines", "Automations", "Calendars", "Payments", "Sites", "Reporting"].map((m, i) => `<div style="${i === 0 ? "color:#fff;font-weight:600" : ""}">${m}</div>`).join("")}</div>
  <div style="flex:1;padding:9px;background:#F6F7F9"><div style="padding:6px 8px;background:#FFF4E5;border:1px solid #F5D9A8;font-size:7.5px;color:#7A4B00">Finish setting up your account · <b>2 of 27</b> steps</div>
  <div style="display:flex;gap:6px;margin-top:8px">${[["Contacts", "0"], ["Opportunities", "0"], ["Revenue", "$0"]].map(([k, v]) => `<div style="flex:1;background:#fff;border:1px solid #E3E5EA;padding:6px"><div style="font-size:6.5px;color:#888">${k}</div><div style="font-size:14px;font-weight:700;margin-top:2px">${v}</div></div>`).join("")}</div>
  <div style="margin-top:8px;background:#fff;border:1px solid #E3E5EA;height:44px;padding:6px">${tx(40, "#E3E5EA")}${tx(90, "#F0F1F4")}${tx(70, "#F0F1F4")}</div></div></div>`;
const tiles = [["vD1-t0", 0, 0, 300, 190, "pagecraft.app/editor/new-funnel", w1, 54.0], ["vD1-t1", 130, 44, 300, 190, "learn.coursehub.io/course/launch", w2, 54.9], ["vD1-t2", 260, 88, 300, 180, "app.allinone.co/dashboard", w3, 57.1]];
html += VC("vD1", "You've probably tried", `<div style="position:relative;width:560px;height:270px">${tiles.map(([id, x, y, w, h, u, inner]) => win(id, x, y, w, h, u, inner)).join("")}</div>`);
vin("vD1", 50.7, 59.5);
js += tiles.map(([id, , , , , , , t]) => `tl.from("#${id}", { opacity: 0, y: 24, duration: .55, ease: "power3.out" }, ${t});`).join(" ") + ` tl.to(["#vD1-t0","#vD1-t1","#vD1-t2"], { opacity: .4, filter: "grayscale(1)", duration: .6 }, 58.4);\n`;
tiles.forEach(([, , , , , , , t]) => click(t, .06));

// Wendy: a real MacBook. Gorgeous dashboard -> setup dialogs pile up -> she's back in an old spreadsheet
const S = 540 / 1040, SX = 121 * S, SY = 78 * S;
const dlg = [["Connect your domain", "Add these DNS records at your registrar, then verify.", 250, 70], ["Automation trigger", "Choose an event, filters and a wait step.", 330, 140], ["Pipeline stages", "Map each stage to a custom field and tag.", 190, 190], ["Integrations", "0 of 12 connected · API key required", 380, 230], ["Custom fields", "Create a field, then map it in every form.", 230, 290]];
const scrA = `<div style="position:absolute;inset:0;background:#FBF8F4;${SYSF};color:#1d1d1f">
  <div style="position:absolute;left:0;top:0;bottom:0;width:150px;background:#F1E9F6;padding:16px 14px;font-size:12px;line-height:2.4;color:#5a5560"><div style="font-family:Seasons;font-size:20px;color:#11120D;margin-bottom:8px">Bloom</div>Home<br>Clients<br>Bookings<br>Courses<br>Payments<br>Settings</div>
  <div style="position:absolute;left:170px;top:16px;right:18px;height:120px;background:url(img/woman.jpg) center 30%/cover"></div>
  <div style="position:absolute;left:170px;top:150px;right:18px;display:flex;gap:12px">${[["Clients", "—"], ["Bookings", "—"], ["Revenue", "—"]].map(([k, v]) => `<div style="flex:1;background:#fff;border:1px solid #EAE3DA;padding:12px"><div style="font-size:11px;color:#8a8580">${k}</div><div style="font-size:24px;font-weight:600;margin-top:4px">${v}</div></div>`).join("")}</div>
  <div style="position:absolute;left:170px;top:240px;right:18px;bottom:18px;background:#fff;border:1px solid #EAE3DA;padding:14px">${tx(30, "#E6DDEE", 8, 0)}${tx(85, "#F1ECE6", 7, 12)}${tx(70, "#F1ECE6", 7, 10)}${tx(78, "#F1ECE6", 7, 10)}</div>
  ${dlg.map(([t, d, x, y], i) => `<div id="vD2-p${i}" style="position:absolute;left:${x}px;top:${y}px;width:300px;background:#fff;border:1px solid #DDD6CC;box-shadow:0 14px 40px rgba(0,0,0,.18);padding:14px 16px">
    <div style="font-size:14px;font-weight:600">${t}</div><div style="font-size:11px;color:#6b665f;margin-top:5px;line-height:1.4">${d}</div>
    <div style="display:flex;gap:6px;margin-top:9px">${tx(100, "#F1EEEA", 22, 0)}</div>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px;font-size:11px"><span style="padding:5px 10px;border:1px solid #DDD">Cancel</span><span style="padding:5px 10px;background:#1d1d1f;color:#fff">Continue</span></div></div>`).join("")}</div>`;
const rows = [["Sarah M.", "sarah.m@gmail.com", "0412 555 208", "Paid", "follow up re: May"], ["Jess T.", "jess.t@outlook.com", "0433 555 761", "—", "sent invoice?"], ["Amy K.", "amy.k@gmail.com", "0401 555 392", "Paid", ""], ["Priya R.", "priya@icloud.com", "0422 555 117", "—", "call back Thurs"], ["Leah W.", "leahw@gmail.com", "0455 555 840", "Paid", "wants package 2"], ["Mia C.", "mia.c@yahoo.com", "0419 555 603", "—", ""], ["Grace H.", "grace.h@gmail.com", "0447 555 925", "Paid", "referral from Amy"]];
const scrB = `<div id="vD2-s" style="position:absolute;inset:0;background:#fff;${SYSF};color:#111">
  <div style="height:34px;background:#217346;color:#fff;font-size:13px;display:flex;align-items:center;padding-left:14px;font-weight:600">Clients_2019_FINAL (3).xlsx</div>
  <div style="height:22px;background:#F3F3F3;border-bottom:1px solid #D6D6D6;font-size:11px;display:flex;align-items:center;padding-left:14px;color:#555">File &nbsp; Home &nbsp; Insert &nbsp; Formulas &nbsp; Data</div>
  <table style="border-collapse:collapse;font-size:11.5px;width:100%"><tr>${["", "A · Name", "B · Email", "C · Phone", "D · Paid?", "E · Notes"].map((h) => `<td style="border:1px solid #DADADA;background:#F7F7F7;padding:5px 7px;color:#555">${h}</td>`).join("")}</tr>
  ${rows.map((r, i) => `<tr><td style="border:1px solid #DADADA;background:#F7F7F7;padding:6px 7px;color:#777">${i + 2}</td>${r.map((c) => `<td style="border:1px solid #E2E2E2;padding:6px 7px;white-space:nowrap">${c}</td>`).join("")}</tr>`).join("")}</table></div>`;
html += VC("vD2", "My client Wendy", `<div style="position:relative;width:540px;height:351px"><img src="img/macbook.png" style="width:540px;display:block">
  <div style="position:absolute;left:${SX.toFixed(1)}px;top:${SY.toFixed(1)}px;width:797px;height:518px;transform:scale(${S.toFixed(4)});transform-origin:0 0;overflow:hidden">${scrA}${scrB}</div>
  <div class="notch" style="position:absolute;left:${(461 * S).toFixed(1)}px;top:${(76 * S).toFixed(1)}px;width:${(118 * S).toFixed(1)}px;height:${(20 * S).toFixed(1)}px;background:#0B0B0D;border-radius:0 0 5px 5px"></div></div>`);
vin("vD2", 59.6, 70.9);
js += dlg.map((_, i) => `tl.from("#vD2-p${i}", { opacity: 0, y: 10, duration: .3, ease: "power2.out" }, ${(65.5 + i * .28).toFixed(2)});`).join(" ") + ` tl.from("#vD2-s", { opacity: 0, duration: .5 }, 69.0);\n`;
dlg.forEach((_, i) => click(65.5 + i * .28, .04)); click(69.0, .07);

// left on your own: a real "getting started" screen stuck at 0%, and support that replies in days
const steps = ["Connect your domain", "Build your first funnel", "Set up email sending", "Create your automations", "Import your contacts", "Connect payments"];
html += VC("vD3", "Handed amazing tools", `<div style="position:relative;width:560px;height:270px">${win("vD3-w", 0, 0, 470, 262, "app.allinone.co/onboarding", `<div style="padding:12px 16px">
  <div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:13px">Getting started</b><span style="font-size:9px;color:#888"><b style="color:#111">0</b> of 14 complete</span></div>
  <div style="height:5px;background:#EEE;margin:8px 0 10px"></div>
  ${steps.map((s, i) => `<div id="vD3-r${i}" style="display:flex;align-items:center;gap:9px;padding:6px 0;border-bottom:1px solid #F0F0F0;font-size:10px"><span class="round" style="width:13px;height:13px;border:1.5px solid #C9C9C9"></span><span style="flex:1">${s}</span><span style="font-size:8px;color:#999">Watch tutorial · ${[12, 34, 18, 41, 9, 22][i]} min</span></div>`).join("")}</div>`)}
  <div id="vD3-c" style="position:absolute;left:300px;top:150px;width:250px;background:#fff;border:1px solid #DCD6CC;box-shadow:0 12px 32px rgba(17,18,13,.16);padding:12px 14px;${SYSF}">
    <div style="display:flex;align-items:center;gap:8px"><b style="font-size:11px">Support</b><span class="round" style="width:7px;height:7px;background:#C9C9C9;margin-left:auto"></span><span style="font-size:8px;color:#999">Offline</span></div>
    <div style="margin-top:8px;font-size:9.5px;color:#555;line-height:1.4">Thanks for reaching out! We typically reply in <b>3–5 business days</b>.</div></div></div>`);
vin("vD3", 71.0, 76.65);
js += `tl.from("#vD3-w", { opacity: 0, y: 20, duration: .55, ease: "power3.out" }, 71.3); ` + steps.map((_, i) => `IN("#vD3-r${i}", ${(71.7 + i * .12).toFixed(2)}, { d: .3 });`).join(" ") + ` tl.from("#vD3-c", { opacity: 0, y: 14, duration: .45, ease: "power3.out" }, 74.2);\n`;
click(71.3, .06); ping(74.2);

// ---- side pop-up cards on the full-frame shot (no split), same style as the "real results" card
// left column only (right edge <= 660px), cream card + thin border, no shadow (transparent overlay)
const PC = (id, top, w, inner, side = "left") => `<div class="abs card" id="${id}" style="left:${side === "right" ? 1920 - 50 - w - 68 : 120}px;top:${top}px;width:${w}px;padding:30px 34px;background:#FAF7F2;z-index:4">${inner}</div>`;
const pin = (id, s, e) => { js += `IN("#${id}", ${s}, { d: .5 }); OUT("#${id}", ${(e - .45).toFixed(2)}, .45);\n`; sfx.push(["whoosh", +s.toFixed(2), 0.04]); };
const prow = (id, t) => `<div id="${id}" style="display:flex;align-items:center;gap:14px;margin-top:14px;font-size:24px;color:#11120D"><span style="flex:none;width:34px;height:34px;background:#D8C2EC;display:grid;place-items:center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#11120D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>${t}</div>`;
const peye = (t) => `<div class="cap-eye" style="font-size:15px">${t}</div><div class="hl" style="margin:12px 0 4px;width:60px"></div>`;

// ---- floating glass widgets around her (reference: floating frosted UI widgets), on brand: cream glass, 3px, no shadow
const GW = (id, x, y, w, inner) => `<div class="abs" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;padding:18px 20px;background:rgba(250,247,242,.78);border:1px solid rgba(255,255,255,.9);outline:1px solid rgba(17,18,13,.08);z-index:4;${SYSF};color:#11120D">${inner}</div>`;
const gl = (t) => `<div style="font-size:14px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#6b665f">${t}</div>`;
const gin = (id, t, e, dx = 0) => { js += `tl.from("#${id}", { opacity: 0, y: 26, x: ${dx}, duration: .6, ease: "power3.out" }, ${t}); OUT("#${id}", ${(e - .45).toFixed(2)}, .45);\n`; click(t, .05); };
const pill = (t, bg = "#D8C2EC") => `<span style="display:inline-flex;align-items:center;gap:7px;padding:5px 12px;background:${bg};font-size:15px;font-weight:600"><span class="round" style="width:8px;height:8px;background:#11120D;display:inline-block"></span>${t}</span>`;
const sw = `<span style="position:relative;display:inline-block;width:46px;height:26px;background:#D8C2EC;border-radius:13px!important"><span class="round" style="position:absolute;right:3px;top:3px;width:20px;height:20px;background:#fff"></span></span>`;

// we build it all 80.9-87.9 · website, offers, emails, follow-up as live widgets on both sides of her
html += GW("gB1", 130, 190, 400, `<div style="display:flex;justify-content:space-between;align-items:center">${gl("Your website")}${pill("Live")}</div>
  <div style="margin-top:12px;height:150px;background:url(img/woman.jpg) center 30%/cover"></div>
  <div style="margin-top:10px;font-size:20px;font-family:Seasons">yourname.com</div>`);
html += GW("gB2", 200, 600, 380, `${gl("Your offer")}<div style="display:flex;gap:14px;align-items:center;margin-top:10px"><div style="width:74px;height:74px;flex:none;background:url(img/magic.jpg) center/cover"></div><div><div class="serif" style="font-size:28px">Signature Program</div><div style="font-size:18px;margin-top:4px"><b>$1,497</b> · 8 weeks</div></div></div>`);
html += GW("gB3", 1340, 200, 430, `<div style="display:flex;justify-content:space-between;align-items:center">${gl("Emails")}<span style="font-size:15px;color:#6b665f">5 scheduled</span></div>
  ${["Welcome to the program", "Your first week", "A quick check-in"].map((t, i) => `<div style="display:flex;align-items:center;gap:10px;margin-top:10px;font-size:18px">${ic(I.mail, 20)}<span style="flex:1">${t}</span><span style="font-size:14px;color:#8a8580">Day ${[0, 3, 7][i]}</span></div>`).join("")}`);
html += GW("gB4", 1400, 560, 360, `<div style="display:flex;justify-content:space-between;align-items:center">${gl("Follow-up")}${sw}</div><div style="margin-top:10px;font-size:20px">Every enquiry answered</div><div style="font-size:16px;color:#6b665f;margin-top:4px">Automated · within 5 minutes</div>`);
html += GW("gB5", 1360, 790, 380, `<div style="display:flex;align-items:center;gap:12px;font-size:19px"><span style="width:30px;height:30px;background:#D8C2EC;display:grid;place-items:center">${chkIcon}</span>Every word, written for you</div>`);
gin("gB1", 81.6, 87.9, -20); gin("gB2", 82.62, 87.9, -20); gin("gB3", 83.62, 87.9, 20); gin("gB4", 84.5, 87.9, 20); gin("gB5", 85.4, 87.9, 20);
sfx.push(["whoosh", 81.5, 0.035]);

html += VC("vL", "Live, ready to go", `<div style="display:flex;align-items:baseline;justify-content:space-between">${lab("Working days")}<span class="serif" id="vL-n" style="font-size:76px">0</span></div>${bar("vL-b", "#D8C2EC")}
  <div id="vL-s" class="card" style="padding:10px 18px;display:inline-flex;gap:12px;align-items:center;font-size:17px"><span class="round" style="width:12px;height:12px;background:#F2A579;display:inline-block"></span>Then we stay with you</div>`);
vin("vL", 88.0, 93.8);
js += `tl.from("#vL-b", { scaleX: 0, duration: 1.8, ease: "power2.inOut" }, 88.0);\n` + counter("#vL-n", 0, 21, 88.0, 1.8) + `IN("#vL-s", 90.0, { d: .6 });\n`;
click(88.0, .05); ping(90.0);

// superpower: real call notes get highlighted, then become a finished sales page, then the sales come in
const notes = ["Lights up talking about her breathwork clients", "Wants a group program, not more 1:1", "Dreams of Fridays off with her kids", "Clients say she helps them finally exhale", "Ready to charge what she's worth"];
html += VC("vP", "What my clients say I do", `<div style="position:relative;width:560px;height:270px">
  ${win("vP-d", 0, 10, 280, 240, "docs · Discovery call notes", `<div style="padding:12px 14px;font-size:9.5px;line-height:1.5"><b style="font-size:12px">Discovery call</b><div style="font-size:8px;color:#999;margin-bottom:6px">Notes · 45 min</div>${notes.map((n, i) => `<div style="position:relative;margin-top:5px">${[0, 1, 3].includes(i) ? `<span id="vP-h${i}" style="position:absolute;left:-3px;right:-3px;top:0;bottom:0;background:#E9DCF5;transform-origin:left center"></span>` : ""}<span style="position:relative">• ${n}</span></div>`).join("")}</div>`)}
  ${win("vP-o", 300, 0, 260, 262, "yourname.com/the-exhale-method", `<div style="height:96px;background:url(img/magic.jpg) center/cover"></div><div style="padding:10px 14px"><div style="font-size:7.5px;letter-spacing:.14em;color:#999">8-WEEK GROUP PROGRAM</div><div style="font-family:Seasons;font-size:22px;margin-top:3px">The Exhale Method</div>${tx(90, "#EEE", 4, 6)}${tx(70, "#EEE", 4, 4)}<div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px"><b style="font-size:13px">$1,497</b><span style="padding:6px 14px;background:#11120D;color:#fff;font-size:9px">Enrol now</span></div></div>`)}
  <div id="vP-n" style="position:absolute;left:150px;top:205px;width:240px;background:#fff;border:1px solid #DCD6CC;box-shadow:0 12px 32px rgba(17,18,13,.16);padding:9px 12px;display:flex;align-items:center;gap:9px;${SYSF}"><span style="width:26px;height:26px;background:#D8C2EC;display:grid;place-items:center">${ic(I.bag, 15)}</span><div style="flex:1"><b style="font-size:10px">New enrolment</b><div style="font-size:8.5px;color:#888">The Exhale Method · just now</div></div><b id="vP-c" style="font-size:12px">1</b></div></div>`);
vin("vP", 93.9, 104.85);
js += `tl.from("#vP-d", { opacity: 0, y: 18, duration: .5, ease: "power3.out" }, 94.4);\n` + [1, 0, 3].map((h, k) => `tl.from("#vP-h${h}", { scaleX: 0, duration: .45, ease: "power2.out" }, ${(97.0 + k * .5).toFixed(2)});`).join(" ") + `
tl.from("#vP-o", { opacity: 0, x: 24, duration: .55, ease: "power3.out" }, 99.4); tl.from("#vP-n", { opacity: 0, y: 14, duration: .45, ease: "power3.out" }, 101.1);\n` + counter("#vP-c", 1, 6, 101.5, 2.0);
click(97.0, .05); click(99.4, .06); ping(101.1); ping(102.3, .035);

// ---- 5 · the audit 107.0-137.85
const cal = Array.from({ length: 28 }, (_, i) => i + 1);
const times = ["10:00", "11:30", "2:00"];
html += VC("vU", "Your Evolution Audit", `<div class="card" style="display:flex;gap:22px;width:540px;padding:18px;background:#FFFDF9">
  <div style="width:236px"><div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;letter-spacing:.2em;color:#3B3A36"><span>NOVEMBER</span><span>&lsaquo; &rsaquo;</span></div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:10px">${cal.map((d) => `<span id="vU-d${d}" style="height:26px;display:grid;place-items:center;font-size:12px;color:${d < 13 ? "#B9B4AC" : "#11120D"}">${d}</span>`).join("")}</div></div>
  <div style="flex:1"><div style="display:flex;align-items:center;gap:10px"><img class="round" src="img/eh_logo_tile.png" style="width:38px;height:38px"><span class="serif" style="font-size:22px">Evolution Audit</span></div>
    <div style="display:flex;gap:6px;margin-top:10px"><span style="padding:4px 10px;background:#F1E8F8;font-size:12px;font-weight:600">45 min</span><span style="padding:4px 10px;background:#FBE6DA;font-size:12px;font-weight:600">Free</span></div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:12px">${times.map((t, i) => `<span id="vU-t${i}" style="padding:7px 12px;border:1px solid rgba(17,18,13,.2);font-size:13px">${t}</span>`).join("")}</div>
    <div id="vU-ok" style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px;font-weight:600"><span style="width:22px;height:22px;background:#D8C2EC;display:grid;place-items:center">${chkIcon}</span>Booked</div></div></div>`);
vin("vU", 107.4, 112.2);
js += `tl.to("#vU-d19", { backgroundColor: "#D8C2EC", duration: .25 }, 108.3); tl.to("#vU-t1", { backgroundColor: "#D8C2EC", borderColor: "#D8C2EC", duration: .25 }, 109.2); IN("#vU-ok", 110.4, { d: .4 });\n`;
click(108.3, .07); click(109.2, .07); ping(110.4);

// journey: a real analytics funnel. Found -> booked -> bought -> came back; the last drop is the leak
const fun = [["Found you", "1,240", 100, 112.5], ["Booked a call", "186", 54, 113.5], ["Bought", "42", 30, 114.5], ["Came back", "9", 9, 115.6]];
html += VC("vJ", "Your whole business", `<div style="position:relative;width:560px;height:262px">${win("vJ-w", 0, 0, 540, 250, "app · Reporting / Client journey", `<div style="padding:12px 16px">
  <div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:12px">Client journey</b><span style="font-size:8.5px;color:#888;border:1px solid #E5E5E5;padding:3px 7px">Last 90 days</span></div>
  ${fun.map(([k, v, w], i) => `<div style="display:flex;align-items:center;gap:10px;margin-top:${i ? 12 : 14}px"><span style="width:86px;font-size:9.5px;color:#555">${k}</span><div style="flex:1;height:22px;background:#F4F2EF"><div id="vJ-b${i}" style="height:22px;width:${w}%;background:#B9A3CF;transform-origin:left center"></div></div><b style="width:42px;text-align:right;font-size:11px">${v}</b></div>`).join("")}
  <div id="vJ-k" style="position:absolute;left:300px;top:196px;display:flex;align-items:center;gap:7px;padding:5px 10px;background:#FDEBDD;border:1px solid #F2A579;font-size:9.5px;color:#9A4A1C"><b>−79%</b> never come back</div></div>`)}</div>`);
vin("vJ", 112.2, 121.8);
js += `tl.from("#vJ-w", { opacity: 0, y: 18, duration: .5, ease: "power3.out" }, 112.3); ` + fun.map(([, , , t], i) => `tl.from("#vJ-b${i}", { scaleX: 0, duration: .7, ease: "power2.out" }, ${t});`).join(" ") + `
tl.to("#vJ-b3", { backgroundColor: "#F2A579", duration: .4 }, 118.0); IN("#vJ-k", 118.2, { d: .45 });\n`;
fun.forEach(([, , , t]) => click(t, .05)); ping(118.2);

// freedom map 122.0-130.3 · the plan document on the left, its three priorities as widgets on the right
html += GW("gF1", 140, 230, 380, `<div style="display:flex;justify-content:space-between;align-items:center">${gl("Your plan")}<span style="font-size:14px;color:#6b665f">PDF · 1 page</span></div>
  <div style="margin-top:12px;background:#FFFDF9;border:1px solid rgba(17,18,13,.15);padding:16px 18px"><div class="serif" style="font-size:30px">Freedom Map</div><div style="height:1px;background:rgba(17,18,13,.2);margin:8px 0"></div>${[70, 90, 60, 80, 50].map((w) => `<div style="height:7px;width:${w}%;background:#ECE6DE;margin-top:9px"></div>`).join("")}</div>`);
html += GW("gF5", 190, 640, 330, `<div style="display:flex;align-items:center;gap:12px;font-size:20px"><span style="width:32px;height:32px;background:#D8C2EC;display:grid;place-items:center">${ic('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>', 18)}</span>Yours to keep</div>`);
const pr3 = [["Fix first", "Follow-up for every enquiry", "#F2A579", 124.1, 210], ["Next up", "Turn your course into an offer", "#D8C2EC", 125.0, 420], ["Then this", "Automate bookings & payments", "#D8C2EC", 125.9, 630]];
pr3.forEach(([k, d, c, t, y], i) => { html += GW(`gF${i + 2}`, 1350, y, 420, `<div style="display:flex;gap:14px;align-items:center"><span style="flex:none;width:40px;height:40px;background:${c};display:grid;place-items:center;font-size:20px;font-weight:600">${i + 1}</span><div>${gl(k)}<div style="font-size:21px;margin-top:3px">${d}</div></div></div>`); });
gin("gF1", 123.0, 130.3, -20); pr3.forEach(([, , , t], i) => gin(`gF${i + 2}`, t, 130.3, 20)); gin("gF5", 126.7, 130.3, -20);
sfx.push(["whoosh", 122.9, 0.035]);

// this is for you if 130.4-137.35 · a title chip and three checks, alternating sides
const fy = [["Your business is already working", 130.6, 150, 300, I.chart], ["You're ready to stop holding it all together", 132.4, 1330, 420, I.chat], ["You want it set up to scale", 134.7, 190, 600, I.globe]];
html += GW("gY0", 1360, 210, 360, `<div style="font-family:Seasons;font-size:34px">This is for <i style="color:#F2A579">you</i> if</div>`);
fy.forEach(([t, , x, y, icn], i) => { html += GW(`gY${i + 1}`, x, y, 400, `<div style="display:flex;align-items:center;gap:14px;font-size:21px;line-height:1.3"><span style="flex:none;width:40px;height:40px;background:#D8C2EC;display:grid;place-items:center">${chkIcon}</span><span>${t}</span></div>`); });
gin("gY0", 130.5, 137.35, 20); fy.forEach(([, t, x], i) => gin(`gY${i + 1}`, t, 137.35, x > 900 ? 20 : -20));

// the evolve collective 137.5-147.15 · question chip, then the community, members and a welcome message
const mem = ["st_w65.jpg", "st_w32.jpg", "st_w79.jpg", "st_w47.jpg", "st_w12.jpg"];
html += GW("gC0", 140, 220, 400, `<div style="font-size:22px">Not sure what to sell yet?</div>`);
html += GW("gC1", 140, 360, 420, `<div style="height:200px;background:url(img/community.jpg) center 35%/cover"></div><div class="serif" style="font-size:32px;margin-top:12px">The <i style="color:#F2A579">evolve</i> Collective</div><div style="margin-top:8px">${pill("Free community")}</div>`);
html += GW("gC2", 1370, 260, 380, `${gl("Members")}<div style="display:flex;align-items:center;margin-top:12px">${mem.map((m, i) => `<img class="round" src="img/${m}" style="width:50px;height:50px;object-fit:cover;margin-left:${i ? -12 : 0}px;border:2px solid #FAF7F2">`).join("")}<span style="margin-left:14px;font-size:22px;font-weight:600">248</span></div>`);
html += GW("gC3", 1400, 480, 360, `<div style="display:flex;gap:10px;align-items:flex-start"><img class="round" src="img/st_w44.jpg" style="width:40px;height:40px;object-fit:cover"><div><div style="font-size:14px;color:#6b665f">Sarah · #introductions</div><div style="margin-top:4px;padding:9px 13px;background:#fff;border-radius:16px!important;font-size:18px">Welcome! So glad you're here</div></div></div>`);
gin("gC0", 137.8, 147.15, -20); gin("gC1", 142.2, 147.15, -20); gin("gC2", 142.7, 147.15, 20); gin("gC3", 143.6, 147.15, 20);
ping(143.6); sfx.push(["whoosh", 142.1, 0.035]);


scenes.pops = {
  dur: D,
  sfx,
  body: CSS6 + `<style>html,body,#root{background:transparent!important}.grain,#endfade{display:none!important}</style>` + html,
  js: js + END(D),
};
for (const sc of Object.values(scenes)) sc.sfx = sc.sfx.filter(([n]) => n !== "pop" && n !== "type");
export default scenes;
