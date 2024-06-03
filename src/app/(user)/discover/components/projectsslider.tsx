import { Human } from '@/assets';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';

export function ProjectSlider() {
  return (
    <Carousel
      className="w-full max-w-full"
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent>
        <CarouselItem>
          <Image src={Human} alt="Hummans" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
