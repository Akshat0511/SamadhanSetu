// =====================================================
// SamadhanSetu - Frontend Mock Data
// =====================================================

// =====================================================
// Notifications
// =====================================================

export const notifications = [
  {
    id: 1,
    icon: "check",
    text: "Your submitted challenge has been received.",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: "building",
    text: "A university has shown interest in a challenge.",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: "handshake",
    text: "New industry collaboration opportunity available.",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: "rocket",
    text: "A project has started implementation.",
    time: "2 days ago",
  },
  {
    id: 5,
    icon: "chart",
    text: "Community impact score has increased.",
    time: "3 days ago",
  },
];

// =====================================================
// Challenges
// =====================================================

export const challenges = [
  {
    id: "challenge-1",
    title: "Clean Drinking Water in Rural Jharkhand",
    description:
      "Many rural communities face difficulties accessing safe and reliable drinking water throughout the year.",
    category: "WATER",
    district: "Ranchi",
    priority: "HIGH",
    status: "OPEN",
    submittedBy: "Community Citizen",
    createdAt: "2026-08-20",
    impactScore: 92,
    views: 1240,
    solutions: 8,
    recommendedSkills: [
      "Water Management",
      "IoT",
      "Environmental Engineering",
      "Data Analysis",
    ],
  },

  {
    id: "challenge-2",
    title: "Smart Agriculture for Small Farmers",
    description:
      "Small farmers need affordable technology for crop monitoring, irrigation management and weather-based decision making.",
    category: "AGRICULTURE",
    district: "Hazaribagh",
    priority: "CRITICAL",
    status: "OPEN",
    submittedBy: "Farmer Community",
    createdAt: "2026-08-21",
    impactScore: 96,
    views: 1830,
    solutions: 12,
    recommendedSkills: [
      "Agriculture Technology",
      "IoT",
      "Machine Learning",
      "Data Science",
    ],
  },

  {
    id: "challenge-3",
    title: "Digital Healthcare Access",
    description:
      "Remote communities need easier access to primary healthcare and medical consultation.",
    category: "HEALTHCARE",
    district: "Dumka",
    priority: "HIGH",
    status: "UNDER_REVIEW",
    submittedBy: "Community Health Worker",
    createdAt: "2026-08-22",
    impactScore: 89,
    views: 975,
    solutions: 6,
    recommendedSkills: [
      "Healthcare Technology",
      "Telemedicine",
      "Mobile Application",
      "Artificial Intelligence",
    ],
  },

  {
    id: "challenge-4",
    title: "Waste Management in Urban Areas",
    description:
      "Urban communities require better systems for waste collection, segregation and recycling.",
    category: "ENVIRONMENT",
    district: "Jamshedpur",
    priority: "MEDIUM",
    status: "OPEN",
    submittedBy: "Citizen Group",
    createdAt: "2026-08-23",
    impactScore: 84,
    views: 720,
    solutions: 5,
    recommendedSkills: [
      "Waste Management",
      "Environmental Engineering",
      "IoT",
      "Recycling",
    ],
  },

  {
    id: "challenge-5",
    title: "Rural Youth Skill Development",
    description:
      "Young people in rural areas need accessible technical and vocational training aligned with industry requirements.",
    category: "EDUCATION",
    district: "Bokaro",
    priority: "HIGH",
    status: "OPEN",
    submittedBy: "Youth Community",
    createdAt: "2026-08-24",
    impactScore: 91,
    views: 1100,
    solutions: 9,
    recommendedSkills: [
      "Education Technology",
      "Skill Development",
      "Web Development",
      "Artificial Intelligence",
    ],
  },
];

// =====================================================
// Solutions
// =====================================================

