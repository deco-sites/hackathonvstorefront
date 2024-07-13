import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy title
 */
interface Banner {
  image: ImageWidget;
  width?: number;
  height?: number;
  title: string;
  alt: string;
  link: string;
}

interface Props {
  /** @description Choose between the predefined types of mosaics, or create yours below */
  typeMosaic?: "One" | "Two";

  /** @description Activate the identifiers for each banner (don't forget to deactivate after completing) */
  identifierImage?: boolean;

  /** @description Create your mosaic respecting the formatting, remembering that each image has an identifier, exemple: HTML: 'banner1 banner2 banner3' 'banner1 banner2 banner3' */
  newGrid: RichText;

  /**
   * @description Images that will appear in the mosaic
   * @maxItems 8
   * @minItems 0
   */
  banners: Banner[];
}

const Mosaic = ({
  typeMosaic,
  banners,
  newGrid,
  identifierImage = true,
}: Props) => {
  let GRID;

  switch (typeMosaic) {
    case "One":
      GRID = `
        'banner1 banner2 banner3'
        'banner1 banner4 banner4'
      `;
      break;
    case "Two":
      GRID = `
        'banner4 banner4 banner1'
        'banner2 banner3 banner1'
      `;
      break;
    default:
      GRID = newGrid;
  }

  return (
    <div
      className="container py-7 max-h-[700px] grid grid-cols-3 grid-rows-2 gap-2"
      style={{ gridTemplateAreas: GRID }}
    >
      {banners?.map((banner: Banner, index: number) => (
        <a
          href={banner.link}
          key={index}
          className={`banner${index + 1} col-span-1 row-span-1 relative`}
          style={{ gridArea: `banner${index + 1}` }}
        >
          {/* Identifier Deco Painel */}
          {identifierImage && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap bg-[#09F47B] text-black text-xs lg:text-base font-semibold px-4 py-2 m-2 rounded-full h-fit w-fit">
              <span>{index + 1} -</span>
              <span>{banner.title}</span>
            </div>
          )}

          <Image
            class="w-full h-full object-cover"
            src={banner.image}
            alt={banner.alt}
            width={banner.width || 400}
            height={banner.height || 400}
            title={banner.title}
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
};

export default Mosaic;
