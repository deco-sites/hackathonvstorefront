import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**@titleBy alt */
interface ItemImg {
  alt?: string;
  src: ImageWidget;
}

interface Props {
  imgs: ItemImg[];
}

export default function CarrouselBrand(props: Props) {
  const { imgs } = props;

  return (
    <div class={"w-full h-full flex   "}>
      <ul class="w-full h-full flex flex-row gap-8 justify-between container py-8 divide-solid overflow-auto px-4 lg:px-0">
        {imgs?.map((item) => (
          <Image
            class="w-full h-full aspect-square object-contain max-h-[60px]"
            src={item.src}
            alt={item.alt}
            height={50}
            width={200}
            fetchPriority="low"
            loading={"lazy"}
          />
        ))}
      </ul>
    </div>
  );
}