export const solutions = [
  {
    id: "solution-1",
    title: "IoT-Based Smart Water Monitoring",
    description:
      "A low-cost IoT system for monitoring water quality, tank levels and supply conditions.",
    challengeId: "challenge-1",
    university: "BIT Mesra",
    industry: "WaterTech Solutions",
    status: "PILOT",
    progress: 72,
    impact: "High",
    technologies: [
      "IoT",
      "Sensors",
      "Cloud",
      "Data Analytics",
    ],
  },

  {
    id: "solution-2",
    title: "AI Crop Advisory System",
    description:
      "An AI-powered platform providing farmers with crop health, weather and irrigation recommendations.",
    challengeId: "challenge-2",
    university: "IIT (ISM) Dhanbad",
    industry: "AgriTech India",
    status: "IMPLEMENTING",
    progress: 58,
    impact: "Very High",
    technologies: [
      "Machine Learning",
      "IoT",
      "Weather API",
      "Mobile App",
    ],
  },

  {
    id: "solution-3",
    title: "Telemedicine Rural Health Platform",
    description:
      "A digital healthcare platform connecting rural patients with doctors and health workers.",
    challengeId: "challenge-3",
    university: "Central University of Jharkhand",
    industry: "HealthTech Labs",
    status: "PILOT",
    progress: 45,
    impact: "High",
    technologies: [
      "React",
      "Node.js",
      "Telemedicine",
      "Cloud",
    ],
  },

  {
    id: "solution-4",
    title: "Smart Waste Collection Network",
    description:
      "IoT-enabled waste bins and route optimization for efficient waste collection.",
    challengeId: "challenge-4",
    university: "NIT Jamshedpur",
    industry: "GreenTech Industries",
    status: "PROTOTYPE",
    progress: 35,
    impact: "Medium",
    technologies: [
      "IoT",
      "GPS",
      "Route Optimization",
      "Cloud",
    ],
  },
];

// =====================================================
// Universities
// =====================================================

export const universities = [
  {
    id: "university-1",
    name: "BIT Mesra",
    district: "Ranchi",
    description:
      "Engineering and research institution with expertise in technology, engineering and innovation.",
    researchAreas: [
      "IoT",
      "Artificial Intelligence",
      "Water Management",
      "Data Science",
    ],
    departments: [
      "Computer Science",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electronics Engineering",
    ],
    projects: 18,
    challengesSolved: 11,
    matchScore: 94,
  },

  {
    id: "university-2",
    name: "IIT (ISM) Dhanbad",
    district: "Dhanbad",
    description:
      "Leading technical institution with strong research capabilities in engineering and technology.",
    researchAreas: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Mining Technology",
    ],
    departments: [
      "Computer Science",
      "Electrical Engineering",
      "Mining Engineering",
      "Environmental Engineering",
    ],
    projects: 24,
    challengesSolved: 16,
    matchScore: 91,
  },

  {
    id: "university-3",
    name: "NIT Jamshedpur",
    district: "Jamshedpur",
    description:
      "Technical institution focused on engineering education, research and innovation.",
    researchAreas: [
      "IoT",
      "Robotics",
      "Environmental Engineering",
      "Automation",
    ],
    departments: [
      "Computer Science",
      "Civil Engineering",
      "Electrical Engineering",
      "Electronics Engineering",
    ],
    projects: 15,
    challengesSolved: 9,
    matchScore: 87,
  },

  {
    id: "university-4",
    name: "Central University of Jharkhand",
    district: "Ranchi",
    description:
      "Multidisciplinary university supporting research, education and social innovation.",
    researchAreas: [
      "Healthcare",
      "Education",
      "Social Science",
      "Technology",
    ],
    departments: [
      "Computer Science",
      "Life Sciences",
      "Education",
      "Social Sciences",
    ],
    projects: 12,
    challengesSolved: 7,
    matchScore: 84,
  },
];

// =====================================================
// Industry Partners
// =====================================================

export const industries = [
  {
    id: "industry-1",
    name: "WaterTech Solutions",
    industry: "Water Technology",
    description:
      "Technology company working on smart water monitoring and management solutions.",
    expertise: [
      "IoT",
      "Water Management",
      "Sensors",
      "Data Analytics",
    ],
    projects: 8,
    collaborations: 5,
    matchScore: 95,
  },

  {
    id: "industry-2",
    name: "AgriTech India",
    industry: "Agriculture Technology",
    description:
      "Agricultural technology company developing digital solutions for farmers.",
    expertise: [
      "Agriculture",
      "Machine Learning",
      "IoT",
      "Data Science",
    ],
    projects: 10,
    collaborations: 7,
    matchScore: 93,
  },

  {
    id: "industry-3",
    name: "GreenTech Industries",
    industry: "Environmental Technology",
    description:
      "Company focused on sustainable waste management and environmental technologies.",
    expertise: [
      "Waste Management",
      "Recycling",
      "IoT",
      "Environmental Engineering",
    ],
    projects: 6,
    collaborations: 4,
    matchScore: 88,
  },

  {
    id: "industry-4",
    name: "HealthTech Labs",
    industry: "Healthcare Technology",
    description:
      "Technology company building digital healthcare and telemedicine platforms.",
    expertise: [
      "Telemedicine",
      "Healthcare",
      "Artificial Intelligence",
      "Mobile Applications",
    ],
    projects: 9,
    collaborations: 6,
    matchScore: 90,
  },
];

