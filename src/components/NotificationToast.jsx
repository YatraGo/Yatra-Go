import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const NotificationToast = ({ message, onClose }) => {
  // Automatically close toast after 10 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const { notification, data } = message;
  const title = notification?.title || 'New Notification';
  const body = notification?.body || '';
  const image = notification?.image || data?.image;
  
  // Custom click action from data payload (e.g., from Firebase Console custom data)
  const clickUrl = data?.click_action || data?.url || data?.link;

  const handleActionClick = () => {
    if (clickUrl) {
      window.open(clickUrl, '_blank');
    } else {
      // If no url provided but they click the toast, just focus the current window
      window.focus();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-24 right-4 z-[100] w-[90%] max-w-[360px]"
      >
        <div 
          className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 cursor-pointer hover:shadow-3xl transition-shadow"
          onClick={handleActionClick}
        >
          {/* Close button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-2 right-2 bg-black/40 text-white hover:bg-black/60 rounded-full p-1 z-10 transition-colors"
          >
            <X size={16} />
          </button>

          {/* Optional Image */}
          {image && (
            <div className="w-full h-36 overflow-hidden">
              <img src={image} alt="Notification" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="p-4">
            <h4 className="text-base font-bold text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{body}</p>
            
            {/* Action buttons (simulated if URL exists) */}
            {clickUrl && (
              <div className="mt-3 flex justify-end">
                <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">
                  View Details &rarr;
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationToast;
