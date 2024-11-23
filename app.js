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
  // Create an object to store scores for each learner
  const result = {};

  // Calculate the total weight (sum of points possible for all assignments)
  let totalWeight = 0;
  for (const assignment of assignments) {
    totalWeight += assignment.points_possible;
  }

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

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
try {
  validateData(CourseInfo, AssignmentGroup);

  // Step 2: Process submissions and calculate scores
  const scores = calculateScores(AssignmentGroup.assignments, LearnerSubmissions);

  // Step 3: Create an array to store formatted results
  const arrResults = [];

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
      arrResults.push(formattedLearner);
    }
  }

  // Step 5: Return the final array of formatted results
  return arrResults;

} catch (error) {
  return 0;
}
}

// Example usage
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);