import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  Factory,
  Handshake,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";


import "./Industries.css";

const industriesData = [
  {
    id: 1,
    name: "Tata Steel",
    industry: "Steel & Manufacturing",
    location: "Jamshedpur",
    description:
      "A major industrial partner with expertise in steel manufacturing, sustainability, smart infrastructure and industrial innovation.",
    expertise: [
      "Steel Manufacturing",
      "Industrial Automation",
      "Sustainability",
      "Waste Management",
      "Smart Infrastructure",
    ],
    focusAreas: [
      "Sustainable Manufacturing",
      "Circular Economy",
      "Industrial IoT",
      "Water Management",
    ],
    projects: 12,
    website: "https://www.tatasteel.com/",
  },
  {
    id: 2,
    name: "Central Coalfields Limited",
    industry: "Mining & Energy",
    location: "Ranchi",
    description:
      "An important energy-sector organization with capabilities in mining technology, environmental management and community development.",
    expertise: [
      "Coal Mining",
      "Mining Technology",
      "Environmental Management",
      "Energy",
      "Safety Technology",
    ],
    focusAreas: [
      "Mine Safety",
      "Environmental Restoration",
      "Clean Energy",
      "Worker Safety",
    ],
    projects: 9,
    website: "https://www.ccl.gov.in/",
  },
  {
    id: 3,
    name: "Tata Motors",
    industry: "Automotive",
    location: "Jamshedpur",
    description:
      "Automotive technology company with expertise in mobility, manufacturing, electric vehicles and intelligent transportation.",
    expertise: [
      "Automotive Technology",
      "Electric Vehicles",
      "Manufacturing",
      "Mobility",
      "IoT",
    ],
    focusAreas: [
      "Electric Mobility",
      "Smart Transportation",
      "Vehicle Safety",
      "Clean Mobility",
    ],
    projects: 15,
    website: "https://www.tatamotors.com/",
  },
  {
    id: 4,
    name: "MECON Limited",
    industry: "Engineering & Infrastructure",
    location: "Ranchi",
    description:
      "Engineering consultancy organization providing expertise in infrastructure, industrial engineering and project management.",
    expertise: [
      "Civil Engineering",
      "Infrastructure",
      "Project Management",
      "Industrial Engineering",
      "Construction",
    ],
    focusAreas: [
      "Urban Infrastructure",
      "Smart Cities",
      "Industrial Development",
      "Public Infrastructure",
    ],
    projects: 7,
    website: "https://www.meconlimited.co.in/",
  },
  {
    id: 5,
    name: "Jindal Steel & Power",
    industry: "Steel & Energy",
    location: "Patratu",
    description:
      "Industrial organization focused on steel, energy and infrastructure with capabilities in large-scale industrial operations.",
    expertise: [
      "Steel",
      "Power Generation",
      "Energy",
      "Industrial Operations",
      "Infrastructure",
    ],
    focusAreas: [
      "Clean Energy",
      "Energy Efficiency",
      "Industrial Sustainability",
      "Infrastructure",
    ],
    projects: 8,
    website: "https://www.jindalsteelpower.com/",
  },
  {
    id: 6,
    name: "Tech Mahindra",
    industry: "Information Technology",
    location: "Ranchi",
    description:
      "Technology services organization offering expertise in software, digital transformation, AI and connected technologies.",
    expertise: [
      "Artificial Intelligence",
      "Software Development",
      "Cloud Computing",
      "Cyber Security",
      "Data Analytics",
    ],
    focusAreas: [
      "Digital Governance",
      "AI Solutions",
      "Cyber Security",
      "Smart Services",
    ],
    projects: 18,
    website: "https://www.techmahindra.com/",
  },
];

