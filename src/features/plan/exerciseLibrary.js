// src/features/plan/exerciseLibrary.js
export const EX = {
  gym: {
    push: [
      {
        name: "Bench Press",
        type: "compound",
        videoId: "rT7DgCr-3pg",
        desc: "A classic chest press to build upper-body strength.",
        steps: [
          "Set shoulder blades down and back.",
          "Lower the bar to mid-chest under control.",
          "Press up keeping wrists stacked over elbows.",
        ],
      },
      {
        name: "Incline Dumbbell Press",
        type: "compound",
        videoId: "8iPEnn-ltC8",
        desc: "Targets upper chest and shoulders using dumbbells.",
        steps: [
          "Set bench to 30–45 degrees.",
          "Lower dumbbells to chest level with control.",
          "Press up and slightly in, don’t clang the weights.",
        ],
      },
      {
        name: "Lateral Raises",
        type: "isolation",
        videoId: "3VcKaXpzqRo",
        desc: "Builds shoulder width by isolating side delts.",
        steps: [
          "Slight bend in elbows, raise to shoulder height.",
          "Lead with elbows, control the lowering.",
          "Avoid swinging—keep core tight.",
        ],
      },
    ],

    pull: [
      {
        name: "Lat Pulldown",
        type: "compound",
        videoId: "CAwf7n6Luuc",
        desc: "Builds back width and improves pulling strength.",
        steps: [
          "Lean back slightly, chest up.",
          "Pull bar to upper chest, elbows down.",
          "Control the return—don’t let shoulders shrug.",
        ],
      },
      {
        name: "Seated Cable Row",
        type: "compound",
        videoId: "HJSVR_67OlM",
        desc: "Targets mid-back and improves posture.",
        steps: [
          "Neutral spine, pull handle to lower ribs.",
          "Squeeze shoulder blades together.",
          "Return slowly without rounding back.",
        ],
      },
      {
        name: "Face Pull",
        type: "isolation",
        videoId: "V8dZ3pyiCBo",
        desc: "Great for rear delts and shoulder health.",
        steps: [
          "Set rope at face height.",
          "Pull rope toward face, elbows high.",
          "Pause and squeeze rear delts.",
        ],
      },
    ],

    legs: [
      {
        name: "Leg Press",
        type: "compound",
        videoId: "IZxyjW7MPJQ",
        desc: "Builds quads/glutes with controlled pressing.",
        steps: [
          "Feet shoulder-width on platform.",
          "Lower to comfortable depth (no butt lift).",
          "Press up without locking hard at the top.",
        ],
      },
      {
        name: "Romanian Deadlift",
        type: "compound",
        videoId: "2SHsk9AzdjA",
        desc: "Targets hamstrings and glutes with hip hinge.",
        steps: [
          "Soft knees, push hips back.",
          "Keep bar close to legs.",
          "Stand up by driving hips forward.",
        ],
      },
      {
        name: "Calf Raises",
        type: "isolation",
        videoId: "YMmgqO8Jo-k",
        desc: "Strengthens calves and ankle stability.",
        steps: [
          "Full stretch at bottom.",
          "Rise up onto toes, pause at top.",
          "Control down slowly.",
        ],
      },
    ],
  },

  home: {
    full: [
      {
        name: "Push-ups",
        type: "compound",
        videoId: "IODxDxX7oi4",
        desc: "Classic bodyweight press for chest, triceps, shoulders.",
        steps: [
          "Hands under shoulders, body straight.",
          "Lower chest near floor, elbows ~45°.",
          "Push back up while keeping core tight.",
        ],
      },
      {
        name: "Bodyweight Squats",
        type: "compound",
        videoId: "aclHkVaku9U",
        desc: "Builds legs and mobility without equipment.",
        steps: [
          "Feet shoulder-width, chest up.",
          "Sit down and back, knees track over toes.",
          "Stand up by pushing the floor away.",
        ],
      },
      {
        name: "Plank",
        type: "core",
        videoId: "pSHjTRCQxIw",
        desc: "Core stability exercise for abs and posture.",
        steps: [
          "Elbows under shoulders.",
          "Squeeze glutes and keep ribs down.",
          "Hold steady—don’t sag hips.",
        ],
      },
    ],
  },
};
