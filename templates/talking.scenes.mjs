// HAUS talking-head template (approved final: Welcome to The Evolve Collective, 2026-11-12). Copy into the project, change the copy + timings, keep the system.
// ticker on a cream band, ripple as a full-frame page, MacBook portal mockup for the task, iPhone pop-up for "say hi".
import * as L from "file:///C:/Users/Zaire/.claude/skills/haus-onboarding/scripts/lib.mjs";
const { W, CUR } = L;
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
#cur path{fill:#11120D!important}.card{background:#FAF7F2;border:1px solid rgba(17,18,13,.2)}.card .subt{white-space:normal}
</style>`;
const scenes = {};

// ======================= B-ROLL SLOTS =======================
scenes.w01_title = {
  dur: 3.0,
  sfx: [["whoosh", 0.0, 0.05], ["pop", 0.5, 0.08]],
  body: CSS6 + `
  <div class="abs" id="t-logo" style="left:150px;top:300px"><img src="logo-lilac.svg" style="width:120px;display:block"></div>
  <div class="abs hl" id="t-rule" style="left:150px;top:396px"></div>
  <div class="abs cap-eye" id="t-eye" style="left:150px;top:426px">Welcome to</div>
  <div class="abs serif" id="t-t1" style="left:142px;top:470px;font-size:120px">${W([["The", 0], ["evolve", 1]], UL)}</div>
  <div class="abs serif" id="t-t2" style="left:142px;top:596px;font-size:120px">${W([["Collective", 0]])}</div>
  <div class="ph" id="t-ph" style="left:960px;top:0;width:960px;height:1080px"><img src="img/title.jpg"></div>`,
  js: `
  tl.fromTo("#t-ph", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" }, 0);
  IN("#t-logo", .25, { d: .8 }); tl.from("#t-rule", { scaleX: 0, duration: .8, ease: "power3.inOut" }, .35); IN("#t-eye", .45, { d: .7 });
  WORDS("#t-t1", .55, { s: .1, d: .9 }); WORDS("#t-t2", .8, { s: .1, d: .9 });
  tl.from("#t-t1 .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, 1.5);
  ` + END(3.0),
};

// LUNCH 76.9-82.8 · split: cream text left, photo right (covers the camera reach at 1:18)
scenes.w10_lunch = {
  dur: 5.9,
  sfx: [["whoosh", 0.0, 0.05], ["mclick", 0.5, 0.1], ["mclick", 2.15, 0.08]],
  body: CSS6 + `
  <div class="ph" id="l-ph" style="left:800px;top:0;width:1120px;height:1080px"><img src="img/lunch_r.jpg"></div>
  <div class="abs cap-eye" id="l-eye" style="left:130px;top:330px">Long lunches</div>
  <div class="abs hl" id="l-rule" style="left:130px;top:370px"></div>
  <div class="abs serif" id="l-t1" style="left:124px;top:400px;font-size:96px">${W([["actually", 0]])}</div>
  <div class="abs serif" id="l-t2" style="left:124px;top:500px;font-size:96px">${W([["seriously", 1]], UL)}</div>
  <div class="abs serif" id="l-t3" style="left:124px;top:600px;font-size:96px">${W([["long lunches", 0]])}</div>
  <div class="abs subt" id="l-sub" style="left:130px;top:740px;width:600px">One every single month, and nobody does this alone.</div>`,
  js: `
  tl.fromTo("#l-ph", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, 0);
  IN("#l-eye", .3, { d: .7 }); tl.from("#l-rule", { scaleX: 0, duration: .8, ease: "power3.inOut" }, .35);
  WORDS("#l-t1", .4, { s: .1, d: .9 }); WORDS("#l-t2", .7, { s: .1, d: .9 }); WORDS("#l-t3", 1.0, { s: .1, d: .9 });
  tl.from("#l-t2 .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, 1.4);
  IN("#l-sub", 2.1, { d: .9 });
  ` + END(5.9),
};

// TASK 97.4-107.3 · MacBook mockup with the HAUS portal
const chk = (id, top, t) => `<div class="abs" id="${id}" style="left:130px;top:${top}px;display:flex;align-items:center;gap:16px;font-size:27px;color:#11120D"><span style="flex:none;width:30px;height:30px;background:#D8C2EC;display:grid;place-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#11120D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>${t}</div>`;
scenes.w08_task = {
  dur: 9.9,
  sfx: [["whoosh", 0.0, 0.05], ["mclick", 0.5, 0.09], ["mclick", 3.25, 0.12], ["mclick", 4.45, 0.11], ["mclick", 9.05, 0.11], ["type", 4.75, 0.07], ["type", 5.65, 0.07], ["type", 7.85, 0.07], ["ping", 9.15, 0.06]],
  body: CSS6 + `
  <div class="abs cap-eye" id="k-e" style="left:130px;top:300px">Your first little task</div>
  <div class="abs hl" id="k-r" style="left:130px;top:340px"></div>
  <div class="abs serif" id="k-t" style="left:124px;top:370px;font-size:86px">${W([["head to the", 0]])}</div>
  <div class="abs serif" id="k-t2" style="left:124px;top:462px;font-size:86px">${W([["discussion", 1], ["tab", 0]], UL)}</div>
  ${chk("k1", 620, "Your name")}${chk("k2", 672, "The magic you bring")}${chk("k3", 724, "Your free Friday afternoon")}
  <div class="abs" id="k-mb" style="left:820px;top:220px;width:1040px;height:676px"><img src="img/macbook.png" style="width:1040px;display:block">
    <div class="abs" id="k-hl" style="left:127px;top:159px;width:128px;height:15px;background:rgba(216,194,236,.4);opacity:0"></div>
    <div class="abs" id="ui" style="left:121px;top:78px;width:797px;height:518px;background:#FBFAFC;overflow:hidden;opacity:0;font-family:Visby,sans-serif;color:#11120D">
      <div class="abs" style="left:0;top:0;width:797px;height:34px;border-bottom:1px solid #ECE8F1;display:flex;align-items:center;padding-left:14px;gap:8px;font-size:11px;font-weight:600"><span style="width:16px;height:16px;background:#D8C2EC;display:inline-block"></span>The HAUS Portal</div>
      <div class="abs" style="left:0;top:34px;width:150px;height:484px;border-right:1px solid #ECE8F1;padding:14px 10px;font-size:11px;line-height:2.3;color:#3B3A36">
        <div>Dashboard</div><div style="background:#D8C2EC;color:#11120D;font-weight:600;padding-left:6px">Communities</div><div>Courses</div><div>Invoices</div><div>Appointments</div></div>
      <div class="abs serif" style="left:172px;top:50px;font-size:26px">${W([["The", 0], ["evolve", 1], ["Collective", 0]])}</div>
      <div class="abs" style="left:172px;top:92px;font-size:11px;color:#6E6C66">Members · Free community for Evolvers</div>
      <div class="abs" style="left:172px;top:118px;width:600px;height:28px;border-bottom:1px solid #ECE8F1;display:flex;gap:6px;font-size:11.5px;font-weight:600;color:#6E6C66">
        <div style="padding:6px 12px">Feed</div><div id="ui-dt" style="padding:6px 12px">Discussion</div><div style="padding:6px 12px">Events</div></div>
      <div class="abs" id="ui-dl" style="left:240px;top:144px;width:78px;height:2px;background:#D8C2EC;transform-origin:left center"></div>
      <div class="abs" id="ui-card" style="left:172px;top:168px;width:600px;height:250px;background:#FFFFFF;border:1px solid #ECE8F1;padding:16px 18px;opacity:0">
        <div style="font-size:10px;font-weight:600;letter-spacing:.2em;color:#11120D">INTRODUCE YOURSELF</div>
        <div style="margin-top:10px;font-size:13px;line-height:2;color:#11120D">
          <div class="ty" id="ty1">Hi everyone, I'm Sarah, a breathwork coach.</div>
          <div class="ty" id="ty2">My magic: helping women exhale and slow down.</div>
          <div class="ty" id="ty3">Free Friday afternoon? A long lunch, always.</div>
        </div>
        <div id="ui-post" style="position:absolute;right:18px;bottom:16px;padding:7px 18px;background:#D8C2EC;color:#11120D;font-size:11.5px;font-weight:600">Post</div>
      </div>
      <div class="abs" id="ui-ok" style="left:172px;top:430px;width:600px;padding:10px 14px;background:#EEE3F6;font-size:11.5px;color:#11120D;font-weight:600;opacity:0">Posted to Discussion · 3 Evolvers said hi</div>
    </div>
    <div class="abs notch" style="left:461px;top:76px;width:118px;height:20px;background:#0B0B0D;border-radius:0 0 9px 9px;z-index:3"></div></div>
  <style>.ty{white-space:nowrap;overflow:hidden;clip-path:inset(0 100% 0 0)}</style>
  ${CUR}`,
  js: `
  IN("#k-e", .1, { d: .7 }); tl.from("#k-r", { scaleX: 0, duration: .8, ease: "power3.inOut" }, .15);
  WORDS("#k-t", .3, { s: .1, d: .9 }); WORDS("#k-t2", .7, { s: .1, d: .9 }); tl.from("#k-t2 .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, 1.4);
  IN("#k-mb", .4, { d: 1.0 });
  tl.to("#k-hl", { opacity: 1, duration: .25 }, 3.3);
  tl.to("#ui", { opacity: 1, duration: .4, ease: "power2.out" }, 3.55);
  tl.to("#ui-dt", { color: "#11120D", duration: .2 }, 4.45); gsap.set("#ui-dl", { scaleX: 0 }); tl.to("#ui-dl", { scaleX: 1, duration: .4, ease: "power3.out" }, 4.45);
  tl.to("#ui-card", { opacity: 1, duration: .4, ease: "power2.out" }, 4.6);
  tl.to("#ty1", { clipPath: "inset(0 0% 0 0)", duration: .9, ease: "steps(40)" }, 4.75);
  tl.to("#ty2", { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "steps(44)" }, 5.65);
  tl.to("#ty3", { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "steps(44)" }, 7.85);
  tl.to("#ui-post", { backgroundColor: "#11120D", duration: .12, yoyo: true, repeat: 1 }, 9.05);
  tl.to("#ui-ok", { opacity: 1, duration: .35 }, 9.3);
  IN("#k1", 4.7, { d: .6 }); IN("#k2", 5.6, { d: .6 }); IN("#k3", 7.8, { d: .6 });
  ` + L.cursorJs([[1.6, 1500, 800], [3.25, 975, 384, true], [4.45, 1205, 424, true], [9.05, 1662, 682, true]]) + END(9.9),
};

// CLUB 116.1-119.45
scenes.w09_club = {
  dur: 3.35,
  sfx: [["whoosh", 0.0, 0.05], ["pop", 0.25, 0.07], ["ping", 2.45, 0.05]],
  body: CSS6 + `
  <div class="ph" id="c-ph" style="left:960px;top:0;width:960px;height:1080px"><img src="img/outro.jpg"></div>
  <div class="abs" id="c-logo" style="left:150px;top:330px"><img src="logo-lilac.svg" style="width:120px;display:block"></div>
  <div class="abs hl" id="c-rule" style="left:150px;top:426px"></div>
  <div class="abs cap-eye" id="c-eye" style="left:150px;top:456px">Hello, Evolver</div>
  <div class="abs serif" id="c-t1" style="left:142px;top:500px;font-size:112px">${W([["Welcome to", 0]])}</div>
  <div class="abs serif" id="c-t2" style="left:142px;top:614px;font-size:112px">${W([["the", 0], ["club", 1]], UL)}</div>`,
  js: `
  tl.fromTo("#c-ph", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, 0);
  IN("#c-logo", .2, { d: .8 }); tl.from("#c-rule", { scaleX: 0, duration: .8, ease: "power3.inOut" }, .3); IN("#c-eye", .4, { d: .7 });
  WORDS("#c-t1", 1.45, { s: .1, d: .9 }); WORDS("#c-t2", 1.75, { s: .12, d: .9 });
  tl.from("#c-t2 .ul", { scaleX: 0, duration: .6, ease: "power3.inOut" }, 2.45);
  ` + END(3.35),
};

// ======================= OVERLAY (transparent, 119.45s) =======================
const D = 119.45;
let html = "", js = "", sfx = [];
const click = (t, v = 0.09) => sfx.push(["mclick", +t.toFixed(2), v]);

// ---- visual-led cards (one per moment, no word cards)
// split-screen layout (phone-readable): cream page, big headline + visual on the left, Melissa in a framed window on the right
const HEAD = {
  vA: [["where I", 0], ["started", 1]], vN: [["pouring in", 0], ["everything", 1]], vE: [["burnt out &", 0], ["alone", 1]],
  vT: [["more impact,", 0], ["more", 0], ["freedom", 1]], vC: [["room to", 0], ["breathe", 1]], vD: [["two", 0], ["things", 1]],
  vW: [["every win,", 0], ["out loud", 1]], vF: [["never", 0], ["by", 1], ["yourself", 0]],
};
const VC = (id, top, eyebrow, inner, w = 600) => `<div class="abs" id="${id}" style="left:120px;top:150px;width:900px;z-index:3">
  <div class="cap-eye" id="${id}-e" style="font-size:22px">${eyebrow}</div><div class="hl" id="${id}-r" style="margin:18px 0 22px;width:90px;height:2px"></div>
  <div class="serif" id="${id}-h" style="font-size:112px;line-height:1.02;white-space:normal;max-width:900px">${W(HEAD[id], UL)}</div>
  <div style="margin-top:40px;zoom:1.6;max-width:560px">${inner}</div></div>`;
const SEGS = [[6.3, 26.5], [34.0, 37.0], [46.1, 57.9], [71.5, 76.75], [82.95, 85.55]];
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

// 1 · roles timeline 6.3-12.4
const roles = [["coach", 7.38], ["mentor", 8.5], ["healer", 9.26], ["Elevate", 9.8]];
html += VC("vA", 300, "Before Evolution Haus", `<div style="position:relative;height:150px">
  <div id="vA-l" style="position:absolute;left:14px;right:14px;top:14px;height:2px;background:rgba(17,18,13,.35);transform-origin:left center"></div>
  ${roles.map(([r], i) => `<div id="vA-n${i}" style="position:absolute;left:${i * 33.3}%;top:0;width:120px;margin-left:${i === 0 ? 0 : i === 3 ? -100 : -50}px;text-align:${i === 0 ? "left" : i === 3 ? "right" : "center"}">
    <span class="round" style="display:inline-block;width:30px;height:30px;background:${i === 3 ? "#F2A579" : "#D8C2EC"};border:4px solid #FAF7F2"></span>
    <div class="serif" style="margin-top:12px;font-size:34px;${i === 3 ? "" : "font-style:italic;"}color:${i === 3 ? "#11120D" : "#F2A579"}">${r}</div></div>`).join("")}
  <div id="vA-s" style="position:absolute;right:0;top:110px;font-size:17px;color:#3B3A36">a co-working space for women</div></div>`);
vin("vA", 6.3, 12.4);
js += `gsap.set("#vA-l", { scaleX: 0 }); tl.to("#vA-l", { scaleX: 1, duration: 2.6, ease: "power1.inOut" }, 7.3);\n` + roles.map(([, t], i) => `IN("#vA-n${i}", ${t}, { d: .5 });`).join(" ") + ` IN("#vA-s", 10.4, { d: .6 });\n`;
roles.forEach(([, t]) => click(t, .06));

// 2 · where her time goes 12.2-20.9
html += VC("vN", 300, "What I kept noticing", `${lab("Her business")}${bar("vN-a", "#D8C2EC")}${lab("Herself", "#F2A579")}${bar("vN-b", "#F2A579")}
  <div id="vN-s" style="font-size:18px;color:#3B3A36">The women creating the most impact were pouring <i style="color:#F2A579">everything</i> into their businesses.</div>`);
vin("vN", 12.2, 20.9);
js += `tl.fromTo("#vN-a", { scaleX: .5 }, { scaleX: .97, duration: 2.4, ease: "power2.inOut", immediateRender: true }, 15.3); tl.fromTo("#vN-b", { scaleX: .5 }, { scaleX: .05, duration: 2.4, ease: "power2.inOut", immediateRender: true }, 15.3); IN("#vN-s", 17.8, { d: .7 });\n`;
click(15.3, .06);

// 3 · energy meter (hero) 21.2-26.5
html += VC("vE", 300, "And so many of them", `<div style="display:flex;align-items:baseline;justify-content:space-between">${lab("Energy")}<span class="serif" id="vE-n" style="font-size:76px">100%</span></div>${bar("vE-f", "#D8C2EC")}
  <div style="display:flex;gap:10px"><span id="vE-t1" class="card" style="padding:8px 16px;font-family:Seasons;font-style:italic;font-size:26px;color:#F2A579">burnt out</span><span id="vE-t2" class="card" style="padding:8px 16px;font-family:Seasons;font-style:italic;font-size:26px;color:#F2A579">alone</span></div>
  <div id="vE-s" style="margin-top:16px;font-size:18px;color:#3B3A36">and I was one of those people</div>`);
vin("vE", 21.2, 26.5);
js += `tl.fromTo("#vE-f", { scaleX: 1 }, { scaleX: .06, duration: 2.6, ease: "power2.inOut", immediateRender: false }, 21.6); tl.to("#vE-f", { backgroundColor: "#F2A579", duration: .8 }, 23.0);\n` + counter("#vE-n", 100, 6, 21.6, 2.6, "%") + `IN("#vE-t1", 21.6, { d: .5 }); IN("#vE-t2", 23.7, { d: .5 }); IN("#vE-s", 24.9, { d: .6 });\n`;
click(23.7, .06);

// 4 · impact / freedom 34.1-37.0
html += VC("vT", 300, "What you'll find here", `${lab("More impact")}${bar("vT-a", "#D8C2EC")}${lab("More freedom", "#F2A579")}${bar("vT-b", "#F2A579")}`);
vin("vT", 34.0, 37.0);
js += `tl.fromTo("#vT-a", { scaleX: .12 }, { scaleX: .93, duration: 1.1, ease: "power3.out", immediateRender: true }, 34.3); tl.fromTo("#vT-b", { scaleX: .12 }, { scaleX: .9, duration: 1.1, ease: "power3.out", immediateRender: true }, 35.05);\n`;
click(35.05, .06);

// 5 · your week 46.2-51.0
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
html += VC("vC", 300, "Make room for", `<div style="display:flex;gap:8px">${days.map((d, i) => `<div id="vd${i}" style="flex:1;height:96px;border:1px solid rgba(17,18,13,.2);background:#FFFDF9;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:15px;color:#3B3A36"><span>${d}</span><span id="vdt${i}" style="font-family:Seasons;font-style:italic;font-size:19px;margin-top:6px;color:#11120D;opacity:0">${i === 4 ? "lunch" : i === 5 ? "rest" : i === 6 ? "laugh" : ""}</span></div>`).join("")}</div>
  <div id="vC-s" style="margin-top:18px;font-size:18px;color:#3B3A36">and bring more <i style="color:#F2A579">joy</i> into our lives</div>`, 620);
vin("vC", 46.1, 51.0);
js += `tl.to("#vd5", { backgroundColor: "#D8C2EC", color: "#FAF7F2", duration: .4 }, 46.32); tl.to("#vdt5", { opacity: 1, duration: .3 }, 46.4);
tl.to("#vd6", { backgroundColor: "#D8C2EC", color: "#FAF7F2", duration: .4 }, 47.24); tl.to("#vdt6", { opacity: 1, duration: .3 }, 47.3);
tl.to("#vd4", { backgroundColor: "#F2A579", color: "#FAF7F2", duration: .4 }, 47.96); tl.to("#vdt4", { opacity: 1, duration: .3 }, 48.0); IN("#vC-s", 49.7, { d: .6 });\n`;
[46.32, 47.24, 47.96].forEach((t) => click(t, .06));

// 6 · a community + a holistic approach 51.1-57.9
const avs = [["st_w44.jpg"], ["st_w65.jpg"], ["st_w32.jpg"], ["st_w79.jpg"], ["st_w90.jpg"], ["st_w68.jpg"], ["st_w47.jpg"]];
html += VC("vD", 300, "Real impact needs two things", `<div style="display:flex;align-items:center;justify-content:space-between">${lab("01 · A community of women")}<span class="serif" id="vD-n" style="font-size:44px">0</span></div>
  <div style="margin:14px 0 26px;display:flex">${avs.map(([img], i) => `<img class="round" id="vav${i}" src="img/${img}" style="width:56px;height:56px;margin-left:${i ? -12 : 0}px;border:3px solid #FAF7F2;object-fit:cover">`).join("")}</div>
  <div id="vD-h">${lab("02 · A holistic approach", "#F2A579")}<div style="margin-top:12px;display:flex;gap:8px">${["the woman", "the magic", "the machine"].map((t) => `<span class="card" style="padding:8px 16px;font-family:Seasons;font-style:italic;font-size:24px;color:#11120D">${t}</span>`).join("")}</div></div>`);
vin("vD", 51.1, 57.9);
js += avs.map((_, i) => `IN("#vav${i}", ${(54.5 + i * .1).toFixed(2)}, { d: .35 });`).join(" ") + "\n" + counter("#vD-n", 0, 120, 54.5, 1.5, "+") + `IN("#vD-h", 56.3, { d: .6 });\n`;
click(54.5, .06); click(56.3, .06);

// 7 · wins counter 71.5-76.75
html += VC("vW", 300, "We celebrate every win, out loud", `<div style="display:flex;align-items:baseline;gap:18px"><span class="serif" id="vW-n" style="font-size:110px">0</span><span style="font-size:18px;color:#3B3A36;line-height:1.4">wins celebrated<br>this month</span></div>
  <div style="margin-top:14px;display:flex;gap:8px">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<span id="vwc${i}" style="width:34px;height:34px;background:#D8C2EC;display:grid;place-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#11120D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`).join("")}</div>
  <div id="vW-s" style="margin-top:16px;font-size:18px;color:#3B3A36">even the tiny ones</div>`);
vin("vW", 71.5, 76.75);
js += counter("#vW-n", 0, 47, 71.9, 2.4) + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => `IN("#vwc${i}", ${(72.0 + i * .22).toFixed(2)}, { d: .3 });`).join(" ") + ` IN("#vW-s", 73.8, { d: .6 });\n`;
click(71.9, .06);

// 8 · never by yourself 83.0-85.55
const ring8 = [["st_w12.jpg", -150, -10], ["st_w44.jpg", -95, -95], ["st_w90.jpg", 0, -125], ["st_w65.jpg", 95, -95], ["st_w79.jpg", 150, -10]];
html += VC("vF", 300, "In business for yourself", `<div style="position:relative;height:250px">
  <span class="round" id="vF-y" style="position:absolute;left:50%;top:120px;width:92px;height:92px;margin-left:-46px;background:#D8C2EC;display:grid;place-items:center;font-family:Seasons;font-style:italic;font-size:34px;color:#11120D">you</span>
  ${ring8.map(([img, x, y], i) => `<img class="round" id="vF-a${i}" src="img/${img}" style="position:absolute;left:50%;top:${146 + y}px;width:56px;height:56px;margin-left:${x - 28}px;border:3px solid #FAF7F2;object-fit:cover">`).join("")}
</div><div class="serif" id="vF-t" style="text-align:center;font-size:44px">never <i style="color:#F2A579">by</i> yourself</div>`, 520);
vin("vF", 82.95, 85.55);
js += `IN("#vF-y", 83.1, { d: .4 }); ` + ring8.map((_, i) => `IN("#vF-a${i}", ${(84.2 + i * .08).toFixed(2)}, { d: .3 });`).join(" ") + ` IN("#vF-t", 84.3, { d: .5 });\n`;
click(84.2, .06);

// community cutaway 28.0-34.0
html += `<div class="abs" id="pc" style="left:0;top:0;width:1920px;height:1080px;background:#F8F5EF">
  <div class="ph" id="pc-p" style="left:800px;top:0;width:1120px;height:1080px"><img src="img/community_r.jpg"></div>
  <div class="abs cap-eye" id="pc-e" style="left:130px;top:360px">The Evolve Collective</div>
  <div class="abs hl" id="pc-r" style="left:130px;top:400px"></div>
  <div class="abs serif" id="pc-t" style="left:124px;top:430px;font-size:96px">${W([["a place to", 0]])}</div>
  <div class="abs serif" id="pc-t2" style="left:124px;top:530px;font-size:96px">${W([["evolve", 1]], UL)}</div>
  <div class="abs subt" id="pc-s" style="left:130px;top:670px;width:560px">surrounded by women on the same mission as you</div>
</div>`;
js += `IN("#pc", 28.0, { d: .5 }); tl.fromTo("#pc-p", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut", immediateRender: false }, 28.0); IN("#pc-e", 28.4, { d: .7 }); tl.from("#pc-r", { scaleX: 0, duration: .8, ease: "power3.inOut" }, 28.45); WORDS("#pc-t", 28.55, { s: .1, d: .9 }); WORDS("#pc-t2", 29.0, { s: .1, d: .9 }); tl.from("#pc-t2 .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, 29.6); IN("#pc-s", 31.5, { d: .8 }); OUT("#pc", 33.5, .5);\n`;
sfx.push(["whoosh", 28.0, 0.05]); click(28.55); click(31.55, 0.07);

// more impact / more freedom card 34.1-37.0 (replaces the ticker)

// woman / magic / machine page 59.8-69.8
const col = (i, x, img, n, t, d) => `
  <div class="abs" id="m${i}" style="left:${x}px;top:200px;width:520px">
    <div class="ph" id="m${i}-p" style="position:relative;width:520px;height:500px"><img src="img/${img}.jpg"></div>
    <div class="cap-eye" id="m${i}-n" style="margin-top:28px;font-size:14px">${n}</div>
    <div class="serif" id="m${i}-t" style="margin-top:10px;font-size:58px">${W(t, UL)}</div>
    <div class="subt" id="m${i}-d" style="margin-top:10px;font-size:22px;white-space:normal">${d}</div>
  </div>`;
html += `<div class="abs" id="pm" style="left:0;top:0;width:1920px;height:1080px;background:#F8F5EF">
  <div class="abs cap-eye" id="pm-e" style="left:150px;top:118px">In here, we look after all of it</div>
  <div class="abs" id="pm-r" style="left:150px;top:156px;width:1620px;height:1px;background:rgba(17,18,13,.25);transform-origin:left center"></div>
  ${col(0, 150, "woman", "01 · The woman", [["you,", 0], ["leading", 1]], "How you lead and how you show up.")}
  ${col(1, 700, "magic", "02 · The magic", [["your", 0], ["gift", 1]], "The work only you can do, shaped into offers.")}
  ${col(2, 1250, "machine", "03 · The machine", [["the", 0], ["systems", 1]], "Everything that sells it while you live your life.")}
</div>`;
js += `IN("#pm", 59.8, { d: .5 }); IN("#pm-e", 60.0, { d: .7 }); tl.from("#pm-r", { scaleX: 0, duration: 1.2, ease: "power3.inOut" }, 60.0);\n`;
[[0, 60.4], [1, 63.04], [2, 66.3]].forEach(([i, t]) => {
  js += `tl.fromTo("#m${i}-p", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "power3.inOut", immediateRender: true }, ${t}); IN("#m${i}-n", ${(t + .45).toFixed(2)}, { d: .6 }); WORDS("#m${i}-t", ${(t + .55).toFixed(2)}, { s: .08, d: .8 }); tl.from("#m${i}-t .ul", { scaleX: 0, duration: .6, ease: "power3.inOut" }, ${(t + 1.1).toFixed(2)}); IN("#m${i}-d", ${(t + .8).toFixed(2)}, { d: .7 });\n`;
  click(t, .08);
});
js += `OUT("#pm", 69.3, .5);\n`;
sfx.push(["whoosh", 59.8, 0.05]);

// ripple page 85.6-97.3
const CX = 1300, CY = 430;
const ring = (id, r, c) => `<div class="abs round" id="${id}" style="left:${CX - r}px;top:${CY - r}px;width:${2 * r}px;height:${2 * r}px;border:2px solid ${c}"></div>`;
const tag = (id, x, y, t) => `<div class="abs card" id="${id}" style="left:${x}px;top:${y}px;padding:10px 22px;font-family:Seasons;font-weight:300;font-size:36px;color:#11120D;white-space:nowrap">${t}</div>`;
html += `<div class="abs" id="rp" style="left:0;top:0;width:1920px;height:1080px;background:#F8F5EF">
  ${ring("r3", 340, "rgba(242,165,121,.9)")}${ring("r2", 245, "rgba(216,194,236,1)")}${ring("r1", 150, "rgba(17,18,13,.85)")}
  ${[0, 1, 2, 3].map((i) => `<div class="abs round" id="pu${i}" style="left:${CX - 70}px;top:${CY - 70}px;width:140px;height:140px;border:2px solid #D8C2EC;opacity:0"></div>`).join("")}
  <div class="abs round" id="rc" style="left:${CX - 70}px;top:${CY - 70}px;width:140px;height:140px;background:#D8C2EC;display:grid;place-items:center;font-family:Seasons;font-style:italic;font-weight:300;font-size:54px;color:#11120D">you</div>
  ${tag("lb1", CX, CY + 150, "your <i style='color:#F2A579'>clients</i>")}
  ${tag("lb2", CX, CY - 245, "your <i style='color:#F2A579'>family</i>")}
  ${tag("lb3", CX, CY + 340, "so many more <i style='color:#F2A579'>people</i>")}
  <div class="abs cap-eye" id="rp-e" style="left:130px;top:380px">When you get your time back</div>
  <div class="abs hl" id="rp-r" style="left:130px;top:420px"></div>
  <div class="abs serif" id="rp-t" style="left:124px;top:450px;font-size:100px">${W([["a", 0], ["ripple", 1]], UL)}</div>
  <div class="abs serif" id="rp-t2" style="left:124px;top:556px;font-size:100px">${W([["effect", 0]])}</div>
  <div class="abs subt" id="rp-s" style="left:130px;top:700px">that we get to leave in this world</div>
</div>`;
js += `gsap.set(["#lb1", "#lb2", "#lb3"], { xPercent: -50, yPercent: -50 });
IN("#rp", 85.6, { d: .5 }); IN("#rc", 85.9, { d: .6 }); IN("#rp-e", 86.0, { d: .7 }); tl.from("#rp-r", { scaleX: 0, duration: .8, ease: "power3.inOut" }, 86.05);
tl.from("#r1", { opacity: 0, scale: .2, duration: 1.1, ease: "power3.out" }, 87.0); IN("#lb1", 87.45, { d: .6 });
tl.from("#r2", { opacity: 0, scale: .2, duration: 1.2, ease: "power3.out" }, 88.95); IN("#lb2", 89.4, { d: .6 });
tl.from("#r3", { opacity: 0, scale: .2, duration: 1.3, ease: "power3.out" }, 90.8); IN("#lb3", 91.3, { d: .6 });
WORDS("#rp-t", 93.9, { s: .1, d: .9 }); WORDS("#rp-t2", 94.2, { s: .1, d: .9 }); tl.from("#rp-t .ul", { scaleX: 0, duration: .7, ease: "power3.inOut" }, 94.6); IN("#rp-s", 95.2, { d: .8 });
${[0, 1, 2, 3].map((i) => `tl.fromTo("#pu${i}", { opacity: .8, scale: 1 }, { opacity: 0, scale: 5.6, duration: 2.0, ease: "power2.out", immediateRender: false }, ${(93.9 + i * .5).toFixed(2)});`).join("\n")}
OUT("#rp", 96.9, .4);\n`;
sfx.push(["whoosh", 85.6, 0.05]); sfx.push(["pop", 85.9, .08], ["pop", 87.0, .07], ["pop", 88.95, .07], ["pop", 90.8, .07]); click(93.9, .07);

// iPhone pop-up 107.5-112.3 · realistic iOS community thread
const SYS = `font-family:-apple-system,'SF Pro Text','Segoe UI','Helvetica Neue',Arial,sans-serif`;
const bub = (id, img, name, text, top, react = "") => `<div id="${id}" style="position:absolute;left:12px;right:46px;top:${top}px;display:flex;gap:8px;align-items:flex-end">
  <img src="img/${img}" style="flex:none;width:30px;height:30px;border-radius:50%;object-fit:cover">
  <div style="position:relative"><div style="font-size:11px;color:#8E8E93;margin:0 0 3px 12px">${name}</div>
  <div style="background:#E9E9EB;color:#000;font-size:14.5px;line-height:1.3;padding:8px 13px;border-radius:18px">${text}</div>${react}</div></div>`;
const KEYS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const kb = `<div id="kb" style="position:absolute;left:0;right:0;bottom:0;height:236px;background:#D1D4DA;padding:8px 3px 0">
  ${KEYS.map((r, ri) => `<div style="display:flex;justify-content:center;gap:5px;margin-bottom:10px;padding:0 ${ri === 1 ? 14 : ri === 2 ? 40 : 0}px">${r.split("").map((k) => `<span style="flex:1;max-width:27px;height:38px;background:#FFF;border-radius:5px;box-shadow:0 1px 0 #898A8D;display:grid;place-items:center;font-size:17px;color:#000">${k}</span>`).join("")}</div>`).join("")}
  <div style="display:flex;gap:6px;padding:0 3px"><span style="width:84px;height:38px;background:#ABB0BA;border-radius:5px;display:grid;place-items:center;font-size:14px">123</span><span style="flex:1;height:38px;background:#FFF;border-radius:5px;display:grid;place-items:center;font-size:14px;color:#000">space</span><span style="width:84px;height:38px;background:#ABB0BA;border-radius:5px;display:grid;place-items:center;font-size:14px">return</span></div></div>`;
const heart = `<span id="ip-h" style="position:absolute;right:-10px;top:8px;width:26px;height:26px;border-radius:50%;background:#FFF;border:2px solid #F2F2F7;display:grid;place-items:center;font-size:13px;color:#E0526B">&#9829;</span>`;
html += `<div class="abs ios" id="ip" style="left:150px;top:118px;width:350px;height:720px;border-radius:60px;padding:5px;background:linear-gradient(145deg,#6B6470,#2B2730 40%,#4A4450 70%,#1E1B22)">
  <span style="position:absolute;left:-4px;top:150px;width:4px;height:34px;background:#3A3540;border-radius:2px"></span><span style="position:absolute;left:-4px;top:200px;width:4px;height:58px;background:#3A3540;border-radius:2px"></span><span style="position:absolute;right:-4px;top:210px;width:4px;height:84px;background:#3A3540;border-radius:2px"></span>
  <div style="width:100%;height:100%;border-radius:55px;background:#000;padding:9px">
  <div style="position:relative;width:100%;height:100%;border-radius:46px;overflow:hidden;background:#FFF;${SYS}">
    <div style="position:absolute;left:0;right:0;top:0;height:50px;display:flex;align-items:center;justify-content:space-between;padding:4px 28px 0 34px;font-size:15px;font-weight:600;color:#000;z-index:4">
      <span>9:41</span>
      <span style="display:flex;gap:5px;align-items:center">
        <svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#000"/><rect x="5" y="5" width="3" height="6" rx="1" fill="#000"/><rect x="10" y="2.5" width="3" height="8.5" rx="1" fill="#000"/><rect x="15" y="0" width="3" height="11" rx="1" fill="#000"/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11"><path d="M8 10.5l2.2-2.6a3.2 3.2 0 0 0-4.4 0z" fill="#000"/><path d="M3.6 5.9a6.3 6.3 0 0 1 8.8 0l-1.4 1.6a4.2 4.2 0 0 0-6 0z" fill="#000"/><path d="M1.2 3.2a9.7 9.7 0 0 1 13.6 0l-1.4 1.6a7.6 7.6 0 0 0-10.8 0z" fill="#000"/></svg>
        <svg width="26" height="12" viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3.2" fill="none" stroke="#000" opacity=".4"/><rect x="2" y="2" width="17" height="8" rx="2" fill="#000"/><rect x="23.5" y="4" width="1.8" height="4" rx=".9" fill="#000" opacity=".4"/></svg>
      </span></div>
    <div style="position:absolute;left:50%;top:11px;width:112px;height:33px;margin-left:-56px;background:#000;border-radius:20px;z-index:5"></div>
    <div style="position:absolute;left:0;right:0;top:50px;height:84px;background:rgba(249,249,249,.94);border-bottom:.5px solid #D8D8DC;z-index:3">
      <div style="position:absolute;left:12px;top:24px;color:#D8C2EC;font-size:16px;display:flex;align-items:center;gap:2px"><svg width="12" height="20" viewBox="0 0 12 20"><path d="M10 2 2 10l8 8" fill="none" stroke="#D8C2EC" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>48</div>
      <div style="position:absolute;left:0;right:0;top:4px;display:flex;flex-direction:column;align-items:center">
        <img src="img/eh_logo_tile.png" style="width:42px;height:42px;border-radius:50%;object-fit:cover;display:block">
        <span style="margin-top:4px;font-size:12px;color:#000;font-weight:500">#introductions &rsaquo;</span>
        <span style="font-size:10px;color:#8E8E93">The Evolve Collective &middot; 248 members</span></div>
      <svg style="position:absolute;right:16px;top:28px" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D8C2EC" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-5M12 8h.01" stroke-linecap="round"/></svg>
    </div>
    <div id="ip-body" style="position:absolute;left:0;right:0;top:134px;bottom:0">
      <div style="text-align:center;font-size:11px;color:#8E8E93;margin-top:12px"><b style="font-weight:600">Today</b> 9:38 AM</div>
      ${bub("th1", "st_w65.jpg", "Sarah", "Hi everyone! Breathwork coach &#127807; My magic is helping women slow down.", 36, heart)}
      ${bub("th2", "st_w32.jpg", "Jess", "Free Friday afternoons = beach + a long lunch &#9728;&#65039;", 136)}
      ${bub("th3", "st_w79.jpg", "Amy", "Welcome, Evolvers! So glad you're here &#128156;", 222)}
      <div id="th4" style="position:absolute;right:12px;top:300px;max-width:210px;background:#D8C2EC;color:#11120D;font-size:14.5px;line-height:1.3;padding:8px 13px;border-radius:18px">Hi Sarah! So lovely to meet you</div>
      <div id="th5" style="position:absolute;right:16px;top:356px;font-size:11px;color:#8E8E93">Delivered</div>
      <div id="ip-in" style="position:absolute;left:0;right:0;bottom:22px;height:48px;display:flex;align-items:center;gap:8px;padding:0 10px;background:#FFF">
        <span style="flex:none;width:32px;height:32px;border-radius:50%;background:#E9E9EB;display:grid;place-items:center;font-size:22px;color:#8E8E93;line-height:1">+</span>
        <div style="position:relative;flex:1;height:36px;border:1px solid #D1D1D6;border-radius:18px;display:flex;align-items:center;padding:0 40px 0 14px;font-size:14.5px;color:#C7C7CC">
          <span id="ty-ph">Message</span><span id="ty-in" style="position:absolute;left:14px;color:#000;white-space:nowrap;overflow:hidden;clip-path:inset(0 100% 0 0)">Hi Sarah! So lovely to meet you</span>
          <span id="ty-send" style="position:absolute;right:4px;width:28px;height:28px;border-radius:50%;background:#D8C2EC;display:grid;place-items:center;opacity:.25"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#11120D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span>
        </div></div>
      ${kb}
    </div>
    <div style="position:absolute;left:50%;bottom:8px;width:120px;height:5px;margin-left:-60px;background:#000;border-radius:3px;z-index:6"></div>
  </div></div></div>
<div class="abs card" id="ipc" style="left:540px;top:150px;padding:22px 30px">
  <div class="cap-eye" style="font-size:14px">Then</div>
  <div class="serif" id="ipc-t" style="margin-top:8px;font-size:48px">${W([["say hi in the", 0], ["thread", 1]], UL)}</div>
</div>`;
js += `gsap.set("#kb", { yPercent: 100 }); gsap.set("#ip-h", { scale: 0 });
IN("#ip", 107.5, { d: .55 }); IN("#ipc", 107.7, { d: .6 }); WORDS("#ipc-t", 107.8, { s: .08, d: .7 }); tl.from("#ipc-t .ul", { scaleX: 0, duration: .6, ease: "power3.inOut" }, 108.5);
IN("#th1", 107.8, { d: .4 }); IN("#th2", 108.25, { d: .4 }); IN("#th3", 108.7, { d: .4 });
tl.to("#kb", { yPercent: 0, duration: .35, ease: "power3.out" }, 108.95); tl.to("#ip-in", { y: -214, duration: .35, ease: "power3.out" }, 108.95);
tl.to("#ty-ph", { opacity: 0, duration: .1 }, 109.2); tl.to("#ty-in", { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "steps(30)" }, 109.2); tl.to("#ty-send", { opacity: 1, duration: .15 }, 109.25);
tl.to("#ty-send", { scale: .85, duration: .08, yoyo: true, repeat: 1 }, 110.45); tl.to("#ty-in", { opacity: 0, duration: .12 }, 110.55); tl.to("#ty-send", { opacity: .25, duration: .15 }, 110.55);
tl.to("#kb", { yPercent: 100, duration: .35, ease: "power3.in" }, 110.6); tl.to("#ip-in", { y: 0, duration: .35, ease: "power3.in" }, 110.6);
IN("#th4", 110.6, { d: .3 }); IN("#th5", 110.95, { d: .3 }); tl.to("#ip-h", { scale: 1, duration: .35, ease: "back.out(2.5)" }, 111.1);
OUT("#ip", 111.8, .5); OUT("#ipc", 111.8, .5);\n`;
sfx.push(["ping", 107.8, .045], ["ping", 108.25, .04], ["ping", 108.7, .04]); click(110.45, .1);

scenes.pops = {
  dur: D,
  sfx,
  body: CSS6 + `<style>html,body,#root{background:transparent!important}.grain,#endfade{display:none!important}</style>` + html,
  js: js + END(D),
};


// round 10: no soft pop, no synthetic typing (typing comes from CapCut's SFX library)
for (const sc of Object.values(scenes)) sc.sfx = sc.sfx.filter(([n]) => n !== "pop" && n !== "type");
export default scenes;
