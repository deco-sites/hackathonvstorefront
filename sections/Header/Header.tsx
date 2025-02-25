import type { HTMLWidget, ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/useSection.ts";
import Alert from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem from "../../components/header/NavItem.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import { useScript } from "deco/hooks/useScript.ts";

const scrollBottom = () => {
  const alert = document.querySelector(".preHeader");
  const categories = document.querySelector("#categories");

  self.addEventListener("scroll", function () {
    const scrollTop = self.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 120) {
      alert.style.display = "none";
      categories.style.display = "none";
    } else {
      alert.style.display = "flex";
      categories.style.display = "flex";
    }
  });
};

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

/** @titleBy name */
export interface SiteNavigationElementLeaf {
  /** The name of the item. */
  name?: string;
  /** URL of the item. */
  url?: string;

  bold?: boolean;
  /**@format color */
  color?: string;
}

export interface SiteNavigationElement extends SiteNavigationElementLeaf {
  // TODO: The schema generator is not handling recursive types leading to an infinite loop
  // Lets circunvent this issue by enumerating the max allowed depth
  children?: Array<
    SiteNavigationElementLeaf & {
      children?: Array<
        SiteNavigationElementLeaf & {
          children?: Array<
            SiteNavigationElementLeaf & {
              children?: Array<
                SiteNavigationElementLeaf & {
                  children?: SiteNavigationElementLeaf[];
                }
              >;
            }
          >;
        }
      >;
    }
  >;
}

export interface SectionProps {
  alerts?: RichText[];

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;

  /** @title Logo */
  logo: Logo;

  /** @hide true */
  variant?: "initial" | "menu";
}

type Props = Omit<SectionProps, "alert" | "variant">;

const Desktop = ({ navItems, logo, searchbar }: Props) => (
  <>
    <Modal id={SEARCHBAR_POPUP_ID}>
      <div
        class="absolute top-0 bg-base-100 container"
        style={{ marginTop: HEADER_HEIGHT_MOBILE }}
      >
        <Searchbar {...searchbar} />
      </div>
    </Modal>

    <div id="header" class="flex flex-col container border-b border-gray-300">
      <div class="flex justify-center place-items-center pr-4 pt-5 pb-5 ">
        <div class="place-self-start">
          <a href="/" aria-label="Store logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 23}
            />
          </a>
        </div>

        <label
          for={SEARCHBAR_POPUP_ID}
          class="input input-bordered flex items-center gap-2 w-full max-w-96 ml-auto mr-8"
          aria-label="search icon button"
        >
          <Icon id="search" />
          <span class="text-base-400 truncate">
            Pesquise produtos, marcas...
          </span>
        </label>

        <div class="flex gap-4 place-self-end">
          <Bag />
        </div>
      </div>

      <div
        id="categories"
        class="flex justify-center items-center border-t border-gray-300"
      >
        <ul class="flex">
          {navItems?.slice(0, 10).map((item) => (
            <NavItem item={item} />
          ))}
        </ul>
        <div>{/* ship to */}</div>
      </div>
    </div>
  </>
);

const Mobile = ({ logo, searchbar }: Props) => (
  <>
    <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Drawer.Aside title="Search" drawer={SEARCHBAR_DRAWER_ID}>
          <div class="w-screen overflow-y-auto">
            <Searchbar {...searchbar} />
          </div>
        </Drawer.Aside>
      }
    />
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
          <div
            id={SIDEMENU_CONTAINER_ID}
            class="h-full flex items-center justify-center"
            style={{ minWidth: "100vw" }}
          >
            <span class="loading loading-spinner" />
          </div>
        </Drawer.Aside>
      }
    />

    <div
      class="grid place-items-center w-screen px-5 gap-4"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
        gridTemplateColumns:
          "min-content auto min-content min-content min-content",
      }}
    >
      <label
        for={SIDEMENU_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="open menu"
        hx-target={`#${SIDEMENU_CONTAINER_ID}`}
        hx-swap="outerHTML"
        hx-trigger="click once"
        hx-get={useSection({ props: { variant: "menu" } })}
      >
        <Icon id="menu" />
      </label>

      {logo && (
        <a
          href="/"
          class="flex-grow inline-flex items-center justify-center"
          style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
          aria-label="Store logo"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 100}
            height={logo.height || 13}
          />
        </a>
      )}

      <label
        for={SEARCHBAR_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="search icon button"
      >
        <Icon id="search" />
      </label>
      <Bag />
    </div>
  </>
);

function Header({
  alerts = [],
  logo = {
    src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();

  return (
    <>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(scrollBottom) }}
      />

      <header
        style={{
          height:
            device === "desktop" ? HEADER_HEIGHT_DESKTOP : HEADER_HEIGHT_MOBILE,
        }}
      >
        <div class="bg-base-100 fixed w-full z-40">
          {alerts.length > 0 && <Alert alerts={alerts} />}
          {device === "desktop" ? (
            <Desktop logo={logo} {...props} />
          ) : (
            <Mobile logo={logo} {...props} />
          )}
        </div>
      </header>
    </>
  );
}

export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }

  return <Header {...props} />;
}
