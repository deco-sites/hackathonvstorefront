import { RichText, type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  description?: RichText;

  images: {
    mobile: ImageWidget;
    desktop: ImageWidget;
    bannerDesktop: ImageWidget;
  };

  cta?: {
    href: string;
    label: string;
  };
}

function Banner({ title, description, images, cta }: Props) {
  return (
    <Section.Container>
      <div class="relative mx-0 lg:mx-5 group lg:pt-10 overflow-hidden">
        <Picture>
          <Source
            media="(max-width: 640px)"
            src={images.mobile}
            width={335}
            height={572}
          />
          <Source
            media="(min-width: 640px)"
            src={images.desktop}
            width={1320}
            height={480}
          />
          <img src={images.desktop} alt={title} class="w-full object-cover" />
        </Picture>

        <Image
          class="hidden lg:block absolute left-0 pt-10 top-0 h-full w-fit lg:transition-transform lg:duration-300 lg:group-hover:scale-110"
          src={images.bannerDesktop}
          width={300}
          height={300}
          alt=""
        />

        <div
          class={clx(
            "absolute right-0 top-0",
            "p-5 sm:p-10 md:py-20 md:px-[60px]",
            "flex flex-col",
            "h-full max-w-full sm:max-w-[33%] md:max-w-[50%] justify-center"
          )}
        >
          {title && (
            <span class="font-bold text-6xl lg:text-7xl text-primary">
              {title}
            </span>
          )}
          {description && (
            <span
              class="font-normal text-sm md: pt-4 pb-12 text-primary"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <div class="">
            {cta && (
              <a
                href={cta.href}
                class="btn btn-primary no-animatio w-fit border-0 min-w-[180px]"
              >
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </Section.Container>
  );
}

export default Banner;
