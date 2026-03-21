import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import experienceData from '../data/experienceData.json';

gsap.registerPlugin(ScrollTrigger);

function ExperienceCard({
  job,
  index,
  onImageClick,
  selectedImage,
  activeCardId,
  setActiveCardId,
}: {
  job: any;
  index: number;
  onImageClick: (img: string) => void;
  selectedImage: string | null;
  activeCardId: number | null;
  setActiveCardId: (id: number | null) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  
  const isPresent = job.period.toLowerCase().includes('present');

  // If the currently viewed fullscreen image belongs to this card, keep the carousel open!
  const isMyImageSelected = selectedImage && job.images?.includes(selectedImage);
  const showCarousel = activeCardId === job.id || isMyImageSelected;

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };

    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onSelect);

    onSelect();
  }, [emblaApi]);

  return (
    <div
      className={`timeline-item mb-12 flex justify-between items-center w-full opacity-0 ${
        index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* Empty space for alternating layout */}
      <div className="order-1 hidden md:block w-5/12" />

      {/* Timeline dot */}
      <div className="z-20 relative flex items-center justify-center order-1 w-6 h-6 flex-shrink-0 ml-5 md:ml-0 md:mx-0">
        {isPresent && (
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
        )}
        <div
          className={`relative z-10 w-full h-full rounded-full border-4 border-black box-content ${
            isPresent ? 'bg-green-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'bg-green-500 shadow-xl'
          }`}
        />
      </div>

      <div
        className={`order-1 glass rounded-2xl w-full md:w-5/12 ml-6 md:ml-0 px-6 py-6 transition-all duration-300 relative overflow-hidden ${
          isPresent
            ? 'border-green-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-linear-to-br from-green-500/5 to-transparent'
            : 'hover:border-green-500/30 border border-white/5 shadow-xl'
        }`}
        onMouseEnter={() => setActiveCardId(job.id)}
        onMouseLeave={() => {
          // If we leave the card area, only collapse if a preview modal isn't open
          if (!selectedImage) {
            setActiveCardId(null);
          }
        }}
      >
        {isPresent && (
          <div className="absolute top-0 right-0 px-3 py-1 bg-green-500 text-black text-[10px] font-extrabold rounded-bl-xl tracking-widest uppercase shadow-md">
            Current
          </div>
        )}

        <h3
          className={`font-bold text-gray-100 text-xl tracking-tight ${
            isPresent ? 'text-green-400' : 'text-gradient-green'
          } pr-16`}
        >
          {job.role}
        </h3>

        <div className="flex justify-between items-center mt-1 mb-4 border-b border-white/5 pb-3">
          <span className="text-sm font-semibold text-gray-300">{job.company}</span>
          <span className="text-xs font-mono px-2 py-1 rounded text-green-400 bg-green-500/10">
            {job.period}
          </span>
        </div>

        <p className="text-sm leading-snug tracking-wide text-gray-400 text-opacity-100">
          {job.description}
        </p>

        {/* Floating Expandable Image Container */}
        <AnimatePresence>
          {showCarousel && job.images?.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-5 relative group"
            >
              <div
                className="overflow-hidden rounded-xl border border-white/10 bg-black/40 cursor-grab active:cursor-grabbing"
                ref={emblaRef}
              >
                <div className="flex touch-pan-y">
                  {job.images.map((img: string, i: number) => (
                    <div className="flex-[0_0_80%] min-w-0 p-3" key={i}>
                      <img
                        src={img}
                        alt={`${job.company} Preview ${i + 1}`}
                        onClick={() => onImageClick(img)}
                        className="w-full h-32 md:h-40 object-cover rounded-lg shadow-md border border-white/5 pointer-events-auto cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Prev Button */}
              {prevBtnEnabled && (
                <button
                  onClick={() => emblaApi && emblaApi.scrollPrev()}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex flex-col items-center justify-center rounded-full bg-black/70 hover:bg-green-500 text-white transition-all shadow-xl"
                >
                  <i className="fa-solid fa-chevron-left text-sm ml-[-2px]" />
                </button>
              )}

              {/* Next Button */}
              {nextBtnEnabled && (
                <button
                  onClick={() => emblaApi && emblaApi.scrollNext()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex flex-col items-center justify-center rounded-full bg-black/70 hover:bg-green-500 text-white transition-all shadow-xl"
                >
                  <i className="fa-solid fa-chevron-right text-sm mr-[-2px]" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Experience() {
  const experience = experienceData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      const items = gsap.utils.toArray('.timeline-item');

      if (items.length > 0) {
        gsap.fromTo(
          items[0] as HTMLElement,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );
      }

      items.slice(1).forEach((item: any) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedImage]);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full" ref={sectionRef}>
        <div className="exp-title mb-16 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-4 text-gray-300">
            Where I've Worked
          </h2>
          <div className="h-1 w-24 bg-green-500 rounded mx-auto md:mx-0" />
        </div>

        <div className="timeline-container relative wrap overflow-hidden p-4 h-full">
          <div className="absolute w-px bg-linear-to-b to-transparent from-gray-100 h-full left-8 md:left-1/2 md:-translate-x-1/2" />

          {experience.map((job, index) => (
            <ExperienceCard
              key={job.id}
              job={job}
              index={index}
              onImageClick={setSelectedImage}
              selectedImage={selectedImage}
              activeCardId={activeCardId}
              setActiveCardId={setActiveCardId}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute -top-3 -right-3 md:-top-5 md:-right-5 z-[101] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black hover:bg-green-500 text-white border border-white/20 transition-all shadow-2xl cursor-pointer pointer-events-auto"
              >
                <i className="fa-solid fa-xmark text-xl" />
              </button>

              <img
                src={selectedImage}
                alt="Expanded view"
                className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10 object-contain cursor-default"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
