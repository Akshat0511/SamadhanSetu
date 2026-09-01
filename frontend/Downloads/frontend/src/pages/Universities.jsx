
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  FlaskConical,
  GraduationCap,
  ArrowRight,
  X,
} from "lucide-react";


import "./Universities.css";

const universitiesData = [
  {
    id: 1,
    name: "Birla Institute of Technology",
    shortName: "BIT Mesra",
    district: "Ranchi",
    description:
      "A leading technical institution with strong capabilities in engineering, technology, research and innovation.",
    researchAreas: [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Science",
      "Data Science",
      "Robotics",
    ],
    departments: [
      "Computer Science & Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
    ],
    established: 1955,
    website: "https://www.bitmesra.ac.in/",
  },
  {
    id: 2,
    name: "Indian Institute of Technology (ISM) Dhanbad",
    shortName: "IIT (ISM) Dhanbad",
    district: "Dhanbad",
    description:
      "Premier institute known for engineering, mining, earth sciences, energy research and technological innovation.",
    researchAreas: [
      "Mining Technology",
      "Artificial Intelligence",
      "Energy",
      "Earth Sciences",
      "Data Science",
    ],
    departments: [
      "Computer Science & Engineering",
      "Mining Engineering",
      "Electrical Engineering",
      "Petroleum Engineering",
    ],
    established: 1926,
    website: "https://www.iitism.ac.in/",
  },
  {
    id: 3,
    name: "National Institute of Technology Jamshedpur",
    shortName: "NIT Jamshedpur",
    district: "East Singhbhum",
    description:
      "A major engineering institute contributing to research, innovation and technology development.",
    researchAreas: [
      "Artificial Intelligence",
      "IoT",
      "Smart Infrastructure",
      "Renewable Energy",
      "Cyber Security",
    ],
    departments: [
      "Computer Science & Engineering",
      "Electronics & Communication",
      "Civil Engineering",
      "Mechanical Engineering",
    ],
    established: 1960,
    website: "https://www.nitjsr.ac.in/",
  },
  {
    id: 4,
    name: "Ranchi University",
    shortName: "RU",
    district: "Ranchi",
    description:
      "A prominent higher education institution with diverse academic departments and research capabilities.",
    researchAreas: [
      "Education",
      "Environmental Science",
      "Social Science",
      "Agriculture",
      "Public Policy",
    ],
    departments: [
      "Computer Science",
      "Environmental Science",
      "Economics",
      "Geography",
      "Education",
    ],
    established: 1960,
    website: "https://www.ranchiuniversity.ac.in/",
  },
  {
    id: 5,
    name: "Central University of Jharkhand",
    shortName: "CUJ",
    district: "Ranchi",
    description:
      "A central university focused on multidisciplinary education, research and innovation.",
    researchAreas: [
      "Tribal Studies",
      "Environmental Science",
      "Computer Science",
      "Management",
      "Social Science",
    ],
    departments: [
      "Computer Science & Engineering",
      "Environmental Science",
      "Management",
      "Tribal Studies",
    ],
    established: 2009,
    website: "https://cuj.ac.in/",
  },
  {
    id: 6,
    name: "Birsa Agricultural University",
    shortName: "BAU",
    district: "Ranchi",
    description:
      "Agricultural university focused on farming, livestock, forestry and rural development.",
    researchAreas: [
      "Agriculture",
      "Smart Farming",
      "Agricultural Technology",
      "Water Management",
      "Livestock",
    ],
    departments: [
      "Agricultural Engineering",
      "Agronomy",
      "Horticulture",
      "Animal Science",
      "Forestry",
    ],
    established: 1981,
    website: "https://www.bauranchi.org/",
  },
];

