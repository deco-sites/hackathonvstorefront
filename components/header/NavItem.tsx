import { NAVBAR_HEIGHT_DESKTOP } from "../../constants.ts";
import { SiteNavigationElement } from "../../sections/Header/Header.tsx";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;

  return (
    <li
      class="group flex items-center px-5"
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
          <>
            <div class=" hidden hover:flex group-hover:flex  bg-base-100 z-40 items-start justify-center gap-6 border-t-2 border-b-2 border-base-200 w-screen absolute top-full left-0 right-0
          ">
              <ul class="flex items-start justify-start gap-12 container">
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
            <span class=" group-hover:after:content-[''] after:hover:hidden group-hover:after:bg-[#00000085] group-hover:after:absolute group-hover:after:top-full group-hover:after:-z-10 group-hover:after:left-0 group-hover:after:right-0 group-hover:after:w-full group-hover:after:h-screen">
            </span>
          </>
        )}
    </li>
  );
}

export default NavItem;
