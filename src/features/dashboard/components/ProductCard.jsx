import { Heart } from "lucide-react";
import Badge from "../../../components/ui/Badge";

const ProductCard = ({ name, price, img, status }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
      <div className="relative">
        <img
          src={img}
          alt={name}
          className="h-32 w-full object-cover rounded"
        />

        <div className="absolute top-2 left-2">
          <Badge type={status} />
        </div>

        <Heart
          className="absolute top-2 right-2 text-gray-400"
          size={18}
        />
      </div>

      <h4 className="mt-3 font-semibold">{name}</h4>
      <p className="text-blue-600">₹{price}/kg</p>
    </div>
  );
};

export default ProductCard;