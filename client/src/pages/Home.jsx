import "./Home.css";

function Home() {
  const companies = [
    { name: "Google", desc: "Cloud & AI Collaboration", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", desc: "Enterprise & Azure Services", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Amazon", desc: "AWS & E-commerce Solutions", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Tesla", desc: "AI & Automotive Research", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
    { name: "OpenAI", desc: "Artificial Intelligence & GPT", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/OpenAI_Logo.svg" }
  ];

  return (
    <div className="home-container">
      <h1>🤝 Companies Collaborating on Collab Platform</h1>
      <div className="company-grid">
        {companies.map((company, index) => (
          <div className="company-card" key={index}>
            <img src={company.logo} alt={company.name} className="company-logo" />
            <h2>{company.name}</h2>
            <p>{company.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