// =====================================================
// Statistics
// =====================================================

export const stats = {
  challenges: 248,
  activeChallenges: 86,
  solutions: 124,
  universities: 32,
  industryPartners: 47,
  projects: 76,
  citizens: 2840,
  challengesSolved: 93,
  communitiesImpacted: 68,
};

// =====================================================
// Impact Statistics
// =====================================================

export const impactStats = [
  {
    label: "Challenges Submitted",
    value: "248",
    change: "+18%",
  },
  {
    label: "Solutions Developed",
    value: "124",
    change: "+24%",
  },
  {
    label: "Active Projects",
    value: "76",
    change: "+16%",
  },
  {
    label: "Communities Impacted",
    value: "68",
    change: "+31%",
  },
];

// =====================================================
// Categories
// =====================================================

export const categories = [
  "All",
  "Education",
  "Healthcare",
  "Agriculture",
  "Water",
  "Environment",
  "Infrastructure",
  "Rural Livelihood",
  "Accessibility",
  "Public Services",
];

// =====================================================
// Districts
// =====================================================

export const districts = [
  "All Districts",
  "Ranchi",
  "Dhanbad",
  "Jamshedpur",
  "Hazaribagh",
  "Dumka",
  "Bokaro",
  "Deoghar",
  "Giridih",
  "Palamu",
  "Chaibasa",
];

// =====================================================
// Project Milestones
// =====================================================

export const milestones = [
  {
    id: 1,
    title: "Problem Validation",
    status: "COMPLETED",
    progress: 100,
    date: "Aug 10, 2026",
  },
  {
    id: 2,
    title: "Research & Planning",
    status: "COMPLETED",
    progress: 100,
    date: "Aug 15, 2026",
  },
  {
    id: 3,
    title: "Prototype Development",
    status: "IN_PROGRESS",
    progress: 68,
    date: "Sep 05, 2026",
  },
  {
    id: 4,
    title: "Field Testing",
    status: "PENDING",
    progress: 0,
    date: "Sep 20, 2026",
  },
  {
    id: 5,
    title: "Implementation",
    status: "PENDING",
    progress: 0,
    date: "Oct 10, 2026",
  },
];

// =====================================================
// Recent Activities
// =====================================================

export const activities = [
  {
    id: 1,
    type: "challenge",
    title: "New challenge submitted",
    description: "Rural healthcare access challenge submitted from Dumka.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "matching",
    title: "AI matching completed",
    description: "5 universities matched with a water management challenge.",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "project",
    title: "Project started",
    description: "Smart Agriculture project moved into development.",
    time: "Yesterday",
  },
  {
    id: 4,
    type: "solution",
    title: "Solution approved",
    description: "IoT Water Monitoring solution approved for pilot testing.",
    time: "2 days ago",
  },
];

// =====================================================
// Current User
// =====================================================

export const currentUser = {
  id: "user-1",
  name: "Demo User",
  email: "demo@samadhansetu.in",
  role: "CITIZEN",
  district: "Ranchi",
};

// =====================================================
// Dashboard Data
// =====================================================

export const dashboardData = {
  citizen: {
    submittedChallenges: 4,
    activeChallenges: 2,
    solutionsCreated: 1,
    impactScore: 86,
  },

  university: {
    assignedChallenges: 8,
    activeProjects: 5,
    completedProjects: 12,
    students: 64,
  },

  industry: {
    opportunities: 14,
    activeCollaborations: 7,
    completedProjects: 9,
    investment: "₹42L",
  },

  government: {
    totalChallenges: 248,
    pendingReview: 32,
    activeProjects: 76,
    solvedChallenges: 93,
  },
};