import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

const NotificationPermission = ({ permissionStatus, onRequestPermission }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if the permission is strictly 'default' and we haven't asked recently.
    // In a real app, you might use localStorage to delay asking again if they clicked "Maybe Later"
    const hasDismissed = localStorage.getItem('yatra_go_notification_dismissed');
    
    if (permissionStatus === 'default' && hasDismissed !== 'true') {
      // Delay showing the popup to not overwhelm the user immediately on load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [permissionStatus]);

  const handleEnable = async () => {
    setIsVisible(false);
    await onRequestPermission();
  };

  const handleLater = () => {
    setIsVisible(false);
    // Remember that the user dismissed it so we don't annoy them
    localStorage.setItem('yatra_go_notification_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-6 relative">
            <button 
              onClick={handleLater}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-start gap-4">
              <div className="bg-brand-blue/10 p-3 rounded-full flex-shrink-0">
                <Bell className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Stay Updated with Yatra Go
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Enable notifications to receive travel deals, Chardham updates, taxi offers, hotel discounts and exclusive holiday packages.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleEnable}
                    className="bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors w-full"
                  >
                    Enable Notifications
                  </button>
                  <button
                    onClick={handleLater}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors w-full"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPermission;
