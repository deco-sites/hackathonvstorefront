import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  /** @description Section title */
  title?: string;

  /** @description See all link */
  cta?: string;
}

function Header({ title, cta }: Props) {
  if (!title) {
    return null;
  }

  return (
    <div class={clx("flex justify-between items-center gap-2", "px-5 sm:px-0")}>
      <span class="text-2xl sm:text-3xl font-semibold">{title}</span>
      {cta && (
        <a
          class="text-sm font-medium text-primary opacity-80 hover:opacity-100 transition-all duration-100"
          href={cta}
        >
          Ver todos
        </a>
      )}
    </div>
  );
}

interface Tab {
  title: string;
}

function Tabbed({ children }: { children: JSX.Element }) {
  return <>{children}</>;
}

function Container({ class: _class, ...props }: JSX.IntrinsicElements["div"]) {
  return (
    <div
      {...props}
      class={clx(
        "container flex flex-col gap-4 sm:gap-6 w-full py-5 sm:py-16",
        _class?.toString()
      )}
    />
  );
}

function Section() { }

Section.Container = Container;
Section.Header = Header;
Section.Tabbed = Tabbed;

export default Section;
