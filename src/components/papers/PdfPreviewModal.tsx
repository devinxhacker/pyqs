'use client';

import { X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface PdfPreviewModalProps {
  pdfUrl: string | null;
  onClose: () => void;
  title?: string;
}

export default function PdfPreviewModal({ pdfUrl, onClose, title = "PDF Preview" }: PdfPreviewModalProps) {
  return (
    <AnimatePresence>
      {pdfUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-secondary rounded-lg shadow-2xl w-full h-full max-w-4xl max-h-[90vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-2 absolute top-0 right-0">
              <button
                onClick={onClose}
                className="p-2 rounded-full text-content/70 bg-secondary/50 backdrop-blur-sm hover:bg-accent/50 hover:text-content transition-colors"
                aria-label="Close preview"
              >
                <X size={24} weight="bold" />
              </button>
            </div>
            <iframe src={pdfUrl} className="w-full h-full border-none rounded-lg" title={title} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}