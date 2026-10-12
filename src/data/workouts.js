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

export const DAYS = {
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
