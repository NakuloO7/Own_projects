import { Link } from "react-router-dom";

const ButtonWarning = ({label, buttonText, to}) => {
  return (
    <p className="text-center text-gray-600 text-sm mt-6">
      {label}
      <Link className="text-blue-600 hover:text-blue-700 font-medium" to={to}>
        {buttonText}
      </Link>
    </p>
  );
};

export default ButtonWarning;
