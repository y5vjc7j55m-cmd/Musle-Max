import { useState, useEffect, useRef, useCallback } from "react";

// ─── EXERCISE IMAGE MAP (Unsplash fitness photos) ─────────────────────────────
const EX_IMG = {
  "Barbell Bench Press":        "https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=80&h=80&fit=crop",
  "Incline Dumbbell Press":     "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&h=80&fit=crop",
  "Cable Fly":                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop",
  "Dips (Chest-focused)":       "https://images.unsplash.com/photo-1598971639058-fab3c3109a13?w=80&h=80&fit=crop",
  "Push-Up":                    "https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=80&h=80&fit=crop",
  "Deadlift":                   "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=80&h=80&fit=crop",
  "Barbell Row":                "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=80&h=80&fit=crop",
  "Pull-Up / Lat Pulldown":     "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=80&h=80&fit=crop",
  "Seated Cable Row":           "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&h=80&fit=crop",
  "Face Pull":                  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=80&h=80&fit=crop",
  "Overhead Press (BB/DB)":     "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=80&h=80&fit=crop",
  "Lateral Raise":              "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=80&h=80&fit=crop",
  "Front Raise":                "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=80&h=80&fit=crop",
  "Rear Delt Fly":              "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=80&h=80&fit=crop",
  "Barbell Curl":               "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=80&h=80&fit=crop",
  "Incline Dumbbell Curl":      "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=80&h=80&fit=crop",
  "Hammer Curl":                "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=80&h=80&fit=crop",
  "Cable Curl":                 "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&h=80&fit=crop",
  "Close-Grip Bench Press":     "https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=80&h=80&fit=crop",
  "Overhead Tricep Extension":  "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=80&h=80&fit=crop",
  "Tricep Pushdown":            "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=80&h=80&fit=crop",
  "Skull Crusher":              "https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=80&h=80&fit=crop",
  "Barbell Squat":              "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=80&h=80&fit=crop",
  "Romanian Deadlift":          "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=80&h=80&fit=crop",
  "Leg Press":                  "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=80&h=80&fit=crop",
  "Leg Curl":                   "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=80&h=80&fit=crop",
  "Leg Extension":              "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=80&h=80&fit=crop",
  "Standing Calf Raise":        "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=80&h=80&fit=crop",
  "Lunges":                     "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop",
  "Plank":                      "https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=80&h=80&fit=crop",
  "Hanging Leg Raise":          "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=80&h=80&fit=crop",
  "Cable Crunch":               "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&h=80&fit=crop",
  "Ab Rollout":                 "https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=80&h=80&fit=crop",
  "Stair Climber":              "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=80&h=80&fit=crop",
  "Treadmill / Bike LISS":      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=80&h=80&fit=crop",
  "Jump Rope":                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop",
};
const DEFAULT_IMG = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=80&h=80&fit=crop";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0a0a0a;color:#f0f0f0;font-family:'DM Sans',sans-serif;}
  .app{min-height:100vh;max-width:430px;margin:0 auto;position:relative;}
  .screen{padding:28px 24px 40px;position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;}
  .logo{font-family:'Bebas Neue',sans-serif;font-size:2.6rem;letter-spacing:3px;color:#e8ff00;line-height:1;}
  .logo span{color:#f0f0f0;}
  .steps{display:flex;gap:6px;margin-bottom:32px;}
  .step-dot{height:3px;border-radius:2px;background:#2a2a2a;flex:1;transition:background .3s;}
  .step-dot.active{background:#e8ff00;}
  .step-dot.done{background:#b8cc00;}
  .screen-title{font-family:'Bebas Neue',sans-serif;font-size:2rem;letter-spacing:2px;margin-bottom:6px;line-height:1.1;}
  .screen-sub{color:#888;font-size:.85rem;margin-bottom:28px;font-weight:300;}
  .options{display:flex;flex-direction:column;gap:12px;flex:1;}
  .opt-card{border:1.5px solid #2a2a2a;border-radius:14px;padding:18px 20px;cursor:pointer;transition:all .2s;background:#181818;display:flex;align-items:center;gap:16px;}
  .opt-card.selected{border-color:#e8ff00;background:#1a1e00;}
  .opt-icon{font-size:1.8rem;width:40px;text-align:center;flex-shrink:0;}
  .opt-text h3{font-size:.95rem;font-weight:600;margin-bottom:2px;}
  .opt-text p{font-size:.75rem;color:#888;font-weight:300;}
  .opt-check{margin-left:auto;width:22px;height:22px;border-radius:50%;border:1.5px solid #2a2a2a;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .2s;}
  .opt-card.selected .opt-check{background:#e8ff00;border-color:#e8ff00;}
  .days-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
  .day-btn{aspect-ratio:1;border-radius:12px;border:1.5px solid #2a2a2a;background:#181818;cursor:pointer;font-family:'Bebas Neue',sans-serif;font-size:1.4rem;color:#555;display:flex;align-items:center;justify-content:center;transition:all .2s;}
  .day-btn.selected{border-color:#e8ff00;color:#e8ff00;background:#1a1e00;}
  .btn-next{margin-top:auto;padding-top:24px;}
  .btn{width:100%;padding:17px;border-radius:14px;border:none;cursor:pointer;font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:2px;transition:all .2s;}
  .btn-primary{background:#e8ff00;color:#0a0a0a;}
  .btn-primary:disabled{background:#2a2a2a;color:#555;cursor:not-allowed;}
  .btn-secondary{background:transparent;color:#888;border:1.5px solid #2a2a2a;margin-top:10px;}
  .gender-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .gender-card{border:1.5px solid #2a2a2a;border-radius:16px;padding:24px 16px;cursor:pointer;background:#181818;text-align:center;transition:all .2s;}
  .gender-card.selected{border-color:#e8ff00;background:#1a1e00;}
  .gender-icon{font-size:2.8rem;margin-bottom:10px;}
  .gender-label{font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:2px;}
  .result-screen{padding-bottom:60px;}
  .program-header{background:linear-gradient(135deg,#1a1e00,#0f1200);border:1.5px solid #e8ff00;border-radius:16px;padding:20px;margin-bottom:20px;}
  .program-tag{font-size:.7rem;color:#e8ff00;letter-spacing:3px;text-transform:uppercase;margin-bottom:6px;}
  .program-title{font-family:'Bebas Neue',sans-serif;font-size:1.7rem;letter-spacing:2px;}
  .program-meta{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;}
  .meta-pill{background:rgba(232,255,0,.1);border:1px solid rgba(232,255,0,.2);border-radius:20px;padding:4px 12px;font-size:.72rem;color:#e8ff00;font-weight:500;}
  .day-block{margin-bottom:16px;}
  .day-header{background:#181818;border:1px solid #2a2a2a;border-radius:12px 12px 0 0;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;}
  .day-header.rest-header{border-radius:12px;}
  .day-name{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;letter-spacing:2px;}
  .day-focus{font-size:.72rem;color:#e8ff00;font-weight:500;}
  .day-toggle{color:#888;font-size:1.1rem;transition:transform .2s;}
  .day-toggle.open{transform:rotate(180deg);}
  .exercise-list{background:#0f0f0f;border:1px solid #2a2a2a;border-top:none;border-radius:0 0 12px 12px;overflow:hidden;}
  .exercise-item{padding:12px 16px;border-bottom:1px solid #1a1a1a;display:flex;align-items:center;gap:12px;}
  .exercise-item:last-child{border-bottom:none;}
  .ex-img{width:52px;height:52px;border-radius:10px;object-fit:cover;flex-shrink:0;border:1px solid #2a2a2a;}
  .ex-info{flex:1;min-width:0;}
  .ex-name{font-size:.88rem;font-weight:500;margin-bottom:3px;}
  .ex-detail{font-size:.75rem;color:#888;font-weight:300;}
  .ex-note{font-size:.7rem;color:#555;font-style:italic;margin-top:2px;}
  .ex-num{width:22px;height:22px;border-radius:6px;background:rgba(232,255,0,.1);border:1px solid rgba(232,255,0,.2);color:#e8ff00;font-size:.68rem;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .section-label{font-family:'Bebas Neue',sans-serif;font-size:.85rem;letter-spacing:3px;color:#555;margin:20px 0 10px;}
  .tip-box{background:#181818;border:1px solid #2a2a2a;border-radius:10px;padding:12px 14px;margin-bottom:8px;font-size:.8rem;color:#888;line-height:1.5;}
  .splash{flex:1;display:flex;flex-direction:column;justify-content:space-between;padding-bottom:10px;}
  .splash-tagline{font-size:.85rem;color:#888;margin-top:8px;font-weight:300;letter-spacing:1px;}
  .splash-visual{flex:1;display:flex;align-items:center;justify-content:center;font-size:8rem;line-height:1;}
  .splash-desc{color:#888;font-size:.85rem;font-weight:300;line-height:1.6;margin-bottom:28px;}

  /* ── WATER BANNER ── */
  .water-banner{
    background:linear-gradient(135deg,#001a2e,#002a45);
    border:1px solid #0088cc;
    border-radius:14px;padding:14px 16px;
    display:flex;align-items:center;gap:12px;
    margin-bottom:16px;animation:pulse-blue 2s infinite;
  }
  @keyframes pulse-blue{0%,100%{border-color:#0088cc;}50%{border-color:#00bbff;}}
  .water-icon{font-size:1.6rem;flex-shrink:0;}
  .water-text{font-size:.82rem;color:#66ccff;line-height:1.4;}
  .water-text strong{color:#00ccff;display:block;font-size:.88rem;margin-bottom:2px;}

  /* ── PLAY BUTTON ── */
  .play-btn{
    display:flex;align-items:center;justify-content:center;gap:10px;
    width:100%;padding:16px;border-radius:14px;border:none;cursor:pointer;
    background:linear-gradient(135deg,#e8ff00,#b8cc00);color:#0a0a0a;
    font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:2px;
    margin-bottom:10px;transition:all .2s;
  }
  .play-btn:hover{transform:scale(1.01);}
  .play-icon{font-size:1.3rem;}

  /* ── WORKOUT MODE ── */
  .workout-screen{min-height:100vh;background:#0a0a0a;display:flex;flex-direction:column;}
  .workout-header{padding:20px 24px 0;display:flex;align-items:center;justify-content:space-between;}
  .workout-progress{height:4px;background:#1a1a1a;border-radius:2px;margin:16px 24px 0;}
  .workout-progress-fill{height:100%;background:#e8ff00;border-radius:2px;transition:width .5s;}
  .workout-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;}

  .timer-ring{position:relative;width:200px;height:200px;margin-bottom:24px;}
  .timer-svg{transform:rotate(-90deg);}
  .timer-bg{fill:none;stroke:#1a1a1a;stroke-width:8;}
  .timer-arc{fill:none;stroke-width:8;stroke-linecap:round;transition:stroke-dashoffset .5s linear,stroke .3s;}
  .timer-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
  .timer-num{font-family:'Bebas Neue',sans-serif;font-size:3.2rem;letter-spacing:2px;line-height:1;}
  .timer-label{font-size:.75rem;letter-spacing:3px;color:#888;text-transform:uppercase;}

  .ex-card{background:#181818;border:1px solid #2a2a2a;border-radius:16px;padding:16px;width:100%;margin-bottom:20px;display:flex;gap:14px;align-items:center;}
  .ex-card-img{width:64px;height:64px;border-radius:10px;object-fit:cover;flex-shrink:0;}
  .ex-card-name{font-family:'Bebas Neue',sans-serif;font-size:1.3rem;letter-spacing:1px;margin-bottom:4px;}
  .ex-card-detail{font-size:.8rem;color:#888;}
  .set-badge{background:rgba(232,255,0,.15);border:1px solid rgba(232,255,0,.3);border-radius:20px;padding:3px 10px;font-size:.72rem;color:#e8ff00;margin-top:6px;display:inline-block;}

  .phase-label{font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:4px;margin-bottom:8px;}
  .phase-work{color:#e8ff00;}
  .phase-rest{color:#00ccff;}
  .phase-done{color:#44ff88;}

  .workout-controls{display:flex;gap:12px;width:100%;}
  .ctrl-btn{flex:1;padding:16px;border-radius:14px;border:none;cursor:pointer;font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:2px;transition:all .2s;}
  .ctrl-main{background:#e8ff00;color:#0a0a0a;flex:2;}
  .ctrl-skip{background:#1a1a1a;color:#888;border:1px solid #2a2a2a;}

  .workout-water{
    margin:0 24px 16px;
    background:linear-gradient(135deg,#001a2e,#002a45);
    border:1px solid #0088cc;border-radius:12px;
    padding:12px 16px;display:flex;align-items:center;gap:10px;
  }
  .workout-water span{font-size:.8rem;color:#66ccff;}

  .done-screen{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;text-align:center;gap:16px;}
  .done-emoji{font-size:4rem;}
  .done-title{font-family:'Bebas Neue',sans-serif;font-size:2.4rem;letter-spacing:3px;color:#e8ff00;}
  .done-stats{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin:8px 0;}
  .done-stat{background:#181818;border:1px solid #2a2a2a;border-radius:12px;padding:14px 20px;text-align:center;}
  .done-stat-val{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:#e8ff00;}
  .done-stat-lbl{font-size:.72rem;color:#888;letter-spacing:2px;}

  /* cardio item */
  .cardio-item{padding:14px 16px;display:flex;align-items:center;gap:12px;background:#0d1a0d;}
  .cardio-badge{background:rgba(0,255,120,.1);border:1px solid rgba(0,255,120,.3);border-radius:8px;padding:8px;font-size:1.4rem;}
  .cardio-detail{font-size:.75rem;color:#888;}
`;

// ─── PROGRAM DATA ─────────────────────────────────────────────────────────────
const EXERCISES = {
  chest:[
    {name:"Barbell Bench Press",sets:"4",note:"Control the descent, drive hard"},
    {name:"Incline Dumbbell Press",sets:"3",note:"45° angle, full stretch at bottom"},
    {name:"Cable Fly",sets:"3",note:"Feel the stretch, squeeze at peak"},
    {name:"Dips (Chest-focused)",sets:"3",note:"Lean forward slightly"},
    {name:"Push-Up",sets:"3",note:"Great for beginners, control tempo"},
  ],
  back:[
    {name:"Deadlift",sets:"4",note:"Brace core, neutral spine always"},
    {name:"Barbell Row",sets:"4",note:"Pull to lower chest, squeeze lats"},
    {name:"Pull-Up / Lat Pulldown",sets:"3",note:"Full stretch at top, drive elbows down"},
    {name:"Seated Cable Row",sets:"3",note:"Chest up, retract scapula"},
    {name:"Face Pull",sets:"3",note:"Great for rear delts and posture"},
  ],
  shoulders:[
    {name:"Overhead Press (BB/DB)",sets:"4",note:"Elbows slightly forward, core tight"},
    {name:"Lateral Raise",sets:"3",note:"Slight bend in elbows, controlled"},
    {name:"Front Raise",sets:"3",note:"Alternate arms, no momentum"},
    {name:"Rear Delt Fly",sets:"3",note:"Hinge forward, squeeze rear delts"},
  ],
  biceps:[
    {name:"Barbell Curl",sets:"3",note:"Elbows fixed, squeeze at top"},
    {name:"Incline Dumbbell Curl",sets:"3",note:"Full stretch, great for peak"},
    {name:"Hammer Curl",sets:"3",note:"Neutral grip, targets brachialis"},
    {name:"Cable Curl",sets:"3",note:"Constant tension throughout"},
  ],
  triceps:[
    {name:"Close-Grip Bench Press",sets:"3",note:"Elbows tucked, compound movement"},
    {name:"Overhead Tricep Extension",sets:"3",note:"Full stretch, great for long head"},
    {name:"Tricep Pushdown",sets:"3",note:"Lock elbows, squeeze at bottom"},
    {name:"Skull Crusher",sets:"3",note:"Lower slowly to forehead"},
  ],
  legs:[
    {name:"Barbell Squat",sets:"4",note:"Depth = parallel or below"},
    {name:"Romanian Deadlift",sets:"3",note:"Hinge at hips, feel hamstring stretch"},
    {name:"Leg Press",sets:"3",note:"Feet shoulder-width, full range"},
    {name:"Leg Curl",sets:"3",note:"Curl all the way, control descent"},
    {name:"Leg Extension",sets:"3",note:"Squeeze quads hard at top"},
    {name:"Standing Calf Raise",sets:"4",note:"Full stretch at bottom"},
    {name:"Lunges",sets:"3",note:"Step long, front knee over toe"},
  ],
  core:[
    {name:"Plank",sets:"3",note:"30-60 sec, squeeze everything"},
    {name:"Hanging Leg Raise",sets:"3",note:"No swing, controlled"},
    {name:"Cable Crunch",sets:"3",note:"Round the spine, crunch hard"},
    {name:"Ab Rollout",sets:"3",note:"Keep hips aligned"},
  ],
  cardio:[
    {name:"Treadmill / Bike LISS",sets:"1",note:"20-30 min moderate pace"},
    {name:"Jump Rope",sets:"3",note:"3 × 3 min rounds"},
  ],
};

function getReps(goal,type="compound"){
  if(type==="cardio")return"20 min";
  if(goal==="bulk")return type==="compound"?"4-6":"8-10";
  if(goal==="cut")return type==="compound"?"8-12":"12-15";
  return type==="compound"?"6-10":"10-12";
}
function getRest(goal,type="compound"){
  if(type==="cardio")return"—";
  if(goal==="bulk")return type==="compound"?"180":"90";
  if(goal==="cut")return type==="compound"?"90":"60";
  return type==="compound"?"150":"75";
}
function pick(arr,n){return arr.slice(0,n);}

function buildExercises(muscles,goal,level){
  const exs=[];
  muscles.forEach(({group,count,type})=>{
    pick(EXERCISES[group]||[],count).forEach(ex=>{
      exs.push({
        name:ex.name,
        sets:level==="beginner"?"3":ex.sets,
        reps:type==="cardio"?"20 min":getReps(goal,type||"compound"),
        restSec:parseInt(getRest(goal,type||"compound"))||60,
        note:ex.note,
        isCardio:type==="cardio",
      });
    });
  });
  return exs;
}

function generateProgram(gender,level,goal,days){
  const isBeg=level==="beginner";
  const isAdv=level==="advanced";
  const cutCardio=[{group:"cardio_cut",count:1,type:"cardio_cut"}]; // handled specially

  const templates={
    3:[
      {focus:"Push — Chest / Shoulders / Triceps",muscles:[
        {group:"chest",count:2,type:"compound"},{group:"chest",count:1,type:"isolation"},
        {group:"shoulders",count:2,type:"compound"},{group:"triceps",count:2,type:"isolation"},
      ]},
      {focus:"Pull — Back / Biceps",muscles:[
        {group:"back",count:3,type:"compound"},{group:"biceps",count:2,type:"isolation"},
        {group:"core",count:2,type:"isolation"},
      ]},
      {focus:"Legs & Core",muscles:[
        {group:"legs",count:4,type:"compound"},{group:"core",count:2,type:"isolation"},
        ...(isBeg?[{group:"cardio",count:1,type:"cardio"}]:[]),
      ]},
    ],
    4:[
      {focus:"Chest & Triceps",muscles:[{group:"chest",count:3,type:"compound"},{group:"triceps",count:2,type:"isolation"}]},
      {focus:"Back & Biceps",muscles:[{group:"back",count:3,type:"compound"},{group:"biceps",count:2,type:"isolation"}]},
      {focus:"Legs",muscles:[{group:"legs",count:5,type:"compound"},...(isBeg?[{group:"cardio",count:1,type:"cardio"}]:[])]},
      {focus:"Shoulders & Arms",muscles:[{group:"shoulders",count:3,type:"compound"},{group:"biceps",count:2,type:"isolation"},{group:"triceps",count:2,type:"isolation"}]},
    ],
    5:[
      {focus:"Chest & Triceps",muscles:[{group:"chest",count:3,type:"compound"},{group:"triceps",count:2,type:"isolation"}]},
      {focus:"Back & Biceps",muscles:[{group:"back",count:3,type:"compound"},{group:"biceps",count:2,type:"isolation"}]},
      {focus:"Legs",muscles:[{group:"legs",count:5,type:"compound"}]},
      {focus:"Shoulders & Core",muscles:[{group:"shoulders",count:3,type:"compound"},{group:"core",count:2,type:"isolation"}]},
      {focus:"Arms & Cardio",muscles:[{group:"biceps",count:2,type:"isolation"},{group:"triceps",count:2,type:"isolation"},{group:"cardio",count:1,type:"cardio"}]},
    ],
    6:[
      {focus:"Chest & Triceps",muscles:[{group:"chest",count:3,type:"compound"},{group:"triceps",count:3,type:"isolation"}]},
      {focus:"Back & Biceps",muscles:[{group:"back",count:3,type:"compound"},{group:"biceps",count:3,type:"isolation"}]},
      {focus:"Legs — Quad Focus",muscles:[{group:"legs",count:4,type:"compound"},{group:"core",count:2,type:"isolation"}]},
      {focus:"Shoulders & Core",muscles:[{group:"shoulders",count:4,type:"compound"},{group:"core",count:2,type:"isolation"}]},
      {focus:"Chest & Back (2nd Hit)",muscles:[{group:"chest",count:2,type:"isolation"},{group:"back",count:2,type:"compound"},{group:"core",count:2,type:"isolation"}]},
      {focus:"Legs — Hamstring Focus",muscles:[{group:"legs",count:4,type:"compound"},{group:"cardio",count:1,type:"cardio"}]},
    ],
  };

  const keys=[3,4,5,6];
  const nearest=keys.reduce((a,b)=>Math.abs(b-days)<Math.abs(a-days)?b:a);
  const dayTemplates=templates[nearest]||templates[4];
  const actualDays=Math.min(days,dayTemplates.length);
  const dayNames=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  const weeklySchedule=[];
  let di=0;
  for(let i=0;i<7;i++){
    if(di<actualDays){
      const tmpl=dayTemplates[di];
      let exercises=buildExercises(tmpl.muscles,goal,level);
      // Add 20min stair climber cardio for cut goal at end of every training day
      if(goal==="cut"){
        exercises.push({
          name:"Stair Climber",
          sets:"1",reps:"20 min",restSec:0,
          note:"Steady pace, hands off rails — burns max calories",
          isCardio:true,
        });
      }
      weeklySchedule.push({day:`Day ${di+1} — ${dayNames[i]}`,focus:tmpl.focus,exercises,isRest:false});
      di++;
    } else {
      weeklySchedule.push({day:dayNames[i],focus:"Rest & Recovery",exercises:[],isRest:true});
    }
  }

  const goalNames={bulk:"Mass Builder",cut:"Fat Shred",maintain:"Maintenance"};
  const levelNames={beginner:"Starter",intermediate:"Intermediate",advanced:"Elite"};
  const tips={
    bulk:[
      "Eat 200-400 calories above maintenance to maximize muscle growth.",
      "Hit 1g of protein per pound of bodyweight — every single day.",
      "Progressive overload: add weight or reps every session.",
      "Sleep 7-9 hours. That's when you actually grow.",
      "💧 Drink at least 3-4 litres of water daily for optimal performance.",
    ],
    cut:[
      "Eat 300-500 calories below maintenance — don't crash diet.",
      "Keep protein HIGH (1-1.2g per lb) to preserve muscle.",
      "The Stair Climber at the end of each session = max fat burn.",
      "Track your lifts — if numbers drop fast, eat more.",
      "💧 Water suppresses appetite — drink a full glass before every meal.",
    ],
    maintain:[
      "Eat at maintenance — bodyweight should stay stable week to week.",
      "Focus on perfecting form and mind-muscle connection.",
      "Use this phase to improve weak points.",
      "💧 Stay hydrated — performance drops fast when even slightly dehydrated.",
    ],
  };

  return{
    programName:`${levelNames[level]} ${goalNames[goal]} — ${actualDays} Day Split`,
    overview:`A ${actualDays}-day-per-week program for a ${level} ${gender} focused on ${goal==="bulk"?"building maximum muscle mass":goal==="cut"?"shredding fat while preserving muscle":"maintaining current physique"}.${goal==="cut"?" Every training day ends with 20 min Stair Climber for maximum calorie burn.":""}`,
    weeklySchedule,
    generalTips:tips[goal],
  };
}

// ─── WORKOUT MODE ─────────────────────────────────────────────────────────────
function buildWorkoutQueue(exercises){
  const queue=[];
  exercises.forEach(ex=>{
    const sets=parseInt(ex.sets)||1;
    for(let s=1;s<=sets;s++){
      queue.push({type:"work",ex,setNum:s,totalSets:sets,duration:ex.isCardio?1200:45});
      if(s<sets) queue.push({type:"rest",ex,setNum:s,totalSets:sets,duration:ex.restSec||60});
    }
  });
  return queue;
}

function fmt(sec){
  const m=Math.floor(sec/60),s=sec%60;
  return`${m}:${s.toString().padStart(2,"0")}`;
}

function WorkoutMode({day, onClose}){
  const exercises=day.exercises.filter(e=>!e.isCardio||e.name==="Stair Climber");
  const allEx=day.exercises;
  const queue=buildWorkoutQueue(allEx);
  const [tick,setTick]=useState(0);
  const [done,setDone]=useState(false);
  const [waterPing,setWaterPing]=useState(false);
  const timerRef=useRef(null);
  const waterRef=useRef(null);
  const stateRef=useRef({qIdx:0,timeLeft:queue[0]?.duration||45,running:false,elapsed:0});
  const st=stateRef.current;
  const current=queue[st.qIdx];
  const progress=st.qIdx/queue.length;

  useEffect(()=>{
    timerRef.current=setInterval(()=>{
      const s=stateRef.current;
      if(!s.running)return;
      s.elapsed+=1;
      s.timeLeft-=1;
      if(s.timeLeft<=0){
        const next=s.qIdx+1;
        if(next>=queue.length){s.running=false;setDone(true);}
        else{s.qIdx=next;s.timeLeft=queue[next].duration;}
      }
      setTick(t=>t+1);
    },1000);
    waterRef.current=setInterval(()=>setWaterPing(true),8*60*1000);
    return()=>{clearInterval(timerRef.current);clearInterval(waterRef.current);};
  },[]);

  const toggle=()=>{stateRef.current.running=!stateRef.current.running;setTick(t=>t+1);};
  const skip=()=>{
    const s=stateRef.current;
    const next=s.qIdx+1;
    if(next>=queue.length){s.running=false;setDone(true);}
    else{s.qIdx=next;s.timeLeft=queue[next].duration;s.running=true;}
    setTick(t=>t+1);
  };

  const circumference=2*Math.PI*88;
  const maxDur=current?.duration||45;
  const arcOffset=circumference*(1-st.timeLeft/maxDur);
  const arcColor=current?.type==="rest"?"#00ccff":"#e8ff00";

  if(done) return(
    <div className="workout-screen">
      <div className="done-screen">
        <div className="done-emoji">🏆</div>
        <div className="done-title">WORKOUT COMPLETE!</div>
        <div className="done-stats">
          <div className="done-stat">
            <div className="done-stat-val">{fmt(st.elapsed)}</div>
            <div className="done-stat-lbl">DURATION</div>
          </div>
          <div className="done-stat">
            <div className="done-stat-val">{allEx.filter(e=>!e.isCardio).length}</div>
            <div className="done-stat-lbl">EXERCISES</div>
          </div>
          <div className="done-stat">
            <div className="done-stat-val">{allEx.reduce((a,e)=>a+parseInt(e.sets||1),0)}</div>
            <div className="done-stat-lbl">TOTAL SETS</div>
          </div>
        </div>
        <div className="water-banner" style={{width:"100%"}}>
          <div className="water-icon">💧</div>
          <div className="water-text"><strong>Great work! Rehydrate now</strong>Drink 500ml of water immediately after your workout.</div>
        </div>
        <button className="btn btn-primary" onClick={onClose}>BACK TO PROGRAM</button>
      </div>
    </div>
  );

  return(
    <div className="workout-screen">
      <div className="workout-header">
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.4rem",letterSpacing:"2px",color:"#e8ff00"}}>
          MUSCLE<span style={{color:"#f0f0f0"}}>MAX</span>
        </div>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <span style={{fontSize:".8rem",color:"#888",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"2px"}}>{fmt(elapsed)}</span>
          <button onClick={onClose} style={{background:"#1a1a1a",border:"1px solid #2a2a2a",color:"#888",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:".8rem"}}>✕ EXIT</button>
        </div>
      </div>

      <div className="workout-progress">
        <div className="workout-progress-fill" style={{width:`${progress*100}%`}}/>
      </div>

      {waterPing&&(
        <div style={{margin:"12px 24px 0"}}>
          <div className="water-banner" style={{cursor:"pointer"}} onClick={()=>setWaterPing(false)}>
            <div className="water-icon">💧</div>
            <div className="water-text"><strong>Drink water now!</strong>Tap to dismiss — stay hydrated for peak performance.</div>
          </div>
        </div>
      )}

      <div className="workout-body">
        {/* exercise card */}
        <div className="ex-card">
          <img className="ex-card-img" src={EX_IMG[current?.ex?.name]||DEFAULT_IMG} alt={current?.ex?.name} onError={e=>e.target.src=DEFAULT_IMG}/>
          <div>
            <div className="ex-card-name">{current?.ex?.name}</div>
            <div className="ex-card-detail">{current?.ex?.reps} reps — {current?.ex?.note}</div>
            <span className="set-badge">SET {current?.setNum} / {current?.totalSets}</span>
          </div>
        </div>

        {/* phase label */}
        <div className={`phase-label ${current?.type==="rest"?"phase-rest":"phase-work"}`}>
          {current?.type==="rest"?"⏸ REST":"▶ WORKING"}
        </div>

        {/* ring timer */}
        <div className="timer-ring">
          <svg className="timer-svg" width="200" height="200" viewBox="0 0 200 200">
            <circle className="timer-bg" cx="100" cy="100" r="88"/>
            <circle className="timer-arc" cx="100" cy="100" r="88"
              stroke={arcColor}
              strokeDasharray={circumference}
              strokeDashoffset={arcOffset}
            />
          </svg>
          <div className="timer-center">
            <div className="timer-num" style={{color:arcColor}}>{fmt(timeLeft)}</div>
            <div className="timer-label">{current?.type==="rest"?"REST":"TIME"}</div>
          </div>
        </div>

        {/* controls */}
        <div className="workout-controls">
          <button className="ctrl-btn ctrl-skip" onClick={skip}>SKIP ▶▶</button>
          <button className="ctrl-btn ctrl-main" onClick={toggle}>
            {running?"⏸ PAUSE":"▶ START"}
          </button>
        </div>
      </div>

      {/* bottom water reminder */}
      <div className="workout-water">
        <span>💧</span>
        <span>Drink water between every set — target 3–4L today</span>
      </div>
    </div>
  );
}

// ─── UI COMPONENTS ────────────────────────────────────────────────────────────
function StepDots({total,current}){
  return(
    <div className="steps">
      {Array.from({length:total}).map((_,i)=>(
        <div key={i} className={`step-dot ${i<current?"done":i===current?"active":""}`}/>
      ))}
    </div>
  );
}
function OptCard({icon,title,desc,selected,onClick}){
  return(
    <div className={`opt-card ${selected?"selected":""}`} onClick={onClick}>
      <div className="opt-icon">{icon}</div>
      <div className="opt-text"><h3>{title}</h3>{desc&&<p>{desc}</p>}</div>
      <div className="opt-check">{selected&&<span style={{color:"#0a0a0a",fontSize:".75rem",fontWeight:700}}>✓</span>}</div>
    </div>
  );
}

function Splash({onStart}){
  return(
    <div className="screen">
      <div className="splash">
        <div><div className="logo">MUSCLE<span>MAX</span></div><div className="splash-tagline">BUILD. EAT. DOMINATE.</div></div>
        <div className="splash-visual">💪</div>
        <div>
          <p className="splash-desc">Your personal training coach. Get a customized workout program built around your goals, level, and schedule — instantly.</p>
          <button className="btn btn-primary" onClick={onStart}>GET STARTED</button>
        </div>
      </div>
    </div>
  );
}

function GenderScreen({value,onChange,onNext}){
  return(
    <div className="screen">
      <StepDots total={4} current={0}/>
      <div className="logo" style={{marginBottom:20}}>MUSCLE<span>MAX</span></div>
      <div className="screen-title">I AM A</div>
      <div className="screen-sub">Select your biological sex</div>
      <div className="gender-grid">
        {[{val:"male",icon:"♂️",label:"MALE"},{val:"female",icon:"♀️",label:"FEMALE"}].map(g=>(
          <div key={g.val} className={`gender-card ${value===g.val?"selected":""}`} onClick={()=>onChange(g.val)}>
            <div className="gender-icon">{g.icon}</div>
            <div className="gender-label">{g.label}</div>
          </div>
        ))}
      </div>
      <div className="btn-next">
        <button className="btn btn-primary" disabled={!value} onClick={onNext}>CONTINUE</button>
      </div>
    </div>
  );
}

function LevelScreen({value,onChange,onNext,onBack}){
  const levels=[
    {val:"beginner",icon:"🌱",title:"Beginner",desc:"Less than 1 year of consistent training"},
    {val:"intermediate",icon:"⚡",title:"Intermediate",desc:"1–3 years of consistent training"},
    {val:"advanced",icon:"🏆",title:"Advanced / Pro",desc:"3+ years, knows every lift cold"},
  ];
  return(
    <div className="screen">
      <StepDots total={4} current={1}/>
      <div className="screen-title">EXPERIENCE LEVEL</div>
      <div className="screen-sub">Be honest — your program depends on this</div>
      <div className="options">{levels.map(l=><OptCard key={l.val} icon={l.icon} title={l.title} desc={l.desc} selected={value===l.val} onClick={()=>onChange(l.val)}/>)}</div>
      <div className="btn-next">
        <button className="btn btn-primary" disabled={!value} onClick={onNext}>CONTINUE</button>
        <button className="btn btn-secondary" onClick={onBack}>BACK</button>
      </div>
    </div>
  );
}

function GoalScreen({value,onChange,onNext,onBack}){
  const goals=[
    {val:"bulk",icon:"🔥",title:"Bulk / Build Muscle",desc:"Maximize size and strength gains"},
    {val:"cut",icon:"⚔️",title:"Cut / Lose Fat",desc:"Lean out while preserving muscle"},
    {val:"maintain",icon:"⚖️",title:"Maintain",desc:"Keep current physique, stay consistent"},
  ];
  return(
    <div className="screen">
      <StepDots total={4} current={2}/>
      <div className="screen-title">YOUR GOAL</div>
      <div className="screen-sub">What are you training for right now?</div>
      <div className="options">{goals.map(g=><OptCard key={g.val} icon={g.icon} title={g.title} desc={g.desc} selected={value===g.val} onClick={()=>onChange(g.val)}/>)}</div>
      <div className="btn-next">
        <button className="btn btn-primary" disabled={!value} onClick={onNext}>CONTINUE</button>
        <button className="btn btn-secondary" onClick={onBack}>BACK</button>
      </div>
    </div>
  );
}

function DaysScreen({value,onChange,onGenerate,onBack}){
  return(
    <div className="screen">
      <StepDots total={4} current={3}/>
      <div className="screen-title">TRAINING DAYS</div>
      <div className="screen-sub">How many days per week can you train?</div>
      <div className="days-grid">
        {[1,2,3,4,5,6].map(d=>(
          <div key={d} className={`day-btn ${value===d?"selected":""}`} onClick={()=>onChange(d)}>{d}</div>
        ))}
      </div>
      {value&&<p style={{marginTop:16,fontSize:".8rem",color:"#888"}}>{value} day{value>1?"s":""} selected</p>}
      <div className="btn-next">
        <button className="btn btn-primary" disabled={!value} onClick={onGenerate}>BUILD MY PROGRAM</button>
        <button className="btn btn-secondary" onClick={onBack}>BACK</button>
      </div>
    </div>
  );
}

function DayBlock({day,onStartWorkout}){
  const [open,setOpen]=useState(!day.isRest);
  if(day.isRest) return(
    <div className="day-block">
      <div className="day-header rest-header">
        <div><div className="day-name">{day.day}</div><div className="day-focus" style={{color:"#555"}}>Rest & Recovery</div></div>
        <span style={{fontSize:"1.2rem"}}>😴</span>
      </div>
    </div>
  );
  return(
    <div className="day-block">
      <div className="day-header" onClick={()=>setOpen(!open)}>
        <div><div className="day-name">{day.day}</div><div className="day-focus">{day.focus}</div></div>
        <div className={`day-toggle ${open?"open":""}`}>▾</div>
      </div>
      {open&&(
        <div className="exercise-list">
          {day.exercises.map((ex,i)=>
            ex.isCardio?(
              <div className="cardio-item" key={i}>
                <div className="cardio-badge">🏃</div>
                <div>
                  <div className="ex-name" style={{fontSize:".88rem",fontWeight:500,marginBottom:3}}>{ex.name}</div>
                  <div className="cardio-detail">{ex.reps} — {ex.note}</div>
                </div>
              </div>
            ):(
              <div className="exercise-item" key={i}>
                <div className="ex-num">{i+1}</div>
                <img className="ex-img" src={EX_IMG[ex.name]||DEFAULT_IMG} alt={ex.name} onError={e=>e.target.src=DEFAULT_IMG}/>
                <div className="ex-info">
                  <div className="ex-name">{ex.name}</div>
                  <div className="ex-detail">{ex.sets} sets × {ex.reps} — {ex.restSec}s rest</div>
                  {ex.note&&<div className="ex-note">{ex.note}</div>}
                </div>
              </div>
            )
          )}
          {/* Play button */}
          <div style={{padding:"12px 16px",background:"#0f0f0f"}}>
            <button className="play-btn" onClick={()=>onStartWorkout(day)}>
              <span className="play-icon">▶</span> START THIS WORKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultScreen({program,profile,onRestart,onStartWorkout}){
  return(
    <div className="screen result-screen">
      <div className="logo" style={{marginBottom:16}}>MUSCLE<span>MAX</span></div>

      {/* water banner */}
      <div className="water-banner">
        <div className="water-icon">💧</div>
        <div className="water-text">
          <strong>Stay Hydrated!</strong>
          Drink 3–4 litres of water daily. The app will remind you during workouts.
        </div>
      </div>

      <div className="program-header">
        <div className="program-tag">YOUR PROGRAM</div>
        <div className="program-title">{program.programName}</div>
        <div className="program-meta">
          <span className="meta-pill">{profile.level.toUpperCase()}</span>
          <span className="meta-pill">{profile.goal.toUpperCase()}</span>
          <span className="meta-pill">{profile.days} DAYS/WEEK</span>
          <span className="meta-pill">{profile.gender.toUpperCase()}</span>
        </div>
      </div>

      <p style={{fontSize:".82rem",color:"#888",lineHeight:1.6,marginBottom:20}}>{program.overview}</p>

      <div className="section-label">WEEKLY SCHEDULE</div>
      {program.weeklySchedule.map((day,i)=>(
        <DayBlock key={i} day={day} onStartWorkout={onStartWorkout}/>
      ))}

      <div className="section-label">TIPS & NUTRITION</div>
      {program.generalTips.map((tip,i)=>(
        <div className="tip-box" key={i}>💡 {tip}</div>
      ))}

      <button className="btn btn-secondary" style={{marginTop:28}} onClick={onRestart}>START OVER</button>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function MuscleMax(){
  const [screen,setScreen]=useState("splash");
  const [gender,setGender]=useState("");
  const [level,setLevel]=useState("");
  const [goal,setGoal]=useState("");
  const [days,setDays]=useState(null);
  const [program,setProgram]=useState(null);
  const [activeDay,setActiveDay]=useState(null);

  const reset=()=>{setScreen("splash");setGender("");setLevel("");setGoal("");setDays(null);setProgram(null);setActiveDay(null);};
  const build=()=>{setProgram(generateProgram(gender,level,goal,days));setScreen("result");};
  const startWorkout=(day)=>{setActiveDay(day);setScreen("workout");};

  if(screen==="workout"&&activeDay) return(
    <>
      <style>{css}</style>
      <div className="app">
        <WorkoutMode day={activeDay} onClose={()=>setScreen("result")}/>
      </div>
    </>
  );

  return(
    <>
      <style>{css}</style>
      <div className="app">
        {screen==="splash"  &&<Splash onStart={()=>setScreen("gender")}/>}
        {screen==="gender"  &&<GenderScreen value={gender} onChange={setGender} onNext={()=>setScreen("level")}/>}
        {screen==="level"   &&<LevelScreen  value={level}  onChange={setLevel}  onNext={()=>setScreen("goal")}  onBack={()=>setScreen("gender")}/>}
        {screen==="goal"    &&<GoalScreen   value={goal}   onChange={setGoal}   onNext={()=>setScreen("days")}  onBack={()=>setScreen("level")}/>}
        {screen==="days"    &&<DaysScreen   value={days}   onChange={setDays}   onGenerate={build}              onBack={()=>setScreen("goal")}/>}
        {screen==="result"  &&<ResultScreen program={program} profile={{gender,level,goal,days}} onRestart={reset} onStartWorkout={startWorkout}/>}
      </div>
    </>
  );
}
