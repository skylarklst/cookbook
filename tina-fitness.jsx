import { useState, useEffect } from "react";

const EXERCISES = {
  "Lower Body Strength": [
    { name: "Squat ×10 ×3", vid: "e1UYgO67zkw" },           // "How to Squat Properly for WOMEN"
    { name: "Glute Bridge ×12 ×3", vid: "mfdlES3uZNA" },    // "TWO Glute Bridge Exercises for Women Beginners"
    { name: "Dumbbell Deadlift ×10 ×3", vid: "w_SjJhIB7XU" }, // Women's Strength Nation - Dumbbell Deadlift
    { name: "Plank 30s ×3", vid: "ASdvSqKTZ6s" },
  ],
  "Upper Body (Arms)": [
    { name: "Shoulder Press ×10 ×3", vid: "seUCEgPsBtc" },  // "Ladies Dumbbell Shoulder Press Exercise"
    { name: "Dumbbell Row ×10 ×3", vid: "HUp6djHa37Y" },    // Women's Strength Nation - Dumbbell Bent Over Row
    { name: "Bicep Curl ×12 ×3", vid: "K5Sz5sIqaWU" },      // Bicep Curls & Tricep Extensions (YMCA, neutral)
    { name: "Tricep Extension ×12 ×3", vid: "YM8iX9BJWjA" }, // Women's Strength Nation - Overhead Tricep Extension
  ],
  "Light Arms": [
    { name: "Bicep Curl ×12", vid: "K5Sz5sIqaWU" },
    { name: "Tricep Extension ×12", vid: "YM8iX9BJWjA" },   // Women's Strength Nation
  ],
  "Full Body": [
    { name: "Squat ×10 ×3", vid: "e1UYgO67zkw" },           // Women's squat tutorial
    { name: "Shoulder Press ×10 ×3", vid: "seUCEgPsBtc" },  // Ladies shoulder press
    { name: "Plank 30s ×3", vid: "ASdvSqKTZ6s" },
    { name: "Bicep Curl ×12 ×3", vid: "K5Sz5sIqaWU" },
  ],
  "Lunch Walk": [{ name: "Walking Pad How-To", vid: "4kEOLbAFkQ0" }],
  "Cardio Walk": [{ name: "Interval Walk/Run Tutorial", vid: "YnBb3W1430U" }],
  "Rest & Recovery": [{ name: "Full Body Stretching", vid: "L_xrDAtykMI" }],
};

function getExercises(label) {
  for (const key of Object.keys(EXERCISES)) {
    if (label.includes(key)) return EXERCISES[key];
  }
  return null;
}

const PLAN = {
  1: { type: "Training", label: "Lower Body + Core", schedule: [
    { time: "12:30", label: "🚶 Lunch Walk", detail: "Walking pad • Incline 8–10% • Speed Lv3 • 15–20 mins" },
    { time: "18:00", label: "💪 Lower Body Strength", detail: "Squat ×10 ×3 | Glute Bridge ×12 ×3 | Deadlift ×10 ×3 | Plank 30s ×3" },
  ]},
  2: { type: "Light", label: "Walking / Optional Arms", schedule: [
    { time: "Anytime", label: "🚶 Walking", detail: "Target 6000+ steps (natural on office days)" },
    { time: "Optional", label: "💪 Light Arms", detail: "Bicep Curl ×12 | Tricep Extension ×12" },
  ]},
  3: { type: "Training", label: "Upper Body (Arms)", schedule: [
    { time: "12:30", label: "🚶 Lunch Walk", detail: "Walking pad • Incline 8–10% • Speed Lv3 • 15–20 mins" },
    { time: "18:00", label: "💪 Upper Body (Arms)", detail: "Shoulder Press ×10 ×3 | Row ×10 ×3 | Curl ×12 ×3 | Tricep ×12 ×3" },
  ]},
  4: { type: "Cardio", label: "Incline Walking", schedule: [
    { time: "Anytime", label: "🏃 Cardio Walk", detail: "Interval: Lv3 (2 min) → Lv5–6 (30s) × 6–8 rounds" },
  ]},
  5: { type: "Training", label: "Full Body", schedule: [
    { time: "12:30", label: "🚶 Lunch Walk", detail: "Walking pad • Incline 8–10% • Speed Lv3 • 15–20 mins" },
    { time: "18:00", label: "💪 Full Body", detail: "Mix of lower + upper + core • 30 mins" },
  ]},
  6: { type: "Active", label: "Outdoor Walk / Movement", schedule: [
    { time: "Anytime", label: "🌿 Active Rest", detail: "Outdoor walk • Target 8000–10000 steps" },
  ]},
  0: { type: "Rest", label: "Recovery / Stretching", schedule: [
    { time: "Anytime", label: "😴 Rest & Recovery", detail: "Stretching • Light movement • Sleep by 23:30" },
  ]},
};

