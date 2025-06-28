import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MaomaoGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gallery images - using the provided attachments
  const images = [
    {
      src: '/images/maomao alien stage cover (art is not made by me).jpg',
      title: 'Maomao - Alien Stage Cover',
      description: 'Beautiful artwork featuring Maomao (art credit to original artist)'
    },
    {
      src: '/images/Fibonacci Maths Physicals Background Wallpaper.jpg',
      title: 'Mathematical Beauty',
      description: 'The elegant intersection of mathematics and art through Fibonacci sequences'
    },
    {
      src: '/images/physic colored.jpg',
      title: 'Physics Visualization',
      description: 'Colorful representation of physical concepts and mathematical relationships'
    },
    {
      src: '/images/download (2).jpg',
      title: 'Scientific Diagrams',
      description: 'Complex scientific and mathematical diagrams showcasing the beauty of knowledge'
    },
    {
      src: '/images/download (4).jpg',
      title: 'Mathematical Patterns',
      description: 'Intricate patterns that demonstrate the underlying mathematics of nature'
    }
  ];

  // Listen for global open events
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setCurrentIndex(0);
    };

    window.addEventListener('openMaomaoGallery', handleOpen);
    return () => window.removeEventListener('openMaomaoGallery', handleOpen);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setIsOpen(false)}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Navigation Buttons */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-4xl max-h-[80vh] mx-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative flex-1 flex items-center justify-center mb-6">
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={currentImage.src}
                alt={currentImage.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Image Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h3 className="text-2xl font-mono font-bold mb-2">{currentImage.title}</h3>
              <p className="text-gray-300 mb-4">{currentImage.description}</p>
              
              {/* Image Counter */}
              <div className="flex items-center justify-center space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                  />
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-400 font-mono">
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>

          {/* Keyboard Hints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm font-mono bg-black bg-opacity-50 px-4 py-2 rounded-lg"
          >
            <span className="hidden sm:inline">Use ← → arrow keys to navigate • </span>
            Press ESC to close
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MaomaoGallery;