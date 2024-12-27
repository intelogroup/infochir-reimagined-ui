import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { UserRound, Star } from "lucide-react";

interface Founder {
  name: string;
  title: string;
  role: string;
  image?: string;
  isDeceased?: boolean;
}

const founders: Founder[] = [
  {
    name: "Louis-Franck TELEMAQUE",
    title: "Chirurgien Général",
    role: "COORDONNATEUR",
    image: "/lovable-uploads/0878c37c-8897-4656-af02-a094357c9f8f.png"
  },
  {
    name: "Eunice DERIVOIS",
    title: "Chirurgien Général",
    role: "COORDONNATEUR ADJOINT",
    image: "/lovable-uploads/ade0626d-e1c8-4c08-913e-d755f1426bfd.png"
  },
  {
    name: "Sosthène PIERRE",
    title: "Chirurgien Général",
    role: "RELATIONS PUBLIQUES",
    image: "/lovable-uploads/6f182d14-1e9a-4570-b612-bd8bb9920805.png"
  },
  {
    name: "Jean ALOUIDOR",
    title: "Pédiatre",
    role: "EDITEUR",
    image: "/lovable-uploads/07f095b0-c8a1-42bd-89f8-d1618173b710.png"
  },
  {
    name: "Geissly KERNISAN",
    title: "Chirurgien Général",
    role: "REDACTEUR",
    image: "/lovable-uploads/dafd5fac-6e72-4389-b877-558f4b73d12c.png",
    isDeceased: true
  },
  {
    name: "Jean-Robert ANTOINE",
    title: "Chirurgien Général",
    role: "REDACTEUR",
    image: "/lovable-uploads/d890385a-ebf3-41f3-8334-4c533cd15ca4.png"
  },
  {
    name: "Jean-Marie EUSTACHE",
    title: "Chirurgien Général",
    role: "TRESORIER",
    image: "/lovable-uploads/f7c22c2b-257f-48c9-94d2-9c75ddb26f01.png"
  },
  {
    name: "Denise FABIEN",
    title: "Anesthésiologiste",
    role: "MEMBRE",
    image: "/lovable-uploads/2d519f7b-55bf-4745-b627-f21f2d58caca.png"
  }
];

export const FoundersSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#1EAEDB]/5 via-white to-[#1EAEDB]/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#1EAEDB]/20 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Star className="w-8 h-8 text-[#1EAEDB] animate-pulse" />
            <h2 className="text-4xl font-bold text-[#1EAEDB] bg-clip-text">
              Nos Membres Fondateurs
            </h2>
            <Star className="w-8 h-8 text-[#1EAEDB] animate-pulse" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            En 2011, ces médecins visionnaires se sont réunis pour créer Info CHIR, donnant naissance à une organisation dédiée à l'avancement de la chirurgie et de l'anesthésiologie en Haïti.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`group hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border-0 ${
                founder.isDeceased 
                  ? 'bg-gradient-to-br from-gray-50/90 to-gray-100/90' 
                  : 'bg-gradient-to-br from-white/90 to-gray-50/90 hover:bg-white hover:border-[#1EAEDB]/20'
              }`}>
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-40 h-40 rounded-full overflow-hidden mb-6 ring-4 transform transition-all duration-300 ${
                      founder.isDeceased 
                        ? 'ring-gray-200 opacity-80' 
                        : 'ring-[#1EAEDB]/20 group-hover:ring-[#1EAEDB]/30 group-hover:scale-105'
                    }`}>
                      {founder.image ? (
                        <Avatar className="w-full h-full">
                          <AvatarImage
                            src={founder.image}
                            alt={founder.name}
                            className="object-cover w-full h-full"
                          />
                          <AvatarFallback>
                            <UserRound className="w-12 h-12 text-gray-400" />
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${
                          founder.isDeceased ? 'bg-gray-200' : 'bg-[#1EAEDB]/10'
                        }`}>
                          <UserRound className={`w-12 h-12 ${
                            founder.isDeceased ? 'text-gray-400' : 'text-[#1EAEDB]'
                          }`} />
                        </div>
                      )}
                    </div>
                    <h3 className={`font-semibold text-xl mb-2 transition-colors duration-300 ${
                      founder.isDeceased ? 'text-gray-500' : 'text-gray-900 group-hover:text-[#1EAEDB]'
                    }`}>
                      {founder.name}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      founder.isDeceased ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {founder.title}
                    </p>
                    <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium ${
                      founder.isDeceased 
                        ? 'bg-gray-100 text-gray-500' 
                        : 'bg-[#1EAEDB]/10 text-[#1EAEDB]'
                    }`}>
                      {founder.role}
                    </span>
                    {founder.isDeceased && (
                      <div className="mt-4 text-sm text-gray-500 italic">
                        In memoriam
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};