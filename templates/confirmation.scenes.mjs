// HAUS talking-head: "Audit Confirmation" (cut.mp4, ~47.2s). Same system as the Audit Call Video.
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
const D = 47.28;

// ======================= B-ROLL SLOT (full-frame, opaque): outro =======================
const slot = (p, o) => `
  <div class="ph" id="${p}-ph" style="left:${o.px}px;top:0;width:${1920 - o.px}px;height:1080px"><img src="img/${o.img}"></div>
  <div class="abs" id="${p}-logo" style="left:150px;top:${o.top - 96}px"><img src="logo-lilac.svg" style="width:110px;display:block"></div>
  <div class="abs cap-eye" id="${p}-eye" style="left:150px;top:${o.top}px">${o.eye}</div>
  <div class="abs hl" id="${p}-rule" style="left:150px;top:${o.top + 40}px"></div>
  ${o.lines.map(([t, em], i) => `<div class="abs serif" id="${p}-t${i}" style="left:142px;top:${o.top + 70 + i * (o.fs + 8)}px;font-size:${o.fs}px">${W([[t, em]], em ? UL : "")}</div>`).join("")}`;
const slotJs = (p, o, tIn = 0) => `
  tl.fromTo("#${p}-ph", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, ${tIn});
  IN("#${p}-logo", ${tIn + .2}, { d: .8 }); IN("#${p}-eye", ${tIn + .3}, { d: .7 }); tl.from("#${p}-rule", { scaleX: 0, duration: .8, ease: "power3.inOut" }, ${tIn + .35});
  ${o.lines.map(([, em], i) => `WORDS("#${p}-t${i}", ${(tIn + .45 + i * .3).toFixed(2)}, { s: .1, d: .9 });${em ? ` tl.from("#${p}-t${i} .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, ${(tIn + 1.3 + i * .3).toFixed(2)});` : ""}`).join("\n  ")}`;
// slot starts (cut time): see 45.0 below
const SLOT_T = 44.8, SLOT_D = +(D - SLOT_T).toFixed(2);
const seeO = { px: 960, img: "call_r.jpg", top: 400, fs: 112, eye: "Your Evolution Audit", lines: [["see you on", 0], ["the call", 1]] };
scenes.w45_see = { dur: SLOT_D, sfx: [["whoosh", 0.0, 0.05], ["mclick", 0.5, 0.1]], body: CSS6 + slot("s", seeO), js: slotJs("s", seeO) + END(SLOT_D) };

// ======================= OVERLAY (transparent) =======================
let html = "", js = "", sfx = [];
const click = (t, v = 0.09) => sfx.push(["mclick", +t.toFixed(2), v]);
const ping = (t, v = 0.045) => sfx.push(["ping", +t.toFixed(2), v]);

const HEAD = {
  vE: [["don't let it", 0], ["slip by", 1]],
  vF: [["tell me a", 0], ["little", 1]],
  vT: [["more time for", 0], ["what matters", 1]],
};
const VC = (id, eyebrow, inner) => `<div class="abs" id="${id}" style="left:120px;top:150px;width:900px;z-index:3">
  <div class="cap-eye" id="${id}-e" style="font-size:22px">${eyebrow}</div><div class="hl" id="${id}-r" style="margin:18px 0 22px;width:90px;height:2px"></div>
  <div class="serif" id="${id}-h" style="font-size:112px;line-height:1.02;white-space:normal;max-width:900px">${W(HEAD[id], UL)}</div>
  <div style="margin-top:40px;zoom:1.6;max-width:560px">${inner}</div></div>`;