function Industries() {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    document.title = "Industry Partners | SamadhanSetu";
  }, []);

  const industries = useMemo(
    () => ["All", ...new Set(industriesData.map((p) => p.industry))],
    []
  );

  const filteredPartners = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return industriesData.filter((partner) => {
      const matchesIndustry =
        industryFilter === "All" ||
        partner.industry === industryFilter;

      const searchableText = [
        partner.name,
        partner.industry,
        partner.location,
        partner.description,
        ...partner.expertise,
        ...partner.focusAreas,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesIndustry &&
        (!searchValue || searchableText.includes(searchValue))
      );
    });
  }, [search, industryFilter]);

  const totalProjects = industriesData.reduce(
    (sum, partner) => sum + partner.projects,
    0
  );

  const totalExpertise = new Set(
    industriesData.flatMap((partner) => partner.expertise)
  ).size;

  return (
    <div className="industries-page">
     

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg"></div>

        <div className="container">
          <div className="hero-content">
            <span className="badge">
              <Handshake size={16} />
              Industry Innovation Network
            </span>

            <h1>
              Industry <span>Partners</span>
            </h1>

            <p>
              Connect real-world community challenges with industries that
              can provide technology, resources, implementation expertise and
              scalable solutions.
            </p>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <StatCard
              icon={<Building2 size={20} />}
              value={industriesData.length}
              label="Industry Partners"
            />

            <StatCard
              icon={<Factory size={20} />}
              value={totalExpertise}
              label="Expertise Areas"
            />

            <StatCard
              icon={<Handshake size={20} />}
              value={totalProjects}
              label="Collaborative Projects"
            />
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search-section">
        <div className="container search-wrapper">
          <div className="search-box">
            <Search size={20} />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search industry partners, expertise or technology..."
            />
          </div>

          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry === "All" ? "All Industries" : industry}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* PARTNERS */}
      <main className="container partners-section">
        <div className="section-heading">
          <div>
            <h2>Industry Network</h2>
            <p>
              {filteredPartners.length} partner
              {filteredPartners.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {filteredPartners.length === 0 ? (
          <EmptyState
            search={search}
            onClear={() => {
              setSearch("");
              setIndustryFilter("All");
            }}
          />
        ) : (
          <div className="partners-grid">
            {filteredPartners.map((partner) => (
              <IndustryCard
                key={partner.id}
                partner={partner}
                onView={() => setSelectedPartner(partner)}
              />
            ))}
          </div>
        )}
      </main>

      {/* CTA */}
      <section className="container cta-section">
        <div className="cta">
          <div className="cta-decoration"></div>

          <div className="cta-content">
            <span>Partner With SamadhanSetu</span>

            <h2>Turn innovation into real-world impact.</h2>

            <p>
              Industry partners can provide technical expertise, mentorship,
              technology, resources and implementation support to help
              communities solve critical challenges.
            </p>

            <button>
              Become an Industry Partner
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

  
  

      {/* MODAL */}
      {selectedPartner && (
        <IndustryModal
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
        />
      )}
    </div>
  );
}

function IndustryCard({ partner, onView }) {
  return (
    <article className="industry-card">
      <div className="card-header">
        <div className="card-icon">
          <Factory size={28} />
        </div>

        <span>Industry</span>
      </div>

      <div className="card-body">
        <h3>{partner.name}</h3>

        <div className="info">
          <Factory size={16} />
          {partner.industry}
        </div>

        <div className="info">
          <MapPin size={16} />
          {partner.location}, Jharkhand
        </div>

        <p className="description">{partner.description}</p>

        <div className="expertise">
          <h4>Expertise</h4>

          <div className="tags">
            {partner.expertise.slice(0, 4).map((item) => (
              <span key={item}>{item}</span>
            ))}

            {partner.expertise.length > 4 && (
              <span className="more">
                +{partner.expertise.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="card-footer">
          <span>{partner.projects} active projects</span>

          <button onClick={onView}>
            View Profile
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <strong>{value}</strong>
        <p>{label}</p>
      </div>
    </div>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Search size={24} />
      </div>

      <h3>No industry partners found</h3>

      <p>
        No industry partner matches your current search
        {search ? ` for "${search}"` : ""}.
      </p>

      <button onClick={onClear}>Clear Filters</button>
    </div>
  );
}

function IndustryModal({ partner, onClose }) {
  return (
    <div className="modal-overlay" onMouseDown={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">
            <div className="modal-icon">
              <Factory size={28} />
            </div>

            <div>
              <h2>{partner.name}</h2>
              <p>{partner.industry}</p>

              <span>
                <MapPin size={15} />
                {partner.location}, Jharkhand
              </span>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <section>
            <h3>About</h3>
            <p>{partner.description}</p>
          </section>

          <section>
            <h3>Expertise</h3>

            <div className="modal-expertise">
              {partner.expertise.map((item) => (
                <div key={item}>
                  <CheckCircle2 size={16} />
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3>Focus Areas</h3>

            <div className="focus-tags">
              {partner.focusAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </section>

          <div className="modal-stats">
            <div>
              <p>Collaborative Projects</p>
              <strong>{partner.projects}</strong>
            </div>

            <div>
              <p>Industry</p>
              <strong>{partner.industry}</strong>
            </div>
          </div>

          <a
            href={partner.website}
            target="_blank"
            rel="noreferrer"
            className="website-btn"
          >
            Visit Company Website
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Industries;