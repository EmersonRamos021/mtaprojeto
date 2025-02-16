import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ItemCardProps {
  name: string;
  quantity: number;
  type: "ingredient" | "result" | "price";
}

export const ItemCard = ({ name, quantity, type }: ItemCardProps) => {
  const formatQuantity = (value: number, type: string) => {
    if (type === "price") {
      return `$${value.toLocaleString()}`;
    }
    return `${value}x`;
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fadeIn bg-black/50 backdrop-blur-sm border-gray-700">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-white">{name}</CardTitle>
          <Badge 
            variant={type === "ingredient" ? "secondary" : "default"}
            className={type === "ingredient" ? "bg-gray-700" : type === "price" ? "bg-green-600" : "bg-red-600"}
          >
            {formatQuantity(quantity, type)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-300">
          {type === "ingredient" ? "Componente necessário" : type === "price" ? "Custo total" : "Item final"}
        </p>
      </CardContent>
    </Card>
  );
};