// one continuous split (no short gaps, no flicker); morph in/out is 0.7s
const SEGS = [[3.0, 24.9]];
SEGS.forEach(([a, b], i) => {
  html += `<div class="abs" id="sp${i}" style="left:0;top:0;width:1920px;height:1080px;z-index:1">
    <div style="position:absolute;left:0;top:0;width:1920px;height:80px;background:#FAF7F2"></div><div style="position:absolute;left:0;top:1000px;width:1920px;height:80px;background:#FAF7F2"></div><div style="position:absolute;left:0;top:80px;width:1100px;height:920px;background:#FAF7F2"></div><div style="position:absolute;left:1800px;top:80px;width:120px;height:920px;background:#FAF7F2"></div>
    <div style="position:absolute;left:1100px;top:80px;width:700px;height:920px;overflow:hidden;background:transparent;outline:1px solid rgba(17,18,13,.14)"></div>
  </div>`;
  js += `IN("#sp${i}", ${a}, { d: .4 }); OUT("#sp${i}", ${(b - .4).toFixed(2)}, .4);\n`;
  sfx.push(["whoosh", a, 0.045]);
});
const lab = (t, c = "#3B3A36") => `<div style="font-size:15px;font-weight:600;letter-spacing:.2em;color:${c};text-transform:uppercase">${t}</div>`;
const vin = (id, s, e) => { js += `IN("#${id}", ${s}, { d: .45 }); IN("#${id}-e", ${(s + .1).toFixed(2)}, { d: .6 }); WORDS("#${id}-h", ${(s + .2).toFixed(2)}, { s: .08, d: .8 }); tl.from("#${id}-h .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, ${(s + .8).toFixed(2)}); tl.from("#${id}-r", { scaleX: 0, duration: .8, ease: "power3.inOut" }, ${(s + .15).toFixed(2)}); OUT("#${id}", ${(e - .5).toFixed(2)}, .5);\n`; click(s, .07); };
const counter = (sel, from, to, t, d, suf = "") => `{ const o = { v: ${from} }; tl.to(o, { v: ${to}, duration: ${d}, ease: "power2.inOut", onUpdate: () => { document.querySelector("${sel}").textContent = Math.round(o.v) + "${suf}"; } }, ${t}); }\n`;
const chkIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#11120D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ic = (p, s = 22, c = "#11120D") => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const I = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>',
  laptop: '<rect x="5" y="5" width="14" height="10" rx="1"/><path d="M2 19h20"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  cal: '<rect x="4" y="5" width="16" height="15" rx="1"/><path d="M4 10h16M9 3v4M15 3v4"/>',
};

// realistic UI kit: browser chrome, dense small type
const SYSF = `font-family:-apple-system,'SF Pro Text','Segoe UI','Helvetica Neue',Arial,sans-serif`;
const win = (id, x, y, w, h, url, inner) => `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:#fff;border:1px solid #DCD6CC;box-shadow:0 12px 32px rgba(17,18,13,.14);overflow:hidden;${SYSF};color:#1d1d1f">
  <div style="height:20px;background:#F3F1EE;border-bottom:1px solid #E4DFD7;display:flex;align-items:center;gap:5px;padding:0 8px"><span class="round" style="width:7px;height:7px;background:#FF5F57"></span><span class="round" style="width:7px;height:7px;background:#FEBC2E"></span><span class="round" style="width:7px;height:7px;background:#28C840"></span><span style="margin-left:8px;flex:1;height:12px;background:#fff;border:1px solid #E4DFD7;font-size:7px;color:#8a8580;line-height:11px;padding-left:6px">${url}</span></div>${inner}</div>`;

// ---- 0 · booked (no split) 0.5-2.9 · confirmation widget on the left
const GW = (id, x, y, w, inner) => `<div class="abs" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;padding:22px 26px;background:rgba(250,247,242,.82);border:1px solid rgba(255,255,255,.9);outline:1px solid rgba(17,18,13,.08);z-index:4;${SYSF};color:#11120D">${inner}</div>`;
const gl = (t) => `<div style="font-size:20px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#4a463f">${t}</div>`;
const gin = (id, t, e, dx = 0) => { js += `tl.from("#${id}", { opacity: 0, y: 26, x: ${dx}, duration: .6, ease: "power3.out" }, ${t}); OUT("#${id}", ${(e - .45).toFixed(2)}, .45);\n`; click(t, .05); };
const pill = (t, bg = "#D8C2EC") => `<span style="display:inline-flex;align-items:center;gap:9px;padding:6px 16px;background:${bg};font-size:21px;font-weight:600"><span class="round" style="width:10px;height:10px;background:#11120D;display:inline-block"></span>${t}</span>`;
const sw = `<span style="position:relative;display:inline-block;width:64px;height:36px;background:#D8C2EC;border-radius:18px!important"><span class="round" style="position:absolute;right:4px;top:4px;width:28px;height:28px;background:#fff"></span></span>`;

html += GW("gK1", 60, 270, 520, `<div style="display:flex;justify-content:space-between;align-items:center">${gl("Confirmed")}${pill("Booked")}</div>
  <div style="display:flex;gap:14px;align-items:center;margin-top:18px"><img class="round" src="img/eh_logo_tile.png" style="width:72px;height:72px"><div><div class="serif" style="font-size:42px">Evolution Audit</div><div style="font-size:26px;margin-top:6px;color:#2f2d29">45 min · with Melissa</div></div></div>`);
gin("gK1", 0.5, 2.95, -20); ping(0.9);

