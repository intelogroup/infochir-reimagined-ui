import { motion } from "framer-motion";
import type { Sponsor } from "./SponsorsData";

interface SponsorCardProps {
  sponsor: Sponsor;
  index: number;
}

export const SponsorCard = ({ sponsor, index }: SponsorCardProps) => {
  const handleClick = () => {
    if (sponsor.url) {
      window.open(sponsor.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className={`relative group ${sponsor.url ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <div className="relative aspect-[3/2] w-full flex items-center justify-center p-6">
        <img
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          className="w-full h-full object-contain mix-blend-multiply filter transition-all duration-300"
          loading="eager"
        />
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-xl transition-all duration-300" />
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <span className="text-sm text-gray-600 font-medium">{sponsor.name}</span>
      </motion.div>
    </motion.div>
  );
};