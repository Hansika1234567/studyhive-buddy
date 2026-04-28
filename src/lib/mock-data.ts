// Mock data for the PeerClass demo (UI-only build)

export const currentUser = {
  id: "u-1",
  name: "Aanya Sharma",
  username: "aanya",
  email: "aanya@peerclass.io",
  avatar: "AS",
  bio: "CS undergrad. Loves algorithms, ML and late-night debugging.",
  subjects: ["Algorithms", "Machine Learning", "Operating Systems", "Calculus"],
  contributionScore: 1840,
  rank: 3,
};

export const stats = {
  messagesSent: 312,
  filesUploaded: 24,
  tasksCompleted: 47,
  doubtsAnswered: 38,
};

export const groups = [
  {
    id: "g-1",
    name: "Algorithms Study Circle",
    subject: "Algorithms",
    members: 12,
    unread: 4,
    color: "from-violet-500 to-fuchsia-500",
    lastMessage: "Anyone has notes for DP on trees?",
  },
  {
    id: "g-2",
    name: "ML Project Team",
    subject: "Machine Learning",
    members: 6,
    unread: 0,
    color: "from-indigo-500 to-purple-500",
    lastMessage: "Pushed the preprocessing notebook",
  },
  {
    id: "g-3",
    name: "OS Lab Squad",
    subject: "Operating Systems",
    members: 8,
    unread: 2,
    color: "from-pink-500 to-rose-500",
    lastMessage: "Lab 4 deadline moved to Friday",
  },
  {
    id: "g-4",
    name: "Calc II Buddies",
    subject: "Calculus",
    members: 15,
    unread: 0,
    color: "from-fuchsia-500 to-pink-500",
    lastMessage: "Sharing the integration cheat sheet",
  },
];

export const groupMessages = [
  { id: "m1", author: "Rohan", avatar: "RK", time: "10:12", text: "Hey team — should we sync tonight on the DP problem set?" },
  { id: "m2", author: "Aanya", avatar: "AS", time: "10:14", text: "Yes! 9pm works. I'll bring my notes on tabulation vs memoization.", self: true },
  { id: "m3", author: "Mira", avatar: "MP", time: "10:16", text: "Sweet. I keep getting TLE on problem 4, can someone look?" },
  { id: "m4", author: "Karan", avatar: "KT", time: "10:21", text: "Looks like O(n^3) — try precomputing prefix sums to drop a factor." },
  { id: "m5", author: "Mira", avatar: "MP", time: "10:23", text: "Ohhh that makes sense, trying it now 🙏" },
  { id: "m6", author: "Rohan", avatar: "RK", time: "10:31", text: "Also reminder: assignment due Friday 11:59pm." },
];

export const tasks = [
  { id: "t1", title: "Finish DP problem set 4", assignee: "Aanya", due: "Today", status: "in_progress" as const },
  { id: "t2", title: "Write report intro", assignee: "Rohan", due: "Tomorrow", status: "todo" as const },
  { id: "t3", title: "Review Mira's notebook", assignee: "Karan", due: "Fri", status: "todo" as const },
  { id: "t4", title: "Setup shared LaTeX doc", assignee: "Aanya", due: "Done", status: "done" as const },
];

export const doubts = [
  {
    id: "d1",
    title: "Why does my QuickSort go quadratic on sorted input?",
    body: "I implemented Lomuto partition with last element as pivot. On already-sorted arrays it explodes. Is there a cleaner fix than random pivot?",
    tags: ["Algorithms", "Sorting"],
    author: "Rohan",
    avatar: "RK",
    anonymous: false,
    votes: 24,
    answers: 5,
    time: "2h ago",
    solved: true,
  },
  {
    id: "d2",
    title: "Difference between process and thread in xv6?",
    body: "Reading the OS textbook and confused about how xv6 handles context switching for kernel threads vs processes.",
    tags: ["Operating Systems"],
    author: "Anonymous",
    avatar: "?",
    anonymous: true,
    votes: 18,
    answers: 3,
    time: "5h ago",
    solved: false,
  },
  {
    id: "d3",
    title: "Gradient descent diverges with lr=0.1, why?",
    body: "Training a tiny linear regression. Loss explodes after 3 epochs. Tried smaller lr and it works. Want to understand the math.",
    tags: ["Machine Learning", "Calculus"],
    author: "Mira",
    avatar: "MP",
    anonymous: false,
    votes: 31,
    answers: 7,
    time: "1d ago",
    solved: true,
  },
  {
    id: "d4",
    title: "Best resource to learn dynamic programming intuitively?",
    body: "I get the implementation but lack the intuition for choosing states. Any peer-tested recommendations?",
    tags: ["Algorithms"],
    author: "Sana",
    avatar: "SP",
    anonymous: false,
    votes: 12,
    answers: 4,
    time: "1d ago",
    solved: false,
  },
];

export const resources = [
  { id: "r1", name: "DP Patterns Cheatsheet.pdf", subject: "Algorithms", uploader: "Aanya", size: "1.2 MB", downloads: 142, version: "v3" },
  { id: "r2", name: "Linear Algebra Notes.pdf", subject: "Math", uploader: "Karan", size: "3.4 MB", downloads: 89, version: "v1" },
  { id: "r3", name: "xv6 Kernel Walkthrough.pdf", subject: "Operating Systems", uploader: "Mira", size: "5.8 MB", downloads: 64, version: "v2" },
  { id: "r4", name: "ML Cheat Sheet.pdf", subject: "Machine Learning", uploader: "Rohan", size: "780 KB", downloads: 211, version: "v4" },
  { id: "r5", name: "Calc II Practice Problems.pdf", subject: "Calculus", uploader: "Sana", size: "2.1 MB", downloads: 53, version: "v1" },
  { id: "r6", name: "Graph Algorithms Slides.pdf", subject: "Algorithms", uploader: "Aanya", size: "4.5 MB", downloads: 178, version: "v2" },
];

export const planner = [
  { id: "p1", title: "Algo Assignment 4", subject: "Algorithms", due: "Apr 30", priority: "high" as const, done: false },
  { id: "p2", title: "ML Project Milestone 2", subject: "Machine Learning", due: "May 03", priority: "high" as const, done: false },
  { id: "p3", title: "OS Lab Report", subject: "OS", due: "May 05", priority: "medium" as const, done: false },
  { id: "p4", title: "Calc Problem Set", subject: "Calculus", due: "May 07", priority: "low" as const, done: false },
  { id: "p5", title: "Read DP chapter", subject: "Algorithms", due: "Apr 28", priority: "medium" as const, done: true },
];

export const leaderboard = [
  { rank: 1, name: "Karan Tiwari", score: 2410, avatar: "KT" },
  { rank: 2, name: "Mira Patel", score: 2105, avatar: "MP" },
  { rank: 3, name: "Aanya Sharma", score: 1840, avatar: "AS" },
  { rank: 4, name: "Rohan Kapoor", score: 1620, avatar: "RK" },
  { rank: 5, name: "Sana Pillai", score: 1390, avatar: "SP" },
];

export const notifications = [
  { id: "n1", text: "Karan answered your doubt on QuickSort", time: "2m ago", type: "doubt" as const },
  { id: "n2", text: "Algo Assignment 4 is due tomorrow", time: "1h ago", type: "deadline" as const },
  { id: "n3", text: "Mira shared a new file in ML Project Team", time: "3h ago", type: "file" as const },
  { id: "n4", text: "You earned the 'Helpful Peer' badge", time: "1d ago", type: "badge" as const },
];
