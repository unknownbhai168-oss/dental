import React, { useState } from 'react';
import { Maximize2, X, Sparkles, Building, Cpu, ShieldCheck } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/dentalData';
import { GalleryItem } from '../types/dental';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Spaces' },
    { id: 'operatory', label: 'Treatment Suites' },
    { id: 'technology', label: '3D Diagnostics & Lab' },
    { id: 'interior', label: 'Lounge Sanctuary' },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  // Stylized procedural vector backgrounds for each space
  const renderItemVisual = (item: GalleryItem) => {
    switch (item.category) {
      case 'operatory':
        return (
          <div className="w-full h-full bg-gradient-to-tr from-[#087F8C]/15 via-[#54D6D0]/20 to-[#F8FCFF] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center text-[#087F8C] mb-3 group-hover:scale-110 transition-transform">
              <Building className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-[#142C43]">{item.title}</span>
            <span className="text-[11px] text-[#087F8C] font-semibold mt-0.5">{item.tag}</span>
          </div>
        );
      case 'technology':
        return (
          <div className="w-full h-full bg-gradient-to-tr from-[#142C43]/10 via-[#087F8C]/20 to-[#DDF8F0] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center text-[#087F8C] mb-3 group-hover:scale-110 transition-transform">
              <Cpu className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-[#142C43]">{item.title}</span>
            <span className="text-[11px] text-[#087F8C] font-semibold mt-0.5">{item.tag}</span>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-gradient-to-tr from-[#DDF8F0] via-[#54D6D0]/20 to-white flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center text-[#087F8C] mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-[#142C43]">{item.title}</span>
            <span className="text-[11px] text-[#087F8C] font-semibold mt-0.5">{item.tag}</span>
          </div>
        );
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#087F8C] uppercase tracking-wider mb-2">
            <span>Clinic Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142C43] tracking-tight mb-4">
            An Environment Built for Serenity
          </h2>
          <p className="text-base text-[#142C43]/70">
            Tour our modern clinical suites designed with natural light, acoustic tranquility, and
            cutting-edge biomimetic technology.
          </p>

          {/* Interactive Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 bg-[#F8FCFF] rounded-2xl border border-slate-200 inline-flex">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeFilter === cat.id
                    ? 'bg-[#087F8C] text-white shadow-sm'
                    : 'text-[#142C43]/70 hover:text-[#087F8C]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative h-64 rounded-3xl overflow-hidden border border-[#142C43]/8 hover:border-[#54D6D0] cursor-pointer shadow-sm hover:shadow-xl hover:shadow-[#087F8C]/10 transition-all duration-300"
            >
              {renderItemVisual(item)}

              {/* Hover Overlay with Lightbox trigger */}
              <div className="absolute inset-0 bg-[#142C43]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] font-bold text-[#54D6D0] uppercase tracking-wider mb-1">
                  {item.tag}
                </span>
                <h4 className="text-base font-bold mb-1">{item.title}</h4>
                <p className="text-xs text-white/80 line-clamp-2">{item.caption}</p>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-[#142C43]/60 hover:text-[#087F8C] hover:bg-slate-100 transition-colors z-10"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 rounded-2xl overflow-hidden mb-6">
              {renderItemVisual(activeModalItem)}
            </div>

            <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wide">
              {activeModalItem.tag}
            </span>
            <h3 className="text-2xl font-bold text-[#142C43] mt-1 mb-2">
              {activeModalItem.title}
            </h3>
            <p className="text-sm text-[#142C43]/80 leading-relaxed mb-6">
              {activeModalItem.caption}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#087F8C] rounded-xl hover:bg-[#076a75] transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
