import { useSection } from "deco/hooks/useSection.ts";
import { useScript } from "deco/hooks/useScript.ts";
import Icon from "../../components/ui/Icon.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Behavior {
  /** @description Time-based popping behavior */
  timing?: boolean;

  /** @description Behavior of appearing only once per user section */
  userSession?: boolean;

  /** @description Behavior of appearing only once per device (until localstorage exists) */
  userLocalStorage?: boolean;

  /** @description Show popup immediately after the user takes the cursor off the website */
  clientExit?: boolean;

  /**
   * @description Time until the popup appears in seconds, example: "2"
   * @default 6
   */
  delay?: number;
}

interface Layout {
  title?: string;
  description?: string;
  placeholder?: string;
  button?: string;
  copy?: string;
  image?: ImageWidget;
  widht?: number;
  height?: number;
  alt?: string;
}

interface Props {
  layout?: Layout;

  behavior?: Behavior;

  /**
   * @hide true
   */
  isOpen?: boolean;
  /**
   * @hide true
   */
  firstRender?: boolean;
}

const Popup = ({ layout, behavior, isOpen, firstRender = false }: Props) => {
  if (isOpen) {
    return (
      <div className={`w-full h-full fixed top-0 left-0 z-50 bg-[#00000050]`}>
        <div className={"w-full h-full flex justify-center items-center px-4"}>
          <div
            className={`bg-[#FFF] flex flex-row justify-between w-full min-h-96 max-h-[500px] lg:max-w-[700px] 2xl:max-w-[850px] box-content items-center rounded-lg relative p-6 lg:p-0 overflow-hidden`}
          >
            <button
              hx-get={useSection({
                props: { isOpen: false, firstRender: true },
              })}
              hx-swap="outerHTML"
              hx-target="closest section"
              className="w-8 h-8 rounded-full flex justify-center items-center absolute top-4 right-4 bg-white z-50 cursor-pointer"
            >
              <Icon id="close" class="text-primary" />
            </button>

            <div class="flex flex-col gap-4 w-full lg:w-[55%] m-[20px]">
              {layout?.title && (
                <p class="lg:text-7xl text-4xl font-bold text-center text-primary">
                  {layout?.title}
                </p>
              )}

              {layout?.description && (
                <p class="text-center text-lg text-primary">
                  {layout?.description}
                </p>
              )}

              <form
                class="pt-5 flex flex-col gap-4"
                onSubmit={() => {
                  console.log("Submited");
                }}
              >
                <input
                  class="input input-bordered"
                  type="email"
                  placeholder={layout?.placeholder}
                />

                <button
                  class="btn btn-primary"
                  type="submit"
                  hx-get={useSection({
                    props: { isOpen: false, firstRender: true },
                  })}
                  hx-swap="outerHTML"
                  hx-target="closest section"
                >
                  {layout?.button}
                </button>

                <span class="text-slate-800 text-sm px-1">{layout?.copy}</span>
              </form>
            </div>

            {layout?.image && (
              <div class="hidden lg:block h-full w-[45%] rounded-r-[8px]">
                <Image
                  class="w-full h-full"
                  src={layout?.image}
                  alt={layout?.alt}
                  width={layout?.widht || 200}
                  height={layout?.height || 250}
                  decoding={"async"}
                  loading={"eager"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (
    behavior?.userLocalStorage ||
    behavior?.userSession ||
    (behavior?.timing && !firstRender)
  ) {
    return (
      <>
        <div
          id="popupSession"
          hx-get={useSection({ props: { isOpen: true } })}
          hx-target="closest section"
          hx-swap="outerHTML"
          hx-trigger={`load ${behavior.delay && `delay:${behavior.delay}s`}, ${
            behavior.clientExit && "mouseleave from:body"
          }`}
        />

        {behavior.userLocalStorage && (
          <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: useScript(() => {
                const popupAlreadyDisplayed = localStorage.getItem("popup");

                if (popupAlreadyDisplayed) {
                  document.querySelector("#popupSession")?.remove();
                }

                localStorage.setItem("popup", "displayed");
              }),
            }}
          />
        )}

        {behavior.userSession && (
          <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: useScript(() => {
                const popupAlreadyDisplayed = sessionStorage.getItem("popup");

                if (popupAlreadyDisplayed) {
                  document.querySelector("#popupSession")?.remove();
                }

                sessionStorage.setItem("popup", "displayed");
              }),
            }}
          />
        )}
      </>
    );
  }
};

export default Popup;
