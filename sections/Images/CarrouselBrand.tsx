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
    <div class={"w-full flex gap-8 justify-between"}>
      <ul class="w-auto h-full">
        {imgs.map((item) => {
          <Image
            src={item.src}
            alt={item.alt}
            height={80}
            width={200}
            fetchPriority="low"
            loading={"lazy"}
          />;
        })}
      </ul>
    </div>
  );
}
