import { RichText } from "apps/admin/widgets.ts";
import { useSection } from "deco/hooks/useSection.ts";

interface Option {
    label: string;
    value: number
}

interface Step {
    question?: string;
    /**
    @maxItems 4
    @minItems 4
    */
    options: Option[];
}

interface Props {
    title: string;
    description?: RichText;
    ctaStart: string;
    steps: Step[];
}

interface Data {
    index: number

}

export default function Quiz({ props, data }: { props: Props, data: Data }) {

    const { title, description, ctaStart, steps } = props
    const { index = 0 } = data

    return (
        <>{index == 0 ?
            < div >
                <h1>{title}</h1>
                {description && <span dangerouslySetInnerHTML={{ __html: description }}></span>}
                <button
                    hx-get={useSection({ props: { index: 1 } })}
                    hx-target="closest section"
                    hx-swap="outerHTML"
                >{ctaStart}</button>
            </div >
            :
            <div>
                <h1>{steps[index + 1].question}</h1>
                <ul>{
                    steps[index + 1].options.map((item) => <li>
                        {item.label}
                    </li>)
                }

                </ul>
            </div>
        }
        </>
    )
}