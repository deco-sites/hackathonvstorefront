import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useSection } from "deco/hooks/useSection.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;

  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  index: number;
  classSlider: string;
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;
  const params = { promotion_name: image.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  const viewPromotionEvent = useSendEvent({
    on: "view",
    event: { name: "view_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative block overflow-y-hidden w-full lg:max-h-[75vh] max-h-[85vh] h-full"
    >
      {action && (
        <div
          class={clx(
            "absolute h-full w-full top-0 left-0",
            "flex flex-col justify-end lg:pb-28 pb-32 items-center",
            "px-5 sm:px-0",
            "sm:left-40 sm:items-start sm:max-w-96 px-2 lg:p-0",
          )}
        >
          <span class="text-2xl lg:text-7xl font-bold text-base-100">
            {action.title}
          </span>
          <span class="font-normal text-base text-base-100 pt-4 pb-12">
            {action.subTitle}
          </span>
          <button
            class="btn btn-primary btn-outline border-0 bg-base-100 min-w-[180px]"
            aria-label={action.label}
          >
            {action.label}
          </button>
        </div>
      )}
      <Picture preload={true} {...viewPromotionEvent}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={"high"}
          src={mobile}
          width={412}
          height={660}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={"high"}
          src={desktop}
          width={1440}
          height={600}
        />
        <img
          class="object-cover w-full h-full lg:max-h-[75vh]"
          loading={"eager"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Carousel({ images = [], preload, interval, index = 0, classSlider }: Props) {
  const id = useId();

  const lengthImage = (images.length - 1)

  return (
    <div
      id={id}
      class={clx(
        "grid",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[32px_1fr_32px] min-h-[85vh]",
        "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
        "w-screen " + classSlider,
      )}
      hx-get={useSection({ props: { index: index >= lengthImage ? 0 : index + 1, classSlider: "slide-prev" } })}
      hx-target="closest section"
      hx-swap="outerHTML transition:true"
      hx-trigger={`load once delay:${interval || 4}s`}
    >
      <div class="col-span-full row-span-full">
        <BannerItem image={images[index]} lcp={preload} />
      </div>

      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <button
          class="btn btn-neutral btn-outline btn-circle no-animation btn-sm"
          disabled={0 == index}
          hx-get={useSection({ props: { index: index - 1, classSlider: "slide-prev" } })}
          hx-target="closest section"
          hx-swap="outerHTML transition:true"
        >
          <Icon id="chevron-right" class="rotate-180" />
        </button>
      </div>

      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <button
          class="btn btn-neutral btn-outline btn-circle no-animation btn-sm"
          disabled={lengthImage == index}
          hx-get={useSection({ props: { index: index + 1, classSlider: "slide-next" } })}
          hx-target="closest section"
          hx-swap="outerHTML transition:true"
        >
          <Icon id="chevron-right" />
        </button>
      </div>

      <ul
        class={clx(
          "col-span-full row-start-4 z-10",
          "carousel justify-center gap-3",
        )}
      >
        {images.map((_, indexD) => (
          <li class="carousel-item">
            <button
              disabled={indexD == index}
              class={clx(
                "bg-black opacity-20 h-3 w-3 no-animation rounded-full",
                "disabled:w-8 disabled:bg-base-100 disabled:opacity-100 transition-[width]",
              )}
            >
            </button>
          </li>
        ))}
      </ul>

    </div >
  );
}

export default Carousel;
