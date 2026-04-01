import { Property } from "@/types/property";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { useState } from "react";
import { Tour360Button, CloudPanoViewer } from "./tour360";

export default function PropertyGallery({ property }: { property: Property }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [is360ModalOpen, setIs360ModalOpen] = useState(false);

  const tourUrl = property.tour360Url;
  const hasTour360 = !!tourUrl;

  return (
    <div className="relative">
      <div className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg relative">
        {hasTour360 && (
          <div className="absolute top-4 right-4 z-10">
            <Tour360Button
              onClick={() => setIs360ModalOpen(true)}
              variant="overlay"
              size="md"
            />
          </div>
        )}

        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          navigation
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
          className="aspect-video w-full rounded-2xl"
        >
          {property.media && property.media.length > 0 ? (
            property.media.map((image, index) => (
              <SwiperSlide key={index}>
                {/*flex items-center justify-center h-full bg-black*/}
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={`${property.typeTransaction.name} - Image ${
                      index + 1
                    }`}
                    className="h-full w-auto object-contain"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt={property.typeTransaction.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* Thumbnails */}
      {property.media && property.media.length > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-4xl mx-auto px-4">
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Navigation, Thumbs]}
              slidesPerView={7}
              spaceBetween={8}
              className="thumbs-swiper"
              breakpoints={{
                320: { slidesPerView: 4, spaceBetween: 4 },
                480: { slidesPerView: 5, spaceBetween: 6 },
                640: { slidesPerView: 6, spaceBetween: 6 },
                768: { slidesPerView: 7, spaceBetween: 8 },
                1024: { slidesPerView: 8, spaceBetween: 8 },
              }}
            >
              {property.media.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="cursor-pointer group transition-all duration-300"
                >
                  <div className="aspect-square rounded-xl overflow-hidden border-2 border-transparent group-hover:border-primary group-hover:shadow-md transition-all duration-300 bg-gray-100">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {hasTour360 && (
        <CloudPanoViewer
          isOpen={is360ModalOpen}
          onClose={() => setIs360ModalOpen(false)}
          tourUrl={tourUrl}
          propertyTitle={property.title}
        />
      )}
    </div>
  );
}
