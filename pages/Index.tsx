import { ItemCard } from "@/components/ItemCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Definir interface para os ingredientes
interface Ingredient {
  name: string;
  quantity: number;
}

// Definir os componentes necessários para cada arma
const weaponRecipes = {
  "AK-47": [
    { name: "Ferrolho", baseQuantity: 1 },
    { name: "Cano", baseQuantity: 1 },
    { name: "Mola", baseQuantity: 1 },
    { name: "Gatilho", baseQuantity: 1 },
    { name: "Ferro", baseQuantity: 7 },
  ],
  "PDW": [
    { name: "Ferrolho", baseQuantity: 1 },
    { name: "Cano", baseQuantity: 1 },
    { name: "Mola", baseQuantity: 1 },
    { name: "Gatilho", baseQuantity: 1 },
    { name: "Ferro", baseQuantity: 3 },
  ],
  "Uzi": [
    { name: "Ferrolho", baseQuantity: 1 },
    { name: "Cano", baseQuantity: 1 },
    { name: "Mola", baseQuantity: 1 },
    { name: "Gatilho", baseQuantity: 1 },
    { name: "Ferro", baseQuantity: 7 },
  ],
  "Pistola": [
    { name: "Ferrolho", baseQuantity: 1 },
    { name: "Cano", baseQuantity: 1 },
    { name: "Mola", baseQuantity: 1 },
    { name: "Gatilho", baseQuantity: 1 },
    { name: "Ferro", baseQuantity: 1 },
  ],
  "Munição 7.62mm": [
    { name: "Cobre", baseQuantity: 3 },
    { name: "Prata", baseQuantity: 3 },
    { name: "Pólvora", baseQuantity: 3 },
  ],
  "Munição .380": [
    { name: "Cobre", baseQuantity: 2 },
    { name: "Prata", baseQuantity: 2 },
    { name: "Pólvora", baseQuantity: 2 },
  ],
};

// Definir a quantidade de munição produzida por craft
const ammoYield = {
  "Munição 7.62mm": 48,
  "Munição .380": 48,
};

// Definir preços das armas
const weaponPrices = {
  "AK-47": 150000,
  "PDW": 110000,
  "Uzi": 85000,
  "Pistola": 45000,
  "Munição 7.62mm": 24000,
  "Munição .380": 21600,
};

