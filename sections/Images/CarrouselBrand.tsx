import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**@titleBy alt */
interface ItemImg {
  alt?: string;
  src: ImageWidget;
  width?: number;
  height?: number;
}

interface Props {
  imgs: ItemImg[];
}

export default function CarrouselBrand(props: Props) {
  const { imgs } = props;

  return (
    <div class={"w-full h-full flex   "}>
      <ul class="w-full h-full flex flex-row gap-8 justify-between container py-12 divide-solid overflow-auto px-4 lg:px-0">
        {imgs?.map((item) => (
          <Image
            class="w-full h-full aspect-square object-contain max-h-[60px]"
            src={item.src}
            alt={item.alt}
            height={item.height || 60}
            width={item.width || 170}
            fetchPriority="low"
            loading={"lazy"}
          />
        ))}
      </ul>
    </div>
  );
}
