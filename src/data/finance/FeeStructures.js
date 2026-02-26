const FEE_STRUCTURES = [
  {
    id: "PRIMARY",
    className: "Class 1",
    components: {
      tuitionFee: 2500,
      admissionFee: 5000,
      annualCharges: 3000,
      examFee: 500,
      computerLabFee: 200,
      activityFund: 300,
      securityFee: 1500, // One-time, refundable
    },
  },
  {
    id: "MIDDLE",
    className: "Class 6",
    components: {
      tuitionFee: 4000,
      admissionFee: 7000,
      annualCharges: 5000,
      examFee: 1000,
      computerLabFee: 500,
      activityFund: 500,
      securityFee: 2000,
    },
  },
  {
    id: "SECONDARY",
    className: "Class 9",
    components: {
      tuitionFee: 5500,
      admissionFee: 10000,
      annualCharges: 7000,
      examFee: 1500,
      computerLabFee: 1000,
      activityFund: 800,
      securityFee: 3000,
    },
  },
];

export const getFeeStructureByClass = (className) => {
  // logic to match class to structure (in real app, this would be a map)
  if (
    className.includes("Class 1") ||
    className.includes("Class 2") ||
    className.includes("Class 3") ||
    className.includes("Class 4") ||
    className.includes("Class 5")
  ) {
    return FEE_STRUCTURES.find((s) => s.id === "PRIMARY");
  }
  if (
    className.includes("Class 6") ||
    className.includes("Class 7") ||
    className.includes("Class 8")
  ) {
    return FEE_STRUCTURES.find((s) => s.id === "MIDDLE");
  }
  if (
    className.includes("Class 9") ||
    className.includes("Class 10") ||
    className.includes("Class 11") ||
    className.includes("Class 12")
  ) {
    return FEE_STRUCTURES.find((s) => s.id === "SECONDARY");
  }
  return FEE_STRUCTURES[0]; // Default
};

export default FEE_STRUCTURES;
