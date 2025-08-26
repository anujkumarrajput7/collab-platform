import React from "react";

const Card = ({ title, description }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;

