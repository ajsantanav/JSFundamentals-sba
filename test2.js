const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

function validateData(course, group) {
          //check if course is not equal to assignment id
      if (group.course_id !== course.id) {
        throw new Error("AssignmentGroup does not belong to the specified course.");
      }
      group.assignments.forEach((assignment) => {
        if (typeof assignment.points_possible !== "number" || assignment.points_possible <= 0) {
          throw new Error(
            `Invalid points_possible value for assignment ID ${assignment.id}.`
          );
        }
        if (isNaN(new Date(assignment.due_at))) {
          throw new Error(`Invalid due_at date for assignment ID ${assignment.id}.`);
        }
      });
}
function calculateScores(assignments, submissions) {
  const result = {};
  const totalWeight = assignments.reduce((sum, a) => sum + a.points_possible, 0);

  submissions.forEach((submission) => {
    const { 
      learner_id, 
      assignment_id, 
      submission: sub 
    } = submission;

    const assignment = assignments.find((a) => a.id === assignment_id);
    if (!assignment) return; // Ignore submissions for nonexistent assignments

    const dueDate = new Date(assignment.due_at);
    const submittedDate = new Date(sub.submitted_at);
    if (submittedDate > dueDate) {
      sub.score = Math.max(0, sub.score - assignment.points_possible * 0.1); // Apply late penalty
    }

    if (!result[learner_id]) {
      result[learner_id] = { id: learner_id, avg: 0, scores: {} };
    }

    const normalizedScore = sub.score / assignment.points_possible;
    result[learner_id].scores[assignment_id] = normalizedScore;

    result[learner_id].avg +=
      (normalizedScore * assignment.points_possible) / totalWeight;
  });

  return result;
}

// function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {

//     try {
//       // Validate input data
//       validateData(CourseInfo, AssignmentGroup);
  
//       // Process submissions and calculate scores
//       const scores = calculateScores(AssignmentGroup.assignments, LearnerSubmissions);
  
//       // Format results as specified
//       return Object.values(scores).map((learner) => {
//         const formattedLearner = { id: learner.id, avg: learner.avg };
//         Object.entries(learner.scores).forEach(([assignmentId, score]) => {
//           formattedLearner[assignmentId] = score;
//         });
//         return formattedLearner;
//       });
//     } catch (error) {
//       console.error("Error processing learner data:", error.message);
//       return [];
//     }
//   }
function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  try {
    // Step 1: Validate input data
    validateData(CourseInfo, AssignmentGroup);

    // Step 2: Process submissions and calculate scores
    const scores = calculateScores(AssignmentGroup.assignments, LearnerSubmissions);

    // Step 3: Create an array to store formatted results
    const formattedResults = [];

    // Step 4: Iterate over the scores object
    for (const learnerId in scores) {
      if (scores.hasOwnProperty(learnerId)) {
        const learner = scores[learnerId];

        // Create a formatted learner object with ID and average score
        const formattedLearner = {
          id: learner.id,   // Learner's ID
          avg: learner.avg, // Learner's average score
        };

        // Add assignment scores to the formatted learner object
        for (const assignmentId in learner.scores) {
          if (learner.scores.hasOwnProperty(assignmentId)) {
            formattedLearner[assignmentId] = learner.scores[assignmentId];
          }
        }

        // Add the formatted learner to the results array
        formattedResults.push(formattedLearner);
      }
    }

    // Step 5: Return the final array of formatted results
    return formattedResults;

  } catch (error) {
    // Handle errors gracefully
    console.error("Error processing learner data:", error.message);
    return []; // Return an empty array if an error occurs
  }
}
  
  // Example usage
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);

  /*
let validDates = [];
const validDueDates = [];
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  function validCourse(CourseInfo, AssignmentGroup) {
    return CourseInfo.id === AssignmentGroup.course_id;
  }

  function validAssigment(assignments, submissionsScore) {
    const scores = submissionsScore.score;
    const maxPoints = assignments.points_possible;
    const validAssign = (typeof scores === "number" || maxPoints <= 0 || isNaN(scores)) ? false :  true;

    return validAssign;
  }

  function storeData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
   
    const assignments = AssignmentGroup.assignments;
    const submissionsScore = {};
    const learner = {}

    for(const learnerSub of LearnerSubmissions) {
      const learner = learnerSub.learner_id;
      const assignmentId = learnerSub.assignment_id;
      const assignment = assignments.find((assign) => assign.id === assignmentId);

      if(!assignment || new Date(learnerSub.submission.submitted_at) > new Date(assignment.due_at) ) {
        console.log("Psy-frame");
      }

   
    }
  
    return { learnerData, assignmentScores };
  }


  function validDate(AssignmentGroup, LearnerSubmissions) {
    const currDate = new Date();

    const currentAssingments = AssignmentGroup.assignments.filter((assignment) => {
        const dueDate = new Date(assignment.due_at);
        return  dueDate <= currDate;
    });

    // AssignmentGroup.assignments.forEach((assignment)=>{
    //   const dueDate = new Date(assignment.due_at);
    //   if(dueDate > currDate) {
    //     // console.log(`Assingment id: ${assignment.id}, Due date: ${assignment.due_at} is not valid.`);
       
    //   }else {
    //     validDueDates.push(assignment.due_at);
    //     // console.log(`${validDueDates}`);
    //   }
    // })
    
  

  }

  function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    // here, we would process this data to achieve the desired result.
    // const result = [
    //   {
    //     id: 125,
    //     avg: 0.985, // (47 + 150) / (50 + 150)
    //     1: 0.94, // 47 / 50
    //     2: 1.0 // 150 / 150
    //   },
    //   {
    //     id: 132,
    //     avg: 0.82, // (39 + 125) / (50 + 150)
    //     1: 0.78, // 39 / 50
    //     2: 0.833 // late: (140 - 15) / 150
    //   }
    // ];
  // try {
  //   isValidId(CourseInfo, AssignmentGroup);
  //   // validAssigment(AssignmentGroup)
  // } catch (error) {
  //   console.error(error.message);
  // }
  console.log(validAssigment(AssignmentGroup));
}
  
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
console.log(result);

   /*  for (const assignment of ag.assignments) {
        console.log(`Assignment ID: ${assignment.id}`);
        console.log(`Name: ${assignment.name}`);
        console.log(`Due Date: ${assignment.due_at}`);
        console.log(`Points Possible: ${assignment.points_possible}`);
        console.log("\n");
      }
      for (const learner of submissions) {
        console.log(`Learner ID: ${learner.learner_id}`);
        console.log(`Assignment ID: ${learner.assignment_id}`);
        console.log(`Submitted At: ${learner.submission.submitted_at}`);
        console.log(`Score: ${learner.submission.score}`);
        console.log("\n");
      }

      //Date

*/