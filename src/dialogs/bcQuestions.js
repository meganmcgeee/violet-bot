// Recent Birth
// =============================================================================
export default [
  bot.dialog('/recentBirth', [
      session => {
      session.send("Okay, first I'm going to check to see if you have any medical conditions that would make it risky to take certain birth control.");
      builder.Prompts.choice(session, `Did you give birth less than 6 weeks ago?`, `Yes | No | Unsure `);
    },
    (session, results) => {
      switch (results.response.index) {
        case 0:
          session.beginDialog(`/isCombination`);
          break;
        case 1:
          session.beginDialog(`/isSmoker`);
          break;
        case 2:
          session.beginDialog(`/unsure`);
          break;
        default:
          session.endDialog();
          break;
      }
    }
  //   session => {
  //       // Reload menu
  //     session.replaceDialog(`/menu`);
  //   }
  ]);


  // Is a smoker?
  bot.dialog('/isSmoker', [
      session => {
      builder.Prompts.choice(session, `Are you over the age of 35 and a heavy smoker (more than 15 cigarettes per day)?`, `Yes | No | Unsure `);
    },
    (session, results) => {
      switch (results.response.index) {
        case 0:
          session.beginDialog(`/preexistingCondition`);
          break;
        case 1:
          session.beginDialog(`/hasHypertension`);
          break;
        case 2:
          session.beginDialog(`/unsure`);
          break;
        default:
          session.endDialog();
          break;
      }
    },
    session => {
        // Reload menu
      session.replaceDialog(`/menu`);
    }
  ]);

  bot.dialog('/hasHypertension', [
      session => {
      builder.Prompts.choice(session, `Do you suffer from hypertension or uncontrolled high blood pressure (systolic  greater 150 or diastolic  less than 100)?`, `Yes | No | Unsure `);
    },
    (session, results) => {
      switch (results.response.index) {
        case 0:
          session.beginDialog(`/preexistingCondition`);
          break;
        case 1:
          session.beginDialog(`/clotRisk`);
          break;
        case 2:
          session.beginDialog(`/unsure`);
          break;
        default:
          session.endDialog();
          break;
      }
    },
    session => {
        // Reload menu
      session.replaceDialog(`/menu`);
    }
  ]);

  // Clot Risk
  bot.dialog('/clotRisk', [
      session => {
      builder.Prompts.choice(session, `Do you have history of leg or lung clots, heart blockages, or stroke heart valve or rhythm  problems such as a murmur?`, `Yes | No | Unsure `);
    },
    (session, results) => {
      switch (results.response.index) {
        case 0:
          session.beginDialog(`/preexistingCondition`);
          break;
        case 1:
          session.beginDialog(`/migraines`);
          break;
        case 2:
          session.beginDialog(`/unsure`);
          break;
        default:
          session.endDialog();
          break;
      }
    },
    session => {
        // Reload menu
      session.replaceDialog(`/menu`);
    }
  ]);

  // Migraines

  bot.dialog('/migraines', [
      session => {
      builder.Prompts.choice(session, `Do you suffer from severe migraine headaches?`, `Yes | No | Unsure `);
    },
    (session, results) => {
      switch (results.response.index) {
        case 0:
          session.beginDialog(`/preexistingCondition`);
          break;
        case 1:
          session.beginDialog(`/systemConditions`);
          break;
        case 2:
          session.beginDialog(`/unsure`);
          break;
        default:
          session.endDialog();
          break;
      }
    },
    session => {
        // Reload menu
      session.replaceDialog(`/menu`);
    }
  ]);

  // System 
  bot.dialog('/systemConditions', [
      session => {
      builder.Prompts.choice(session, `Do you currently have breast cancer, a liver tumor, cirrhosis, or gallbladder trouble?`, `Yes | No | Unsure `);
    },
    (session, results) => {
      switch (results.response.index) {
        case 0:
          session.beginDialog(`/preexistingCondition`);
          break;
        case 1:
          session.beginDialog(`/systemConditions`);
          break;
        case 2:
          session.beginDialog(`/unsure`);
          break;
        default:
          session.endDialog();
          break;
      }
    },
    session => {
        // Reload menu
      session.replaceDialog(`/menu`);
    }
  ])
];
