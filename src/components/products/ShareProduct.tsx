import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Facebook, Twitter, Send, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ShareProductProps {
  title: string;
  description: string;
  image: string;
}

export const ShareProduct = ({ title, description, image }: ShareProductProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const url = window.location.href;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#1877F2]/90'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1DA1F2] hover:bg-[#1DA1F2]/90'
    },
    {
      name: 'WhatsApp',
      icon: Send,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#25D366]/90'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        aria-label="Partager"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 p-4">
            <div className="mb-4">
              <h3 className="font-medium text-dark-gray mb-2">Partager ce produit</h3>
              <button
                onClick={copyToClipboard}
                className={cn(
                  "w-full flex items-center gap-2 p-2 rounded-lg transition-colors",
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-dark-gray"
                )}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Lien copié !</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4" />
                    <span>Copier le lien</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg text-white text-sm",
                    link.color
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};