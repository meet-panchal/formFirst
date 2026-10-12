/**
 * Form First browser bundle - GENERATED FILE.
 * Source modules live under /src.
 * Run: python scripts/build-browser-bundle.py
 *
 * A classic script is intentional for the current zero-config local-file workflow.
 * The source graph remains standards-based ES modules and is ready for the planned
 * Vite production-build migration.
 */
'use strict';

/* ===== src/data/workouts.js ===== */
const day1Exercises = [
  {
    id:'incline-press', number:1, section:'Main Workout', name:'Incline Dumbbell Press', sets:3, reps:'6–10', rest:'90–120 sec', note:'Upper chest', image:'./assets/movements/incline-press-lifelike.webp', targetImage:'./assets/targets/transparent/incline-press.webp', formLinks:[{label:'Incline Dumbbell Press', source:'StrengthLog', url:'https://www.strengthlog.com/dumbbell-incline-press/'}],
    steps:['Set the bench to a modest incline, plant your feet, and keep your shoulder blades gently back and down.','Lower the dumbbells toward the upper chest with wrists stacked over elbows.','Press up smoothly without bouncing, then lower under control.'],
    cues:['Feet planted','Shoulders stable','Controlled descent'],
    watchouts:['Letting the elbows flare too wide can stress the shoulders. Avoid bouncing the dumbbells off the bottom position or arching your back just to finish a rep. Keep your wrists stacked and move through a controlled range.']
  },
  {
    id:'flat-press', number:2, section:'Main Workout', name:'Flat Dumbbell Press', sets:3, requiredSets:3, setsLabel:'3', reps:'8–15', rest:'75–90 sec', note:'Chest', image:'./assets/movements/flat-press.webp', targetImage:'./assets/targets/shared/chest.webp', formLinks:[{label:'Flat Dumbbell Press', source:'StrengthLog', url:'https://www.strengthlog.com/dumbbell-chest-press/'}],
    steps:['Lie back with both feet planted and shoulder blades lightly set against the bench.','Lower both dumbbells evenly until you reach a comfortable chest stretch.','Press back up while keeping wrists straight and shoulders stable.'],
    cues:['Even dumbbells','Wrists stacked','No bouncing'],
    watchouts:['Do not rush the lowering phase or let one arm drift lower than the other. Keep the shoulder blades set, avoid excessive elbow flare, and do not bounce out of the bottom stretch.']
  },
  {
    id:'cable-fly', number:3, section:'Main Workout', name:'Cable Chest Fly', sets:3, requiredSets:3, setsLabel:'3', reps:'10–20', rest:'60–75 sec', note:'Chest isolation', image:'./assets/movements/cable-fly.webp', targetImage:'./assets/targets/shared/chest.webp', formLinks:[{label:'Standing Cable Chest Fly', source:'StrengthLog', url:'https://www.strengthlog.com/standing-cable-chest-fly/'}],
    steps:['Take a stable stance with the handles around chest height and a soft elbow bend.','Bring the hands toward each other in a wide arc without turning the motion into a press.','Pause briefly, then return slowly to a comfortable stretch.'],
    cues:['Soft elbows','Wide arc','Light weight'],
    watchouts:['Turning the movement into a press reduces the fly emphasis. Keep a slight elbow bend, stay in control, and avoid overstretching the shoulders behind your torso.']
  },
  {
    id:'incline-curl', number:4, section:'Main Workout', name:'Incline Dumbbell Curl', sets:3, reps:'10–15', rest:'60–75 sec', note:'Biceps', image:'./assets/movements/incline-curl.webp', targetImage:'./assets/targets/transparent/incline-curl.webp', formLinks:[{label:'Incline Dumbbell Curl', source:'StrengthLog', url:'https://www.strengthlog.com/incline-dumbbell-curl/'}],
    steps:['Sit against the incline bench and let your arms hang naturally.','Curl without letting your upper arms drift forward.','Lower the dumbbells fully and slowly before the next rep.'],
    cues:['Elbows quiet','No swinging','Full lowering'],
    watchouts:['Do not swing the torso or bring the upper arms forward to steal momentum. Lower fully with control and keep the shoulders from rounding at the front of the bench.']
  },
  {
    id:'hammer-curl', number:5, section:'Main Workout', name:'Hammer Curl', sets:3, requiredSets:3, setsLabel:'3', reps:'10–20', rest:'60 sec', note:'Biceps + brachialis', image:'./assets/movements/hammer-curl.webp', targetImage:'./assets/targets/transparent/hammer-curl.webp', formLinks:[{label:'Hammer Curl', source:'StrengthLog', url:'https://www.strengthlog.com/hammer-curl/'}],
    steps:['Stand tall with palms facing your sides.','Curl while keeping the neutral grip and elbows near your torso.','Pause briefly, then lower without leaning or swinging.'],
    cues:['Neutral wrists','Elbows close','Torso still'],
    watchouts:['Avoid rocking your torso or letting the elbows drift out. Keep the wrists neutral, control the descent, and use a weight you can move without momentum.']
  },
  {
    id:'cable-crunch', number:6, section:'Core & Cardio', name:'Cable Crunch / Weighted Crunch', sets:3, requiredSets:3, setsLabel:'3', reps:'10–15', rest:'60 sec', note:'Core', image:'./assets/movements/cable-crunch.webp', targetImage:'./assets/targets/transparent/cable-crunch.webp', formLinks:[{label:'Cable Crunch', source:'StrengthLog', url:'https://www.strengthlog.com/cable-crunch/'}],
    steps:['Set up so the resistance stays steady throughout the movement.','Brace first, then bring your ribs toward your pelvis using your abs.','Return slowly without letting the weight pull you into a large back arch.'],
    cues:['Ribs to pelvis','Arms quiet','Slow return'],
    watchouts:['Do not pull mostly with the arms or let the lower back overextend on the way up. Think about curling the torso with the abs and returning slowly instead of dropping back.']
  },
  {
    id:'deadbug-plank', number:7, section:'Core & Cardio', name:'Dead Bug or Plank', sets:2, reps:'30–45 sec', rest:'45–60 sec', note:'Core stability', image:'./assets/movements/deadbug-plank.webp', targetImage:'./assets/targets/transparent/deadbug-plank.webp', formLinks:[{label:'Dead Bug', source:'StrengthLog', url:'https://www.strengthlog.com/dead-bugs/'},{label:'Plank', source:'StrengthLog', url:'https://www.strengthlog.com/plank/'}],
    steps:['For dead bug, brace with hips and knees around 90°; for plank, keep a long line from shoulders to feet.','Move only as far as you can while maintaining trunk position.','Keep breathing and stop the set when your posture changes.'],
    cues:['Brace first','Breathe','Own the position'],
    watchouts:['The most common issue is losing trunk position. If the lower back arches, hips rotate, or the plank sags, shorten the hold or range so you can keep a strong brace and steady breathing.']
  },
  {
    id:'cardio', number:8, section:'Core & Cardio', name:'Cardio — Treadmill / Stairs', sets:1, reps:'20 min', rest:'—', note:'Conditioning', image:'./assets/movements/cardio.webp', targetImage:'./assets/targets/shared/cardio.webp', formLinks:[{label:'Treadmill Walking Form', source:'Verywell Fit', url:'https://www.verywellfit.com/treadmill-walking-mistakes-to-avoid-3436655'},{label:'Stair / StairMaster Technique', source:'Verywell Fit', url:'https://www.verywellfit.com/30-minute-stairmaster-workout-6831333'}],
    steps:['Choose treadmill walking or stairs at a pace you can sustain comfortably.','Keep posture tall and use the rails only when needed for balance.','Treat the 20 minutes as conditioning and recovery work, not a sprint.'],
    cues:['Steady pace','Tall posture','Controlled effort'],
    watchouts:['Do not turn this into an all-out sprint. Stay tall, avoid leaning heavily on the rails, and keep the pace hard enough to work but easy enough to stay smooth for the full duration.']
  }
];

const WG_BASE = 'https://cdn.jsdelivr.net/npm/@bryllim/workout-guide@1.0.0/assets';
const WG_SITE = 'https://bryllim.github.io/workout-guide/exercises';
const CARDIO_LINKS = [
  {label:'Treadmill Walking Form', source:'Verywell Fit', url:'https://www.verywellfit.com/treadmill-walking-mistakes-to-avoid-3436655'},
  {label:'Stair / StairMaster Technique', source:'Verywell Fit', url:'https://www.verywellfit.com/30-minute-stairmaster-workout-6831333'}
];

function wgFrames(slug){
  return [1,3].map(index=>`${WG_BASE}/${slug}/frame-${index}.svg`);
}
function guideLink(label, slug){
  return {label, source:'Workout Guide', url:`${WG_SITE}/${slug}/`};
}
function dayExercise({
  id, number, section='Main Workout', name, sets=3, requiredSets, setsLabel,
  reps='8–12', rest='60–90 sec', note='Working muscles', slug=null,
  image=null, targetImage=null, formLinks=null,
  formSlugs=null, logType='standard', steps=[], cues=[], watchouts=[]
}){
  const links = formLinks || (formSlugs
    ? formSlugs.map(([label,s])=>guideLink(label,s))
    : slug ? [guideLink(name,slug)] : []);
  return {
    id, number, section, name, sets, requiredSets, setsLabel, reps, rest, note,
    image,
    movementFrames: slug ? wgFrames(slug) : null,
    visualSlug: slug,
    targetImage,
    formLinks: links,
    logType,
    steps,
    cues,
    watchouts
  };
}