function Universities() {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("All");
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const districts = useMemo(() => {
    return [
      "All",
      ...new Set(
        universitiesData.map((university) => university.district)
      ),
    ];
  }, []);

  const filteredUniversities = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return universitiesData.filter((university) => {
      const matchesDistrict =
        district === "All" || university.district === district;

      const searchableText = [
        university.name,
        university.shortName,
        university.district,
        university.description,
        ...university.researchAreas,
        ...university.departments,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchValue || searchableText.includes(searchValue);

      return matchesDistrict && matchesSearch;
    });
  }, [search, district]);

  useEffect(() => {
    document.title = "Universities | SamadhanSetu";
  }, []);

  return (
    <div className="universities-page">
    
    

      {/* Hero */}
      <section className="university-hero">
        <div className="hero-overlay"></div>

        <div className="university-container">
          <div className="hero-content">
            <span className="hero-badge">
              <GraduationCap size={17} />
              Higher Education Network
            </span>

            <h1>
              Universities &{" "}
              <span>Research Partners</span>
            </h1>

            <p>
              Connect community challenges with universities that have the
              right research capabilities, departments and technical
              expertise to develop meaningful solutions.
            </p>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <Stat
              icon={<Building2 size={22} />}
              value={universitiesData.length}
              label="Partner Institutions"
            />

            <Stat
              icon={<FlaskConical size={22} />}
              value="30+"
              label="Research Areas"
            />

            <Stat
              icon={<GraduationCap size={22} />}
              value="100+"
              label="Academic Departments"
            />
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="search-section">
        <div className="university-container">
          <div className="search-wrapper">
            <div className="search-box">
              <Search size={20} />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search universities, research areas or departments..."
              />
            </div>

            <select
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
            >
              {districts.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Districts" : item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Universities */}
      <main className="university-container universities-main">
        <div className="section-heading">
          <div>
            <h2>University Network</h2>

            <p>
              {filteredUniversities.length} institution
              {filteredUniversities.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {filteredUniversities.length === 0 ? (
          <EmptyState
            search={search}
            onClear={() => {
              setSearch("");
              setDistrict("All");
            }}
          />
        ) : (
          <div className="university-grid">
            {filteredUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
                onView={() => setSelectedUniversity(university)}
              />
            ))}
          </div>
        )}
      </main>

      {/* CTA */}
      <section className="university-container cta-section">
        <div className="cta-box">
          <div className="cta-circle circle-one"></div>
          <div className="cta-circle circle-two"></div>

          <div className="cta-content">
            <span>JOIN THE NETWORK</span>

            <h2>
              Is your institution ready to solve real-world problems?
            </h2>

            <p>
              Universities can contribute research expertise, faculty
              mentorship and student innovation to challenges submitted by
              communities across Jharkhand.
            </p>

            <button type="button">
              Become a Research Partner
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      
      

      {/* Modal */}
      {selectedUniversity && (
        <UniversityModal
          university={selectedUniversity}
          onClose={() => setSelectedUniversity(null)}
        />
      )}
    </div>
  );
}

/* University Card */
function UniversityCard({ university, onView }) {
  return (
    <article className="university-card">
      <div className="card-top">
        <div className="card-decoration"></div>

        <div className="card-top-content">
          <div className="university-icon">
            <GraduationCap size={28} />
          </div>

          <span className="short-name">
            {university.shortName}
          </span>
        </div>
      </div>

      <div className="card-body">
        <h3>{university.name}</h3>

        <div className="location">
          <MapPin size={16} />
          {university.district}, Jharkhand
        </div>

        <p className="description">
          {university.description}
        </p>

        <div className="research-section">
          <p className="research-title">Research Areas</p>

          <div className="research-tags">
            {university.researchAreas
              .slice(0, 4)
              .map((area) => (
                <span key={area}>{area}</span>
              ))}

            {university.researchAreas.length > 4 && (
              <span className="more-tag">
                +{university.researchAreas.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="card-footer">
          <span>Est. {university.established}</span>

          <button type="button" onClick={onView}>
            View Profile
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

/* Stats */
function Stat({ icon, value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <p>{value}</p>
        <span>{label}</span>
      </div>
    </div>
  );
}

/* Empty State */
function EmptyState({ search, onClear }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Search size={25} />
      </div>

      <h3>No universities found</h3>

      <p>
        No university matches your current search
        {search ? ` for "${search}"` : ""}.
      </p>

      <button type="button" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  );
}

/* Modal */
function UniversityModal({ university, onClose }) {
  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="university-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <div className="modal-icon">
              <GraduationCap size={27} />
            </div>

            <div>
              <h2>{university.name}</h2>

              <p>
                <MapPin size={15} />
                {university.district}, Jharkhand
              </p>
            </div>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">
          <div className="modal-section">
            <h3>About</h3>

            <p>{university.description}</p>
          </div>

          <div className="modal-section">
            <h3>Research Areas</h3>

            <div className="modal-tags">
              {university.researchAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>Departments</h3>

            <div className="departments-grid">
              {university.departments.map((department) => (
                <div key={department}>
                  {department}
                </div>
              ))}
            </div>
          </div>

          <div className="modal-info-grid">
            <div>
              <span>Established</span>
              <strong>{university.established}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{university.district}</strong>
            </div>
          </div>

          <a
            href={university.website}
            target="_blank"
            rel="noreferrer"
            className="website-button"
          >
            Visit University Website
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Universities;