// ---- 1 · split 3.0-24.9
// inbox then calendar: confirmation lands, gets added to the week
const mails = [["Evolution Haus", "You're booked · Evolution Audit", "9:02", 1], ["Weekly digest", "Five things worth reading", "8:40", 0], ["Invoice", "Payment received", "Mon", 0], ["Team", "Notes from yesterday", "Mon", 0]];
const week = ["Mon", "Tue", "Wed", "Thu", "Fri"];
html += VC("vE", "Before our call", `<div style="position:relative;width:560px;height:270px">${win("vE-m", 0, 0, 350, 250, "mail · Inbox", `<div style="padding:6px 0">${mails.map(([f, s, t, hi], i) => `<div id="vE-r${i}" style="display:flex;align-items:center;gap:8px;padding:9px 12px;border-bottom:1px solid #F0EEEA;font-size:12px;white-space:nowrap;overflow:hidden;${hi ? "background:#F1E8F8" : ""}"><span class="round" style="width:6px;height:6px;background:${hi ? "#F2A579" : "transparent"}"></span><b style="width:92px;flex:none;font-weight:${hi ? 700 : 500}">${f}</b><span style="flex:1;overflow:hidden;text-overflow:ellipsis;color:${hi ? "#111" : "#666"};font-weight:${hi ? 600 : 400}">${s}</span><span style="color:#777;font-size:11px">${t}</span></div>`).join("")}
    <div id="vE-b" style="margin:12px;padding:8px 12px;border:1px solid #E4DFD7;font-size:11px;color:#333;display:flex;align-items:center;justify-content:space-between"><span>Audit · Thu 2:00 PM</span><span style="padding:5px 10px;background:#11120D;color:#fff;font-size:10.5px">Add to calendar</span></div></div>`)}
  ${win("vE-c", 240, 40, 320, 228, "calendar · This week", `<div style="display:grid;grid-template-columns:repeat(5,1fr);font-size:11px;color:#666;text-align:center;border-bottom:1px solid #EEE">${week.map((d) => `<div style="padding:7px 0;${d === "Thu" ? "color:#111;font-weight:700" : ""}">${d}</div>`).join("")}</div>
    <div style="position:relative;display:grid;grid-template-columns:repeat(5,1fr);height:170px">${week.map((d) => `<div style="border-right:1px solid #F1EEEA;background-image:linear-gradient(#F1EEEA 1px,transparent 1px);background-size:100% 28px"></div>`).join("")}
    <div id="vE-ev" style="position:absolute;left:60%;width:20%;top:56px;height:58px;background:#D8C2EC;border-left:3px solid #11120D;padding:4px 5px;font-size:10px;font-weight:600;line-height:1.25">Audit<br><span style="font-weight:400">45 min</span></div></div>`)}</div>`);
vin("vE", 3.0, 10.6);
js += mails.map((_, i) => `IN("#vE-r${i}", ${(3.5 + i * .18).toFixed(2)}, { d: .35 });`).join(" ") + `
IN("#vE-b", 6.4, { d: .45 }); tl.from("#vE-c", { opacity: 0, x: 30, duration: .55, ease: "power3.out" }, 7.7); tl.from("#vE-ev", { opacity: 0, scale: .8, transformOrigin: "left top", duration: .4, ease: "power2.out" }, 8.4);
tl.to("#vE-m", { opacity: .45, duration: .5 }, 7.9);\n`;
click(6.4, .05); click(7.7, .06); ping(8.4);

