import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { useSection } from "deco/hooks/useSection.ts";
import { Product } from "apps/commerce/types.ts";
import ProductShelf from "../Product/ProductShelf.tsx";
import Image from "apps/website/components/Image.tsx";

interface Option {
  label: string;
  value: number;
}

/** @titleBy question */
interface Step {
  image?: ImageWidget;
  alt?: string;
  question?: string;
  /**
      @maxItems 4
      @minItems 4
      */
  options: Option[];
}

interface Result {
  title: string;
  products: Product[] | null;
  ctsPrev?: string;
}

interface Props {
  title: string;
  description?: RichText;
  image?: ImageWidget;
  alt?: string;
  ctaStart: string;
  steps: Step[];
  result: Result;
}

interface Data {
  /**
   *@hide true
   */
  index: number;
}

export default function Quiz({ props, data }: { props: Props; data: Data }) {
  const { title, description, ctaStart, steps, image, alt, result } = props;
  const { index } = data;

  return (
    <div class="flex w-full h-full py-10 justify-center items-center container relative min-h-96">
      {index == 0 ? (
        <div class="flex h-full lg:max-h-[400px] m-auto flex-col-reverse lg:flex-row justify-center items-center gap-5 px-2 lg:px-0">
          <div class="w-full lg:w-2/4 p-5 flex flex-col justify-center items-center gap-5">
            <h1 class="text-xl lg:text-3xl text-center ">{title}</h1>
            {description && (
              <span
                class={"text-center max-w-2xl mx-auto"}
                dangerouslySetInnerHTML={{ __html: description }}
              ></span>
            )}
            <button
              class="px-3 py-2 bg-secondary text-white font-bold uppercase max-w-40 mx-auto"
              hx-get={useSection({ props: { data: { index: 1 } } })}
              hx-target="closest section"
              hx-swap="outerHTML"
              hx-indicator="#load"
            >
              {ctaStart}
            </button>
          </div>

          {image && (
            <Image
              class="w-[80%] lg:w-2/4 max-h-[400px] object-contain h-full flex justify-center items-center"
              src={image}
              alt={alt}
              width={250}
              height={250}
              loading="lazy"
            />
          )}
        </div>
      ) : steps[index - 1] ? (
        <div class="flex w-full h-ful flex-col-reverse lg:flex-row lg:max-h-[400px] justify-center items-center gap-5 px-2 lg:px-0 ">
          <div class="w-full lg:max-w-[50%] p-5">
            <h1 class=" text-xl lg:text-3xl mb-4">
              {steps[index - 1].question}
            </h1>
            <ul class={"flex flex-col lg:flex-row flex-wrap gap-2"}>
              {steps[index - 1].options.map((item) => (
                <li
                  hx-get={useSection({ props: { data: { index: index + 1 } } })}
                  hx-target="closest section"
                  hx-swap="outerHTML"
                  class="px-3 py-2 bg-primary font-bold text-white text-center cursor-pointer w-full lg:w-[calc(50%-0.25rem)] hover:opacity-85"
                  hx-indicator="#load"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          {steps[index - 1].image && (
            <div class="w-[80%] lg:w-[40%]">
              <Image
                class="object-contain w-full max-h-[400px] h-full justify-center items-center"
                src={steps[index - 1].image}
                alt={steps[index - 1].alt}
                width={500}
                height={500}
                loading="lazy"
              />
            </div>
          )}
        </div>
      ) : (
        <div class="w-full px-2 lg:px-0">
          <h2 class="text-xl lg:text-3xl text-center">{result.title}</h2>
          <ProductShelf products={result.products} />
          <div>
            {result.ctsPrev && (
              <button
                class="px-3 py-2 bg-secondary text-white font-bold mx-auto"
                hx-get={useSection({ props: { data: { index: 0 } } })}
                hx-target="closest section"
                hx-swap="outerHTML"
                hx-indicator="#load"
              >
                {result.ctsPrev}
              </button>
            )}
          </div>
        </div>
      )}
      <div
        id="load"
        class="htmx-indicator w-full h-full flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 bg-[#00000011]"
      >
        <span
          id="loading-searchResult"
          class="loading loading-spinner loading-lg"
        ></span>
      </div>
    </div>
  );
}