const Index = () => {
  const [selectedWeapon, setSelectedWeapon] = useState("AK-47");
  const [inputQuantity, setInputQuantity] = useState("1");
  const [totalIngredients, setTotalIngredients] = useState<Ingredient[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const handleWeaponChange = (value: string) => {
    setSelectedWeapon(value);
    setTotalIngredients([]); // Limpa os ingredientes ao trocar de arma
    setQuantity(0);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir apenas números positivos
    if (/^\d*$/.test(value)) {
      setInputQuantity(value);
    }
  };

  const handleCalculate = () => {
    const qty = parseInt(inputQuantity) || 0;
    setQuantity(qty);

    // Calcular os ingredientes necessários
    const recipe = weaponRecipes[selectedWeapon];
    const isAmmo = selectedWeapon.includes("Munição");
    
    const ingredients = recipe.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.baseQuantity * qty,
    }));

    // Calcular valor total
    const price = weaponPrices[selectedWeapon] || 0;
    const total = price * qty;
    setTotalValue(total);

    setTotalIngredients(ingredients);
  };

  // Calcular o total de todos os componentes
  const calculateTotalComponents = () => {
    const totals = new Map<string, number>();
    
    // Calcular apenas os componentes das armas (excluindo munições)
    Object.entries(weaponRecipes).forEach(([name, recipe]) => {
      if (!name.includes("Munição")) {
        recipe.forEach(ingredient => {
          const current = totals.get(ingredient.name) || 0;
          totals.set(ingredient.name, current + ingredient.baseQuantity);
        });
      }
    });
    
    return Array.from(totals.entries()).map(([name, quantity]) => ({
      name,
      quantity,
    }));
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://cdn.discordapp.com/attachments/1294518687071600650/1340039146055405692/mta-screen_2025-02-10_13-15-07.png?ex=67b0e835&is=67af96b5&hm=aa5d1cee592bb609a2e7badb56368e96e2adff15452a87cebb3c08f4304095b9&')`,
      }}
    >
      <div className="min-h-screen p-6 md:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <img 
                src="https://cdn.discordapp.com/attachments/1294518687071600650/1340032498020646993/image-removebg-preview.png?ex=67b0e204&is=67af9084&hm=4c2954da889cdaf179bd5df3672c22f53dc1755764f5efd8fec6310ce1ec0142&"
                alt="Dragon Logo" 
                className="w-32 h-32 object-contain animate-pulse"
              />
              <div className="text-white">
                <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Tropa do Liros
                </h1>
                <h2 className="text-3xl font-bold tracking-tight mt-2">
                  Calculadora de Armas
                </h2>
                <p className="mt-2 text-lg text-gray-300">
                  Veja os componentes necessários para criar cada arma
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-lg border bg-black/50 backdrop-blur-sm p-6">
            <h2 className="mb-4 text-2xl font-semibold text-white">Calcular Múltiplas Armas e Munições</h2>
            <div className="mb-4 flex items-center gap-4">
              <Select value={selectedWeapon} onValueChange={handleWeaponChange}>
                <SelectTrigger className="w-[180px] bg-black/50 text-white border-gray-700">
                  <SelectValue placeholder="Selecione um item" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 text-white border-gray-700">
                  {Object.keys(weaponRecipes).map((weapon) => (
                    <SelectItem 
                      key={weapon} 
                      value={weapon}
                      className="hover:bg-gray-800"
                    >
                      {weapon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={inputQuantity}
                  onChange={handleQuantityChange}
                  className="w-24 bg-black/50 text-white border-gray-700"
                  min="1"
                />
                <span className="text-lg">
                  {selectedWeapon.includes("Munição") ? "crafts" : "unidades"}
                </span>
              </div>
              <Button 
                onClick={handleCalculate}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Calcular
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {totalIngredients.map((ingredient) => (
                <ItemCard
                  key={ingredient.name}
                  name={ingredient.name}
                  quantity={ingredient.quantity}
                  type="ingredient"
                />
              ))}
              {quantity > 0 && (
                <>
                  <ItemCard
                    name={selectedWeapon}
                    quantity={selectedWeapon.includes("Munição") ? quantity * ammoYield[selectedWeapon] : quantity}
                    type="result"
                  />
                  <ItemCard
                    name="Valor Total"
                    quantity={totalValue}
                    type="price"
                  />
                </>
              )}
            </div>
          </div>

          <div className="grid gap-8">
            {Object.entries(weaponRecipes).map(([itemName, recipe]) => (
              <div key={itemName} className="rounded-lg border bg-black/50 backdrop-blur-sm p-6">
                <h2 className="mb-4 text-2xl font-semibold text-white">
                  {itemName}
                  {itemName.includes("Munição") && ` (Produz ${ammoYield[itemName]} unidades)`}
                  <span className="ml-2 text-lg text-gray-300">
                    - Valor: ${weaponPrices[itemName]?.toLocaleString()}
                  </span>
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {recipe.map((ingredient) => (
                    <ItemCard
                      key={`${itemName}-${ingredient.name}`}
                      name={ingredient.name}
                      quantity={ingredient.baseQuantity}
                      type="ingredient"
                    />
                  ))}
                  <ItemCard
                    name={itemName}
                    quantity={itemName.includes("Munição") ? ammoYield[itemName] : 1}
                    type="result"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border bg-black/50 backdrop-blur-sm p-6">
            <h2 className="mb-4 text-2xl font-semibold text-white">Total de Componentes</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {calculateTotalComponents().map((component) => (
                <ItemCard
                  key={component.name}
                  name={component.name}
                  quantity={component.quantity}
                  type="ingredient"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
