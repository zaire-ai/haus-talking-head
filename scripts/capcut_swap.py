"""Swap rendered files into a CapCut draft (CapCut must be CLOSED; this script closes and relaunches it).
usage:
  python capcut_swap.py <draft_folder> swap  old_stem=new_path [old_stem=new_path ...]
  python capcut_swap.py <draft_folder> start name_prefix=seconds ...      (move segments)
  python capcut_swap.py <draft_folder> end   seconds                      (trim every main/overlay track + project to this length)
  python capcut_swap.py <draft_folder> list
<draft_folder> = %LOCALAPPDATA%/CapCut/User Data/Projects/com.lveditor.draft/<project folder>
Edits BOTH draft_content.json and Timelines/<id>/draft_content.json (they must match) and backs up first.
Matches materials by filename stem (no extension). New files must have NEW names: CapCut caches by path.
"""
import json, sys, os, glob, shutil, subprocess, time
draft, cmd, args = sys.argv[1], sys.argv[2], sys.argv[3:]
files = [os.path.join(draft, "draft_content.json")] + glob.glob(os.path.join(draft, "Timelines", "*", "draft_content.json"))
if cmd != "list":
    subprocess.run(["powershell", "-NoProfile", "-Command", "Get-Process CapCut -ErrorAction SilentlyContinue | Stop-Process -Force; Start-Sleep 3"])
    shutil.copy(files[0], files[0] + f".bak_{int(time.time())}")
for f in files:
    d = json.load(open(f, encoding="utf8"))
    vm = {v["id"]: v for v in d["materials"]["videos"]}
    am = {a["id"]: a for a in d["materials"]["audios"]}
    name = lambda s: (vm.get(s["material_id"]) or am.get(s["material_id"]) or {}).get("material_name") or am.get(s["material_id"], {}).get("name", "?")
    if cmd == "list":
        for t in d["tracks"]:
            print(t["type"], [(name(s), round(s["target_timerange"]["start"] / 1e6, 2), round(s["target_timerange"]["duration"] / 1e6, 2)) for s in t["segments"]])
        break
    if cmd == "swap":
        for kv in args:
            old, new = kv.split("=", 1)
            for m in vm.values():
                if m["material_name"].rsplit(".", 1)[0] == old:
                    m["path"] = new.replace("\\", "/"); m["material_name"] = os.path.basename(new)
    if cmd == "start":
        for kv in args:
            pre, sec = kv.split("=")
            for t in d["tracks"]:
                for s in t["segments"]:
                    if name(s).startswith(pre): s["target_timerange"]["start"] = int(round(float(sec) * 1e6))
    if cmd == "end":
        E = int(round(float(args[0]) * 1e6))
        for t in d["tracks"]:
            for s in t["segments"]:
                st = s["target_timerange"]["start"]
                if st + s["target_timerange"]["duration"] > E:
                    s["target_timerange"]["duration"] = s["source_timerange"]["duration"] = max(0, E - st)
        d["duration"] = E
    json.dump(d, open(f, "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
    print("patched", f)
if cmd != "list":
    exe = os.path.expandvars(r"%LOCALAPPDATA%\CapCut\Apps\CapCut.exe")
    subprocess.Popen([exe])
    print("CapCut relaunched")