// short form being filled in
const ff = [["Business name", "Bloom Breathwork", 11.0], ["What you offer", "Group breathwork programs", 11.7], ["Biggest challenge right now", "Too much admin, not enough time", 12.4]];
html += VC("vF", "Short form", `<div style="position:relative;width:560px;height:270px">${win("vF-w", 0, 0, 470, 300, "forms · Evolution Audit · Before your call", `<div style="padding:12px 18px">
  <b style="font-size:16px">A little about you</b>
  ${ff.map(([k, v], i) => `<div style="margin-top:${i ? 10 : 12}px"><div style="font-size:11px;color:#555;margin-bottom:3px">${k}</div><div style="height:30px;border:1px solid #DAD5CD;display:flex;align-items:center;padding:0 9px;font-size:13.5px"><span id="vF-v${i}">${v}</span></div></div>`).join("")}
  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px"><span id="vF-ok" style="display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600"><span style="width:22px;height:22px;background:#D8C2EC;display:grid;place-items:center">${chkIcon}</span>Sent to Melissa</span><span id="vF-s" style="padding:7px 16px;background:#11120D;color:#fff;font-size:12.5px">Submit</span></div></div>`)}</div>`);
vin("vF", 10.6, 14.2);
js += `tl.from("#vF-w", { opacity: 0, y: 18, duration: .5, ease: "power3.out" }, 10.9); ` + ff.map(([, , t], i) => `tl.from("#vF-v${i}", { opacity: 0, duration: .35 }, ${t + .15});`).join(" ") + `
tl.from("#vF-ok", { opacity: 0, duration: .3 }, 13.5); tl.to("#vF-s", { backgroundColor: "#D8C2EC", color: "#11120D", duration: .25 }, 13.45);\n`;
ff.forEach(([, , t]) => click(t + .15, .04)); click(13.45, .07); ping(13.5);

// the 45 minutes: basics shrink to nothing, her time with the business grows
html += VC("vT", "Your 45 minutes", `<div style="display:flex;gap:8px;margin-bottom:6px">${["Your offer", "Your goals", "Your challenge"].map((t, i) => `<span id="vT-c${i}" style="flex:1;padding:8px 10px;border:1px solid rgba(17,18,13,.2);background:#FFFDF9;display:flex;align-items:center;gap:7px;font-size:15px"><span style="flex:none;width:22px;height:22px;background:#D8C2EC;display:grid;place-items:center">${chkIcon}</span>${t}</span>`).join("")}</div>
  <div style="margin:16px 0 8px;height:30px;display:flex;background:rgba(17,18,13,.1)"><div id="vT-a" style="height:30px;width:44%;background:#F2A579"></div><div style="height:30px;flex:1;background:#D8C2EC"></div></div>
  <div style="display:flex;justify-content:space-between;font-size:19px;color:#2f2d29"><span>Basics · <b id="vT-n" style="font-weight:600;color:#11120D">20</b> min</span><span>Your business · <b id="vT-m" style="font-weight:600;color:#11120D">25</b> min</span></div>`);
vin("vT", 14.3, 24.9);
js += [0, 1, 2].map((i) => `IN("#vT-c${i}", ${(16.2 + i * .7).toFixed(2)}, { d: .4 });`).join(" ") + `
tl.fromTo("#vT-a", { width: "44%" }, { width: "0%", duration: 2.3, ease: "power2.inOut", immediateRender: false }, 21.9);\n` + counter("#vT-n", 20, 0, 21.9, 2.3) + counter("#vT-m", 25, 45, 21.9, 2.3);
[0, 1, 2].forEach((i) => click(16.2 + i * .7, .04)); click(21.9, .05); ping(24.3);

// ---- 2 · on the day 25.5-36.9 (no split) · floating glass widgets on both sides of her
const bars = [["Admin", 14, "#F2A579", 33.0], ["Client work", 9, "#D8C2EC", 33.3], ["Content", 6, "#D8C2EC", 33.6], ["Inbox", 5, "#D8C2EC", 33.9]];
html += GW("gO1", 60, 200, 520, `<div style="display:flex;justify-content:space-between;align-items:center">${gl("On the day")}${pill("Link ready")}</div>
  <div style="display:flex;gap:16px;align-items:center;margin-top:18px"><span style="flex:none;width:72px;height:72px;background:#D8C2EC;display:grid;place-items:center">${ic(I.laptop, 38)}</span><div><div class="serif" style="font-size:42px">Evolution Audit</div><div style="font-size:26px;margin-top:6px;color:#2f2d29">Thu · 2:00 PM · Video call</div></div></div>`);
html += GW("gO2", 1330, 230, 530, `<div style="display:flex;justify-content:space-between;align-items:center">${gl("Quiet space")}${sw}</div>
  <div style="margin-top:16px;font-size:36px">Do not disturb</div><div style="font-size:24px;color:#4a463f;margin-top:6px">Notifications paused · 45 min</div>`);
html += GW("gO3", 40, 500, 580, `<div>${gl("Where your week goes")}</div><div style="margin-top:12px"><span id="gO3-tag" style="display:inline-block;padding:6px 16px;background:#FBE6DA;font-size:26px;font-weight:600">Most of your time</span></div>
  ${bars.map(([k, h, c], i) => `<div style="display:flex;align-items:center;gap:14px;margin-top:${i ? 14 : 20}px"><span style="width:184px;font-size:33px">${k}</span><div style="flex:1;height:32px;background:rgba(17,18,13,.08)"><div id="gO3-b${i}" style="height:32px;width:${Math.round(h / 14 * 100)}%;background:${c};transform-origin:left center"></div></div><b style="width:72px;text-align:right;font-size:33px">${h}h</b></div>`).join("")}`);
html += GW("gO4", 1330, 600, 530, `<div style="display:flex;align-items:center;gap:16px;font-size:30px"><span style="flex:none;width:46px;height:46px;background:#D8C2EC;display:grid;place-items:center">${chkIcon}</span>Just bring yourself</div>`);
gin("gO1", 26.5, 36.9, -20); gin("gO2", 29.2, 36.9, 20); gin("gO3", 32.3, 36.9, -20); gin("gO4", 35.6, 36.9, 20);
js += bars.map(([, , , t], i) => `tl.from("#gO3-b${i}", { scaleX: 0, duration: .6, ease: "power2.out" }, ${t});`).join(" ") + ` tl.from("#gO3-tag", { opacity: 0, duration: .4 }, 34.6);\n`;
sfx.push(["whoosh", 26.4, 0.035]); ping(34.6);

// ---- 3 · the start / reschedule 37.2-45.0 · side pop-up cards, alternating
const PC = (id, top, w, inner, side = "left") => `<div class="abs card" id="${id}" style="left:${side === "right" ? 1920 - 50 - w - 68 : 120}px;top:${top}px;width:${w}px;padding:30px 34px;background:#FAF7F2;z-index:4">${inner}</div>`;
const pin = (id, s, e) => { js += `IN("#${id}", ${s}, { d: .5 }); OUT("#${id}", ${(e - .45).toFixed(2)}, .45);\n`; sfx.push(["whoosh", +s.toFixed(2), 0.04]); };
const peye = (t) => `<div class="cap-eye" style="font-size:22px">${t}</div><div class="hl" style="margin:14px 0 6px;width:70px"></div>`;
const ag = [["Your biggest time-drain", 1], ["What's already working", 0], ["Your plan from here", 0]];
html += PC("pA", 240, 540, `${peye("The call")}${ag.map(([t, hi], i) => `<div id="pA-r${i}" style="display:flex;align-items:center;gap:12px;margin-top:14px;padding:10px 12px;font-size:27px;${hi ? "background:#F1E8F8;" : "border:1px solid rgba(17,18,13,.15);"}"><span style="flex:none;width:42px;height:42px;background:${hi ? "#D8C2EC" : "#FAF7F2"};border:1px solid rgba(17,18,13,.25);display:grid;place-items:center;font-size:22px;font-weight:600">${i + 1}</span><span style="flex:1">${t}</span>${hi ? `<span id="pA-t" style="font-size:16px;font-weight:700;letter-spacing:.12em;color:#D9772F;text-transform:uppercase">Start</span>` : ""}</div>`).join("")}`);
pin("pA", 37.3, 41.3);
js += ag.map((_, i) => `IN("#pA-r${i}", ${(37.7 + i * .3).toFixed(2)}, { d: .4 });`).join(" ") + ` IN("#pA-t", 38.5, { d: .4 });\n`;
click(38.5, .06);
html += PC("pB", 300, 540, `${peye("Need to move it?")}
  <div id="pB-d" style="display:flex;align-items:center;gap:16px;margin-top:18px"><span style="flex:none;width:72px;height:72px;background:#D8C2EC;display:grid;place-items:center">${ic(I.cal, 38)}</span><div><div class="serif" style="font-size:42px">Evolution Audit</div><div style="font-size:28px;margin-top:6px;color:#2f2d29"><span id="pB-w">Thu · 2:00 PM</span></div></div></div>
  <div style="margin-top:20px;display:flex;align-items:center;gap:12px"><span id="pB-b" style="padding:12px 24px;border:1px solid #11120D;font-size:28px;font-weight:600">Reschedule</span><span style="font-size:22px;color:#4a463f">link in your email</span></div>`, "right");
pin("pB", 41.5, 45.0);
js += `tl.to("#pB-b", { backgroundColor: "#D8C2EC", borderColor: "#D8C2EC", duration: .25 }, 44.4); tl.to("#pB-w", { opacity: 0, duration: .2 }, 44.5); tl.add(() => { document.querySelector("#pB-w").textContent = "Fri · 11:00 AM"; }, 44.7); tl.to("#pB-w", { opacity: 1, duration: .25 }, 44.7);\n`;
click(44.4, .07); ping(44.7);

scenes.pops = {
  dur: D,
  sfx,
  body: CSS6 + `<style>html,body,#root{background:transparent!important}.grain,#endfade{display:none!important}</style>` + html,
  js: js + END(D),
};
for (const sc of Object.values(scenes)) sc.sfx = sc.sfx.filter(([n]) => n !== "pop" && n !== "type");
export default scenes;
