import { useScript } from "deco/hooks/useScript.ts";
import { RichText } from "apps/admin/widgets.ts";
import { useSection } from "deco/hooks/useSection.ts";

/** @titleBy cupom */
interface Cupom {
    cupum: string;
    /** @format color */
    color: string;
}

interface Props {
    title: string;
    description?: RichText;
    ctaStart: string;
    cupons: Cupom[];
    /** @hidden true */
    activeCupom?: string;
    titleSuccess: string;
    descriptionSucces: RichText
}


export default function Roleta(props: Props) {

    const { title, description, ctaStart, cupons, activeCupom, titleSuccess, descriptionSucces } = props

    const teste = (cupons: Cupom[]) => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const button = document.getElementById('girar') as HTMLButtonElement;

        console.log("cupons", cupons)

        let startAngle = 0;
        const arc = Math.PI / (cupons.length / 2);
        let spinTimeout: number | null = null;

        function drawSlice(startAngle: number, arc: number, color: string, text: string): void {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250, 250, 250, startAngle, startAngle + arc, false);
            ctx.lineTo(250, 250);
            ctx.fill();

            // Adicione estilos de texto
            ctx.save();
            ctx.fillStyle = '#000';  // Cor do texto
            ctx.font = 'bold 20px Arial';  // Estilo da fonte e tamanho
            ctx.translate(250, 250);  // Mover o ponto de origem para o centro da roleta
            ctx.rotate(startAngle + arc / 2);  // Girar o contexto para alinhar o texto com a fatia
            ctx.fillText(text, 150, 0);  // Desenhar o texto
            ctx.restore();
        }

        function drawWheel(): void {
            for (let i = 0; i < cupons.length; i++) {
                drawSlice(startAngle + i * arc, arc, cupons[i].color, cupons[i].cupum);
            }
        }

        function rotateWheel(): void {
            const spinAngleStart = Math.random() * 10 + 10;
            const spinTimeTotal = Math.random() * 3000 + 4000;
            spin(spinAngleStart, spinTimeTotal);
        }

        function spin(spinAngleStart: number, spinTimeTotal: number): void {
            let spinTime = 0;

            function rotate(): void {
                spinTime += 30;
                if (spinTime >= spinTimeTotal) {
                    if (spinTimeout !== null) {
                        clearTimeout(spinTimeout);
                    }
                    // Calcular a posição final e exibir o texto da fatia correspondente
                    const finalAngle = startAngle % (2 * Math.PI);
                    const index = Math.floor(((2 * Math.PI) - finalAngle) / arc) % cupons.length;
                    console.log('Texto selecionado:', cupons[index].cupum);
                    document.getElementById(cupons[index].cupum)?.click()
                    console.log(document.getElementById(cupons[index].cupum))

                    return;
                }
                const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
                startAngle += (spinAngle * Math.PI / 180);
                drawWheel();
                spinTimeout = setTimeout(rotate, 30);
            }

            rotate();
        }

        function easeOut(t: number, b: number, c: number, d: number): number {
            const ts = (t /= d) * t;
            const tc = ts * t;
            return b + c * (tc + -3 * ts + 3 * t);
        }

        button.addEventListener('click', rotateWheel);

        drawWheel();

    }

    return (
        <div class="flex w-full h-full justify-center items-center container gap-6 flex-col lg:flex-row py-14 px-2 lg:px-0">
            <> {activeCupom == undefined
                ?
                <>
                    <div class={"w-full lg:w-2/4 flex flex-col gap-4 lg:gap-8"}>
                        <h2 class="text-xl lg:text-3xl font-bold">{title}</h2>
                        {description && <span class={" max-w-2xl "} dangerouslySetInnerHTML={{ __html: description }}></span>}
                        <button id="girar" class="border border-primary px-8 py-4 uppercase text-primary hover:bg-primary hover:text-white font-bold duration-300 mt-3 max-w-48" >
                            {ctaStart}
                        </button>
                    </div>
                    <div class="flex justify-center items-center w-full lg:w-2/4">
                        <div class="relative">
                            <div class="seta text-primary z-20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-arrow-big-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9.586 4l-6.586 6.586a2 2 0 0 0 0 2.828l6.586 6.586a2 2 0 0 0 2.18 .434l.145 -.068a2 2 0 0 0 1.089 -1.78v-2.586h7a2 2 0 0 0 2 -2v-4l-.005 -.15a2 2 0 0 0 -1.995 -1.85l-7 -.001v-2.585a2 2 0 0 0 -3.414 -1.414z" /></svg>
                            </div>
                            <canvas id="canvas" class="max-w-[300px] lg:max-w-[500px]" width="500" height="500"></canvas>
                        </div>
                    </div>
                    <div class="hidden">
                        <ul>
                            {
                                cupons.map((item) =>
                                    <li
                                        id={item.cupum}
                                        hx-get={useSection({ props: { activeCupom: item.cupum } })}
                                        hx-swap="outerHTML"
                                        hx-target="closest section"
                                    >
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <script
                        type="module"
                        dangerouslySetInnerHTML={{ __html: useScript(teste, cupons) }}
                    >
                    </script>
                </>
                :
                <div class="flex justify-center items-center container min-h-[400px] flex-col gap-8 max-w-[700px]">
                    <h2 class="text-xl lg:text-3xl text-center font-bold ">{titleSuccess}</h2>
                    <span class="text-xl lg:text-xl text-center " dangerouslySetInnerHTML={{ __html: descriptionSucces.replace("CUPOM", activeCupom) }}></span>
                    <button
                        hx-get={useSection({ props: { activeCupom: undefined } })}
                        hx-swap="outerHTML"
                        hx-target="closest section"
                        class="px-8 py-4 bg-primary text-white uppercase font-bold hover:opacity-85">Tentar novamente</button>
                </div>
            }
            </>
        </div>
    )
}