const TYPE_COLOR = { Training:"#FF6B35", Light:"#4ECDC4", Cardio:"#FFE66D", Active:"#A8E6CF", Rest:"#B8B8FF" };
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getSlot(h) {
  if (h < 12) return "morning";
  if (h < 14) return "lunch";
  if (h < 18) return "afternoon";
  if (h < 20) return "evening";
  return "night";
}

function VideoPanel({ videoId, onClose }) {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const thumb = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
  return (
    <div style={{ marginTop: 10, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "block", position: "relative", textDecoration: "none" }}>
        <img src={thumb} alt="Exercise tutorial" style={{ width: "100%", display: "block", borderRadius: "10px 10px 0 0" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "20px 12px 10px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ background: "#FF0000", borderRadius: 4, padding: "3px 8px", fontSize: 11, color: "#fff", fontWeight: 700 }}>Play</div>
          <span style={{ color: "#fff", fontSize: 11 }}>Tap to open in YouTube</span>
        </div>
      </a>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "6px 10px", background: "#1a1a1a" }}>
        <div onClick={onClose} style={{ fontSize: 11, color: "#888", cursor: "pointer" }}>close</div>
      </div>
    </div>
  );
}

function ExerciseList({ exercises, accent }) {
  const [active, setActive] = useState(null);
  return (
    <div style={{ marginTop: 10 }}>
      {exercises.map((ex, i) => (
        <div key={i}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px", marginBottom: 4, borderRadius: 8, background: "rgba(255,255,255,0.05)" }}>
            <span style={{ fontSize: 13, color: "#ddd" }}>{ex.name}</span>
            <button
              onClick={() => setActive(active === i ? null : i)}
              style={{ background: active === i ? accent + "44" : "transparent", border: `1px solid ${accent}77`, color: accent, borderRadius: 6, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
              {active === i ? "▲ hide" : "▶ watch"}
            </button>
          </div>
          {active === i && <VideoPanel videoId={ex.vid} onClose={() => setActive(null)} />}
        </div>
      ))}
    </div>
  );
}

export default function TinaFitness() {
  const [now, setNow] = useState(new Date());
  const [done, setDone] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const day = PLAN[now.getDay()];
  const hour = now.getHours();
  const slot = getSlot(hour);
  const accent = TYPE_COLOR[day.type];
  const dayName = DAYS[now.getDay()];

  const nextTask = day.schedule.find((s, i) => {
    if (!done[i]) {
      const h = parseInt(s.time?.split(":")?.[0] ?? "0");
      return isNaN(h) || hour <= h;
    }
    return false;
  }) ?? day.schedule.find((_, i) => !done[i]);

  const greeting = slot === "morning" ? "Good morning, Tina! ☀️" : slot === "lunch" ? "Lunch time! 🥗" : slot === "afternoon" ? "Keep going! 💪" : slot === "evening" ? "Time to train! 🔥" : "Wind down 🌙";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", fontFamily: "'DM Sans', sans-serif", color: "#fff", padding: "24px 20px 48px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "#aaa", textTransform: "uppercase", marginBottom: 4 }}>
          {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </div>
        <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: 21, margin: 0 }}>{greeting}</h1>
        <div style={{ display: "inline-block", marginTop: 10, padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, background: accent + "33", border: `1px solid ${accent}88`, color: accent }}>
          {dayName}: {day.type} — {day.label}
        </div>
      </div>

      {/* NOW card */}
      {nextTask && (
        <div style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${accent}55`, borderLeft: `4px solid ${accent}`, borderRadius: 16, padding: "18px 18px", marginBottom: 20, boxShadow: `0 0 30px ${accent}22` }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#aaa", textTransform: "uppercase", marginBottom: 6 }}>▶ Do This Now</div>
          <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>{nextTask.label}</div>
          <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>{nextTask.detail}</div>
          {nextTask.time && nextTask.time !== "Anytime" && nextTask.time !== "Optional" && (
            <div style={{ marginTop: 6, fontSize: 12, color: accent }}>⏰ {nextTask.time}</div>
          )}
          {getExercises(nextTask.label) && (
            <ExerciseList exercises={getExercises(nextTask.label)} accent={accent} />
          )}
        </div>
      )}

      {/* Schedule */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#888", textTransform: "uppercase", marginBottom: 12 }}>Today's Schedule</div>
        {day.schedule.map((s, i) => {
          const exList = getExercises(s.label);
          return (
            <div key={i} style={{ marginBottom: 10, borderRadius: 12, background: done[i] ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)", opacity: done[i] ? 0.5 : 1, border: s === nextTask && !done[i] ? `1px solid ${accent}44` : "1px solid transparent", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 14px", cursor: "pointer" }} onClick={() => setDone(d => ({ ...d, [i]: !d[i] }))}>
                <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1, border: `2px solid ${done[i] ? "#4ECDC4" : "#555"}`, background: done[i] ? "#4ECDC4" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{done[i] ? "✓" : ""}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, textDecoration: done[i] ? "line-through" : "none" }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 3, lineHeight: 1.5 }}>{s.detail}</div>
                  {s.time && <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>⏰ {s.time}</div>}
                </div>
                {exList && !done[i] && (
                  <button
                    onClick={e => { e.stopPropagation(); setExpanded(x => ({ ...x, [i]: !x[i] })); }}
                    style={{ background: expanded[i] ? accent + "33" : "transparent", border: `1px solid ${accent}66`, color: accent, borderRadius: 8, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 700, flexShrink: 0 }}>
                    {expanded[i] ? "▲" : "📹"}
                  </button>
                )}
              </div>
              {exList && expanded[i] && !done[i] && (
                <div style={{ padding: "0 14px 14px" }}>
                  <ExerciseList exercises={exList} accent={accent} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly */}
      <div>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#888", textTransform: "uppercase", marginBottom: 12 }}>Week at a Glance</div>
        <div style={{ display: "flex", gap: 6 }}>
          {Object.entries(PLAN).map(([d, p]) => {
            const isToday = parseInt(d) === now.getDay();
            return (
              <div key={d} style={{ flex: 1, padding: "8px 2px", borderRadius: 10, textAlign: "center", background: isToday ? TYPE_COLOR[p.type] + "22" : "rgba(255,255,255,0.04)", border: isToday ? `1px solid ${TYPE_COLOR[p.type]}77` : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 10, color: isToday ? TYPE_COLOR[p.type] : "#888", fontWeight: 700 }}>{DAYS[parseInt(d)]}</div>
                <div style={{ fontSize: 8, color: "#666", marginTop: 2 }}>{p.type}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nutrition */}
      <div style={{ marginTop: 20, padding: "13px 16px", borderRadius: 12, background: "rgba(255,230,109,0.08)", border: "1px solid rgba(255,230,109,0.2)", fontSize: 12, color: "#FFE66D" }}>
        🍽 No food after 7pm · Protein 70–90g · Sleep by 23:30
      </div>
    </div>
  );
}