const day2Exercises = [
  dayExercise({
    id:'d2-lat-pulldown', number:1, name:'Lat Pulldown / Pull-Ups', sets:3, reps:'6–10', rest:'90 sec', note:'Lats + upper back', slug:'lat-pulldown', image:'./assets/movements/day2/lat-pulldown.webp', targetImage:'./assets/targets/shared/back-upper.webp',
    formLinks:[{label:'Lat Pulldown', source:'StrengthLog', url:'https://www.strengthlog.com/lat-pulldown-with-pronated-grip/'},{label:'Pull-Up', source:'StrengthLog', url:'https://www.strengthlog.com/pull-up/'}],
    steps:['Secure your thighs and take a comfortable overhand grip.','Pull the bar toward the upper chest by driving the elbows down while keeping the torso mostly still.','Return overhead slowly until the arms are long without letting the shoulders shrug abruptly.'],
    cues:['Elbows down','Chest tall','Slow return'],
    watchouts:['Avoid yanking the bar, leaning far back, or pulling behind the neck. Use a load that lets the shoulders and elbows stay controlled.']
  }),
  dayExercise({
    id:'d2-chest-row', number:2, name:'Chest-Supported Row', sets:3, requiredSets:3, setsLabel:'3', reps:'8–15', rest:'75–90 sec', note:'Upper back', slug:'chest-supported-row', image:'./assets/movements/day2/chest-supported-row.webp', targetImage:'./assets/targets/shared/back-upper.webp', formLinks:[{label:'Chest-Supported Dumbbell Row', source:'StrengthLog', url:'https://www.strengthlog.com/chest-supported-dumbbell-row/'}],
    steps:['Set the chest pad so your torso is supported and your feet are stable.','Row the handles toward your ribs without lifting your chest off the pad.','Pause briefly at the top, then let the shoulder blades move forward under control.'],
    cues:['Chest supported','Elbows back','Pause at peak'],
    watchouts:['Do not turn the row into a lower-back swing. Keep the neck neutral and avoid jerking the handles to finish a rep.']
  }),
  dayExercise({
    id:'d2-cable-pressdown', number:3, name:'Cable Pressdown', sets:3, reps:'10–15', rest:'60 sec', note:'Triceps', slug:'tricep-pushdown', image:'./assets/movements/day2/cable-pressdown.webp', targetImage:'./assets/targets/shared/triceps.webp', formLinks:[{label:'Cable Triceps Pressdown', source:'StrengthLog', url:'https://www.strengthlog.com/tricep-pushdown-with-bar/'},{label:'Straight-Bar Cable Triceps Extension', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/tricep-extension.html'}],
    steps:['Stand tall with the cable set high and elbows close to your sides.','Extend the elbows until the arms are straight without letting the shoulders roll forward.','Return until the forearms come back up while keeping the upper arms quiet.'],
    cues:['Elbows pinned','Wrists neutral','Controlled return'],
    watchouts:['Avoid rocking the torso or letting the elbows drift forward. Reduce the load if you need momentum to reach lockout.']
  }),
  dayExercise({
    id:'d2-overhead-triceps', number:4, name:'Overhead Triceps Extension', sets:3, requiredSets:3, setsLabel:'3', reps:'10–20', rest:'60 sec', note:'Triceps — long head', slug:'dumbbell-overhead-tricep-extension', image:'./assets/movements/day2/overhead-triceps-extension.webp', targetImage:'./assets/targets/shared/triceps.webp', formLinks:[{label:'Overhead Cable Triceps Extension', source:'StrengthLog', url:'https://www.strengthlog.com/overhead-cable-triceps-extension-upper-position/'},{label:'Rope Overhead Triceps Extension', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/overhead-tricep-extension.html'}],
    steps:['Set your stance and hold the load overhead with ribs stacked over the pelvis.','Bend only at the elbows to lower the load behind the head through a comfortable range.','Extend the elbows smoothly while keeping the upper arms mostly in place.'],
    cues:['Ribs stacked','Elbows steady','Full control'],
    watchouts:['Do not overarch the lower back or force the elbows into a painful position. Use a lighter load if your shoulders cannot stay comfortable overhead.']
  }),
  dayExercise({
    id:'d2-rear-delt', number:5, name:'Rear Delt Fly', sets:3, reps:'10–20', rest:'60 sec', note:'Rear delts + upper back', slug:'cable-rear-delt-fly', image:'./assets/movements/day2/rear-delt-fly.webp', targetImage:'./assets/targets/day2-lifelike/rear-delt-fly.webp', formLinks:[{label:'Reverse Dumbbell Fly', source:'StrengthLog', url:'https://www.strengthlog.com/reverse-dumbbell-flyes/'},{label:'Incline Rear Delt Fly', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/dumbbell-reverse-fly-on-incline-bench.html'}],
    steps:['Set the handles around shoulder height and take a stable stance.','Open the arms out and slightly back with a soft elbow bend.','Return slowly without letting the weight pull your shoulders forward.'],
    cues:['Soft elbows','Wide arc','Shoulders down'],
    watchouts:['Avoid turning the movement into a row or using a large torso swing. Keep the load light enough to control the end range.']
  }),
  dayExercise({
    id:'d2-russian-twist', number:6, section:'Core & Cardio', name:'Russian Twists', sets:3, requiredSets:3, setsLabel:'3', reps:'10–15', rest:'45–60 sec', note:'Obliques + core', slug:'russian-twist', image:'./assets/movements/day2/russian-twists.webp', targetImage:'./assets/targets/shared/obliques-core.webp', formLinks:[{label:'Russian Twist', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/russian-twist.html'},{label:'Weighted Russian Twist', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/weighted-side-touches.html'}], logType:'repsOnly',
    steps:['Sit tall with the torso slightly reclined and brace before you rotate.','Turn the ribcage and shoulders together from side to side rather than just moving the hands.','Keep the range controlled and stop before the lower back starts rounding.'],
    cues:['Brace first','Rotate torso','Stay tall'],
    watchouts:['Do not rush side to side or force a large range. Keep the movement smooth and reduce the lean if you lose trunk control.']
  }),
  dayExercise({
    id:'d2-side-plank', number:7, section:'Core & Cardio', name:'Side Plank', sets:2, reps:'30–45 sec', rest:'45–60 sec', note:'Obliques + lateral core', slug:'side-plank', image:'./assets/movements/day2/side-plank.webp', targetImage:'./assets/targets/shared/obliques-core.webp', formLinks:[{label:'Side Plank', source:'StrengthLog', url:'https://www.strengthlog.com/side-plank/'},{label:'Side Plank', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/side-hover.html'}], logType:'time',
    steps:['Stack the shoulder over the supporting elbow and make a long line through the torso.','Lift the hips and hold while breathing normally.','End the set when the hips sag or the shoulder position changes.'],
    cues:['Shoulder stacked','Hips tall','Breathe'],
    watchouts:['Do not let the shoulder collapse toward the ear or twist the torso toward the floor. Shorten the hold if alignment starts to change.']
  }),
  dayExercise({
    id:'d2-cardio', number:8, section:'Core & Cardio', name:'Cardio — Treadmill / Stairs', sets:1, reps:'20 min', rest:'—', note:'Conditioning', image:'./assets/movements/day2/cardio.webp', targetImage:'./assets/targets/shared/cardio.webp', formLinks:[{label:'Treadmill — 20 Minute Workout', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/workouts/ultimate-treadmill-workout'},{label:'Stairmaster / Stair Stepper', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/workouts/myers-glute-workout'}], logType:'cardio',
    steps:['Choose treadmill walking or stairs at a pace you can sustain comfortably.','Keep posture tall and use the rails only when needed for balance.','Treat the 20 minutes as steady conditioning rather than an all-out effort.'],
    cues:['Steady pace','Tall posture','Smooth effort'],
    watchouts:['Avoid leaning heavily on the rails or turning the session into a sprint. Keep the pace controlled for the full duration.']
  })
];

const day3Exercises = [
  dayExercise({
    id:'d3-squat', number:1, name:'Squat (Barbell / Hack)', sets:3, reps:'6–10', rest:'90–120 sec', note:'Quads + glutes', slug:'squat', image:'./assets/movements/day3/squat.webp', targetImage:'./assets/targets/day3-lifelike/quads-glutes.webp',
    formLinks:[{label:'Barbell Squat', source:'StrengthLog', url:'https://www.strengthlog.com/squat/'}],
    steps:['Set your feet in a stable stance and brace before descending.','Lower under control while letting the knees and hips bend together through a comfortable depth.','Drive back up while keeping the feet planted and the torso controlled.'],
    cues:['Brace first','Feet planted','Controlled depth'],
    watchouts:['Do not force a depth that makes you lose balance or trunk position. Keep the knees tracking with the feet and avoid bouncing out of the bottom.']
  }),
  dayExercise({
    id:'d3-rdl', number:2, name:'Romanian Deadlift (RDL)', sets:3, reps:'8–12', rest:'90 sec', note:'Hamstrings + glutes', slug:'romanian-deadlift', image:'./assets/movements/day3/romanian-deadlift.webp', targetImage:'./assets/targets/day3-lifelike/posterior-chain.webp',
    formLinks:[{label:'Romanian Deadlift', source:'StrengthLog', url:'https://www.strengthlog.com/romanian-deadlift/'}],
    steps:['Stand tall with the weight close to your thighs and keep a soft bend in the knees.','Push the hips back while keeping the spine neutral and the weight close to the legs.','Stop when you feel a strong hamstring stretch, then stand by driving the hips forward.'],
    cues:['Hips back','Weight close','Neutral spine'],
    watchouts:['Do not turn the movement into a squat or chase extra depth by rounding the back. Keep the load close and stop at your controlled range.']
  }),
  dayExercise({
    id:'d3-split-squat', number:3, name:'Split Squat / Lunges', sets:3, requiredSets:3, setsLabel:'3', reps:'8–15', rest:'75–90 sec', note:'Quads + glutes', slug:'split-squat', image:'./assets/movements/day3/split-squat.webp', targetImage:'./assets/targets/day3-lifelike/quads-glutes.webp',
    formLinks:[{label:'Split Squat', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/split-squat'}],
    steps:['Set a split stance that lets both feet stay stable and the front foot remain fully planted.','Lower straight down with the torso controlled and the front knee tracking over the foot.','Drive through the front foot to stand, then complete the same work on the other side.'],
    cues:['Front foot planted','Torso controlled','Even sides'],
    watchouts:['Avoid wobbling through rushed reps or pushing off the rear leg to do most of the work. Shorten the range if balance breaks down.']
  }),
  dayExercise({
    id:'d3-ham-curl', number:4, name:'Hamstring Curl', sets:3, requiredSets:3, setsLabel:'3', reps:'10–20', rest:'60–75 sec', note:'Hamstrings', slug:'seated-leg-curl', image:'./assets/movements/day3/hamstring-curl.webp', targetImage:'./assets/targets/day3-lifelike/hamstrings.webp',
    formLinks:[{label:'Leg Curl', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/leg-curl.html'}],
    steps:['Adjust the machine so the knee joint lines up comfortably with the machine pivot.','Curl the pad down and back using the hamstrings without lifting the hips.','Pause briefly, then return slowly to the start.'],
    cues:['Hips down','Curl smoothly','Slow release'],
    watchouts:['Do not bounce the stack or force the knee through an uncomfortable range. Keep the movement controlled from start to finish.']
  }),
  dayExercise({
    id:'d3-pallof', number:5, section:'Core & Cardio', name:'Pallof Press / Side Bend', sets:3, requiredSets:3, setsLabel:'3', reps:'10–15', rest:'45–60 sec', note:'Core anti-rotation', slug:'pallof-press', image:'./assets/movements/day3/pallof-press.webp', targetImage:'./assets/targets/day3-lifelike/core-obliques.webp',
    formLinks:[{label:'Pallof Press', source:'StrengthLog', url:'https://www.strengthlog.com/pallof-press/'}],
    steps:['Stand side-on to the cable with feet planted and the handle held at the chest.','Brace, then press the handle away without letting the torso rotate toward the cable.','Return the handle slowly and repeat both sides.'],
    cues:['Ribs stacked','Resist rotation','Even sides'],
    watchouts:['Do not let the hips or shoulders twist toward the weight. Reduce resistance if you cannot keep the trunk quiet.']
  }),
  dayExercise({
    id:'d3-back-extension', number:6, section:'Core & Cardio', name:'Back Extension', sets:3, requiredSets:3, setsLabel:'3', reps:'10–15', rest:'60 sec', note:'Lower back + glutes', slug:'back-extension', image:'./assets/movements/day3/back-extension.webp', targetImage:'./assets/targets/day3-lifelike/posterior-chain.webp', formLinks:[{label:'GHD Back Extension', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/ghd-back-extension'}], logType:'repsOnly',
    steps:['Set the pad so your hips can hinge freely while the legs stay secure.','Lower the torso under control through a comfortable range.','Return to a straight body line by extending the hips without overextending at the top.'],
    cues:['Hinge at hips','Neutral neck','Stop at straight'],
    watchouts:['Do not throw the torso upward or arch far past a straight body line. Use a smaller range if the lower back feels pinched.']
  }),
  dayExercise({
    id:'d3-cardio', number:7, section:'Core & Cardio', name:'Cardio — Treadmill / Stairs', sets:1, reps:'20 min', rest:'—', note:'Conditioning', image:'./assets/movements/cardio.webp', targetImage:'./assets/targets/shared/cardio.webp', formLinks:CARDIO_LINKS, logType:'cardio',
    steps:['Choose a comfortable treadmill or stair pace after the leg session.','Keep posture tall and take steady, controlled steps.','Use the 20 minutes as low-to-moderate conditioning rather than a sprint.'],
    cues:['Easy rhythm','Tall posture','Controlled pace'],
    watchouts:['If your legs are too fatigued to move smoothly, lower the pace. Avoid relying heavily on the rails.']
  })
];

const day4Exercises = [
  dayExercise({
    id:'d4-shoulder-press', number:1, name:'Dumbbell Shoulder Press', sets:3, reps:'6–10', rest:'90 sec', note:'Shoulders + triceps', slug:'seated-dumbbell-press', image:'./assets/movements/day4/shoulder-press.webp', targetImage:'./assets/targets/day4-lifelike/shoulder-press.webp', formLinks:[{label:'Seated Dumbbell Shoulder Press', source:'StrengthLog', url:'https://www.strengthlog.com/seated-dumbbell-shoulder-press/'}],
    steps:['Sit with the torso supported and feet firmly planted.','Press the dumbbells overhead on a slight inward path without shrugging aggressively.','Lower until the elbows reach a comfortable position, then repeat under control.'],
    cues:['Feet planted','Ribs stacked','Smooth press'],
    watchouts:['Avoid overarching the lower back or forcing the dumbbells too low. Keep the wrists stacked and reduce the load if the shoulders feel unstable.']
  }),
  dayExercise({
    id:'d4-lateral-raise', number:2, name:'Lateral Raise', sets:3, reps:'10–20', rest:'60 sec', note:'Side delts', slug:'lateral-raise', image:'./assets/movements/day4/lateral-raise.webp', targetImage:'./assets/targets/day4-lifelike/lateral-raise.webp', formLinks:[{label:'Dumbbell Lateral Raise', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/dumbbell-lateral-raise.html'}],
    steps:['Stand tall with a soft elbow bend and the arm slightly in front of your body.','Raise the arm out to the side until around shoulder height without shrugging.','Lower slowly and keep the torso still.'],
    cues:['Soft elbow','Lead with elbow','No shrugging'],
    watchouts:['Do not swing the torso or raise the weight far above shoulder height. Use a load you can lift smoothly without momentum.']
  }),
  dayExercise({
    id:'d4-incline-press', number:3, name:'Incline Dumbbell Press', sets:3, reps:'8–12', rest:'75–90 sec', note:'Upper chest', image:'./assets/movements/incline-press-lifelike.webp', targetImage:'./assets/targets/transparent/incline-press.webp',
    formLinks:[{label:'Incline Dumbbell Press', source:'StrengthLog', url:'https://www.strengthlog.com/dumbbell-incline-press/'}],
    steps:['Use a modest incline, plant your feet, and set the shoulder blades gently back and down.','Lower the dumbbells toward the upper chest with wrists stacked over elbows.','Press smoothly and lower under control without bouncing.'],
    cues:['Shoulders stable','Wrists stacked','Controlled descent'],
    watchouts:['Avoid excessive elbow flare, bouncing at the bottom, or arching the back just to finish a rep.']
  }),
  dayExercise({
    id:'d4-upright-row', number:4, name:'Upright Row', sets:3, requiredSets:3, setsLabel:'3', reps:'10–15', rest:'60–75 sec', note:'Shoulders + upper traps', slug:'upright-row', image:'./assets/movements/day4/upright-row.webp', targetImage:'./assets/targets/day4-lifelike/upright-row.webp', formLinks:[{label:'Dumbbell Upright Row', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/dumbbell-upright-row.html'}],
    steps:['Stand tall with the bar or handles close to the body and wrists neutral.','Pull upward until the elbows reach a comfortable height, keeping the load close.','Lower slowly without letting the shoulders roll forward.'],
    cues:['Weight close','Wrists straight','Comfortable height'],
    watchouts:['Do not force the elbows far above shoulder level if that feels uncomfortable. Keep the load moderate and the wrists neutral.']
  }),
  dayExercise({
    id:'d4-shrugs', number:5, name:'Dumbbell Shrugs', sets:3, requiredSets:3, setsLabel:'3', reps:'12–15', rest:'60 sec', note:'Upper traps', slug:'dumbbell-shrug', image:'./assets/movements/day4/shrugs.webp', targetImage:'./assets/targets/day4-lifelike/shrugs.webp', formLinks:[{label:'Dumbbell Shrug', source:'StrengthLog', url:'https://www.strengthlog.com/dumbbell-shrug/'}],
    steps:['Stand tall with the dumbbells at your sides and arms relaxed.','Lift the shoulders straight upward without rolling them forward or backward.','Pause briefly at the top, then lower fully under control.'],
    cues:['Straight up','Pause at top','Slow lower'],
    watchouts:['Avoid circling the shoulders or bending the elbows to move the dumbbells. Keep the neck relaxed and the motion controlled.']
  }),
  dayExercise({
    id:'d4-leg-raise', number:6, section:'Core & Cardio', name:'Hanging / Lying Leg Raise', sets:3, requiredSets:3, setsLabel:'3', reps:'10–15', rest:'45–60 sec', note:'Core + hip flexors', slug:'hanging-leg-raise', image:'./assets/movements/day4/leg-raise.webp', targetImage:'./assets/targets/day4-lifelike/leg-raise.webp', logType:'repsOnly',
    formLinks:[{label:'Hanging Leg Raise', source:'StrengthLog', url:'https://www.strengthlog.com/hanging-leg-raise/'},{label:'Lying Floor Leg Raise', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/lying-floor-leg-raise.html'}],
    steps:['Choose the hanging or lying version and brace before the legs move.','Raise the legs only as far as you can while keeping the pelvis controlled.','Lower slowly without swinging or letting the lower back arch sharply.'],
    cues:['Brace first','No swinging','Slow lower'],
    watchouts:['Do not chase range by swinging the legs or arching the lower back. Bend the knees or shorten the range if needed to keep control.']
  }),
  dayExercise({
    id:'d4-mountain-climber', number:7, section:'Core & Cardio', name:'Mountain Climbers', sets:3, requiredSets:3, setsLabel:'3', reps:'30–45 sec', rest:'45–60 sec', note:'Core + total body', slug:'mountain-climber', image:'./assets/movements/day4/mountain-climber.webp', targetImage:'./assets/targets/day4-lifelike/mountain-climber.webp', formLinks:[{label:'Rotating Mountain Climber', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/rotating-mountain-climber'}], logType:'time',
    steps:['Start in a strong high-plank position with shoulders over hands.','Alternate bringing one knee forward while keeping the hips controlled.','Use a pace that lets you maintain the plank shape for the full interval.'],
    cues:['Strong plank','Quiet hips','Steady rhythm'],
    watchouts:['Do not let the hips bounce high and low or the shoulders collapse. Slow down before technique breaks down.']
  }),
  dayExercise({
    id:'d4-cardio', number:8, section:'Core & Cardio', name:'Cardio — Treadmill / Stairs', sets:1, reps:'20 min', rest:'—', note:'Conditioning', image:'./assets/movements/day4/cardio.webp', targetImage:'./assets/targets/shared/cardio.webp', formLinks:[{label:'Treadmill — 20 Minute Workout', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/workouts/ultimate-treadmill-workout'},{label:'Stair / StairMaster Training', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/workouts/myers-glute-workout'}], logType:'cardio',
    steps:['Choose treadmill walking or stairs at a sustainable pace.','Keep posture tall and use the rails only for balance when needed.','Maintain a smooth effort for the full 20 minutes.'],
    cues:['Steady pace','Tall posture','Smooth breathing'],
    watchouts:['Avoid leaning heavily on the rails or sprinting when tired. Keep the pace controlled and repeatable.']
  })
];

const day5Exercises = [
  dayExercise({
    id:'d5-one-arm-row', number:1, name:'One-Arm Dumbbell Row', sets:3, reps:'8–12', rest:'75–90 sec', note:'Lats + upper back', slug:'one-arm-dumbbell-row', image:'./assets/movements/day5/one-arm-row.webp', targetImage:'./assets/targets/day5-lifelike/one-arm-row.webp', formLinks:[{label:'Dumbbell Row', source:'StrengthLog', url:'https://www.strengthlog.com/dumbbell-row/'},{label:'One Arm Dumbbell Row', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/one-arm-dumbbell-row.html'}],
    steps:['Support the torso securely and let the working arm hang long at the bottom.','Row the dumbbell toward the hip while keeping the shoulder away from the ear.','Lower slowly to a controlled stretch, then repeat on the other side.'],
    cues:['Pull to hip','Torso still','Full stretch'],
    watchouts:['Avoid twisting the torso to lift the weight or shrugging the shoulder toward the ear. Keep both sides controlled.']
  }),
  dayExercise({
    id:'d5-stiff-arm', number:2, name:'Stiff-Arm Pulldown', sets:3, requiredSets:3, setsLabel:'3', reps:'10–15', rest:'60 sec', note:'Lats', slug:'straight-arm-pulldown', image:'./assets/movements/day5/stiff-arm-pulldown.webp', targetImage:'./assets/targets/day5-lifelike/stiff-arm-pulldown.webp', formLinks:[{label:'Straight Arm Lat Pulldown', source:'StrengthLog', url:'https://www.strengthlog.com/straight-arm-lat-pulldown/'}],
    steps:['Stand facing the cable with a slight hip hinge and soft elbows.','Sweep the bar or rope down toward the thighs without turning the movement into a triceps press.','Return overhead slowly until you feel a comfortable lat stretch.'],
    cues:['Soft elbows','Sweep to thighs','Lats engaged'],
    watchouts:['Do not bend and straighten the elbows repeatedly or use torso momentum. Keep the ribs controlled and the range comfortable.']
  }),
  dayExercise({
    id:'d5-curl', number:3, name:'Preacher / Concentration Curl', sets:3, reps:'10–15', rest:'60 sec', note:'Biceps', slug:'preacher-curl', image:'./assets/movements/day5/preacher-curl.webp', targetImage:'./assets/targets/day5-lifelike/preacher-curl.webp',
    formLinks:[{label:'Barbell Preacher Curl', source:'StrengthLog', url:'https://www.strengthlog.com/barbell-preacher-curl/'},{label:'Concentration Curl', source:'StrengthLog', url:'https://www.strengthlog.com/concentration-curl/'},{label:'Barbell Preacher Curl', source:'Muscle & Strength', url:'https://cdn.muscleandstrength.com/exercises/preacher-curl.html'}],
    steps:['Choose preacher or concentration curls and position the upper arm so it stays supported.','Curl through a controlled range without lifting the elbow away from its support.','Lower slowly until the elbow is comfortably extended before the next rep.'],
    cues:['Upper arm fixed','No swinging','Slow lowering'],
    watchouts:['Do not bounce out of the bottom or use the shoulder to finish the curl. Keep the load light enough for a controlled full rep.']
  }),
  dayExercise({
    id:'d5-one-arm-triceps', number:4, name:'One-Arm Triceps Extension', sets:3, reps:'10–15', rest:'60 sec', note:'Triceps', slug:'single-arm-dumbbell-tricep-extension', image:'./assets/movements/day5/one-arm-triceps-extension.webp', targetImage:'./assets/targets/day5-lifelike/one-arm-triceps-extension.webp', formLinks:[{label:'Dumbbell Standing Triceps Extension', source:'StrengthLog', url:'https://www.strengthlog.com/dumbbell-standing-triceps-extension/'}],
    steps:['Set the working arm in a stable position with the elbow pointing comfortably forward or upward.','Extend the elbow without letting the upper arm swing around.','Return slowly, then complete the same reps on the other side.'],
    cues:['Elbow fixed','Smooth extension','Match both sides'],
    watchouts:['Avoid twisting the torso or forcing the elbow into an uncomfortable angle. Reduce the load if the upper arm cannot stay steady.']
  }),
  dayExercise({
    id:'d5-wrist-curl', number:5, name:'Wrist Curl', sets:2, reps:'12–15', rest:'45–60 sec', note:'Wrist flexors', image:'./assets/movements/day5/forearms/wrist-curl.webp', targetImage:'./assets/targets/day5-lifelike/wrist-curl.webp',
    formLinks:[{label:'Dumbbell Wrist Curl', source:'StrengthLog', url:'https://www.strengthlog.com/dumbbell-wrist-curl/'}],
    steps:['Sit with the forearms supported and palms facing up.','Let the wrists extend comfortably, then curl the dumbbells upward using only the wrists.','Lower slowly and keep the forearms still.'],
    cues:['Forearms supported','Move only wrists','Slow return'],
    watchouts:['Keep the load light enough to avoid bouncing or forcing the wrist range.']
  }),
  dayExercise({
    id:'d5-wrist-extension', number:6, name:'Wrist Extension', sets:2, reps:'12–15', rest:'45–60 sec', note:'Wrist extensors', image:'./assets/movements/day5/forearms/wrist-extension.webp', targetImage:'./assets/targets/day5-lifelike/wrist-extension.webp',
    formLinks:[{label:'Dumbbell Wrist Extension', source:'StrengthLog', url:'https://www.strengthlog.com/dumbbell-wrist-extension/'}],
    steps:['Support the forearms with palms facing down and wrists just beyond the edge.','Lift the backs of the hands upward without moving the elbows.','Lower under control through a comfortable range.'],
    cues:['Palms down','Elbows quiet','Controlled range'],
    watchouts:['Use a light load and avoid jerking the wrists or forcing painful extension.']
  }),
  dayExercise({
    id:'d5-wrist-rotation', number:7, name:'Wrist Rotation', sets:2, reps:'10–12 / side', rest:'45–60 sec', note:'Supinator + pronator', image:'./assets/movements/day5/forearms/wrist-rotation.webp', targetImage:'./assets/targets/day5-lifelike/wrist-rotation.webp', formLinks:[],
    steps:['Support the forearm and hold a light dumbbell vertically.','Rotate the forearm slowly from palm-down toward palm-up without moving the elbow.','Reverse the motion smoothly and repeat both sides.'],
    cues:['Elbow still','Rotate slowly','Light resistance'],
    watchouts:['Keep the range comfortable and stop if the wrist or elbow feels strained.']
  }),
  dayExercise({
    id:'d5-neutral-preacher', number:8, name:'Neutral-Grip Preacher Curl', sets:2, reps:'10–15', rest:'60 sec', note:'Brachioradialis', image:'./assets/movements/day5/forearms/neutral-grip-preacher-curl.webp', targetImage:'./assets/targets/day5-lifelike/neutral-grip-preacher-curl.webp',
    formLinks:[{label:'Alternating Dumbbell Hammer Preacher Curl', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/node/3720'},{label:'Hammer Curl', source:'StrengthLog', url:'https://www.strengthlog.com/hammer-curl/'}],
    steps:['Set the upper arms firmly on the preacher pad with palms facing each other.','Curl the dumbbells without lifting the elbows from the pad.','Lower slowly until the elbows are comfortably extended.'],
    cues:['Neutral grip','Upper arms fixed','Slow lowering'],
    watchouts:['Avoid bouncing out of the bottom or twisting the wrists as fatigue builds.']
  }),
  dayExercise({
    id:'d5-bicycle', number:9, section:'Core & Cardio', name:'Bicycle Crunches', sets:3, requiredSets:3, setsLabel:'3', reps:'10–15', rest:'45–60 sec', note:'Core + obliques', slug:'bicycle-crunch', image:'./assets/movements/day5/bicycle-crunch.webp', targetImage:'./assets/targets/day5-lifelike/bicycle-crunch.webp', formLinks:[{label:'Bicycle Crunch', source:'StrengthLog', url:'https://www.strengthlog.com/bicycle-crunch/'}], logType:'repsOnly',
    steps:['Lie back and brace before lifting the shoulders and legs.','Rotate the ribcage toward the opposite knee while the other leg extends.','Alternate sides slowly enough to keep the lower back controlled.'],
    cues:['Rotate ribs','Control legs','Steady pace'],
    watchouts:['Do not pull on the neck or race through the reps. Shorten the leg extension if the lower back arches.']
  }),
  dayExercise({
    id:'d5-heel-taps', number:10, section:'Core & Cardio', name:'Heel Touches / Penguins', sets:3, requiredSets:3, setsLabel:'3', reps:'10–15', rest:'45–60 sec', note:'Obliques + core', slug:'heel-tap', image:'./assets/movements/day5/heel-touches.webp', targetImage:'./assets/targets/day5-lifelike/heel-touches.webp', formLinks:[{label:'Lying Alternate Heel Touches', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/exercises/lying-heel-touches.html'}], logType:'repsOnly',
    steps:['Lie on your back with knees bent and feet planted, then brace lightly.','Reach one hand toward the same-side heel by bending sideways through the trunk.','Alternate sides with a small, controlled range.'],
    cues:['Ribs down','Side bend','Alternate evenly'],
    watchouts:['Avoid yanking the neck or sliding the hips around. Keep the movement small and driven by the side of the trunk.']
  }),
  dayExercise({
    id:'d5-cardio', number:11, section:'Core & Cardio', name:'Cardio — Treadmill / Stairs', sets:1, reps:'20 min', rest:'—', note:'Conditioning', image:'./assets/movements/cardio.webp', targetImage:'./assets/targets/shared/cardio.webp', formLinks:[{label:'Treadmill — 20 Minute Workout', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/workouts/ultimate-treadmill-workout'},{label:'Stair / StairMaster Training', source:'Muscle & Strength', url:'https://www.muscleandstrength.com/workouts/myers-glute-workout'}], logType:'cardio',
    steps:['Choose treadmill walking or stairs and settle into a sustainable rhythm.','Stay tall and keep each step controlled.','Finish the week with steady conditioning rather than an all-out effort.'],
    cues:['Steady rhythm','Tall posture','Controlled effort'],
    watchouts:['Do not push the pace so high that your stride becomes sloppy. Use the rails only when needed for balance.']
  })
];

const DAYS = {
  1:{
    title:'Chest & Biceps', exercises:day1Exercises,
    warmup:{name:'Upper Body Mobility', duration:'5 Minutes', intro:'Light cardio and dynamic stretches to prepare your body.', details:'Start with easy cardio, add a gentle band lat stretch, then finish with controlled scapular push-ups.', image:'./assets/warmup/day1-upper-body-lat-stretch.webp'},
    mainSubtitle:'Chest + biceps working sets', coreSubtitle:'Core stability + steady conditioning'
  },
  2:{
    title:'Back, Triceps & Rear Delts', exercises:day2Exercises,
    warmup:{name:'Upper Body Mobility', duration:'5 Minutes', intro:'Easy cardio and upper-body mobility before pulling work.', details:'Use easy cardio, band pull-aparts, and a gentle triceps stretch. Keep the warm-up easy and smooth.', image:'./assets/warmup/day2-band-pull-apart.webp'},
    mainSubtitle:'Back + triceps + rear delts', coreSubtitle:'Oblique control + steady conditioning'
  },
  3:{
    title:'Legs & Posterior Chain', exercises:day3Exercises,
    warmup:{name:'Lower Body Mobility', duration:'8 Minutes', intro:'Easy cardio and lower-body mobility before leg work.', details:'Use easy cardio, bodyweight squats, glute bridges, and controlled lunges. Treat the warm-up as movement practice, not fatigue work.', image:'./assets/warmup/day3-forward-lunge.webp'},
    mainSubtitle:'Quads + glutes + hamstrings', coreSubtitle:'Posterior chain + trunk stability'
  },
  4:{
    title:'Shoulders & Upper Chest', exercises:day4Exercises,
    warmup:{name:'Upper Body Mobility', duration:'5 Minutes', intro:'Easy cardio and shoulder mobility before pressing.', details:'Use easy cardio, light face pulls, and controlled scapular push-ups. Keep the shoulders moving comfortably.', image:'./assets/warmup/day4-band-face-pull.webp'},
    mainSubtitle:'Shoulders + upper chest', coreSubtitle:'Core control + steady conditioning'
  },
  5:{
    title:'Back & Arms (Volume)', exercises:day5Exercises,
    warmup:{name:'Upper Body Mobility', duration:'5 Minutes', intro:'Easy cardio and upper-body mobility before volume work.', details:'Use easy cardio, a gentle lat stretch, and band pull-aparts. Keep the warm-up short and smooth.', image:'./assets/warmup/day5-overhead-band-stretch.webp'},
    mainSubtitle:'Back + biceps + triceps', coreSubtitle:'Core control + steady conditioning'
  }
};

/* ===== src/config.js ===== */
const GYM_LOCATION = Object.freeze({
  lat: 22.273556,
  lng: 73.180375,
  radiusMeters: 100,
  accuracyMeters: 100
});

const WATER_REMINDER_INTERVAL_MS = 30 * 60 * 1000;

/* ===== src/core/date-time.js ===== */
function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function weekStartDate(date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const weekdayFromMonday = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - weekdayFromMonday);
  start.setHours(0, 0, 0, 0);
  return start;
}

function formatClockTime(value) {
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

function formatShortDate(value) {
  return new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(value));
}

function formatDuration(milliseconds) {
  const totalMinutes = Math.max(0, Math.floor(milliseconds / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes} min`;
}

/* ===== src/core/storage.js ===== */
const STORAGE_KEY = 'formfirst-5day-plan-v2';

const DEFAULT_STATE = Object.freeze({
  completed: {},
  logs: {},
  gymVisits: [],
  weeklySets: {},
  weekMigrations: {},
  biometricCredentialId: null,
  biometricUserId: null,
  developmentMode: false,
  waterReminderEnabled: false,
  waterReminderNextAt: null,
  darkMode: false
});

function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function recordOrEmpty(value) {
  return isRecord(value) ? value : {};
}

function freshDefaultState() {
  return {
    ...DEFAULT_STATE,
    completed: {},
    logs: {},
    gymVisits: [],
    weeklySets: {},
    weekMigrations: {}
  };
}

function normalizeState(saved = {}) {
  const source = isRecord(saved) ? saved : {};
  const nextReminderAt = Number(source.waterReminderNextAt);
  const state = {
    ...freshDefaultState(),
    ...source,
    completed: recordOrEmpty(source.completed),
    logs: recordOrEmpty(source.logs),
    gymVisits: Array.isArray(source.gymVisits) ? source.gymVisits.filter(isRecord) : [],
    weeklySets: recordOrEmpty(source.weeklySets),
    weekMigrations: recordOrEmpty(source.weekMigrations),
    biometricCredentialId: typeof source.biometricCredentialId === 'string' ? source.biometricCredentialId : null,
    biometricUserId: typeof source.biometricUserId === 'string' ? source.biometricUserId : null,
    developmentMode: Boolean(source.developmentMode),
    waterReminderEnabled: Boolean(source.waterReminderEnabled),
    waterReminderNextAt: Number.isFinite(nextReminderAt) ? nextReminderAt : null,
    darkMode: Boolean(source.darkMode)
  };

  // Retired prototype fields are intentionally discarded during hydration.
  delete state.steps;
  delete state.stepMeta;
  return state;
}

function loadState() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return normalizeState(serialized ? JSON.parse(serialized) : {});
  } catch {
    return freshDefaultState();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.warn('Form First state could not be persisted', error);
    return false;
  }
}

/* ===== src/core/gym-visits.js ===== */
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function getCurrentWeekVisits(visits, date = new Date()) {
  const start = weekStartDate(date).getTime();
  const end = start + WEEK_MS;

  return (Array.isArray(visits) ? visits : []).filter(visit => {
    const checkInTime = new Date(visit?.checkIn).getTime();
    return Number.isFinite(checkInTime) && checkInTime >= start && checkInTime < end;
  });
}

function getActiveGymVisit(visits) {
  const list = Array.isArray(visits) ? visits : [];
  for (let index = list.length - 1; index >= 0; index -= 1) {
    const visit = list[index];
    if (visit?.checkIn && !visit.checkOut) return visit;
  }
  return null;
}

function getWeeklyGymMinutes(visits, date = new Date(), now = Date.now()) {
  const milliseconds = getCurrentWeekVisits(visits, date).reduce((total, visit) => {
    const start = new Date(visit.checkIn).getTime();
    const end = visit.checkOut ? new Date(visit.checkOut).getTime() : now;
    if (!Number.isFinite(start) || !Number.isFinite(end)) return total;
    return total + Math.max(0, end - start);
  }, 0);

  return Math.round(milliseconds / 60_000);
}

function getLatestVisitOnDate(visits, date = new Date()) {
  const target = localDateKey(date);
  const list = Array.isArray(visits) ? visits : [];

  for (let index = list.length - 1; index >= 0; index -= 1) {
    const visit = list[index];
    if (visit?.checkIn && localDateKey(new Date(visit.checkIn)) === target) return visit;
  }

  return null;
}

/* ===== src/core/workout-progress.js ===== */
function getRequiredSetCount(exercise) {
  return Number(exercise?.requiredSets || exercise?.sets || 0);
}

function getCompletedSetCount(completedSets, exercise) {
  const required = getRequiredSetCount(exercise);
  return (completedSets?.[exercise.id] || []).slice(0, required).filter(Boolean).length;
}

function isExerciseCompleteInState(completedSets, exercise) {
  const required = getRequiredSetCount(exercise);
  return required > 0 && getCompletedSetCount(completedSets, exercise) >= required;
}

function calculateWorkoutSetStats(exercises, completedSets) {
  const list = Array.isArray(exercises) ? exercises : [];
  const total = list.reduce((sum, exercise) => sum + getRequiredSetCount(exercise), 0);
  const done = list.reduce((sum, exercise) => sum + getCompletedSetCount(completedSets, exercise), 0);
  return {
    done,
    total,
    pct: total ? Math.min(100, Math.round((done / total) * 100)) : 0
  };
}

function calculateDayStats(day, weeklySets = {}) {
  return calculateWorkoutSetStats(day?.exercises || [], weeklySets);
}

function countCompletedDays(days, weeklySets = {}) {
  return Object.values(days || {}).filter(day => {
    const stats = calculateDayStats(day, weeklySets);
    return stats.total > 0 && stats.done >= stats.total;
  }).length;
}

function getNextIncompleteExerciseId(exercises, completedSets) {
  const list = Array.isArray(exercises) ? exercises : [];
  return list.find(exercise => !isExerciseCompleteInState(completedSets, exercise))?.id || list[0]?.id || null;
}

/* ===== src/services/geolocation.js ===== */
const EARTH_RADIUS_METERS = 6_371_000;

function distanceMeters(lat1, lon1, lat2, lon2) {
  const toRadians = value => value * Math.PI / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(Math.min(1, a)));
}

function getCurrentPosition(options = {}) {
  if (!navigator.geolocation) {
    return Promise.reject(new DOMException('Geolocation is unavailable', 'NotSupportedError'));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 12_000,
      maximumAge: 0,
      ...options
    });
  });
}

/* ===== src/services/biometrics.js ===== */
function bytesToBase64Url(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlToBytes(value) {
  const text = String(value);
  const base64 = text.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(text.length / 4) * 4, '=');
  const binary = atob(base64);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

function randomChallenge(length = 32) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

async function isPlatformAuthenticatorAvailable() {
  if (!window.isSecureContext || !window.PublicKeyCredential || !navigator.credentials) return false;
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}

/**
 * Performs local platform-authenticator verification.
 * This is a device-presence gate, not server-side identity authentication.
 */
async function verifyPlatformBiometric({ credentialId = null, userId = null } = {}) {
  if (!(await isPlatformAuthenticatorAvailable())) {
    return { ok: false, reason: 'unsupported', credentialId, userId };
  }

  try {
    let nextUserId = userId || bytesToBase64Url(randomChallenge(16));

    if (!credentialId) {
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: randomChallenge(),
          rp: { name: 'Form First' },
          user: {
            id: base64UrlToBytes(nextUserId),
            name: 'formfirst-local-user',
            displayName: 'Form First'
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 },
            { type: 'public-key', alg: -257 }
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            residentKey: 'preferred',
            userVerification: 'required'
          },
          timeout: 60_000,
          attestation: 'none'
        }
      });

      if (!credential) return { ok: false, reason: 'cancelled', credentialId, userId: nextUserId };
      return {
        ok: true,
        enrolled: true,
        credentialId: bytesToBase64Url(credential.rawId),
        userId: nextUserId
      };
    }

    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: randomChallenge(),
        allowCredentials: [{
          type: 'public-key',
          id: base64UrlToBytes(credentialId),
          transports: ['internal']
        }],
        userVerification: 'required',
        timeout: 60_000
      }
    });

    return { ok: Boolean(assertion), enrolled: false, credentialId, userId: nextUserId };
  } catch (error) {
    return {
      ok: false,
      reason: error?.name === 'NotAllowedError' ? 'cancelled' : 'error',
      credentialId,
      userId
    };
  }
}

/* ===== src/services/gym-checkin.js ===== */
const GYM_CHECK_IN_REASON = Object.freeze({
  GEOLOCATION_UNSUPPORTED: 'geolocation-unsupported',
  INSECURE_CONTEXT: 'insecure-context',
  LOCATION_PERMISSION_DENIED: 'location-permission-denied',
  LOCATION_UNAVAILABLE: 'location-unavailable',
  INACCURATE_LOCATION: 'inaccurate-location',
  OUTSIDE_GYM: 'outside-gym',
  BIOMETRIC_UNSUPPORTED: 'biometric-unsupported',
  BIOMETRIC_CANCELLED: 'biometric-cancelled',
  BIOMETRIC_ERROR: 'biometric-error'
});

async function verifyGymCheckIn({
  developmentMode = false,
  credentialId = null,
  userId = null,
  gymLocation = GYM_LOCATION,
  onBiometricStart = null
} = {}) {
  if (!navigator.geolocation) {
    return { ok: false, reason: GYM_CHECK_IN_REASON.GEOLOCATION_UNSUPPORTED };
  }

  if (!window.isSecureContext) {
    return { ok: false, reason: GYM_CHECK_IN_REASON.INSECURE_CONTEXT };
  }

  let position;
  try {
    position = await getCurrentPosition();
  } catch (error) {
    return {
      ok: false,
      reason: error?.code === 1
        ? GYM_CHECK_IN_REASON.LOCATION_PERMISSION_DENIED
        : GYM_CHECK_IN_REASON.LOCATION_UNAVAILABLE
    };
  }

  const { latitude, longitude, accuracy } = position.coords;
  const distance = distanceMeters(latitude, longitude, gymLocation.lat, gymLocation.lng);
  const locationContext = { distance, accuracy };

  // Development Mode intentionally bypasses only the GPS accuracy gate.
  // Distance and biometric verification still apply.
  if (!developmentMode && accuracy > gymLocation.accuracyMeters) {
    return { ok: false, reason: GYM_CHECK_IN_REASON.INACCURATE_LOCATION, ...locationContext };
  }

  if (distance > gymLocation.radiusMeters) {
    return { ok: false, reason: GYM_CHECK_IN_REASON.OUTSIDE_GYM, ...locationContext };
  }

  onBiometricStart?.({ enrolling: !credentialId, ...locationContext });
  const biometric = await verifyPlatformBiometric({ credentialId, userId });
  if (!biometric.ok) {
    const reason = biometric.reason === 'unsupported'
      ? GYM_CHECK_IN_REASON.BIOMETRIC_UNSUPPORTED
      : biometric.reason === 'cancelled'
        ? GYM_CHECK_IN_REASON.BIOMETRIC_CANCELLED
        : GYM_CHECK_IN_REASON.BIOMETRIC_ERROR;

    return { ok: false, reason, ...locationContext };
  }

  return {
    ok: true,
    ...locationContext,
    credentialId: biometric.credentialId,
    userId: biometric.userId,
    enrolled: Boolean(biometric.enrolled)
  };
}

/* ===== src/services/notifications.js ===== */
const DEFAULT_TIMEOUT_MS = 5_000;

function notificationSupport() {
  return {
    supported: typeof Notification !== 'undefined' && 'serviceWorker' in navigator,
    permission: typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  };
}

async function requestNotificationPermission() {
  if (typeof Notification === 'undefined') return 'unsupported';
  if (Notification.permission !== 'default') return Notification.permission;
  try { return await Notification.requestPermission(); }
  catch { return 'denied'; }
}

async function getNotificationRegistration({ serviceWorkerUrl = './sw.js', timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (!('serviceWorker' in navigator)) return null;
  let registration = await navigator.serviceWorker.getRegistration();
  if (!registration) registration = await navigator.serviceWorker.register(serviceWorkerUrl);
  if (registration?.active) return registration;
  return Promise.race([
    navigator.serviceWorker.ready,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Service worker activation timed out')), timeoutMs))
  ]);
}

async function showSystemNotification(title, options = {}) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return false;
  const registration = await getNotificationRegistration();
  if (!registration?.showNotification) return false;
  await registration.showNotification(title, options);
  return true;
}

/* ===== src/ui/haptics.js ===== */
function softHaptic(pattern = 12) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // Haptics are optional progressive enhancement.
  }
}

/* ===== src/services/water-reminders.js ===== */
const APP_ICON = './icons/icon-192.png';

function createWaterReminderController({
  state,
  save,
  intervalMs,
  showToast
}) {
  let timerId = null;

  function clearTimer() {
    if (!timerId) return;
    clearTimeout(timerId);
    timerId = null;
  }

  function statusText() {
    if (!state.waterReminderEnabled) return 'Every 30 minutes';
    if (typeof Notification !== 'undefined' && Notification.permission === 'denied') {
      return 'Notifications are blocked in system settings';
    }
    return 'On · every 30 minutes';
  }

  async function showReminderNotification() {
    if (!state.waterReminderEnabled) return false;
    try {
      return await showSystemNotification('Time to drink water', {
        body: 'Take a quick hydration break.',
        icon: APP_ICON,
        badge: APP_ICON,
        tag: 'form-first-water-reminder',
        renotify: true,
        silent: false
      });
    } catch (error) {
      console.warn('Water reminder notification failed', error);
      return false;
    }
  }

  async function showTestNotification(button) {
    if (!state.developmentMode) return false;
    if (!notificationSupport().supported) {
      showToast('Notifications are not available in this browser', 'info');
      return false;
    }

    const setButtonState = (label, busy = false) => {
      if (!button) return;
      button.disabled = busy;
      button.classList.toggle('is-busy', busy);
      const labelNode = button.querySelector('span:last-child');
      if (labelNode) labelNode.textContent = label;
    };

    setButtonState('Preparing…', true);
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      setButtonState('Test Notification', false);
      showToast('Allow notifications in iOS Settings to run the test', 'info');
      return false;
    }

    try {
      const sent = await showSystemNotification('Form First', {
        body: 'Hydration reminder 💧 Take a few sips of water before your next set.',
        icon: APP_ICON,
        badge: APP_ICON,
        tag: 'form-first-development-test',
        renotify: true,
        silent: false,
        data: { source: 'development-test', url: './index.html' }
      });
      if (!sent) throw new Error('Service worker notification API unavailable');

      softHaptic(7);
      setButtonState('Notification Sent', false);
      button?.classList.add('is-sent');
      setTimeout(() => {
        if (!button?.isConnected) return;
        setButtonState('Test Notification', false);
        button.classList.remove('is-sent');
      }, 1_500);
      return true;
    } catch (error) {
      console.warn('Test notification failed', error);
      setButtonState('Test Notification', false);
      showToast(
        window.isSecureContext
          ? 'Could not send the test notification'
          : 'Notifications need HTTPS or an installed PWA',
        'info'
      );
      return false;
    }
  }

  function schedule({ fresh = false } = {}) {
    clearTimer();
    if (!state.waterReminderEnabled) return;

    const now = Date.now();
    if (fresh || !state.waterReminderNextAt) state.waterReminderNextAt = now + intervalMs;
    if (state.waterReminderNextAt <= now) {
      void showReminderNotification();
      state.waterReminderNextAt = now + intervalMs;
      save();
    }

    const delay = Math.max(1_000, state.waterReminderNextAt - Date.now());
    timerId = setTimeout(async () => {
      if (!state.waterReminderEnabled) return;
      await showReminderNotification();
      state.waterReminderNextAt = Date.now() + intervalMs;
      save();
      schedule();
    }, delay);
    save();
  }

  async function enable(button, copy) {
    if (!notificationSupport().supported) {
      if (copy) copy.textContent = 'System notifications are not supported in this browser.';
      return false;
    }

    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      state.waterReminderEnabled = false;
      state.waterReminderNextAt = null;
      save();
      clearTimer();
      button?.classList.remove('is-on');
      button?.setAttribute('aria-checked', 'false');
      if (copy) copy.textContent = permission === 'denied'
        ? 'Notifications are blocked in system settings.'
        : 'Notification permission is required.';
      return false;
    }

    state.waterReminderEnabled = true;
    state.waterReminderNextAt = Date.now() + intervalMs;
    save();
    schedule();
    button?.classList.add('is-on');
    button?.setAttribute('aria-checked', 'true');
    if (copy) copy.textContent = 'On · every 30 minutes';
    softHaptic(7);
    return true;
  }

  function disable(button, copy) {
    state.waterReminderEnabled = false;
    state.waterReminderNextAt = null;
    save();
    clearTimer();
    button?.classList.remove('is-on');
    button?.setAttribute('aria-checked', 'false');
    if (copy) copy.textContent = 'Every 30 minutes';
    softHaptic(5);
  }

  return Object.freeze({
    statusText,
    schedule,
    enable,
    disable,
    showTestNotification,
    dispose: clearTimer
  });
}

/* ===== src/ui/icons.js ===== */
const ICON = {
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.09a2 2 0 0 1 1 1.74v.5a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.55"/></svg>',
  restart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.1A7.7 7.7 0 1 1 4.8 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M5.2 4.8v3.7h3.7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  flame: '<img class="week-goal-fire-gif" src="./assets/icons8-fire.gif" alt="" aria-hidden="true" draggable="false" />',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m10 8 6 4-6 4Z" fill="currentColor"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  timer: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 10v4l3 2M9 3h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.5" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1.5" fill="currentColor"/></svg>',
  bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.8 10.3a5.2 5.2 0 0 1 10.4 0v3.1c0 1.15.45 2.25 1.25 3.07l.55.56H5l.55-.56a4.35 4.35 0 0 0 1.25-3.07v-3.1Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.7 19.1a2.55 2.55 0 0 0 4.6 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
  info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 10.8v6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="12" cy="7.4" r="1.1" fill="currentColor"/></svg>',
  location: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.1" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  faceId: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H6a3 3 0 0 0-3 3v2M16 3h2a3 3 0 0 1 3 3v2M3 16v2a3 3 0 0 0 3 3h2M21 16v2a3 3 0 0 1-3 3h-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 9v2m6-2v2m-6 4c1.5 1.6 4.5 1.6 6 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
};

/* ===== src/features/timer.js ===== */
const TIMER_PRESETS = Object.freeze([60, 90, 120]);
const DEFAULT_TIMER_SECONDS = 90;

function createTimerFeature({
  app,
  isDevelopmentMode,
  onOpenSettings,
  onTestNotification,
  onRecoveryComplete
}) {
  let initialSeconds = DEFAULT_TIMER_SECONDS;
  let remainingSeconds = DEFAULT_TIMER_SECONDS;
  let remainingMs = DEFAULT_TIMER_SECONDS * 1_000;
  let deadline = 0;
  let animationFrameId = null;
  let lastDisplayedSecond = remainingSeconds;

  function formatTimer(seconds) {
    const safeSeconds = Math.max(0, Math.ceil(Number(seconds) || 0));
    const minutes = Math.floor(safeSeconds / 60);
    const secondsPart = safeSeconds % 60;
    return `${minutes}:${String(secondsPart).padStart(2, '0')}`;
  }

  function progressPercent() {
    const totalMs = Math.max(1, initialSeconds * 1_000);
    return Math.max(0, Math.min(100, (remainingMs / totalMs) * 100));
  }

  function pulseNumber() {
    const dial = document.getElementById('timerDial');
    if (!dial || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    dial.classList.remove('timer-tick');
    void dial.offsetWidth;
    dial.classList.add('timer-tick');
    window.setTimeout(() => dial.classList.remove('timer-tick'), 340);
  }

  function resetToReady() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    deadline = 0;
    remainingSeconds = initialSeconds;
    remainingMs = initialSeconds * 1_000;
    lastDisplayedSecond = initialSeconds;
  }

  function updateUI({ tick = false } = {}) {
    remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1_000));
    const readout = document.getElementById('timerReadout');
    if (readout) readout.textContent = formatTimer(remainingSeconds);

    const progress = progressPercent();
    const dial = document.getElementById('timerDial');
    if (dial) {
      dial.style.setProperty('--timer-progress', `${progress}%`);
      dial.classList.toggle('is-running', Boolean(animationFrameId));
      dial.classList.toggle('is-urgent', Boolean(animationFrameId) && remainingSeconds > 0 && remainingSeconds <= 10);
    }

    const arc = document.getElementById('timerRingProgress');
    if (arc) arc.style.strokeDashoffset = String(100 - progress);
    if (tick && animationFrameId && remainingSeconds > 0 && remainingSeconds <= 10) pulseNumber();

    const startButton = document.getElementById('timerStart');
    if (startButton) {
      startButton.innerHTML = `<span class="button-icon">${animationFrameId ? ICON.pause : ICON.play}</span><span>${animationFrameId ? 'Pause' : 'Start'}</span>`;
    }
  }

  function stop() {
    if (animationFrameId) {
      remainingMs = Math.max(0, deadline - performance.now());
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
      deadline = 0;
    }
    lastDisplayedSecond = Math.max(0, Math.ceil(remainingMs / 1_000));
    updateUI();
  }

  function frame(now) {
    if (!animationFrameId) return;

    remainingMs = Math.max(0, deadline - now);
    const displayedSecond = Math.max(0, Math.ceil(remainingMs / 1_000));
    const tick = displayedSecond !== lastDisplayedSecond;
    if (tick) lastDisplayedSecond = displayedSecond;

    if (remainingMs <= 0) {
      const completedDuration = initialSeconds;
      animationFrameId = null;
      deadline = 0;
      softHaptic([12, 42, 18]);
      onRecoveryComplete?.(completedDuration);
      resetToReady();
      updateUI();
      return;
    }

    updateUI({ tick });
    animationFrameId = requestAnimationFrame(frame);
  }

  function startOrPause() {
    if (animationFrameId) {
      stop();
      return;
    }
    if (remainingMs <= 0) resetToReady();

    const dial = document.getElementById('timerDial');
    const readout = document.getElementById('timerReadout');
    const arc = document.getElementById('timerRingProgress');
    const startButton = document.getElementById('timerStart');
    const stableMs = Math.max(0, Math.round(remainingMs));

    remainingMs = stableMs;
    remainingSeconds = Math.max(0, Math.ceil(stableMs / 1_000));
    lastDisplayedSecond = remainingSeconds;
    dial?.classList.remove('timer-tick', 'is-urgent');
    dial?.classList.add('timer-start-stable');
    if (readout) readout.textContent = formatTimer(remainingSeconds);
    if (arc) arc.style.strokeDashoffset = String(100 - progressPercent());

    deadline = performance.now() + stableMs;
    animationFrameId = requestAnimationFrame(frame);
    dial?.classList.add('is-running');
    if (startButton) startButton.innerHTML = `<span class="button-icon">${ICON.pause}</span><span>Pause</span>`;
    requestAnimationFrame(() => requestAnimationFrame(() => dial?.classList.remove('timer-start-stable')));
  }

  function selectPreset(seconds) {
    stop();
    initialSeconds = Number(seconds);
    remainingSeconds = initialSeconds;
    remainingMs = initialSeconds * 1_000;
    lastDisplayedSecond = initialSeconds;
    app.querySelectorAll('[data-timer-preset]').forEach(button => {
      button.classList.toggle('active', Number(button.dataset.timerPreset) === initialSeconds);
    });
    updateUI();
  }

  function reset() {
    stop();
    remainingSeconds = initialSeconds;
    remainingMs = initialSeconds * 1_000;
    lastDisplayedSecond = initialSeconds;
    updateUI();
  }

  function syncDevelopmentModeUI() {
    const controls = document.getElementById('timerControls');
    let testButton = document.getElementById('testNotificationBtn');

    if (isDevelopmentMode() && controls && !testButton) {
      testButton = document.createElement('button');
      testButton.className = 'test-notification-btn';
      testButton.id = 'testNotificationBtn';
      testButton.type = 'button';
      testButton.innerHTML = `<span class="button-icon">${ICON.bell}</span><span>Test Notification</span>`;
      controls.appendChild(testButton);
      testButton.addEventListener('click', event => onTestNotification?.(event.currentTarget));
    } else if (!isDevelopmentMode()) {
      testButton?.remove();
    }
  }

  function render() {
    const progress = progressPercent();
    app.innerHTML = `<main class="screen note-theme nav-screen">
      <header class="topbar note-topbar workout-topbar"><span class="topbar-spacer" aria-hidden="true"></span><div class="topbar-title">Timer</div><button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${ICON.settings}</button></header>
      <div class="container nav-page-container timer-page">
        <section class="timer-note-card">
          <span class="note-kicker">Recovery</span><p>Keep the break intentional, then get back to your next set.</p>
          <div class="timer-dial ${animationFrameId ? 'is-running' : ''}" id="timerDial" style="--timer-progress:${progress}%">
            <svg class="timer-ring" viewBox="0 0 120 120" aria-hidden="true">
              <circle class="timer-ring-track" cx="60" cy="60" r="52" pathLength="100"></circle>
              <circle class="timer-ring-progress" id="timerRingProgress" cx="60" cy="60" r="52" pathLength="100" stroke-dasharray="100" stroke-dashoffset="${100 - progress}"></circle>
            </svg>
            <div class="timer-dial-content"><strong id="timerReadout">${formatTimer(remainingMs / 1_000)}</strong><small>remaining</small></div>
          </div>
          <div class="timer-controls" id="timerControls">
            <div class="timer-presets">${TIMER_PRESETS.map(seconds => `<button data-timer-preset="${seconds}" class="${initialSeconds === seconds ? 'active' : ''}">${seconds}s</button>`).join('')}</div>
            <div class="timer-actions"><button class="secondary-timer-btn" id="timerReset"><span class="button-icon">${ICON.restart}</span><span>Reset</span></button><button class="primary-timer-btn" id="timerStart"><span class="button-icon">${animationFrameId ? ICON.pause : ICON.play}</span><span>${animationFrameId ? 'Pause' : 'Start'}</span></button></div>
            ${isDevelopmentMode() ? `<button class="test-notification-btn" id="testNotificationBtn" type="button"><span class="button-icon">${ICON.bell}</span><span>Test Notification</span></button>` : ''}
          </div>
        </section>
      </div>
    </main>`;

    app.querySelectorAll('[data-timer-preset]').forEach(button => {
      button.addEventListener('click', () => selectPreset(button.dataset.timerPreset));
    });
    document.getElementById('timerStart')?.addEventListener('click', startOrPause);
    document.getElementById('timerReset')?.addEventListener('click', reset);
    document.getElementById('testNotificationBtn')?.addEventListener('click', event => onTestNotification?.(event.currentTarget));
    document.getElementById('moreBtn')?.addEventListener('click', () => onOpenSettings?.());
    updateUI();
  }

  return Object.freeze({
    render,
    syncDevelopmentModeUI
  });
}

/* ===== src/ui/celebrations.js ===== */
function reducedMotionEnabled() {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

function celebrateSetCompletion(button) {
  if (!button || reducedMotionEnabled()) return;

  const rect = button.getBoundingClientRect();
  const canvas = document.createElement('canvas');
  canvas.className = 'set-confetti-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  const context = canvas.getContext('2d', { alpha: true });
  if (!context) {
    canvas.remove();
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const colors = ['#58cc02', '#ffd900', '#1cb0f6', '#ce82ff', '#ff9600'];
  const particleCount = 18;
  const particles = Array.from({ length: particleCount }, (_, index) => {
    const angle = (-Math.PI * 0.92) + (Math.PI * 0.84) * (index / (particleCount - 1)) + ((Math.random() - 0.5) * 0.18);
    const speed = 2.7 + Math.random() * 2.7;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.1,
      gravity: 0.14 + Math.random() * 0.07,
      drag: 0.982,
      size: 2.6 + Math.random() * 3.5,
      rotation: Math.random() * Math.PI,
      rotationVelocity: (Math.random() - 0.5) * 0.28,
      color: colors[index % colors.length],
      life: 1,
      decay: 0.024 + Math.random() * 0.012,
      round: index % 4 === 0
    };
  });

  let previousFrame = performance.now();
  const draw = now => {
    const delta = Math.min(2, (now - previousFrame) / 16.667 || 1);
    previousFrame = now;
    context.clearRect(0, 0, width, height);
    let hasLiveParticle = false;

    for (const particle of particles) {
      particle.vx *= Math.pow(particle.drag, delta);
      particle.vy += particle.gravity * delta;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.rotation += particle.rotationVelocity * delta;
      particle.life -= particle.decay * delta;
      if (particle.life <= 0) continue;

      hasLiveParticle = true;
      context.save();
      context.globalAlpha = Math.max(0, particle.life);
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      if (particle.round) {
        context.beginPath();
        context.arc(0, 0, particle.size * 0.52, 0, Math.PI * 2);
        context.fill();
      } else {
        context.fillRect(-particle.size / 2, -particle.size * 0.72, particle.size, particle.size * 1.44);
      }
      context.restore();
    }

    if (hasLiveParticle) requestAnimationFrame(draw);
    else canvas.remove();
  };

  requestAnimationFrame(draw);
}

function celebrateDayCompletion({ dayNumber, completedDays, totalDays }) {
  document.querySelector('.workout-celebration')?.remove();
  const layer = document.createElement('div');
  layer.className = 'workout-celebration imessage-confetti';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = `<canvas class="confetti-canvas"></canvas><div class="celebration-badge">${ICON.check}<strong>Day ${dayNumber} complete</strong><small>Weekly goal ${completedDays}/${totalDays}</small></div>`;
  document.body.appendChild(layer);

  const canvas = layer.querySelector('.confetti-canvas');
  const context = canvas?.getContext('2d', { alpha: true });
  if (!canvas || !context) {
    layer.remove();
    return;
  }

  const colors = ['#ffcc00', '#34c759', '#0a84ff', '#ff375f', '#bf5af2', '#ff9f0a', '#64d2ff'];
  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resize();
  const particleCount = Math.min(220, Math.max(150, Math.round(width * 0.42)));
  const particles = Array.from({ length: particleCount }, (_, index) => ({
    x: Math.random() * width,
    y: -20 - Math.random() * height * 0.38,
    vx: (Math.random() - 0.5) * 2.2,
    vy: 2.7 + Math.random() * 3.8,
    gravity: 0.035 + Math.random() * 0.025,
    drag: 0.996,
    size: 5 + Math.random() * 7,
    long: Math.random() > 0.5,
    circle: Math.random() > 0.84,
    rotation: Math.random() * Math.PI * 2,
    rotationVelocity: (Math.random() - 0.5) * 0.22,
    phase: Math.random() * Math.PI * 2,
    wobble: 0.04 + Math.random() * 0.045,
    color: colors[index % colors.length],
    alpha: 0.95
  }));

  const startedAt = performance.now();
  let previousFrame = startedAt;
  const duration = 2_850;
  const draw = now => {
    const delta = Math.min(2.2, (now - previousFrame) / 16.667 || 1);
    previousFrame = now;
    context.clearRect(0, 0, width, height);
    const elapsed = now - startedAt;

    for (const particle of particles) {
      particle.vx *= Math.pow(particle.drag, delta);
      particle.vy += particle.gravity * delta;
      particle.x += (particle.vx + Math.sin(particle.phase) * 0.45) * delta;
      particle.y += particle.vy * delta;
      particle.rotation += particle.rotationVelocity * delta;
      particle.phase += particle.wobble * delta;
      if (elapsed > 2_200) particle.alpha = Math.max(0, particle.alpha - 0.018 * delta);

      context.save();
      context.globalAlpha = particle.alpha;
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.scale(1, Math.max(0.18, Math.abs(Math.sin(particle.phase))));
      context.fillStyle = particle.color;
      if (particle.circle) {
        context.beginPath();
        context.arc(0, 0, particle.size * 0.48, 0, Math.PI * 2);
        context.fill();
      } else {
        const particleHeight = particle.long ? particle.size * 1.65 : particle.size;
        context.fillRect(-particle.size / 2, -particleHeight / 2, particle.size, particleHeight);
      }
      context.restore();
    }

    if (elapsed < duration) requestAnimationFrame(draw);
    else layer.classList.add('is-leaving');
  };

  requestAnimationFrame(draw);
  softHaptic([10, 32, 10, 32, 16, 42, 20]);

  const onResize = () => resize();
  window.addEventListener('resize', onResize, { passive: true });
  setTimeout(() => {
    window.removeEventListener('resize', onResize);
    layer.remove();
  }, 3_450);
}

/* ===== src/ui/edge-back.js ===== */
function installEdgeBackGesture({ app, getCurrentView, onBack, edgeStart = 28 }) {
  let gesture = null;

  document.addEventListener('pointerdown', event => {
    if (getCurrentView() !== 'detail' || document.querySelector('.settings-overlay,.form-picker-backdrop,.form-webview')) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.clientX > edgeStart) return;
    const stage = app.querySelector('.edge-back-stage');
    const screen = stage?.querySelector('.detail-screen');
    const underlay = stage?.querySelector('.edge-back-underlay');
    if (!stage || !screen || !underlay) return;
    gesture = { id:event.pointerId, startX:event.clientX, startY:event.clientY, previousX:event.clientX, previousAt:performance.now(), velocityX:0, screen, underlay, stage, tracking:false };
  }, { passive:true });

  document.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const rawDx = event.clientX - gesture.startX;
    const dx = Math.max(0, rawDx);
    const dy = Math.abs(event.clientY - gesture.startY);
    if (!gesture.tracking) {
      if (dx < 7) return;
      if (dy > dx * .72 || rawDx < 0) { gesture = null; return; }
      gesture.tracking = true;
      gesture.stage.classList.add('edge-back-active');
      gesture.screen.classList.add('edge-back-dragging');
      gesture.screen.setPointerCapture?.(event.pointerId);
    }
    event.preventDefault();
    const width = Math.max(1, window.innerWidth);
    const distance = Math.min(width, dx);
    const progress = Math.min(1, distance / width);
    const now = performance.now();
    const elapsed = Math.max(1, now - gesture.previousAt);
    gesture.velocityX = (event.clientX - gesture.previousX) / elapsed;
    gesture.previousX = event.clientX;
    gesture.previousAt = now;
    gesture.screen.style.transform = `translate3d(${distance}px,0,0)`;
    gesture.underlay.style.transform = `translate3d(${-12 * (1 - progress)}vw,0,0)`;
    gesture.underlay.style.filter = `brightness(${.90 + progress * .10})`;
    gesture.stage.style.setProperty('--edge-back-progress', String(progress));
  }, { passive:false });

  const finish = event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const current = gesture;
    gesture = null;
    const width = Math.max(1, window.innerWidth);
    const dx = Math.max(0, event.clientX - current.startX);
    const progress = Math.min(1, dx / width);
    const shouldGoBack = current.tracking && (progress >= .32 || (current.velocityX > .55 && dx > 34));
    current.screen.classList.remove('edge-back-dragging');
    current.stage.classList.remove('edge-back-active');
    if (!current.tracking) return;

    if (shouldGoBack) {
      current.stage.classList.add('edge-back-committing');
      current.screen.style.transform = `translate3d(${width}px,0,0)`;
      current.underlay.style.transform = 'translate3d(0,0,0)';
      current.underlay.style.filter = 'brightness(1)';
      current.stage.style.setProperty('--edge-back-progress', '1');
      softHaptic(5);
      setTimeout(onBack, 230);
      return;
    }

    current.stage.classList.add('edge-back-cancelling');
    current.screen.style.transform = 'translate3d(0,0,0)';
    current.underlay.style.transform = 'translate3d(-12vw,0,0)';
    current.underlay.style.filter = 'brightness(.90)';
    current.stage.style.setProperty('--edge-back-progress', '0');
    setTimeout(() => {
      current.stage.classList.remove('edge-back-cancelling');
      current.screen.style.removeProperty('transform');
      current.stage.style.removeProperty('--edge-back-progress');
    }, 250);
  };

  document.addEventListener('pointerup', finish, { passive:true });
  document.addEventListener('pointercancel', finish, { passive:true });
}

/* ===== src/ui/exercise-media.js ===== */
const TARGET_DESCRIPTIONS = Object.freeze({
  'incline-press':'Emphasizes upper chest while front delts and triceps assist.','flat-press':'Trains chest through horizontal pressing with triceps assisting.','cable-fly':'Isolates chest through controlled shoulder adduction and stretch.','incline-curl':'Loads biceps strongly from a lengthened shoulder position.','hammer-curl':'Trains brachialis and biceps with a neutral grip.','cable-crunch':'Targets abs through loaded spinal flexion and controlled bracing.','deadbug-plank':'Builds deep core stability by resisting unwanted spinal movement.','cardio':'Builds steady aerobic endurance through sustained lower-body work.','d2-lat-pulldown':'Trains lats and upper back through vertical pulling.','d2-chest-row':'Emphasizes upper back while lats and rear delts assist.','d2-cable-pressdown':'Isolates triceps through elbow extension with upper arms fixed.','d2-overhead-triceps':'Biases triceps long head in an overhead stretched position.','d2-rear-delt':'Targets rear delts and upper back through horizontal abduction.','d2-russian-twist':'Trains obliques through controlled torso rotation under tension.','d2-side-plank':'Builds lateral core stability through anti-side-bending tension.','d2-cardio':'Builds steady aerobic endurance through sustained lower-body work.','d3-squat':'Trains quads and glutes through loaded knee and hip extension.','d3-rdl':'Emphasizes hamstrings and glutes through a controlled hip hinge.','d3-split-squat':'Trains quads and glutes one leg at a time.','d3-ham-curl':'Isolates hamstrings through controlled knee flexion.','d3-pallof':'Builds core stability by resisting cable-driven rotation.','d3-back-extension':'Trains spinal erectors and glutes through controlled hip extension.','d3-cardio':'Builds steady aerobic endurance through sustained lower-body work.','d4-shoulder-press':'Targets shoulders while triceps assist the overhead press.','d4-lateral-raise':'Isolates side delts through controlled arm elevation.','d4-incline-press':'Emphasizes upper chest while front delts and triceps assist.','d4-upright-row':'Trains side delts and upper traps through vertical pulling.','d4-shrugs':'Isolates upper traps through controlled shoulder elevation.','d4-leg-raise':'Targets lower abs and hip flexors through leg lifting.','d4-mountain-climber':'Trains core stability while hips drive alternating knee movement.','d4-cardio':'Builds steady aerobic endurance through sustained lower-body work.','d5-one-arm-row':'Trains lats and upper back through unilateral horizontal pulling.','d5-stiff-arm':'Isolates lats through shoulder extension with minimal elbow movement.','d5-curl':'Isolates biceps by fixing the upper arm during curling.','d5-one-arm-triceps':'Isolates one triceps through controlled overhead elbow extension.','d5-wrist-curl':'Targets the wrist flexors through controlled palm-up wrist flexion.','d5-wrist-extension':'Targets the wrist extensors through controlled palm-down wrist extension.','d5-wrist-rotation':'Targets the supinator and pronator muscles through controlled forearm rotation.','d5-neutral-preacher':'Emphasizes the brachioradialis with supported neutral-grip elbow flexion.','d5-bicycle':'Trains obliques and abs through alternating flexion and rotation.','d5-heel-taps':'Targets obliques through repeated side bending from a braced position.','d5-cardio':'Builds steady aerobic endurance through sustained lower-body work.'
});

function targetDescription(exercise) {
  return TARGET_DESCRIPTIONS[exercise.id] || `Focuses on ${String(exercise.note || 'the target muscles').toLowerCase()}.`;
}

function formatMuscleLabel(label = '') {
  const raw = String(label).trim();
  if (!raw.includes('+')) return raw;
  return raw.split('+').map(part => part.trim().replace(/\b([a-z])/g, char => char.toUpperCase())).join(' + ');
}

function targetMarkup(exercise) {
  const label = formatMuscleLabel(exercise.note);
  return `<div class="target-copy"><span class="note-kicker">Target area</span><strong>${label}</strong><p>${targetDescription(exercise)}</p></div><div class="target-visual"><img class="target-muscle-image" src="${exercise.targetImage}" alt="Muscle diagram highlighting ${label}" /></div>`;
}

function movementMarkup(exercise) {
  if (exercise.image) return `<figure class="movement-figure edge-to-edge"><img src="${exercise.image}" alt="Lifelike illustration showing the start and finish positions for ${exercise.name}" /></figure>`;
  if (!exercise.movementFrames?.length) return '';
  return `<figure class="movement-figure edge-to-edge wg-movement-figure"><div class="wg-movement-pair" aria-label="Start and finish positions for ${exercise.name}"><div class="wg-frame"><img src="${exercise.movementFrames[0]}" alt="${exercise.name} start position" loading="eager" referrerpolicy="no-referrer" /></div><div class="wg-arrow" aria-hidden="true">${ICON.chevron}</div><div class="wg-frame"><img src="${exercise.movementFrames[1]}" alt="${exercise.name} finish position" loading="eager" referrerpolicy="no-referrer" /></div></div><figcaption class="movement-credit">Exercise art: Bryl Lim / Workout Guide · CC BY-SA 4.0</figcaption></figure>`;
}

/* ===== src/ui/feedback.js ===== */
let dismissTimer = null;
let removeTimer = null;

function dismissFeedbackNotice() {
  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = null;
  }

  const banner = document.getElementById('recoveryRewardBanner');
  if (!banner) return;

  banner.classList.remove('show');
  if (removeTimer) clearTimeout(removeTimer);
  removeTimer = window.setTimeout(() => {
    banner.remove();
    removeTimer = null;
  }, 320);
}

function replaceNotice({ className, role = 'status', ariaLive = 'polite', markup, duration, haptic }) {
  dismissFeedbackNotice();
  document.getElementById('recoveryRewardBanner')?.remove();

  const banner = document.createElement('aside');
  banner.id = 'recoveryRewardBanner';
  banner.className = className;
  banner.setAttribute('role', role);
  banner.setAttribute('aria-live', ariaLive);
  banner.innerHTML = markup;
  document.body.appendChild(banner);

  banner.querySelector('.recovery-reward-close')?.addEventListener('click', dismissFeedbackNotice);
  requestAnimationFrame(() => banner.classList.add('show'));
  if (haptic) softHaptic(haptic);

  if (duration > 0) dismissTimer = window.setTimeout(dismissFeedbackNotice, duration);
  return banner;
}

function notificationCopyForMessage(message, type = 'info') {
  const normalized = String(message || '').trim();
  const entries = [
    ['Location is not available in this browser', 'Location unavailable', 'This browser can’t provide the location needed for gym attendance.'],
    ['Gym check-in needs HTTPS or an installed PWA', 'Secure app required', 'Open Form First from HTTPS or the installed Home Screen app before checking in.'],
    ['Set up Face ID for Form First', 'Face ID setup', 'Finish the Face ID prompt before Form First records a verified gym visit.'],
    ['Face ID verification needs a supported iPhone PWA over HTTPS', 'Face ID unavailable', 'Use the installed iPhone PWA over HTTPS to verify gym attendance with Face ID.'],
    ['Face ID verification cancelled', 'Face ID cancelled', 'No check-in was recorded. You can try again whenever you’re ready.'],
    ['Face ID verification could not be completed', 'Face ID not verified', 'Form First couldn’t verify device identity, so no check-in was recorded.'],
    ['Allow precise location to verify gym check-in', 'Precise location needed', 'Enable Precise Location for Form First, then try checking in again.'],
    ['Could not get a reliable location', 'Location unavailable', 'Form First couldn’t get a reliable GPS reading. Move to a clearer area and try again.'],
    ['No active gym session', 'No active gym session', 'There isn’t a current verified visit to check out.'],
    ['Gym session checked out', 'Gym session complete', 'Today’s check-out time has been saved.'],
    ['Notifications are not available in this browser', 'Notifications unavailable', 'This browser can’t display Form First system notifications.'],
    ['Allow notifications in iOS Settings to run the test', 'Notification permission needed', 'Allow Form First notifications in iOS Settings, then run the test again.'],
    ['Could not send the test notification', 'Test notification failed', 'Form First couldn’t deliver the sample notification on this device.'],
    ['New week started', 'New week started', 'This week’s completion progress and gym visits were reset while your reps and weights were kept.'],
    ['Form guide unavailable for this exercise', 'Form guide unavailable', 'No verified external form guide is mapped to this exercise yet.']
  ];

  const matched = entries.find(([needle]) => normalized.includes(needle));
  if (matched) {
    return {
      eyebrow: type === 'success' ? 'Completed' : 'Form First',
      title: matched[1],
      message: matched[2]
    };
  }

  return {
    eyebrow: type === 'success' ? 'Completed' : 'Form First',
    title: normalized || 'Update',
    message: type === 'success' ? 'The update has been saved.' : 'Review this message, then continue when you’re ready.'
  };
}

function showAppNotice({
  kind = 'info',
  eyebrow = 'Form First',
  title = 'Update',
  message = '',
  icon = null,
  footnote = '',
  actionLabel = '',
  onAction = null,
  duration = 7_000
} = {}) {
  const badgeIcon = icon || (kind === 'success' ? ICON.check : ICON.info || ICON.location);
  const banner = replaceNotice({
    className: `recovery-reward-banner app-feedback-notice app-feedback-generic is-${kind}`,
    role: kind === 'success' ? 'status' : 'alert',
    ariaLive: kind === 'success' ? 'polite' : 'assertive',
    duration,
    haptic: kind === 'success' ? [8, 34, 12] : 6,
    markup: `
      <div class="recovery-reward-head">
        <div class="recovery-reward-badge" aria-hidden="true">
          <span class="recovery-reward-rays"></span>
          <span class="recovery-reward-check">${badgeIcon}</span>
        </div>
        <div class="recovery-reward-copy">
          <span class="recovery-reward-eyebrow">${eyebrow}</span>
          <strong>${title}</strong>
          <span>${message}</span>
        </div>
        <button class="recovery-reward-close" type="button" aria-label="Dismiss">${ICON.close}</button>
      </div>
      <div class="recovery-reward-progress app-feedback-generic-body ${actionLabel ? 'has-action' : ''}">
        <span class="recovery-reward-next">${footnote || (kind === 'success' ? 'Saved in Form First' : 'Your current page and workout state are preserved.')}</span>
        ${actionLabel ? `<button class="recovery-reward-action" type="button"><span>${actionLabel}</span>${ICON.chevron}</button>` : ''}
      </div>`
  });

  banner.querySelector('.recovery-reward-action')?.addEventListener('click', () => {
    dismissFeedbackNotice();
    softHaptic(7);
    onAction?.();
  });
}

function showToast(message, type = 'info') {
  const copy = notificationCopyForMessage(message, type);
  showAppNotice({
    kind: type === 'success' ? 'success' : type === 'lock' ? 'warning' : 'info',
    eyebrow: copy.eyebrow,
    title: copy.title,
    message: copy.message,
    icon: type === 'lock' ? ICON.faceId || ICON.info : type === 'success' ? ICON.check : ICON.info,
    duration: type === 'success' ? 6_500 : 8_000
  });
}

function showGymCheckInNotice({
  kind = 'success',
  distance = null,
  accuracy = null,
  checkInTime = null,
  hasWorkoutProgress = false,
  onContinue,
  onRetry
} = {}) {
  const isSuccess = kind === 'success';
  const isAccuracy = kind === 'accuracy';
  const safeDistance = Number.isFinite(distance) ? Math.max(0, Math.round(distance)) : null;
  const safeAccuracy = Number.isFinite(accuracy) ? Math.max(0, Math.round(accuracy)) : null;
  const actionLabel = isSuccess ? (hasWorkoutProgress ? 'Continue Workout' : 'Start Workout') : 'Try Again';
  const eyebrow = isSuccess ? 'Check-In Verified' : isAccuracy ? 'Location Needs Attention' : 'Check-In Unavailable';
  const title = isSuccess ? 'You’re Checked In' : isAccuracy ? 'Get a Clearer Location Signal' : 'You’re Outside the Gym Area';
  const supporting = isSuccess
    ? 'Location and Face ID are verified.'
    : isAccuracy
      ? 'Move to an open area so Form First can get a more reliable location, then try again.'
      : `Move within ${GYM_LOCATION.radiusMeters} m of the gym to check in.`;
  const footnote = isSuccess
    ? `Checked in at ${formatClockTime(checkInTime || new Date())}`
    : isAccuracy
      ? 'A clearer signal helps prevent an incorrect gym check-in.'
      : 'Move closer to the gym, then try again.';
  const metrics = isSuccess
    ? `<div><small>Distance</small><strong>${safeDistance === null ? '—' : `${safeDistance} m`}</strong></div>
       <div><small>Accuracy</small><strong>${safeAccuracy === null ? '—' : `${safeAccuracy} m`}</strong></div>
       <div><small>Check-In</small><strong>${formatClockTime(checkInTime || new Date())}</strong></div>`
    : `<div><small>Current Accuracy</small><strong>${safeAccuracy === null ? '—' : `${safeAccuracy} m`}</strong></div>
       <div><small>Distance From Gym</small><strong>${safeDistance === null ? '—' : `${safeDistance} m`}</strong></div>`;

  const banner = replaceNotice({
    className: `recovery-reward-banner app-feedback-notice ${isSuccess ? 'is-success' : isAccuracy ? 'is-accuracy' : 'is-away'}`,
    role: isSuccess ? 'status' : 'alert',
    ariaLive: isSuccess ? 'polite' : 'assertive',
    duration: isSuccess ? 9_000 : 12_000,
    haptic: isSuccess ? [10, 45, 14] : 8,
    markup: `
      <div class="recovery-reward-head">
        <div class="recovery-reward-badge" aria-hidden="true">
          <span class="recovery-reward-rays"></span>
          <span class="recovery-reward-check">${isSuccess ? ICON.check : ICON.location}</span>
        </div>
        <div class="recovery-reward-copy">
          <span class="recovery-reward-eyebrow">${eyebrow}</span>
          <strong>${title}</strong>
          <span>${supporting}</span>
        </div>
        <button class="recovery-reward-close" type="button" aria-label="Dismiss">${ICON.close}</button>
      </div>
      <div class="recovery-reward-progress app-feedback-progress ${isSuccess ? '' : 'is-retry'}">
        <div class="app-feedback-metrics" aria-label="Check-in details">${metrics}</div>
        <span class="recovery-reward-next">${footnote}</span>
        <button class="recovery-reward-action" type="button"><span>${actionLabel}</span>${isSuccess ? ICON.chevron : ICON.restart}</button>
      </div>`
  });

  banner.querySelector('.recovery-reward-action')?.addEventListener('click', () => {
    dismissFeedbackNotice();
    softHaptic(7);
    if (isSuccess) onContinue?.();
    else onRetry?.();
  });
}

function showRecoveryRewardNotice({ durationSeconds, dayNumber, stats, onContinue }) {
  const remaining = Math.max(0, stats.total - stats.done);
  const dayPercent = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
  const banner = replaceNotice({
    className: 'recovery-reward-banner',
    duration: 8_500,
    markup: `
      <div class="recovery-reward-head">
        <div class="recovery-reward-badge" aria-hidden="true">
          <span class="recovery-reward-rays"></span>
          <span class="recovery-reward-check">${ICON.check}</span>
        </div>
        <div class="recovery-reward-copy">
          <span class="recovery-reward-eyebrow">Recovery complete</span>
          <strong>Ready for your next set</strong>
          <span>${durationSeconds}s rest finished</span>
        </div>
        <button class="recovery-reward-close" type="button" aria-label="Dismiss">${ICON.close}</button>
      </div>
      <div class="recovery-reward-progress" aria-label="Day ${dayNumber} workout progress">
        <div class="recovery-reward-progress-row"><span>Day ${dayNumber}</span><strong>${stats.done}/${stats.total} sets</strong></div>
        <div class="recovery-reward-track" aria-hidden="true"><i style="width:${dayPercent}%"></i></div>
        <span class="recovery-reward-next">${remaining ? `${remaining} working set${remaining === 1 ? '' : 's'} left today` : 'Today’s workout is complete'}</span>
        <button class="recovery-reward-action" type="button"><span>Continue workout</span>${ICON.chevron}</button>
      </div>`
  });

  banner.querySelector('.recovery-reward-action')?.addEventListener('click', () => {
    dismissFeedbackNotice();
    softHaptic(7);
    onContinue?.();
  });
}

/* ===== src/core/html.js ===== */
function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/* ===== src/ui/form-guide.js ===== */
function browserHost(url) {
  try { return new URL(url, window.location.href).hostname.replace(/^www\./, ''); }
  catch { return 'Web'; }
}

function openFormBrowser(url, title, source, onUnavailable) {
  const safeUrl = String(url || '').trim();
  if (!/^https?:\/\//i.test(safeUrl)) { onUnavailable(); return; }

  document.getElementById('formWebView')?.remove();
  const overlay = document.createElement('section');
  overlay.id = 'formWebView';
  overlay.className = 'form-webview';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `${title} web view`);
  const safeTitle = escapeHtml(title);
  const safeSource = escapeHtml(source || 'Watch Form');
  const safeHost = escapeHtml(browserHost(safeUrl));
  const safeFrameUrl = escapeHtml(safeUrl);
  overlay.innerHTML = `<div class="form-webview-shell"><header class="form-webview-bar"><button type="button" class="form-webview-done" id="formWebViewDone">Done</button><div class="form-webview-title"><strong>${safeSource}</strong><small>${safeHost}</small></div><button type="button" class="form-webview-external" id="formWebViewExternal" aria-label="Open in Safari">${ICON.external}</button></header><div class="form-webview-content"><div class="form-webview-loading" id="formWebViewLoading" aria-live="polite"><span class="form-webview-spinner" aria-hidden="true"></span><span>Loading form guide…</span></div><iframe class="form-webview-frame" id="formWebViewFrame" src="${safeFrameUrl}" title="${safeTitle}" referrerpolicy="strict-origin-when-cross-origin" allow="fullscreen" loading="eager"></iframe><div class="form-webview-fallback" id="formWebViewFallback"><span>If this website blocks in-app viewing, open it in Safari.</span><button type="button" id="formWebViewFallbackOpen">Open in Safari</button></div></div></div>`;
  document.body.appendChild(overlay);
  document.body.classList.add('form-webview-open');
  requestAnimationFrame(() => overlay.classList.add('is-visible'));

  let closed = false;
  const onKey = event => { if (event.key === 'Escape') close(); };
  const close = () => {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey);
    overlay.classList.remove('is-visible');
    document.body.classList.remove('form-webview-open');
    setTimeout(() => overlay.remove(), 280);
  };
  const openExternal = () => window.open(safeUrl, '_blank', 'noopener,noreferrer');

  overlay.querySelector('#formWebViewDone')?.addEventListener('click', close);
  overlay.querySelector('#formWebViewExternal')?.addEventListener('click', openExternal);
  overlay.querySelector('#formWebViewFallbackOpen')?.addEventListener('click', openExternal);
  const frame = overlay.querySelector('#formWebViewFrame');
  const loading = overlay.querySelector('#formWebViewLoading');
  frame?.addEventListener('load', () => loading?.classList.add('is-hidden'), { once: true });
  frame?.addEventListener('error', () => {
    loading?.classList.add('is-hidden');
    overlay.querySelector('#formWebViewFallback')?.classList.add('is-prominent');
  }, { once: true });
  document.addEventListener('keydown', onKey);
}

function openPicker(exercise, links, onUnavailable) {
  document.getElementById('formPicker')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'formPicker';
  overlay.className = 'form-picker-backdrop';
  const exerciseName = escapeHtml(exercise.name);
  overlay.innerHTML = `<div class="form-picker" role="dialog" aria-modal="true" aria-label="Choose form guide"><div class="form-picker-handle"></div><div class="form-picker-head"><div><small>WATCH FORM</small><strong>${exerciseName}</strong></div><button type="button" class="form-picker-close" aria-label="Close">${ICON.close}</button></div><div class="form-picker-list">${links.map((link, index) => `<button type="button" class="form-picker-option" data-form-index="${index}"><span><strong>${escapeHtml(link.label)}</strong><small>${escapeHtml(link.source)}</small></span><span class="form-picker-arrow">${ICON.external}</span></button>`).join('')}</div></div>`;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  overlay.querySelector('.form-picker-close')?.addEventListener('click', close);
  overlay.querySelectorAll('[data-form-index]').forEach(button => button.addEventListener('click', () => {
    const link = links[Number(button.dataset.formIndex)];
    if (link) openFormBrowser(link.url, link.label || `${exercise.name} form guide`, link.source || 'Watch Form', onUnavailable);
    close();
  }));
}

function openFormGuide(exercise, { showToast } = {}) {
  const onUnavailable = () => showToast?.('Form guide unavailable for this exercise');
  const links = exercise.formLinks || [];
  if (!links.length) { onUnavailable(); return; }
  if (links.length === 1) {
    const link = links[0];
    openFormBrowser(link.url, link.label || `${exercise.name} form guide`, link.source || 'Watch Form', onUnavailable);
    return;
  }
  openPicker(exercise, links, onUnavailable);
}

/* ===== src/ui/settings-sheet.js ===== */
function openSettingsSheet({
  state,
  waterReminderStatus,
  onDarkModeChange,
  onDevelopmentModeChange,
  onWaterReminderChange,
  onResetWeek
}) {
  document.querySelector('.settings-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.className = 'settings-overlay';
  overlay.innerHTML = `<div class="settings-sheet" role="dialog" aria-modal="true" aria-label="Settings">
    <div class="settings-grabber"></div>
    <div class="settings-header"><h2>Settings</h2><button class="settings-close bare-icon-button" id="settingsClose" aria-label="Close settings">${ICON.close}</button></div>
    <div class="settings-group">
      <div class="settings-row appearance-row"><div class="settings-row-copy"><strong>Dark Mode</strong></div>
        <button class="theme-toggle ${state.darkMode ? 'is-dark' : ''}" id="themeToggle" type="button" role="switch" aria-checked="${state.darkMode}" aria-label="Dark Mode">
          <span class="theme-toggle-track" aria-hidden="true">
            <span class="theme-stars"><i></i><i></i><i></i><i></i></span>
            <span class="theme-cloud theme-cloud-a"></span>
            <span class="theme-cloud theme-cloud-b"></span>
            <span class="theme-toggle-orb">
              <svg class="theme-sun" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="6.2" fill="#FFD84D"/><g stroke="#FFD84D" stroke-width="1.8" stroke-linecap="round"><path d="M16 3.7v3M16 25.3v3M3.7 16h3M25.3 16h3M7.3 7.3l2.1 2.1M22.6 22.6l2.1 2.1M24.7 7.3l-2.1 2.1M9.4 22.6l-2.1 2.1"/></g></svg>
              <svg class="theme-moon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><defs><mask id="themeMoonCut"><rect width="32" height="32" fill="white"/><circle cx="20.8" cy="11.4" r="9.2" fill="black"/></mask></defs><circle cx="15.7" cy="16" r="9.2" fill="#D9FBFF" mask="url(#themeMoonCut)"/><circle cx="12.5" cy="12.8" r="1" fill="#A4DDE4" opacity=".52"/><circle cx="13.8" cy="20.1" r=".8" fill="#A4DDE4" opacity=".42"/></svg>
            </span>
          </span>
        </button>
      </div>
    </div>
    <div class="settings-group">
      <div class="settings-row"><div class="settings-row-copy"><strong>Development Mode</strong><small>Allow set logging without check-in.</small></div><button class="ios-switch ${state.developmentMode ? 'is-on' : ''}" id="developmentModeToggle" role="switch" aria-checked="${state.developmentMode}"><span></span></button></div>
    </div>
    ${state.developmentMode ? '<div class="settings-dev-note">Development Mode bypasses the gym check-in gate. Turn it off for normal workout tracking.</div>' : ''}
    <div class="settings-group">
      <div class="settings-row"><div class="settings-row-copy"><strong>Water Reminder</strong><small id="waterReminderCopy">${waterReminderStatus}</small></div><button class="ios-switch ${state.waterReminderEnabled ? 'is-on' : ''}" id="waterReminderToggle" role="switch" aria-checked="${state.waterReminderEnabled}" aria-label="Water reminder every 30 minutes"><span></span></button></div>
    </div>
    <div class="settings-group">
      <button class="settings-action-row destructive" id="startNewWeekBtn" type="button"><span class="settings-action-icon" aria-hidden="true">${ICON.restart}</span><span class="settings-row-copy"><strong>Start New Week</strong><small>Reset this week's progress and gym visits.</small></span><span class="settings-action-chevron" aria-hidden="true">${ICON.chevron}</span></button>
      <div class="week-reset-confirm" id="weekResetConfirm" hidden><div class="week-reset-copy"><strong>Reset this week?</strong><small>Older weekly completion history stays saved. This week's progress starts from zero.</small></div><div class="week-reset-actions"><button type="button" class="week-reset-cancel" id="weekResetCancel">Cancel</button><button type="button" class="week-reset-go" id="weekResetGo">Start New Week</button></div></div>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('show')));

  const sheet = overlay.querySelector('.settings-sheet');
  let drag = null;
  let closeTimer = null;

  const close = () => {
    if (overlay.classList.contains('closing')) return;
    overlay.classList.add('closing');
    overlay.classList.remove('show');
    closeTimer = window.setTimeout(() => overlay.remove(), 430);
  };

  const resetDragStyles = () => {
    sheet?.classList.remove('is-dragging');
    sheet?.style.removeProperty('transform');
    sheet?.style.removeProperty('opacity');
    overlay.style.removeProperty('background');
    overlay.style.removeProperty('backdrop-filter');
    overlay.style.removeProperty('-webkit-backdrop-filter');
  };

  const dragStart = event => {
    if ((event.pointerType === 'mouse' && event.button !== 0) || overlay.classList.contains('closing') || event.target.closest('button,input,a')) return;
    drag = {
      id: event.pointerId,
      startY: event.clientY,
      startedAt: performance.now(),
      distance: 0
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    sheet?.classList.add('is-dragging');
  };

  const dragMove = event => {
    if (!drag || event.pointerId !== drag.id || !sheet) return;
    const distance = Math.max(0, event.clientY - drag.startY);
    drag.distance = distance;
    if (distance < 2) return;

    event.preventDefault();
    const progress = Math.min(1, distance / Math.max(220, sheet.offsetHeight * 0.52));
    sheet.style.setProperty('transform', `translate3d(0,${distance}px,0)`, 'important');
    sheet.style.setProperty('opacity', String(1 - progress * 0.08), 'important');
    const maxShade = state.darkMode ? 0.42 : 0.20;
    overlay.style.setProperty('background', `rgba(0,0,0,${Math.max(0, maxShade * (1 - progress))})`, 'important');
    overlay.style.setProperty('backdrop-filter', `blur(${Math.max(0, 2 * (1 - progress))}px)`, 'important');
    overlay.style.setProperty('-webkit-backdrop-filter', `blur(${Math.max(0, 2 * (1 - progress))}px)`, 'important');
  };

  const dragEnd = event => {
    if (!drag || event.pointerId !== drag.id || !sheet) return;
    const elapsed = Math.max(1, performance.now() - drag.startedAt);
    const velocity = drag.distance / elapsed;
    const shouldClose = drag.distance > Math.min(118, sheet.offsetHeight * 0.22) || velocity > 0.58;
    drag = null;
    resetDragStyles();

    if (shouldClose) {
      softHaptic(4);
      close();
      return;
    }

    sheet.classList.add('is-snapping-back');
    window.setTimeout(() => sheet.classList.remove('is-snapping-back'), 340);
  };

  sheet?.addEventListener('pointerdown', dragStart);
  sheet?.addEventListener('pointermove', dragMove, { passive: false });
  sheet?.addEventListener('pointerup', dragEnd);
  sheet?.addEventListener('pointercancel', dragEnd);

  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  overlay.querySelector('#settingsClose')?.addEventListener('click', close);

  overlay.querySelector('#themeToggle')?.addEventListener('click', event => {
    const enabled = !state.darkMode;
    const button = event.currentTarget;
    button.classList.toggle('is-dark', enabled);
    button.setAttribute('aria-checked', String(enabled));
    softHaptic(6);
    onDarkModeChange?.(enabled);
  });

  overlay.querySelector('#developmentModeToggle')?.addEventListener('click', event => {
    const enabled = !state.developmentMode;
    const button = event.currentTarget;
    button.classList.toggle('is-on', enabled);
    button.setAttribute('aria-checked', String(enabled));
    softHaptic(6);
    onDevelopmentModeChange?.(enabled);
  });

  overlay.querySelector('#waterReminderToggle')?.addEventListener('click', async event => {
    await onWaterReminderChange?.({
      button: event.currentTarget,
      copy: overlay.querySelector('#waterReminderCopy'),
      enabled: state.waterReminderEnabled
    });
  });

  const startNewWeekButton = overlay.querySelector('#startNewWeekBtn');
  const confirmation = overlay.querySelector('#weekResetConfirm');
  startNewWeekButton?.addEventListener('click', () => {
    startNewWeekButton.hidden = true;
    confirmation.hidden = false;
    requestAnimationFrame(() => confirmation.classList.add('show'));
    softHaptic(7);
  });
  overlay.querySelector('#weekResetCancel')?.addEventListener('click', () => {
    confirmation.classList.remove('show');
    setTimeout(() => {
      confirmation.hidden = true;
      startNewWeekButton.hidden = false;
    }, 180);
  });
  overlay.querySelector('#weekResetGo')?.addEventListener('click', () => {
    softHaptic([12, 34, 18]);
    close();
    onResetWeek?.();
  });

  return () => {
    if (closeTimer) clearTimeout(closeTimer);
    overlay.remove();
  };
}

/* ===== src/ui/theme.js ===== */
function applyTheme(isDark, animate = true) {
  const root = document.documentElement;
  if (animate) {
    root.classList.remove('theme-changing');
    void root.offsetWidth;
    root.classList.add('theme-changing');
    clearTimeout(applyTheme.timeoutId);
    applyTheme.timeoutId = setTimeout(() => root.classList.remove('theme-changing'), 360);
  }

  root.dataset.theme = isDark ? 'dark' : 'light';
  root.style.colorScheme = isDark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#11110f' : '#fffdf6');
  document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')?.setAttribute('content', isDark ? 'black-translucent' : 'default');
}

/* ===== src/app-controller.js ===== */
const app = document.getElementById('app');

let activeDay = 5;
let exercises = DAYS[activeDay].exercises;



const state = loadState();
const save = () => saveState(state);
const waterReminders = createWaterReminderController({
  state,
  save,
  intervalMs: WATER_REMINDER_INTERVAL_MS,
  showToast
});
let currentView = 'workout';
let currentExerciseId = null;
let workoutScroll = 0;
let progressClockInterval = null;
let workoutSnapshotMarkup = '';
let gymCheckInPending = false;
const tabViewState = {
  workout: { scrollY: 0, warmupOpen: false, subview: 'workout', exerciseId: null, detailScrollY: 0 },
  progress: { scrollY: 0 },
  timer: { scrollY: 0 }
};

function captureTabViewState(){
  if(currentView==='workout'){
    tabViewState.workout.scrollY=window.scrollY;
    tabViewState.workout.warmupOpen=Boolean(document.getElementById('warmupCard')?.classList.contains('open'));
    tabViewState.workout.subview='workout';
    tabViewState.workout.exerciseId=null;
    tabViewState.workout.detailScrollY=0;
  } else if(currentView==='detail'){
    tabViewState.workout.subview='detail';
    tabViewState.workout.exerciseId=currentExerciseId;
    tabViewState.workout.detailScrollY=window.scrollY;
  } else if(currentView==='progress'){
    tabViewState.progress.scrollY=window.scrollY;
  } else if(currentView==='timer'){
    tabViewState.timer.scrollY=window.scrollY;
  }
}
function restoreTabScroll(view){
  const top=Math.max(0,Number(tabViewState[view]?.scrollY)||0);
  requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo({top,behavior:'instant'})));
}
function restoreWorkoutTabState(){
  const saved=tabViewState.workout;
  if(saved.subview==='detail' && saved.exerciseId && exercises.some(ex=>ex.id===saved.exerciseId)){
    openExercise(saved.exerciseId,{restoreTabState:true});
    return;
  }
  renderWorkout({restoreTabState:true});
}

function captureWorkoutSnapshot(){
  const current=app.querySelector('.note-workout');
  if(!current) return workoutSnapshotMarkup;
  const clone=current.cloneNode(true);
  clone.classList.remove('view-enter','day-switch-static');
  clone.classList.add('edge-back-underlay-screen');
  clone.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
  clone.querySelectorAll('button,input,a,[tabindex]').forEach(node=>{
    node.setAttribute('tabindex','-1');
    node.setAttribute('aria-hidden','true');
  });
  const header=clone.querySelector('.topbar');
  const headerMarkup=header ? header.outerHTML : '';
  header?.remove();
  workoutSnapshotMarkup=`<div class="edge-back-underlay-header">${headerMarkup}</div><div class="edge-back-underlay-body">${clone.innerHTML}</div>`;
  return workoutSnapshotMarkup;
}




applyTheme(state.darkMode,false);
function weekKey(date=new Date()){ return localDateKey(weekStartDate(date)); }
function weekBucket(date=new Date()){
  const key=weekKey(date);
  if(!state.weeklySets[key]) state.weeklySets[key]={};
  return state.weeklySets[key];
}
function migrateCurrentSetsToWeek(){
  const key=weekKey();
  if(state.weekMigrations[key]) return;
  const bucket=weekBucket();
  Object.entries(state.completed || {}).forEach(([id,arr])=>{ if(Array.isArray(arr)) bucket[id]=[...arr]; });
  state.weekMigrations[key]=true;
  save();
}
function currentWeekVisits(){ return getCurrentWeekVisits(state.gymVisits); }
function activeGymVisit(){ return getActiveGymVisit(state.gymVisits); }
function canLogSets(){ return Boolean(activeGymVisit() || state.developmentMode); }
function weeklyGymMinutes(){ return getWeeklyGymMinutes(state.gymVisits); }
function stopProgressClock(){ if(progressClockInterval){ clearInterval(progressClockInterval); progressClockInterval=null; } }

migrateCurrentSetsToWeek();
function currentWorkoutStats(){ return calculateWorkoutSetStats(exercises,state.completed); }
function doneCount(){ return currentWorkoutStats().done; }
function totalSets(){ return currentWorkoutStats().total; }
function percent(){ return currentWorkoutStats().pct; }
function isDayComplete(dayNumber){ const stats=dayStats(Number(dayNumber)); return stats.total>0 && stats.done>=stats.total; }
function completedDaysThisWeek(){ return countCompletedDays(DAYS,weekBucket()); }
function weekGoalMarkup(){
  const complete=completedDaysThisWeek();
  const total=Object.keys(DAYS).length;
  return `<div class="week-goal ${complete===total?'is-complete':''}" aria-label="${complete} of ${total} workout days completed this week">
    <span class="week-goal-icon" aria-hidden="true">${ICON.flame}</span>
    <span class="week-goal-copy"><small>Weekly goal</small><strong>${complete===total?'Week complete':`${complete}/${total} training days`}</strong></span>
    <span class="week-goal-dots" aria-hidden="true">${Array.from({length:total},(_,i)=>`<i class="${i<complete?'done':''}"></i>`).join('')}</span>
  </div>`;
}
function exerciseRequiredCount(ex){ return getRequiredSetCount(ex); }
function exerciseCompletedCount(ex){ return getCompletedSetCount(state.completed,ex); }
function isExerciseComplete(ex){ return isExerciseCompleteInState(state.completed,ex); }
function updateDetailGameUI(ex){
  const required=exerciseRequiredCount(ex), complete=exerciseCompletedCount(ex), pct=required?Math.round(complete/required*100):0;
  const meter=document.getElementById('exerciseGameMeter');
  const copy=document.getElementById('exerciseGameCopy');
  const rail=document.getElementById('exerciseGameRail');
  if(meter) meter.classList.toggle('is-complete',complete>=required);
  if(copy) copy.innerHTML=complete>=required?`<strong>${complete}/${required}</strong><span>Exercise complete</span>`:`<strong>${complete}/${required}</strong><span>${required-complete} ${setWord(required-complete)} left</span>`;
  if(rail) rail.style.setProperty('--exercise-progress',`${pct}%`);
}

function noteBullets(items, limit=3){
  const clean=(items || []).flatMap(item=>String(item).split(/(?<=[.!?])\s+/)).map(s=>s.trim().replace(/[.!?]+$/,'')).filter(Boolean).slice(0,limit);
  return `<ul class="note-bullet-list">${clean.map(item=>`<li>${item}</li>`).join('')}</ul>`;
}

function selectDay(day){
  const nextDay = Number(day);
  if (nextDay === activeDay || !DAYS[nextDay]) return;

  activeDay = nextDay;
  exercises = DAYS[activeDay].exercises;
  tabViewState.workout.warmupOpen=false;
  renderWorkout({restore:false,daySwitch:true});
}



function setActiveNav(view){
  document.querySelectorAll('#bottomNav [data-nav]').forEach(btn=>btn.classList.toggle('active',btn.dataset.nav===view));
}

function dayStats(dayNumber){ return calculateDayStats(DAYS[dayNumber],weekBucket()); }

function nextWorkoutExerciseId(){ return getNextIncompleteExerciseId(exercises,state.completed); }

function continueWorkoutFlow(){
  const nextId=nextWorkoutExerciseId();
  if(nextId) openExercise(nextId);
  else renderWorkout({restore:true});
}

function gymStatusMarkup(){
  const active=activeGymVisit();
  const visits=currentWeekVisits();
  const latest=visits[visits.length-1];
  if(active){
    const elapsed=formatDuration(Date.now()-new Date(active.checkIn).getTime());
    return `<div class="gym-live-status is-active"><span class="gym-status-dot"></span><div><strong>Checked in</strong><small>Since ${formatClockTime(active.checkIn)} · <span id="gymSessionDuration">${elapsed}</span></small></div></div>`;
  }
  if(latest){
    const duration=latest.checkOut?formatDuration(new Date(latest.checkOut)-new Date(latest.checkIn)):'—';
    return `<div class="gym-live-status"><span class="gym-status-dot"></span><div><strong>Ready to check in</strong><small>Last visit ${formatShortDate(latest.checkIn)} · ${duration}</small></div></div>`;
  }
  return `<div class="gym-live-status"><span class="gym-status-dot"></span><div><strong>Ready to check in</strong><small>No verified gym visit logged this week</small></div></div>`;
}


function latestVisitToday(){ return getLatestVisitOnDate(state.gymVisits); }

function gymTodayTimesMarkup(){
  const visit=latestVisitToday();
  if(!visit) return '';
  return `<div class="gym-today-times" aria-label="Today's gym attendance times">
    <div><small>Check-in</small><strong>${formatClockTime(visit.checkIn)}</strong></div>
    <span class="gym-time-divider" aria-hidden="true"></span>
    <div><small>Check-out</small><strong>${visit.checkOut?formatClockTime(visit.checkOut):'In progress'}</strong></div>
  </div>`;
}



async function requestGymCheckIn(){
  if(gymCheckInPending) return;

  const button=document.getElementById('gymVisitToggle');
  const resetButton=()=>{
    gymCheckInPending=false;
    if(!button) return;
    button.disabled=false;
    button.removeAttribute('aria-busy');
    button.removeAttribute('aria-disabled');
    button.classList.remove('is-busy');
    button.innerHTML=`<span class="button-icon">${ICON.faceId}</span><span>Check in with Face ID</span>`;
  };

  gymCheckInPending=true;
  if(button){
    button.disabled=true;
    button.setAttribute('aria-busy','true');
    button.setAttribute('aria-disabled','true');
    button.classList.add('is-busy');
    button.innerHTML='<span class="button-spinner" aria-hidden="true"></span><span>Verifying location…</span>';
  }

  const result=await verifyGymCheckIn({
    developmentMode:state.developmentMode,
    credentialId:state.biometricCredentialId,
    userId:state.biometricUserId,
    onBiometricStart:({enrolling})=>{
      if(button) button.innerHTML=`<span class="button-icon face-scan">${ICON.faceId}</span><span>Confirm with Face ID…</span>`;
      if(enrolling) showToast('Set up Face ID for Form First');
    }
  });

  if(!result.ok){
    resetButton();
    if(result.reason===GYM_CHECK_IN_REASON.INACCURATE_LOCATION){
      showGymCheckInNotice({kind:'accuracy',distance:result.distance,accuracy:result.accuracy,onRetry:requestGymCheckIn});
      return;
    }
    if(result.reason===GYM_CHECK_IN_REASON.OUTSIDE_GYM){
      showGymCheckInNotice({kind:'away',distance:result.distance,accuracy:result.accuracy,onRetry:requestGymCheckIn});
      return;
    }

    const messages={
      [GYM_CHECK_IN_REASON.GEOLOCATION_UNSUPPORTED]:'Location is not available in this browser',
      [GYM_CHECK_IN_REASON.INSECURE_CONTEXT]:'Gym check-in needs HTTPS or an installed PWA',
      [GYM_CHECK_IN_REASON.LOCATION_PERMISSION_DENIED]:'Allow precise location to verify gym check-in',
      [GYM_CHECK_IN_REASON.LOCATION_UNAVAILABLE]:'Could not get a reliable location',
      [GYM_CHECK_IN_REASON.BIOMETRIC_UNSUPPORTED]:'Face ID verification needs a supported iPhone PWA over HTTPS',
      [GYM_CHECK_IN_REASON.BIOMETRIC_CANCELLED]:'Face ID verification cancelled',
      [GYM_CHECK_IN_REASON.BIOMETRIC_ERROR]:'Face ID verification could not be completed'
    };
    showToast(messages[result.reason] || 'Face ID verification could not be completed');
    return;
  }

  const checkInTime=new Date().toISOString();
  state.biometricCredentialId=result.credentialId;
  state.biometricUserId=result.userId;
  state.gymVisits.push({
    id:`visit-${Date.now()}`,
    checkIn:checkInTime,
    checkOut:null,
    verifiedDistance:Math.round(result.distance),
    accuracy:Math.round(result.accuracy),
    biometricVerified:true
  });
  save();
  gymCheckInPending=false;
  renderProgress();
  requestAnimationFrame(()=>showGymCheckInNotice({
    kind:'success',
    distance:result.distance,
    accuracy:result.accuracy,
    checkInTime,
    hasWorkoutProgress:doneCount()>0,
    onContinue:continueWorkoutFlow
  }));
}

function checkOutGym(){
  const active=activeGymVisit();
  if(!active){ showToast('No active gym session'); return; }
  active.checkOut=new Date().toISOString();
  save();
  renderProgress();
  setTimeout(()=>showToast('Gym session checked out'),80);
}

function renderProgress({restoreTabState=false}={}){
  currentView='progress'; currentExerciseId=null; setActiveNav('progress'); stopProgressClock();
  const all=Object.keys(DAYS).map(Number).map(day=>({day,...dayStats(day)}));
  const total=all.reduce((n,d)=>n+d.total,0);
  const done=all.reduce((n,d)=>n+d.done,0);
  const pct=total?Math.round(done/total*100):0;
  const workoutsDone=all.filter(d=>d.pct===100).length;
  const visits=currentWeekVisits();
  const gymMinutes=weeklyGymMinutes();
  const active=activeGymVisit();

  app.innerHTML=`<main class="screen ${restoreTabState?'':'view-enter'} note-theme nav-screen">
    <header class="topbar note-topbar workout-topbar"><span class="topbar-spacer" aria-hidden="true"></span><div class="topbar-title">Progress</div><button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${ICON.settings}</button></header>
    <div class="container nav-page-container progress-hub">
      <section class="nav-hero-card progress-hero-card">
        <div><span class="note-kicker">This week</span><h1>${pct}% complete</h1><p>${done} of ${total} planned working sets finished</p></div>
        <div class="nav-progress-ring" style="--progress:${pct*3.6}deg"><strong>${pct}%</strong></div>
      </section>

      <section class="progress-metric-grid" aria-label="Weekly training metrics">
        <article class="progress-metric"><small>Workouts</small><strong>${workoutsDone}<span>/5</span></strong><p>planned days complete</p></article>
        <article class="progress-metric"><small>Working sets</small><strong>${done}<span>/${total}</span></strong><p>completed this week</p></article>
        <article class="progress-metric"><small>Gym visits</small><strong>${visits.length}</strong><p>verified check-ins</p></article>
        <article class="progress-metric"><small>Gym time</small><strong>${formatDuration(gymMinutes*60000)}</strong><p>logged this week</p></article>
      </section>

      <section class="progress-feature-card gym-card ios-card-enter">
        <div class="progress-card-head"><div><span class="note-kicker">Gym attendance</span><h2>Check-in</h2></div><span class="privacy-chip"><span class="chip-icon">${ICON.location}</span>100 m</span></div>
        ${gymStatusMarkup()}
        ${gymTodayTimesMarkup()}
        <div class="biometric-strip"><span class="biometric-icon">${ICON.faceId}</span><div><strong>Face ID protected</strong><small>Location + device identity are verified before check-in.</small></div></div>
        <div class="gym-actions gym-actions-single">
          ${active
            ? `<button class="gym-action primary is-checked-in" id="gymVisitToggle"><span class="button-icon">${ICON.check}</span><span>Checked in</span></button>`
            : gymCheckInPending
              ? `<button class="gym-action primary faceid-action is-busy" id="gymVisitToggle" disabled aria-disabled="true" aria-busy="true"><span class="button-spinner" aria-hidden="true"></span><span>Verifying location…</span></button>`
              : `<button class="gym-action primary faceid-action" id="gymVisitToggle"><span class="button-icon">${ICON.faceId}</span><span>Check in with Face ID</span></button>`}
        </div>
      </section>
    </div>
  </main>`;

  document.getElementById('gymVisitToggle')?.addEventListener('click',()=>{
    if(gymCheckInPending) return;
    if(activeGymVisit()) checkOutGym();
    else requestGymCheckIn();
  });
  document.getElementById('moreBtn')?.addEventListener('click',openSettings);

  if(active){
    progressClockInterval=setInterval(()=>{
      if(currentView!=='progress') return;
      const el=document.getElementById('gymSessionDuration');
      if(el) el.textContent=formatDuration(Date.now()-new Date(active.checkIn).getTime());
    },30000);
  }
  if(restoreTabState) restoreTabScroll('progress');
  else window.scrollTo({top:0,behavior:'instant'});
}

const timerFeature=createTimerFeature({
  app,
  isDevelopmentMode:()=>state.developmentMode,
  onOpenSettings:()=>openSettings(),
  onTestNotification:button=>waterReminders.showTestNotification(button),
  onRecoveryComplete:durationSeconds=>showRecoveryRewardNotice({
    durationSeconds,
    dayNumber:activeDay,
    stats:dayStats(activeDay),
    onContinue:continueWorkoutFlow
  })
});

function renderTimer({restoreTabState=false}={}){
  stopProgressClock();
  currentView='timer';
  currentExerciseId=null;
  setActiveNav('timer');
  timerFeature.render();
  if(restoreTabState) restoreTabScroll('timer');
  else window.scrollTo({top:0,behavior:'instant'});
}

function renderWorkout({restore=false,daySwitch=false,restoreTabState=false}={}){
  stopProgressClock();
  currentView='workout'; currentExerciseId=null; setActiveNav('workout');
  tabViewState.workout.subview='workout';
  tabViewState.workout.exerciseId=null;
  tabViewState.workout.detailScrollY=0;
  const day=DAYS[activeDay];
  const p=percent();
  app.innerHTML=`<main class="screen ${daySwitch?'day-switch-static':restoreTabState?'':'view-enter'} note-theme note-workout">
    <header class="topbar note-topbar workout-topbar">
      <span class="topbar-spacer" aria-hidden="true"></span>
      <div class="topbar-title">Form First</div>
      <button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${ICON.settings}</button>
    </header>
    <div class="container note-workout-container">
      <section class="workout-header note-workout-header">
        <div class="note-kicker">Day ${activeDay} · ${day.title}</div>
        <div class="day-strip" aria-label="Training days">
          ${Object.keys(DAYS).map(n=>{ const complete=isDayComplete(n); return `<button class="day-pill ${Number(n)===activeDay?'active':''} ${complete?'day-complete':''}" data-day="${n}"><strong>Day ${n}</strong>${complete?`<span class="day-complete-mark" aria-label="Day ${n} complete">${ICON.check}</span>`:''}</button>`; }).join('')}
        </div>
        <article class="summary-card note-summary-card compact-summary-card">
          <div class="summary-row">
            <div class="summary-progress-copy"><h2>Day ${activeDay} workout</h2><div class="summary-set-status ${doneCount()===totalSets()?'is-complete':''}"><span class="summary-set-count">${doneCount()}/${totalSets()}</span><span>working sets completed</span></div></div>
            <div class="progress-ring" style="--progress:${p*3.6}deg"><strong>${p}%</strong></div>
          </div>
          ${weekGoalMarkup()}
          <button class="primary-btn compact-start-btn" id="startWorkout">${ICON.play}<span>${doneCount() ? 'Continue Workout' : 'Start Workout'}</span></button>
        </article>
      </section>
      <section class="section note-section compact-warmup-section">
        <article class="group-card warmup note-group-card ${tabViewState.workout.warmupOpen?'open':''}" id="warmupCard" aria-expanded="${tabViewState.workout.warmupOpen?'true':'false'}">
          <div class="warmup-flow compact-warmup-flow" id="warmupToggle" role="button" tabindex="0" aria-expanded="${tabViewState.workout.warmupOpen?'true':'false'}" aria-label="Show warm-up notes" style="--warmup-figure:url('${day.warmup.image || './assets/warmup/upper-body-mobility-cutout-cropped.webp'}')">
            <span class="warmup-label">Warm-up</span>
            <strong class="warmup-heading">${day.warmup.duration}</strong>
            <p class="warmup-intro">${day.warmup.intro}</p>
            <div class="warmup-details"><strong class="warmup-detail-name">${day.warmup.name}</strong>${day.warmup.details} Keep the effort easy and use the warm-up to check how your joints and movement feel before the first working set.</div>
          </div>
        </article>
      </section>
      ${renderSection('Main Workout')}
      ${renderSection('Core & Cardio')}
    </div>
  </main>`;
  document.getElementById('startWorkout').addEventListener('click',continueWorkoutFlow);
  app.querySelectorAll('[data-day]').forEach(btn=>btn.addEventListener('click',()=>selectDay(btn.dataset.day)));
  const warmupToggle = document.getElementById('warmupToggle');
  const warmupCard = document.getElementById('warmupCard');
  const toggleWarmup = ()=>{
    const opening=!warmupCard.classList.contains('open');
    warmupCard.classList.toggle('open',opening);
    const expanded = String(opening);
    warmupCard.setAttribute('aria-expanded', expanded);
    warmupToggle.setAttribute('aria-expanded', expanded);
    tabViewState.workout.warmupOpen=opening;
    softHaptic(8);
  };
  warmupToggle.addEventListener('click', toggleWarmup);
  warmupToggle.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); toggleWarmup(); } });
  document.getElementById('moreBtn').addEventListener('click',openSettings);
  app.querySelectorAll('[data-exercise]').forEach(btn=>btn.addEventListener('click',()=>openExercise(btn.dataset.exercise)));
  if(daySwitch) requestAnimationFrame(()=>requestAnimationFrame(()=>app.querySelector('.day-switch-static')?.classList.remove('day-switch-static')));
  if(restore) requestAnimationFrame(()=>window.scrollTo({top:workoutScroll,behavior:'instant'}));
  else if(restoreTabState) restoreTabScroll('workout');
}

function renderSection(name){
  const list=exercises.filter(e=>e.section===name);
  const isMain=name==='Main Workout';
  const subtitle=isMain?DAYS[activeDay].mainSubtitle:DAYS[activeDay].coreSubtitle;
  const sectionRequired=list.reduce((sum,e)=>sum+(e.requiredSets || e.sets),0);
  const sectionComplete=list.reduce((sum,e)=>{
    const required=e.requiredSets || e.sets;
    return sum+(state.completed[e.id]||[]).slice(0,required).filter(Boolean).length;
  },0);
  const sectionPercent=sectionRequired?Math.round((sectionComplete/sectionRequired)*100):0;
  const sectionDone=sectionRequired>0 && sectionComplete>=sectionRequired;
  return `<section class="section note-section workout-block-section">
    <article class="day-block-card ${isMain?'main-block':'finish-block'} ${sectionDone?'section-complete':''}" style="--section-progress:${sectionPercent}%">
      <div class="day-block-head">
        <div class="day-block-heading-row">
          <div>
            <h2>${isMain?'Main Workout':'Core & Cardio'}</h2>
            <p>${subtitle}</p>
          </div>
          <span class="day-block-count" aria-label="${list.length} exercises">${list.length}</span>
        </div>
        <div class="section-game-row" aria-label="${sectionComplete} of ${sectionRequired} working sets completed">
          <span class="section-game-copy"><strong>${sectionComplete}/${sectionRequired}</strong> working sets</span>
          <span class="section-game-status">${sectionDone?'Complete':`${sectionPercent}%`} </span>
        </div>
        <span class="section-progress-rail" aria-hidden="true"><i></i></span>
      </div>
      <div class="day-exercise-list">
        ${list.map(e=>{
          const required=e.requiredSets || e.sets;
          const complete=(state.completed[e.id]||[]).slice(0,required).filter(Boolean).length;
          const done=complete>=required;
          return `<button class="day-exercise-row ${done?'is-complete':''}" data-exercise="${e.id}">
            <span class="day-exercise-number">${done?ICON.check:e.number}</span>
            <span class="day-exercise-copy">
              <strong>${e.name}</strong>
              <span class="day-exercise-meta">${exerciseListMeta(e).map(item=>`<span>${item}</span>`).join('')}</span>
              <span class="set-progress-chip ${done?'is-complete':''}" style="--set-progress:${Math.max(0,Math.min(100,(complete/required)*100))}%" aria-label="${complete} of ${required} working sets completed">
                <span class="set-progress-copy"><strong>${complete}/${required}</strong><span>${done?'sets complete':'working sets'}</span></span>
                <span class="set-progress-track" aria-hidden="true"><i></i></span>
              </span>
            </span>
            <span class="day-exercise-chevron">${ICON.chevron}</span>
          </button>`;
        }).join('')}
      </div>
    </article>
  </section>`;
}


function setWord(count){ return Number(count)===1 ? 'set' : 'sets'; }
function exerciseListMeta(ex){
  const count=ex.setsLabel || ex.sets;
  const setsText=`${count} ${String(count)==='1' ? 'set' : 'sets'}`;
  if(ex.logType==='time' || ex.id==='deadbug-plank') return [setsText, ex.reps, `${ex.rest} rest`];
  if(ex.logType==='cardio' || ex.id==='cardio') return [setsText, ex.reps, 'conditioning'];
  if(ex.logType==='repsOnly') return [setsText, `${ex.reps} reps`, `${ex.rest} rest`];
  return [setsText, ex.reps, `${ex.rest} rest`];
}
function exerciseDetailMeta(ex){
  const count=ex.setsLabel || ex.sets;
  const setsText=`${count} ${String(count)==='1' ? 'set' : 'sets'}`;
  if(ex.logType==='time' || ex.id==='deadbug-plank') return `${setsText} · ${ex.reps} · ${ex.rest} rest`;
  if(ex.logType==='cardio' || ex.id==='cardio') return `${setsText} · ${ex.reps} · steady conditioning`;
  return `${setsText} · ${ex.reps} reps · ${ex.rest} rest`;
}


function openExercise(id,{restoreTabState=false}={}){
  setActiveNav('workout');
  const ex=exercises.find(e=>e.id===id); if(!ex) return;
  if(!restoreTabState){
    workoutScroll=window.scrollY;
    tabViewState.workout.scrollY=workoutScroll;
    tabViewState.workout.warmupOpen=Boolean(document.getElementById('warmupCard')?.classList.contains('open'));
    tabViewState.workout.detailScrollY=0;
  } else {
    workoutScroll=Math.max(0,Number(tabViewState.workout.scrollY)||0);
  }
  const snapshot=captureWorkoutSnapshot();
  currentView='detail'; currentExerciseId=id;
  tabViewState.workout.subview='detail';
  tabViewState.workout.exerciseId=id;
  const completed=state.completed[id] || Array(ex.sets).fill(false);
  const underlay=snapshot?`<div class="edge-back-underlay" aria-hidden="true" inert><div class="edge-back-underlay-content" style="--snapshot-scroll:${workoutScroll}px">${snapshot}</div></div>`:'';
  app.innerHTML=`<div class="edge-back-stage">${underlay}<main class="detail-screen view-enter note-theme">
    <header class="topbar note-topbar">
      <button class="icon-btn note-icon-btn" id="backBtn" aria-label="Back to workout">${ICON.back}</button>
      <div class="topbar-title">Exercise</div>
      <button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${ICON.settings}</button>
    </header>
    <div class="detail-content note-detail-content">
      <section class="detail-heading note-heading">
        <div class="note-kicker">Day ${activeDay} · ${DAYS[activeDay].title}</div>
        <h1>${ex.name}</h1>
        <div class="detail-meta note-detail-meta">${exerciseDetailMeta(ex)}</div>
      </section>

      ${movementMarkup(ex)}


      <section class="detail-section">
        <div class="note-card target-card ${([1,2,3,4,5].includes(activeDay)?'day1-target-card':'')}">${targetMarkup(ex)}</div>
      </section>

      <section class="detail-section">
        <h2>How to perform</h2>
        <article class="note-card reading-card note-list-card">
          ${noteBullets(ex.steps, 3)}
        </article>
      </section>

      <section class="detail-section" id="watchFormSection">
        <h2>Watch your form</h2>
        <article class="note-card caution-card note-list-card">
          ${noteBullets(ex.watchouts, 3)}
        </article>
      </section>

      <section class="detail-section log-sets-section ${canLogSets()?'':'is-locked'}">
        <div class="section-title-row"><h2>${ex.sets===1 ? 'Log set' : 'Log sets'}</h2>${state.developmentMode?'<span class="section-caption dev-mode-caption">Development mode</span>':''}</div>
        ${!canLogSets()?`<button class="log-gate-card" id="logGateCard" type="button" aria-label="Go to Gym Attendance to check in"><span class="log-gate-icon">${ICON.location}</span><span class="log-gate-copy"><strong>Check in to log entries</strong><small>Open Gym Attendance to unlock your sets.</small></span><span class="log-gate-chevron">${ICON.chevron}</span></button>`:''}
        <div class="log-sets-layout ${ex.sets===1 ? 'single-set-layout' : ''}">
          <div class="set-card compact-set-card">
            ${Array.from({length:ex.sets},(_,i)=>renderSetLine(ex,i,completed[i],!canLogSets())).join('')}
          </div>
          <button class="log-watch-form-btn" id="watchFormBtn" type="button"><span>Watch</span><strong>Form</strong><span class="watch-form-arrow">${ICON.external}</span></button>
        </div>
      </section>

    </div>
  </main></div>`;
  const underlayBody=app.querySelector('.edge-back-underlay-body');
  if(underlayBody) underlayBody.style.transform=`translate3d(0,${-workoutScroll}px,0)`;

  document.getElementById('backBtn').addEventListener('click',()=>renderWorkout({restore:true}));
  document.getElementById('moreBtn').addEventListener('click',openSettings);
  document.getElementById('logGateCard')?.addEventListener('click',()=>renderProgress());
  app.querySelectorAll('[data-log]').forEach(input=>input.addEventListener('change',saveLog));
  app.querySelectorAll('[data-check]').forEach(btn=>btn.addEventListener('click',()=>toggleSet(ex,Number(btn.dataset.check),btn)));
  document.getElementById('watchFormBtn')?.addEventListener('click',()=>openFormGuide(ex, { showToast }));
  if(restoreTabState){
    const top=Math.max(0,Number(tabViewState.workout.detailScrollY)||0);
    requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo({top,behavior:'instant'})));
  } else {
    window.scrollTo({top:0,behavior:'instant'});
  }
}

function renderSetLine(ex,i,done,locked=false){
  const log=(state.logs[ex.id]||[])[i]||{};
  const optional=i >= (ex.requiredSets || ex.sets);
  const indexMarkup=`<div class="set-index"><strong>${i+1}</strong><small>${optional?'opt.':'set'}</small></div>`;
  const checkMarkup=`<button class="check-btn ${done?'done':''}" data-check="${i}" ${locked?'disabled aria-disabled="true"':''} aria-label="${done?'Unmark':'Complete'} set ${i+1}">${done?ICON.check:'<span class="check-dot"></span>'}</button>`;
  if(ex.logType==='time' || ex.id==='deadbug-plank'){
    return `<div class="set-line compact-set-line timed-set-line">
      ${indexMarkup}
      <label class="input-wrap compact-input timed-primary"><span>seconds</span><input data-log="duration" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="numeric" type="number" min="0" value="${log.duration||''}" placeholder="${String(ex.reps).replace(/[^0-9–-]/g,'')}"/></label>
      <div class="set-prescription"><span>goal</span><strong>${ex.reps}</strong></div>
      ${checkMarkup}
    </div>`;
  }
  if(ex.logType==='cardio' || ex.id==='cardio'){
    return `<div class="set-line compact-set-line timed-set-line">
      ${indexMarkup}
      <label class="input-wrap compact-input timed-primary"><span>minutes</span><input data-log="duration" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="numeric" type="number" min="0" value="${log.duration||''}" placeholder="${String(ex.reps).match(/\d+/)?.[0] || '15'}"/></label>
      <label class="input-wrap compact-input"><span>level</span><input data-log="level" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="decimal" type="number" min="0" step="0.5" value="${log.level||''}" placeholder="opt."/></label>
      ${checkMarkup}
    </div>`;
  }
  if(ex.logType==='repsOnly'){
    return `<div class="set-line compact-set-line reps-only-set-line">
      ${indexMarkup}
      <label class="input-wrap compact-input timed-primary"><span>reps</span><input data-log="reps" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="numeric" type="number" min="0" value="${log.reps !== undefined && log.reps !== '' ? log.reps : 13}" placeholder="13"/></label>
      <div class="set-prescription"><span>goal</span><strong>${ex.reps}</strong></div>
      ${checkMarkup}
    </div>`;
  }
  return `<div class="set-line compact-set-line">
    ${indexMarkup}
    <label class="input-wrap compact-input"><span>kg</span><input data-log="weight" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="decimal" type="number" min="0" step="0.5" value="${log.weight||''}" placeholder="0"/></label>
    <label class="input-wrap compact-input"><span>reps</span><input data-log="reps" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="numeric" type="number" min="0" value="${log.reps !== undefined && log.reps !== '' ? log.reps : 13}" placeholder="13"/></label>
    ${checkMarkup}
  </div>`;
}

function saveLog(event){
  if(!canLogSets()) return;
  const {ex,index,log}=event.target.dataset; const i=Number(index);
  const arr=state.logs[ex]||[]; arr[i]={...(arr[i]||{}),[log]:event.target.value}; state.logs[ex]=arr; save();
}
function toggleSet(ex,i,btn){
  if(!canLogSets()) return;
  const wasExerciseComplete=isExerciseComplete(ex);
  const wasDayComplete=isDayComplete(activeDay);
  const arr=state.completed[ex.id]||Array(ex.sets).fill(false);
  arr[i]=!arr[i];
  state.completed[ex.id]=arr;
  weekBucket()[ex.id]=[...arr];
  save();
  btn.classList.toggle('done',arr[i]); btn.innerHTML=arr[i]?ICON.check:'<span class="check-dot"></span>'; btn.classList.remove('just-done');
  const row=btn.closest('.set-line');
  row?.classList.remove('set-earned');
  if(arr[i]){
    void btn.offsetWidth; btn.classList.add('just-done'); row?.classList.add('set-earned'); softHaptic(10);
  }
  updateDetailGameUI(ex);
  const nowExerciseComplete=isExerciseComplete(ex);
  const nowDayComplete=isDayComplete(activeDay);
  if(arr[i]) celebrateSetCompletion(btn);
  if(arr[i] && nowDayComplete && !wasDayComplete){
    celebrateDayCompletion({dayNumber:activeDay,completedDays:completedDaysThisWeek(),totalDays:Object.keys(DAYS).length});
  } else if(arr[i] && nowExerciseComplete && !wasExerciseComplete){
    softHaptic([12,28,18]);
  }
}
function resetCurrentWeekProgress(){
  const key=weekKey();
  const start=weekStartDate().getTime();
  const end=start+7*24*60*60*1000;
  state.weeklySets[key]={};
  state.weekMigrations[key]=true;
  Object.values(DAYS).flatMap(day=>day.exercises).forEach(ex=>{
    delete state.completed[ex.id];
    const existing=state.logs[ex.id];
    if(!Array.isArray(existing)) return;
    const carried=existing.map(entry=>{
      if(!entry || typeof entry!=='object') return {};
      const next={};
      if(entry.weight !== undefined && entry.weight !== '') next.weight=entry.weight;
      if(entry.reps !== undefined && entry.reps !== '') next.reps=entry.reps;
      return next;
    });
    if(carried.some(entry=>Object.keys(entry).length)) state.logs[ex.id]=carried;
    else delete state.logs[ex.id];
  });
  state.gymVisits=state.gymVisits.filter(v=>{ const t=new Date(v.checkIn).getTime(); return !(t>=start && t<end); });
  activeDay=1;
  exercises=DAYS[1].exercises;
  save();
}

function syncDevelopmentModeUI(){
  if(currentView==='detail' && currentExerciseId){
    const section=app.querySelector('.log-sets-section');
    const titleRow=section?.querySelector('.section-title-row');
    if(section && titleRow){
      const locked=!canLogSets();
      section.classList.toggle('is-locked',locked);
      section.querySelectorAll('[data-log],[data-check]').forEach(control=>{
        control.disabled=locked;
        control.setAttribute('aria-disabled',String(locked));
      });
      let caption=titleRow.querySelector('.dev-mode-caption');
      if(state.developmentMode && !caption){
        caption=document.createElement('span');
        caption.className='section-caption dev-mode-caption';
        caption.textContent='Development mode';
        titleRow.appendChild(caption);
      } else if(!state.developmentMode){ caption?.remove(); }
      let gate=document.getElementById('logGateCard');
      if(locked && !gate){
        gate=document.createElement('button');
        gate.className='log-gate-card';
        gate.id='logGateCard';
        gate.type='button';
        gate.setAttribute('aria-label','Go to Gym Attendance to check in');
        gate.innerHTML=`<span class="log-gate-icon">${ICON.location}</span><span class="log-gate-copy"><strong>Check in to log entries</strong><small>Open Gym Attendance to unlock your sets.</small></span><span class="log-gate-chevron">${ICON.chevron}</span>`;
        titleRow.insertAdjacentElement('afterend',gate);
        gate.addEventListener('click',()=>renderProgress());
      } else if(!locked){ gate?.remove(); }
    }
  }
  if(currentView==='timer') timerFeature.syncDevelopmentModeUI();
}

function openSettings(){
  openSettingsSheet({
    state,
    waterReminderStatus:waterReminders.statusText(),
    onDarkModeChange:enabled=>{
      state.darkMode=enabled;
      save();
      applyTheme(enabled,true);
    },
    onDevelopmentModeChange:enabled=>{
      state.developmentMode=enabled;
      save();
      syncDevelopmentModeUI();
    },
    onWaterReminderChange:async({button,copy,enabled})=>{
      if(enabled) waterReminders.disable(button,copy);
      else await waterReminders.enable(button,copy);
    },
    onResetWeek:()=>{
      resetCurrentWeekProgress();
      setTimeout(()=>{
        renderWorkout({restore:false});
        showToast('New week started','success');
      },430);
    }
  });
}

window.addEventListener('popstate',()=>{ if(currentView==='detail') renderWorkout({restore:true}); });
document.querySelectorAll('#bottomNav [data-nav]').forEach(btn=>btn.addEventListener('click',()=>{
  const view=btn.dataset.nav;
  if(currentView===view) return;
  captureTabViewState();
  if(view==='workout') restoreWorkoutTabState();
  if(view==='progress') renderProgress({restoreTabState:true});
  if(view==='timer') renderTimer({restoreTabState:true});
}));
if('serviceWorker' in navigator) window.addEventListener('load',async()=>{
  try { await navigator.serviceWorker.register('./sw.js'); } catch(e) { console.warn('Service worker registration failed',e); }
  waterReminders.schedule();
});
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible' && state.waterReminderEnabled) waterReminders.schedule(); });
window.addEventListener('focus',()=>{ if(state.waterReminderEnabled) waterReminders.schedule(); });
installEdgeBackGesture({
  app,
  getCurrentView: () => currentView,
  onBack: () => renderWorkout({ restore: true })
});
renderWorkout();
