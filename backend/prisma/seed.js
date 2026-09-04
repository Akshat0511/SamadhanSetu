const prisma = require("../src/config/db");

const universities = [
  {
    name: "BIT Sindri",
    district: "Dhanbad",
    description:
      "Engineering institute with expertise in technology, engineering and applied research.",
    researchAreas: [
      "IoT",
      "Smart Agriculture",
      "Water Management",
      "Artificial Intelligence",
      "Data Science",
    ],
    departments: [
      "Computer Science",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
    ],
  },

  {
    name: "IIT (ISM) Dhanbad",
    district: "Dhanbad",
    description:
      "Technical institute with research capabilities in engineering, AI, data science and environmental technologies.",
    researchAreas: [
      "Artificial Intelligence",
      "Data Science",
      "IoT",
      "Environmental Engineering",
      "Water Management",
    ],
    departments: [
      "Computer Science",
      "Electrical Engineering",
      "Mining Engineering",
      "Environmental Engineering",
    ],
  },

  {
    name: "National Institute of Technology Jamshedpur",
    district: "East Singhbhum",
    description:
      "Engineering institute offering multidisciplinary technical expertise and research.",
    researchAreas: [
      "Artificial Intelligence",
      "IoT",
      "Data Science",
      "Smart Infrastructure",
      "Environmental Engineering",
    ],
    departments: [
      "Computer Science",
      "Electrical Engineering",
      "Civil Engineering",
      "Mechanical Engineering",
    ],
  },

  {
    name: "Birla Institute of Technology Mesra",
    district: "Ranchi",
    description:
      "Multidisciplinary technical institute with strong engineering and technology capabilities.",
    researchAreas: [
      "Artificial Intelligence",
      "Machine Learning",
      "IoT",
      "Data Science",
      "Renewable Energy",
    ],
    departments: [
      "Computer Science",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
    ],
  },

  {
    name: "Central University of Jharkhand",
    district: "Ranchi",
    description:
      "University with multidisciplinary academic and research capabilities.",
    researchAreas: [
      "Environmental Science",
      "Water Management",
      "Agriculture",
      "Data Science",
      "Sustainability",
    ],
    departments: [
      "Computer Science",
      "Environmental Science",
      "Life Sciences",
      "Management",
    ],
  },

  {
    name: "Ranchi University",
    district: "Ranchi",
    description:
      "Higher education institution with multidisciplinary academic expertise.",
    researchAreas: [
      "Environmental Science",
      "Education",
      "Healthcare",
      "Agriculture",
      "Data Science",
    ],
    departments: [
      "Computer Science",
      "Education",
      "Environmental Science",
      "Life Sciences",
    ],
  },

  {
    name: "Kolhan University",
    district: "West Singhbhum",
    description:
      "University serving the Kolhan region with multidisciplinary academic programs.",
    researchAreas: [
      "Agriculture",
      "Healthcare",
      "Education",
      "Environmental Science",
      "Rural Development",
    ],
    departments: [
      "Computer Science",
      "Education",
      "Life Sciences",
      "Environmental Science",
    ],
  },

  {
    name: "Sido Kanhu Murmu University",
    district: "Dumka",
    description:
      "University with academic and research capabilities relevant to regional development.",
    researchAreas: [
      "Agriculture",
      "Rural Development",
      "Education",
      "Environmental Science",
      "Healthcare",
    ],
    departments: [
      "Computer Science",
      "Education",
      "Life Sciences",
      "Environmental Science",
    ],
  },
];

async function main() {
  console.log("=================================");
  console.log("Starting University Seed...");
  console.log("=================================");

  // Delete existing university records
  console.log("Clearing old university data...");

  await prisma.university.deleteMany();

  console.log("Old university data cleared.");

  // Insert new university records
  console.log("Adding universities...");

  await prisma.university.createMany({
    data: universities,
  });

  console.log("=================================");
  console.log(`${universities.length} universities added successfully!`);
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error("=================================");
    console.error("SEED ERROR:");
    console.error(error);
    console.error("=================================");

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });