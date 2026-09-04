const prisma = require("../src/config/db");

const industries = [
  {
    name: "Tata Consultancy Services",
    industry: "Information Technology",
    expertise: [
      "Software Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "IoT",
      "Web Development",
    ],
    description:
      "Technology organization with expertise in software, AI, data and digital solutions.",
  },

  {
    name: "Infosys",
    industry: "Information Technology",
    expertise: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Analytics",
      "Software Development",
      "IoT",
      "Cloud Computing",
    ],
    description:
      "Technology company providing digital transformation and technology solutions.",
  },

  {
    name: "Wipro",
    industry: "Information Technology",
    expertise: [
      "Artificial Intelligence",
      "Data Science",
      "Software Development",
      "IoT",
      "Cloud Computing",
      "Cybersecurity",
    ],
    description:
      "Technology organization focused on digital transformation and engineering solutions.",
  },

  {
    name: "Tata Motors",
    industry: "Automotive",
    expertise: [
      "Mechanical Engineering",
      "Electrical Engineering",
      "IoT",
      "Artificial Intelligence",
      "Smart Mobility",
      "Automation",
    ],
    description:
      "Automotive organization with expertise in mobility, engineering and connected technologies.",
  },

  {
    name: "Mahindra & Mahindra",
    industry: "Automotive",
    expertise: [
      "Agriculture",
      "Smart Agriculture",
      "Mechanical Engineering",
      "IoT",
      "Automation",
      "Electric Vehicles",
    ],
    description:
      "Organization working across automotive and agricultural technology.",
  },

  {
    name: "Larsen & Toubro",
    industry: "Infrastructure",
    expertise: [
      "Civil Engineering",
      "Water Management",
      "Smart Infrastructure",
      "Construction",
      "Electrical Engineering",
      "Environmental Engineering",
    ],
    description:
      "Engineering and infrastructure organization with expertise in large-scale projects.",
  },

  {
    name: "Tata Power",
    industry: "Energy",
    expertise: [
      "Renewable Energy",
      "Electrical Engineering",
      "Smart Grid",
      "IoT",
      "Solar Energy",
      "Energy Management",
    ],
    description:
      "Energy organization with expertise in power systems, renewable energy and smart technologies.",
  },

  {
    name: "Jindal Steel & Power",
    industry: "Steel and Manufacturing",
    expertise: [
      "Mechanical Engineering",
      "Electrical Engineering",
      "Automation",
      "Industrial Engineering",
      "Environmental Engineering",
      "Energy Management",
    ],
    description:
      "Industrial organization with expertise in manufacturing, engineering and energy.",
  },

  {
    name: "ITC Limited",
    industry: "Agriculture and Consumer Goods",
    expertise: [
      "Agriculture",
      "Smart Agriculture",
      "Supply Chain",
      "Data Analytics",
      "Sustainability",
      "Water Management",
    ],
    description:
      "Diversified organization with significant expertise in agriculture, supply chains and sustainability.",
  },

  {
    name: "Hindustan Unilever",
    industry: "Consumer Goods",
    expertise: [
      "Supply Chain",
      "Sustainability",
      "Water Management",
      "Waste Management",
      "Data Analytics",
      "Environmental Management",
    ],
    description:
      "Consumer goods organization with expertise in sustainability and large-scale supply chains.",
  },

  {
    name: "Dr. Reddy's Laboratories",
    industry: "Healthcare",
    expertise: [
      "Healthcare",
      "Medical Technology",
      "Data Science",
      "Artificial Intelligence",
      "Pharmaceutical Technology",
      "Research",
    ],
    description:
      "Healthcare and pharmaceutical organization with expertise in healthcare technology and research.",
  },

  {
    name: "Biocon",
    industry: "Healthcare",
    expertise: [
      "Healthcare",
      "Biotechnology",
      "Medical Technology",
      "Data Science",
      "Research",
      "Life Sciences",
    ],
    description:
      "Biotechnology and healthcare organization with research and technology capabilities.",
  },
];

async function main() {
  console.log("=================================");
  console.log("Starting Industry Seed...");
  console.log("=================================");

  console.log("Clearing old industry data...");

  await prisma.industryPartner.deleteMany();

  console.log("Old industry data cleared.");

  console.log("Adding industry partners...");

  await prisma.industryPartner.createMany({
    data: industries,
  });

  console.log("=================================");
  console.log(
    `${industries.length} industry partners added successfully!`
  );
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error("=================================");
    console.error("INDUSTRY SEED ERROR:");
    console.error(error);
    console.error("=================================");

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });