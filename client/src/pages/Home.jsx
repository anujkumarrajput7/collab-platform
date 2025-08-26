import React from "react";
import Card from "../components/Card";

const Home = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to CollabPlatform</h2>
      <p className="mb-6">Connect Influencers & Startups easily.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Find Creators" description="Search influencers by category and followers." />
        <Card title="For Companies" description="Startups can collaborate with creators for ads." />
        <Card title="Easy Connect" description="Chat and email integration for smooth collaboration." />
      </div>
    </div>
  );
};

export default Home;
