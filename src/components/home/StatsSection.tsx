import { Card } from "@/components/ui/card";
import { Users, Globe2, BookOpen, TrendingUp } from "lucide-react";

const stats = [
  { label: "Utilisateurs actifs", value: "2,000+", icon: Users, color: "from-blue-500 to-blue-600" },
  { label: "Pays représentés", value: "25+", icon: Globe2, color: "from-green-500 to-green-600" },
  { label: "Articles publiés", value: "500+", icon: BookOpen, color: "from-purple-500 to-purple-600" },
  { label: "Citations", value: "1,500+", icon: TrendingUp, color: "from-orange-500 to-orange-600" },
];

export const StatsSection = () => {
  return (
    <section className="relative -mt-10 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow animate-fade-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-3xl mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};