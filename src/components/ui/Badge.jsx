const Badge = ({ type }) => {
  const styles = {
    stock: "bg-green-100 text-green-600",
    low: "bg-yellow-100 text-yellow-600",
    critical: "bg-red-100 text-red-600"
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${styles[type]}`}>
      {type}
    </span>
  );
};

export default Badge;