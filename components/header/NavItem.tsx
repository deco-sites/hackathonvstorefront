import {
  HEADER_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_DESKTOP,
} from "../../constants.ts";
import { SiteNavigationElement } from "../../sections/Header/Header.tsx";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;

  return (
    <li
      class="group flex items-center pr-5"
      style={{ height: NAVBAR_HEIGHT_DESKTOP }}
    >
      <a
        href={url}
        class={` group-hover:underline text-sm font-medium ${
          item.bold ? "font-bold" : " "
        }`}
        style={item.color && `color:${item.color}`}
      >
        {name}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-40 items-start justify-center gap-6 border-t-2 border-b-2 border-base-200 w-screen"
            style={{
              top: "0px",
              left: "0px",
              marginTop: HEADER_HEIGHT_DESKTOP,
            }}
          >
            <ul class="flex items-start justify-start gap-6 container">
              {children.map((node) => (
                <li class="p-6 pl-0">
                  <a
                    class={`hover:underline text-sm ${
                      node.bold ? "font-bold" : ""
                    }`}
                    style={node.color && `color:${node.color}`}
                    href={node.url}
                  >
                    <span>{node.name}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a
                          class={`hover:underline text-sm ${
                            leaf.bold ? "font-bold" : ""
                          }}`}
                          style={leaf.color && `color:${leaf.color}`}
                          href={leaf.url}
                        >
                          <span class="text-xs">{leaf.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
