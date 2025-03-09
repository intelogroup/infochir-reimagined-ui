
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { navItems } from "@/config/navigation";
import { Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, path: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(path);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      id="mobile-menu"
      role="menu"
      aria-label="Mobile navigation menu"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="fixed top-16 md:top-20 left-0 right-0 w-full bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50 md:hidden z-[100] overflow-hidden touch-pan-y max-h-[calc(100vh-4rem)] overflow-y-auto"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      tabIndex={0}
    >
      <div className="space-y-1.5 p-3 sm:space-y-2 sm:p-4">
        {navItems.map((item, index) => (
          <motion.button
            key={item.name}
            onClick={() => {
              navigate(item.href);
              onClose();
            }}
            className="flex w-full items-center rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 font-medium transition-all duration-200 hover:bg-gray-50/80 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 touch-manipulation"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            role="menuitem"
            aria-label={item.name}
            onKeyDown={(e) => handleKeyDown(e, item.href)}
            tabIndex={0}
          >
            {item.icon && (
              <item.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5 mr-2.5 sm:mr-3 text-primary/80" aria-hidden="true" />
            )}
            <span className="text-sm sm:text-base md:text-lg bg-gradient-to-br from-[#1E40AF] via-[#41b06e] to-[#41b06e] bg-clip-text text-transparent">
              {item.name}
            </span>
          </motion.button>
        ))}
        <motion.button
          onClick={() => {
            navigate('/donate');
            onClose();
          }}
          className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 font-medium bg-gradient-to-r from-secondary to-secondary-light text-white hover:opacity-90 active:opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 touch-manipulation mt-3 sm:mt-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 + (navItems.length + 1) * 0.05 }}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          role="menuitem"
          aria-label="Faire un don"
          onKeyDown={(e) => handleKeyDown(e, '/donate')}
          tabIndex={0}
        >
          <span className="text-sm sm:text-base md:text-lg">Faire un don</span>
          <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white fill-white" aria-hidden="true" />
        </motion.button>
      </div>
    </motion.div>
  );
};
